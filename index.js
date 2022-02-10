import Army from './modules/army_class.js';
import war from './modules/war_func.js'
import draw from './modules/draw_cnv.js'

const armies = [];

(function createArmies(amount) {
    for (let i = 0; i < amount; i++) {
        armies[i] = new Army();
        console.log(armies[i]);
    }
})(30);

function initWar(){  ///because callback will not take arguments!
    war(armies);  
    draw(armies);
};

document.getElementById('war').addEventListener('click',initWar);

war(armies);
draw(armies);

//const rounds = setInterval(initWar,1000);