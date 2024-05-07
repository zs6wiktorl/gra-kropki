import { currentParticles, particleManager, particleCollider, stopParticles } from "/public/js/particles.js"
import { gameSettings } from "/public/js/gameSettings.js";

export let character = {x: 0, y: 0, w: 80, h: 80, color: "#000000", velUp: 0,  velDown: 0, velLeft: 0, velRight: 0};
export let score = {score: 0};
export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

window.addEventListener('load', ()=>{

    const mainMenu = document.querySelector('.mainMenu');
    const scorePanel = document.querySelector('.scorePanel');

    const classicMode = document.querySelector('.classicMode');
    classicMode.addEventListener('click', ()=>{
        end=false;
        stopParticles.stopParticles=false;
        countdownTimer.style.display = "block";
        countdown("classic", gameSettings.general.countdownLength);
        mainMenu.style.display = "none";
    });

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    //pre-start countdawn
    const countdownTimer = document.querySelector('.countdownTimer');
    async function countdown(gamemode, seconds){
        countdownTimer.innerHTML = seconds;
        await new Promise(resolve => setTimeout(resolve, 1000));
        seconds = seconds - 1;
        if(seconds!=0){
            countdown(gamemode, seconds);
        }else{
            countdownTimer.innerHTML = "GO!";
            await new Promise(resolve => setTimeout(resolve, 1000));
            countdownTimer.innerHTML = "";
            countdownTimer.style.display = "none";
            startGame(gamemode);
        }
    }

    //in-game timer
    const timer = document.querySelector('.timer');
    async function inGameTimer(seconds){
        timer.innerHTML = seconds;
        await new Promise(resolve => setTimeout(resolve, 1000));
        seconds = seconds - 1;
        if(seconds!=0){
            inGameTimer(seconds);
        }else{
            await new Promise(resolve => setTimeout(resolve, 1000));
            timer.innerHTML = "";
            timer.style.display = "block";
            endGame(score);
        }
    }


    //game start
    async function startGame(gameMode){
        //setting character in the middle
        score.score = 0;
        character.x = (canvas.width - character.w)/ 2;
        character.y = (canvas.height - character.h) / 2;
        switch(gameMode){
            case "classic": {
                particleManager(gameSettings.gameplay.classic.maxParticles, gameSettings.gameplay.classic.particleDelay);
                timer.style.display = "block";
                inGameTimer(gameSettings.gameplay.classic.gameLength);
                update();
                break;
            }
        }
    }

    //game end
    async function endGame(score){
        stopParticles.stopParticles=true;
        end=true;
        cancelAnimationFrame(update);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scorePanel.innerHTML = `${score.score} points`;
        scorePanel.style.top = "20vh";
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        scorePanel.style.top = "100vh";
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        mainMenu.style.display = "block";
    }

    let end = false;
    const update = () => {
        if(end){return}

        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // update size
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        //character controls
        character.x -= character.velLeft;
        character.x += character.velRight;
        character.y -= character.velUp;
        character.y += character.velDown;
        ctx.fillStyle = character.color;
        ctx.fillRect(character.x, character.y, character.w, character.h);

        //particles
        if(currentParticles.length>0){
            currentParticles.forEach(particle => {
                ctx.beginPath();
                // PARTICLE HEALTH???
                ctx.arc(particle.x, particle.y, particle.size, 0, 2*Math.PI);
                particleCollider(particle, character);
                ctx.stroke();
            })
        }

        //render
        requestAnimationFrame(update);
    }
    
    

})