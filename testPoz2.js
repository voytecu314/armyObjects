let cnt = 0;

class Army {

    static instances = 0;

    constructor() {
        this.name = `Army ${Army.instances}`;
        this.instance_no = Army.instances;
        Army.instances++;
    }

    structure_strength = 1;

    soldiers = {
        general: 1,
        majors: 1,
        captains: 3,
        lieutenants: 10,
        sergeants: 50,
        regular: Math.ceil(Math.random() * 1000) + 500
    };

    bodies_aftermath = {
        sld_lost: 0,
        deserted: 0,
        recruited: 0
    };

    war_status = 'READY';

    aim = parseFloat((Math.random() / 10).toFixed(3));

    pwr_factors = [Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10)];

    countPowerUnit() {
        this.pwr_unit = Math.round(this.pwr_factors.reduce((acc, val) => (acc + val) / 2));
    }

    reShiftPowerFactors() {
        this.pwr_factors.push(Math.round(Math.random() * 10));
        this.pwr_factors.shift();
    }

    reCalcStructureStrength() {
        this.structure_strength = this.soldiers.general * .4 + this.soldiers.majors * .25 + this.soldiers.captains * .05 + this.soldiers.lieutenants * .01 + this.soldiers.sergeants * .002;
    }

    calcRange() {
        this.power_range = Math.round(this.aim * this.soldiers.regular);
    }

    calcPositionX() {
        [this.positionX] = randPos.splice(Math.floor(Math.random() * randPos.length), 1);
    }

    addAim() {
        if (this.aim <= 0.25 || !this.aim) {
            this.aim = this.aim * this.structure_strength;
            this.aim += this.pwr_unit / 1000;
            // this.aim += Math.round(this.aim * 1000) / 1000; //why??
        }
    }

    setFocus() {
        let neighboursIndexes = [];
        for (const army of armies) {
            if (army.positionX == this.positionX + 1 || army.positionX == this.positionX - 1)
                neighboursIndexes.push(armies.indexOf(army));

        }
        if(!neighboursIndexes.length) this.focus = undefined; //why would it happened?
        else if (neighboursIndexes.length == 1) this.focus = armies[neighboursIndexes[0]].instance_no;
        else {
            this.focus = Math.round(Math.random()) ?
                ((armies[neighboursIndexes[0]].power_range > armies[neighboursIndexes[1]].power_range) ? armies[neighboursIndexes[0]].instance_no : armies[neighboursIndexes[1]].instance_no) :
                ((armies[neighboursIndexes[0]].soldiers.regular > armies[neighboursIndexes[1]].soldiers.regular) ? armies[neighboursIndexes[0]].instance_no : armies[neighboursIndexes[1]].instance_no)
        }
    }

    shoot() {

        // const getMgmHeads = (who,chance) => {
        //     console.log('FOKUS ERR__ '+this.focus);
        //     if(everyArmy[this.focus].soldiers[who]){
        //         everyArmy[this.focus].soldiers[who] = Math.floor(Math.random()*chance)?everyArmy[this.focus].soldiers[who]:who==='sergeants'?everyArmy[this.focus].soldiers[who]-Math.floor(Math.random()*Math.round(everyArmy[this.focus].soldiers[who]/10)):everyArmy[this.focus].soldiers[who]-1;
        //         if(!everyArmy[this.focus].soldiers[who]){
        //             console.log(`Army ${this.focus} have no more ${who}!!!`);

        //                 // if(who === 'general') {

        //                 //     if(this.soldiers.majors >= everyArmy[this.focus].soldiers.majors){}

        //                 // } else return false;
        //                 //try to submit? if(trySubmit()) {Submit()};

        //         }
        //     }

        // }
        // getMgmHeads('general',40);
        // getMgmHeads('majors',25);
        // getMgmHeads('captains',15);
        // getMgmHeads('lieutenants',10);
        // getMgmHeads('sergeants',1);

        for (let i = 0; i < armies.length; i++) {
            if (armies[i].instance_no == this.focus) {
                if (armies[i].soldiers.regular > this.power_range) {
                    armies[i].soldiers.regular -= this.power_range;
                    armies[i].bodies_aftermath.sld_lost = this.power_range;
                }
                else {
                    armies[i].bodies_aftermath.sld_lost = armies[i].soldiers.regular;
                    armies[i].soldiers.regular = 0;
                    armies[i].war_status = 'LOST';
                    armies[i].aim = 0;
                    armies[i].power_range = 0;
                    let tmp_inst_no = armies[i].instance_no;
                    loosers.push(armies.splice(i, 1));
                    console.log(loosers);
                    if (this.instance_no > tmp_inst_no) return 0; 
                }
            }
        }

    }

    promotions() {

        const promOnRounds = (who, higher_rank, rounds, amount) => {
            if (cnt % rounds === 0) {
                if (this.soldiers[who]) {
                    if (amount > this.soldiers[who]) {
                        amount = this.soldiers[who];
                        console.log(`No more ${who} after promotion`);
                    }
                    this.soldiers[who] = this.soldiers[who] - amount;
                    this.soldiers[higher_rank] = this.soldiers[higher_rank] + amount;
                    console.log(`${amount + ' ' + who} promoted to ${higher_rank}`);
                }

            }
        }

        promOnRounds('regular', 'sergeants', 7, 10);
        promOnRounds('sergeants', 'lieutenants', 11, 1);
        promOnRounds('lieutenants', 'captains', 13, 1);
        promOnRounds('captains', 'majors', 17, 1);

        const ifNoOne = (who, substitute, amount) => {
            if (!this.soldiers[who] && this.soldiers[substitute]) {
                if (amount > this.soldiers[substitute]) {
                    amount = this.soldiers[substitute];
                    console.log(`No more ${substitute} after promotion`);
                }
                this.soldiers[substitute] = this.soldiers[substitute] - amount;
                this.soldiers[who] = this.soldiers[who] + amount;
                console.log(`${amount + ' ' + substitute} promoted to ${who}`);
            }

        }

        ifNoOne('general', 'majors', 1);
        ifNoOne('majors', 'captains', 1);
        ifNoOne('captains', 'lieutenants', 3);
        ifNoOne('lieutenants', 'sergeants', 10);
        ifNoOne('sergeants', 'regular', 50);


    }

    desertion() {
        let deadsToWhole = Math.round((((this.bodies_aftermath.sld_lost * 100) / (this.soldiers.regular + 1)) / 100) * this.bodies_aftermath.sld_lost);
        this.bodies_aftermath.deserted = Math.round(deadsToWhole * (1 / this.structure_strength))
        this.soldiers.regular -= this.bodies_aftermath.deserted;
    }

    recruitment() {
        this.bodies_aftermath.recruited = Math.round((this.aim * 100) + Math.round(Math.random() * (this.pwr_unit * 10)) * (this.structure_strength));
        this.bodies_aftermath.recruited -= Math.round((((this.bodies_aftermath.deserted * 100) / (this.soldiers.regular + 1)) / 100) * this.bodies_aftermath.recruited);
        this.soldiers.regular += this.bodies_aftermath.recruited;
        // this.aim -= parseFloat(((((this.bodies_aftermath.recruited*100)/(this.soldiers.regular+1))/100)*this.aim).toFixed(3));
    }
}


