let counter = 0;

let obj1 = {label: 'one', soldiers: 0, aim: .001, focus: 'two', soldiers_lost: 0, deserted:0, recruited: 0, pozX: 0};
let obj2 = {label: 'two', soldiers: 0, aim: .001, focus: 'three', soldiers_lost: 0, deserted:0, recruited: 0, pozX: 0};
let obj3 = {label: 'three', soldiers: 0, aim: .001, focus: 'one', soldiers_lost: 0, deserted:0, recruited: 0, pozX: 0};

const objSoldiers = () => {
    return Math.ceil(Math.random()*1000)+500;
}

obj1.soldiers = objSoldiers();
obj2.soldiers = objSoldiers();
obj3.soldiers = objSoldiers();

const powerRange = (object) => {
    return parseFloat((object.soldiers*object.aim).toFixed(2));
}

obj1.power_range = powerRange(obj1); 
obj2.power_range = powerRange(obj2); 
obj3.power_range = powerRange(obj3);  

const objPowers = () => {
    return [Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10)];
}

let obj1Powers = objPowers();
let obj2Powers = objPowers();
let obj3Powers = objPowers();

function fc () {
    counter++;
    let soldiers1_tmp = obj1.soldiers, soldiers2_tmp = obj2.soldiers, soldiers3_tmp = obj3.soldiers;

    obj1.recentPowerUnit = Math.round(obj1Powers.reduce((acc,val)=>(acc+val)/2));
    obj2.recentPowerUnit = Math.round(obj2Powers.reduce((acc,val)=>(acc+val)/2));
    obj3.recentPowerUnit = Math.round(obj3Powers.reduce((acc,val)=>(acc+val)/2));

    obj1Powers.push(Math.round(Math.random()*10));
    obj2Powers.push(Math.round(Math.random()*10));
    obj3Powers.push(Math.round(Math.random()*10));

    obj1Powers.shift();
    obj2Powers.shift();
    obj3Powers.shift();

    obj1.aim +=obj1.recentPowerUnit/1000;
    obj2.aim +=obj2.recentPowerUnit/1000;
    obj3.aim +=obj3.recentPowerUnit/1000;

    obj1.power_range = powerRange(obj1); 
    obj2.power_range = powerRange(obj2); 
    obj3.power_range = powerRange(obj3); 

    obj1.focus= !desertion?(
                            (obj2.power_range>obj3.power_range)?'two':(obj2.power_range<obj3.power_range)?'three':obj1.focus
                        ):
                            (obj2.soldiers>obj3.soldiers)?'two':(obj2.soldiers<obj3.soldiers)?'three':obj1.focus

    obj2.focus= !desertion?(
                            (obj1.power_range>obj3.power_range)?'one':(obj1.power_range<obj3.power_range)?'three':obj2.focus
                        ):
                            (obj1.soldiers>obj3.soldiers)?'one':(obj1.soldiers<obj3.soldiers)?'three':obj2.focus

    obj3.focus= !desertion?(
                            (obj1.power_range>obj2.power_range)?'one':(obj1.power_range<obj2.power_range)?'two':obj3.focus
                        ):
                            (obj1.soldiers>obj2.soldiers)?'one':(obj1.soldiers<obj2.soldiers)?'two':obj3.focus


    obj1.soldiers -= (obj2.focus==='one' && obj3.focus==='one')?(obj2.power_range+obj3.power_range):(obj2.focus==='one')?obj2.power_range:(obj3.focus==='one')?obj3.power_range:Math.round(Math.random()*3);
    
    obj2.soldiers -= (obj1.focus==='two' && obj3.focus==='two')?(obj1.power_range+obj3.power_range):(obj1.focus==='two')?obj1.power_range:(obj3.focus==='two')?obj3.power_range:Math.round(Math.random()*3);

    obj3.soldiers -= (obj1.focus==='three' && obj2.focus==='three')?(obj1.power_range+obj2.power_range):(obj1.focus==='three')?obj1.power_range:(obj2.focus==='three')?obj2.power_range:Math.round(Math.random()*3);

    obj1.soldiers = Math.round(obj1.soldiers); 
    obj2.soldiers = Math.round(obj2.soldiers);
    obj3.soldiers = Math.round(obj3.soldiers);

    obj1.soldiers_lost = soldiers1_tmp-obj1.soldiers; 
    obj2.soldiers_lost = soldiers2_tmp-obj2.soldiers;  
    obj3.soldiers_lost = soldiers3_tmp-obj3.soldiers; 

    desertion(obj1); desertion(obj2); desertion(obj3);
    recruitment(obj1); recruitment(obj2); recruitment(obj3);
    
    console.log(counter);
    console.table({obj1,obj2,obj3});
    
    obj1.aim -=parseFloat(((((obj1.recruited*100)/obj1.soldiers)/100)*obj1.aim).toFixed(3)); //??
    obj2.aim -=parseFloat(((((obj2.recruited*100)/obj2.soldiers)/100)*obj2.aim).toFixed(3)); //??
    obj3.aim -=parseFloat(((((obj3.recruited*100)/obj3.soldiers)/100)*obj3.aim).toFixed(3)); //??

    // obj1.aim =parseFloat( 
    // obj2.aim =parseFloat(.toFixed(3)); 
    // obj3.aim =parseFloat(.toFixed(3)); 
    
    checkArmy(obj1); checkArmy(obj2); checkArmy(obj3);
}

const desertion = (object) => {
    object.deserted = Math.round((((object.soldiers_lost*100)/object.soldiers)/100)*object.soldiers_lost);
    object.soldiers-=object.deserted;
}

const recruitment = (object) => {
    object.recruited=Math.round(object.aim*1000)+Math.round(Math.random()*(object.recentPowerUnit));
    object.recruited-=Math.round((((object.deserted*100)/object.soldiers)/100)*object.recruited);
    object.soldiers+=object.recruited;
}

const checkArmy = (object) => {
        if(object.soldiers<=0) {
            console.log(`Army ${object.label} looses`);
            clearInterval(zeit);
        }
    }

console.table({obj1,obj2,obj3});
const zeit = setInterval( fc ,5000 );

