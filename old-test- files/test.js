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
        regular: Math.ceil(Math.random()*1000)+500
    };
    
    bodies_aftermath = {
        sld_lost: 0,
        deserted: 0,
        recruited: 0
    };

    war_status = 'READY';

    aim = parseFloat((Math.random()/10).toFixed(3));

    pwr_factors = [Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10)];
    
    countPowerUnit() {
        this.pwr_unit = Math.round(this.pwr_factors.reduce((acc,val)=>(acc+val)/2));
    }

    reShiftPowerFactors() {
        this.pwr_factors.push(Math.round(Math.random()*10));
        this.pwr_factors.shift();
    }

    reCalcStructureStrength() {
        this.structure_strength = this.soldiers.general*.4+this.soldiers.majors*.25+this.soldiers.captains*.05+this.soldiers.lieutenants*.01+this.soldiers.sergeants*.002; 
    }

    calcRange() {
        this.power_range = Math.round(this.aim*this.soldiers.regular);
    }

    addAim() {
        if(this.aim <= 0.15)
        {
            this.aim = this.aim*this.structure_strength;
            this.aim += this.pwr_unit/1000;
            this.aim += Math.round(this.aim*1000)/1000; //why??
        }
    }

    setFocus() {
        let myPosition = allPositions.indexOf(this.instance_no);
        console.log(`Ìs this ${allPositions[myPosition]===this.instance_no} ?`);
        let neighbours = [allPositions[myPosition-1],allPositions[myPosition+1]]; 
        let [left,right] = neighbours;
        if(left===undefined || right===undefined){
            this.focus = left===undefined?right:left;
        } 
        else {
            this.focus = Math.round(Math.random())?(
                (everyArmy[left].power_range>everyArmy[right].power_range)?left:right
            ):
                (everyArmy[left].soldiers.regular>everyArmy[right].soldiers.regular)?left:right
        } 
        console.log('FOCUS? '+this.focus+ 'left:'+left+', right:'+right+'-- MY POS: ___'+myPosition);
       
    }

    shoot() {
       
        const getMgmHeads = (who,chance) => {
            console.log('FOKUS ERR__ '+this.focus);
            if(everyArmy[this.focus].soldiers[who]){
                everyArmy[this.focus].soldiers[who] = Math.floor(Math.random()*chance)?everyArmy[this.focus].soldiers[who]:who==='sergeants'?everyArmy[this.focus].soldiers[who]-Math.floor(Math.random()*Math.round(everyArmy[this.focus].soldiers[who]/10)):everyArmy[this.focus].soldiers[who]-1;
                if(!everyArmy[this.focus].soldiers[who]){
                    console.log(`Army ${this.focus} have no more ${who}!!!`);
                   
                        // if(who === 'general') {

                        //     if(this.soldiers.majors >= everyArmy[this.focus].soldiers.majors){}

                        // } else return false;
                        //try to submit? if(trySubmit()) {Submit()};
                    
                }
            }
            
        }
        getMgmHeads('general',40);
        getMgmHeads('majors',25);
        getMgmHeads('captains',15);
        getMgmHeads('lieutenants',10);
        getMgmHeads('sergeants',1);

        if(everyArmy[this.focus].soldiers.regular > this.power_range){ 
            everyArmy[this.focus].soldiers.regular -= this.power_range;
            everyArmy[this.focus].bodies_aftermath.sld_lost = this.power_range;
            return 0;
        } 
        else {
            everyArmy[this.focus].bodies_aftermath.sld_lost = everyArmy[this.focus].soldiers.regular;
            everyArmy[this.focus].soldiers.regular=0;
            console.log(`${everyArmy[this.focus].name} LOST`);
            everyArmy[this.focus].war_status = 'LOST';
            let [defeated_army] = everyArmy.splice(this.focus,1);
            let [defeated_army_position] = allPositions.splice(allPositions.indexOf(this.focus),1);
            defeated_army_position = undefined;
            defeated.push(defeated_army);
            defeatedPositions.push(defeated_army_position);
            return this.focus>everyArmy.indexOf(this)?1:0;
        }

    }

    promotions() {

        const promOnRounds = (who, higher_rank, rounds, amount) => {
            if(cnt%rounds===0) {
                if(this.soldiers[who]){ 
                    if(amount>this.soldiers[who]){ 
                        amount = this.soldiers[who];
                        console.log(`No more ${who} after promotion`); 
                    }
                    this.soldiers[who] = this.soldiers[who]-amount;
                    this.soldiers[higher_rank] = this.soldiers[higher_rank]+amount;
                    console.log(`${amount + ' ' + who} promoted to ${higher_rank}`);
                }
               
            }
        }

        promOnRounds('regular','sergeants',7,10);
        promOnRounds('sergeants','lieutenants',11,1);
        promOnRounds('lieutenants','captains',13,1);
        promOnRounds('captains','majors',17,1);

        const ifNoOne = (who, substitute, amount) => {
            if(!this.soldiers[who] && this.soldiers[substitute]){
                if(amount>this.soldiers[substitute]){ 
                    amount = this.soldiers[substitute];
                    console.log(`No more ${substitute} after promotion`); 
                }
                this.soldiers[substitute] = this.soldiers[substitute]-amount;
                this.soldiers[who] = this.soldiers[who]+amount;
                console.log(`${amount + ' ' + substitute} promoted to ${who}`); 
            }
            
        }

        ifNoOne('general','majors',1);
        ifNoOne('majors','captains',1);
        ifNoOne('captains','lieutenants',3);
        ifNoOne('lieutenants','sergeants',10);
        ifNoOne('sergeants','regular',50);


    }

    desertion() {
        let deadsToWhole = Math.round((((this.bodies_aftermath.sld_lost*100)/(this.soldiers.regular+1))/100)*this.bodies_aftermath.sld_lost);
        this.bodies_aftermath.deserted = Math.round(deadsToWhole*(1/this.structure_strength))
        this.soldiers.regular -= this.bodies_aftermath.deserted;
    }

    recruitment () {
        this.bodies_aftermath.recruited=Math.round((this.aim*100)+Math.round(Math.random()*(this.pwr_unit*10))*(this.structure_strength));
        this.bodies_aftermath.recruited-=Math.round((((this.bodies_aftermath.deserted*100)/(this.soldiers.regular+1))/100)*this.bodies_aftermath.recruited);
        this.soldiers.regular += this.bodies_aftermath.recruited;
        // this.aim -= parseFloat(((((this.bodies_aftermath.recruited*100)/(this.soldiers.regular+1))/100)*this.aim).toFixed(3));
    }
}