const armies = [];
let randPos = [];
let loosers = [];

(function createArmies(amount) {
    for (let i = 0; i < amount; i++) {
        armies[i] = new Army();
        console.log(armies[i]);
    }
})(30);



const war = () => {

    let table_hd = document.getElementById('table_header');

    cnt++;

    for (let i = 0; i < armies.length; i++) {
        randPos[i] = i;
    }

    for (let i = 0; i < armies.length; i++) {
        armies[i].calcPositionX();
    }

    for (let i = 0; i < armies.length; i++) {


    }


    for (let i = 0; i < armies.length; i++) {

        if (armies[i].war_status === 'READY' && armies.length > 1) {

            armies[i].countPowerUnit();
            armies[i].calcRange();
            armies[i].setFocus();

            let table_html = `
            <tr>
            
                <th>${armies[i].name}</th>
                <td>${armies[i].soldiers.regular}</td>
                <td>${armies[i].bodies_aftermath.sld_lost}</td>
                <td>${armies[i].pwr_factors}</td>
                <td>${armies[i].pwr_unit}</td>
                <td>${(armies[i].aim * 100).toFixed(2)}%</td>
                <td>${armies[i].power_range}</td>
                <td>${armies[i].focus}</td>
                <td>${armies[i].positionX}</td>
                <td>${armies[i].war_status}</td>
            
            </tr>`;

            table_hd.insertAdjacentHTML('afterend', table_html);

            if (armies[i].shoot() === 0) i = i - 1;

            // armies[i].promotions();

            // armies[i].desertion();
            // armies[i].recruitment();

            armies[i].reCalcStructureStrength();
            armies[i].addAim();

            armies[i].reShiftPowerFactors();

        } else {
            console.log(armies[0].name+' won the war.');
            console.log(armies);
            clearInterval(rounds);
        }

    }

    table_hd.insertAdjacentHTML('afterend', `<tr colspan="11"  class="rounds_cnt">ROUND ${cnt - 1}<tr/>`);

}

const rounds = setInterval(war,1000);