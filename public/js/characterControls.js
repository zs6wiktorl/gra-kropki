import { character } from "/public/js/index.js";
import { gameSettings } from "/public/js/gameSettings.js";

window.addEventListener('load', ()=>{

    window.addEventListener('keydown', (ev)=>{
        if(ev.key==gameSettings.controls.moveLeft){
            character.velLeft = 5;
        }
        else if(ev.key==gameSettings.controls.moveRight){
            character.velRight = 5;
        }
        else if(ev.key==gameSettings.controls.moveUp){
            character.velUp = 5;
        }
        else if(ev.key==gameSettings.controls.moveDown){
            character.velDown = 5;
        }
    }) 

    window.addEventListener('keyup', (ev)=>{
        if(ev.key==gameSettings.controls.moveLeft){
            character.velLeft = 0;
        }
        else if(ev.key==gameSettings.controls.moveRight){
            character.velRight = 0;
        }
        else if(ev.key==gameSettings.controls.moveUp){
            character.velUp = 0;
        }
        else if(ev.key==gameSettings.controls.moveDown){
            character.velDown = 0;
        }
    })     

})