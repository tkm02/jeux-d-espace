let container = document.querySelector('#fond-jeux');
const affichage = document.querySelector('h2');
let resultats =0;
let toutesLesDivs;
let aliens = [];
let direction = 1;
let positionTireur = 271;



function creationGrilleEtAliens(){

    let index = 0;
    for (let i = 0; i < 300; i++) {
        if (index === 0) {
            const bloc = document.createElement('div');
            bloc.style.width='40px';
            bloc.style.height='40px';
            // bloc.style.background='#fff'
            bloc.setAttribute('data-left','true');
            container.append(bloc);
            index++;
        }
        else if(index === 19){
            const bloc = document.createElement('div');
            bloc.style.width='40px';
            bloc.style.height='40px';
            bloc.setAttribute('data-right','true');
            container.append(bloc);
            index =0;

        }
        else{
            const bloc = document.createElement('div');
            bloc.style.width='40px';
            bloc.style.height='40px';
            container.append(bloc);
            index++;
        }
        
    }

    for (let i = 1; i < 53; i++) {
        if (i === 13) {
            i = 21;
            aliens.push(i);
        }
        else if (i === 33) {
            i=41;
            aliens.push(i);
        }
        else {
            aliens.push(i)
        }
        
    }

    toutesLesDivs = document.querySelectorAll('div');
    // console.log(toutesLesDivs);
    Array.from(aliens).forEach(el=>{
        toutesLesDivs[el].classList.add('enemie');
    });

    toutesLesDivs[positionTireur].classList.add('brave');
}
function deplacerBrave(e){
    toutesLesDivs[positionTireur].classList.remove('brave');
    if (e.keyCode === 37) {
        if (positionTireur > 261) {
            positionTireur--;
        }
    }
    else if(e.keyCode === 39){
        if (positionTireur < 280) {
            positionTireur++;
        }
    }
    toutesLesDivs[positionTireur].classList.add('brave');
}

let descendreDroit = true;
let descendreGauche = true;
function deplacerEnemie(){

    for (let i = 0; i < aliens.length; i++) {
       if ( toutesLesDivs[aliens[i]].getAttribute('data-right') === 'true') {

        if (descendreDroit) {

            direction=20;
            setTimeout(()=>{
                descendreDroit=false
            },50)

        }
        else if (descendreDroit === false) {
            direction =-1;
        }
        descendreGauche=true;

       }
       else if (toutesLesDivs[aliens[i]].getAttribute('data-left') === 'true') {

        if (descendreGauche) {
            direction=20;
            setTimeout(()=>{
                descendreGauche=false
            },50)
        }
        else if (descendreGauche === false) {
            direction =+1;
        }
       descendreDroit=true;

       }
    }

    for (let i = 0; i < aliens.length; i++) {
        toutesLesDivs[aliens[i]].classList.remove('enemie');
    }
    for (let i = 0; i < aliens.length; i++) {
        aliens[i]+=direction;
    }
    for (let i = 0; i < aliens.length; i++) {
        toutesLesDivs[aliens[i]].classList.add('enemie');
    }


    if (toutesLesDivs[positionTireur].classList.contains('enemie','brave')) {
        affichage.textContent = "Game Over 💔";
        document.removeEventListener('keyup',tirer);
        toutesLesDivs[positionTireur].classList.add('boom');
        clearInterval(invaderId);

    }
    for(let i=0; i< aliens.length;i++){
        if(aliens[i] > toutesLesDivs.length -20){
            affichage.textContent='Game Over 💔';
            document.removeEventListener('keyup',tirer);
            clearInterval(invaderId);
        }
    }
}
creationGrilleEtAliens();
document.addEventListener('keydown',deplacerBrave);

invaderId = setInterval(deplacerEnemie,500);

function tirer(e){
    let laserId;
    let laserEncours = positionTireur;

    function deplacerLaser(){
        toutesLesDivs[laserEncours].classList.remove('laser');
        laserEncours-=20;
        toutesLesDivs[laserEncours].classList.add('laser');
        if(toutesLesDivs[laserEncours].classList.contains('enemie')){
            toutesLesDivs[laserEncours].classList.remove('laser');
            toutesLesDivs[laserEncours].classList.remove('enemie');
            toutesLesDivs[laserEncours].classList.add('boom');

            aliens = aliens.filter(el => el !== laserEncours);

            setTimeout(()=>{
                toutesLesDivs[laserEncours].classList.remove('boom'); 
            },250);
            clearInterval(laserId);

            resultats++;

            if (resultats === 36) {
                affichage.textContent = 'Bravo capitaine 🥳';
                clearInterval(invaderId);
            }
            else{
                affichage.textContent = `Score:${resultats}`;
            }
        }
        if (laserEncours < 20) {
            clearInterval(laserId);
            setTimeout(()=>{
                toutesLesDivs[laserEncours].classList.remove('laser')
            },150)
        }
    
    }
    if (e.keyCode === 32) {
        laserId =setInterval(()=>{
            deplacerLaser();
        },150);
    }
}

document.addEventListener('keyup',tirer);