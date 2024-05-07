import { canvas, score } from "/public/js/index.js";
import { gameSettings } from "/public/js/gameSettings.js";

export let currentParticles = [];

// SPAWNER
async function spawnParticle(){
    let particleX = Math.round(Math.random()*canvas.width-50) + 100;
    let particleY = Math.round(Math.random()*canvas.height-50) + 100;
    let particleSize = Math.round(Math.random()*10)+10

    currentParticles.push({x: particleX, y: particleY, size: particleSize});
}

// MANAGER
export let stopParticles = {stopParticles: false};
export const particleManager = (maxParticles, particleDelay) => {
    async function loop(){
        if(stopParticles.stopParticles){return}
        await new Promise(resolve => setTimeout(resolve, particleDelay));

        if(currentParticles.length<=maxParticles-1){
            spawnParticle();
        }
        else{
            currentParticles.shift();
            spawnParticle();
        }

        loop();
    }
    loop();
}

// COLLISIONS
export const particleCollider = (particle, character) => {
    let distanceX = Math.abs(particle.x - (character.x+character.w/2));
    let distanceY = Math.abs(particle.y - (character.y+character.h/2));

    // if(distanceX<100 || distanceY<100){
    //     console.log(`x: ${distanceX}, y: ${distanceY}`);
    // }

    async function colorBackToNormal(){
        await new Promise(resolve => setTimeout(resolve, 250));
        character.color = "#000000";
    }

    if(distanceX<=character.w/2 && distanceY<=character.h/2){
        currentParticles = currentParticles.filter((el)=>{
            if(el.x==particle.x && el.y==particle.y){
                character.color = gameSettings.general.blinkColor;
                colorBackToNormal();
                score.score++;
                return false
            }
            return true
        })
    }
}