const armies = [], corespondingPositionsIn1D = [], defeated = []; defeatedPositions = [];

(function createArmies(amount){
    for(let i=0; i<amount; i++) {
        armies[i]=new Army();
        corespondingPositionsIn1D[i]=armies[i].instance_no;
    }
})(5);

    let everyArmy = defeated.concat(armies);
    let allPositions = defeatedPositions.concat(corespondingPositionsIn1D);


const war = () => { 

    for(i=0; i<everyArmy.length;i++) {
        console.log(`Army: | Sldrs: | Status: | Aim:            | Range: | Focus:`);
        console.log(`${everyArmy[i].name} | ${everyArmy[i].soldiers.regular}: | ${everyArmy[i].war_status}: | ${everyArmy[i].aim}:            | ${everyArmy[i].power_range}: | ${everyArmy[i].focus}`);
    }
    
    cnt++;

    corespondingPositionsIn1D.sort(() => (Math.random() > .5) ? 1 : -1).reverse();
    
    for(let i=defeated.length; i<everyArmy.length; i++) {

        

        if(everyArmy[i].war_status === 'READY') {

            everyArmy[i].countPowerUnit();
            everyArmy[i].calcRange();
            
            everyArmy[i].setFocus();

            i += everyArmy[i].shoot();

            everyArmy = defeated.concat(armies);
            allPositions = defeatedPositions.concat(corespondingPositionsIn1D);

            everyArmy[i].promotions();

            if(everyArmy.length==1) {console.log(everyArmy[i].name + 'WON THE WAR'); break}
            
            console.log(everyArmy[i].aim, everyArmy[i].soldiers.regular, everyArmy[i].power_range);
            everyArmy[i].desertion();
            everyArmy[i].recruitment();

            everyArmy[i].reCalcStructureStrength();
            everyArmy[i].addAim(); 

            everyArmy[i].reShiftPowerFactors();

        }

    }
    
}

setInterval(war,1000);