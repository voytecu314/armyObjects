let obj1 = {label: 'one', soldiers: 0, soldiers_lost: 0, aim: 0, focus: 'two', recruited: 0};
let obj2 = {label: 'two', soldiers: 0, soldiers_lost: 0, aim: 0, focus: 'three', recruited: 0};
let obj3 = {label: 'three', soldiers: 0, soldiers_lost: 0, aim: 0, focus: 'one', recruited: 0};

obj1.soldiers = Math.ceil(Math.random()*100)+50;
obj2.soldiers = Math.ceil(Math.random()*100)+50;
obj3.soldiers = Math.ceil(Math.random()*100)+50;

let obj1Powers = [Math.round(Math.random()*6),Math.round(Math.random()*6),Math.round(Math.random()*6)];
let obj2Powers = [Math.round(Math.random()*6),Math.round(Math.random()*6),Math.round(Math.random()*6)];
let obj3Powers = [Math.round(Math.random()*6),Math.round(Math.random()*6),Math.round(Math.random()*6)];

let obj1PowerUnit;
let obj2PowerUnit;
let obj3PowerUnit;

function fc () {
    let soldiers1_tmp = obj1.soldiers, soldiers2_tmp = obj2.soldiers, soldiers3_tmp = obj3.soldiers;

    obj1PowerUnit = Math.round(obj1Powers.reduce((acc,val)=>(acc+val)/2));
    obj2PowerUnit = Math.round(obj2Powers.reduce((acc,val)=>(acc+val)/2));
    obj3PowerUnit = Math.round(obj3Powers.reduce((acc,val)=>(acc+val)/2));

    obj1.power = obj1PowerUnit;
    obj2.power = obj2PowerUnit;
    obj3.power = obj3PowerUnit;


    obj1Powers.push(Math.round(Math.random()*6));
    obj2Powers.push(Math.round(Math.random()*6));
    obj3Powers.push(Math.round(Math.random()*6));

    obj1.aim +=obj1PowerUnit/100;
    obj2.aim +=obj2PowerUnit/100;
    obj3.aim +=obj3PowerUnit/100;

    obj1.focus= (obj2.soldiers*obj2.aim>obj3.soldiers*obj3.aim)?'two':(obj2.soldiers*obj2.aim<obj3.soldiers*obj3.aim)?'three':obj1.focus;

    obj2.focus= (obj1.soldiers*obj1.aim>obj3.soldiers*obj3.aim)?'one':(obj1.soldiers*obj1.aim<obj3.soldiers*obj3.aim)?'three':obj1.focus;

    obj3.focus= (obj1.soldiers*obj1.aim>obj2.soldiers*obj2.aim)?'one':(obj1.soldiers*obj1.aim<obj2.soldiers*obj2.aim)?'two':obj1.focus;


    obj1.soldiers -= (obj2.focus==='one' && obj3.focus==='one')?(obj2.soldiers*obj2.aim+obj3.soldiers*obj3.aim):(obj2.focus==='one')?obj2.soldiers*obj2.aim:(obj3.focus==='one')?obj3.soldiers*obj3.aim:0;
    
    obj2.soldiers -= (obj1.focus==='two' && obj3.focus==='two')?(obj1.soldiers*obj1.aim+obj3.soldiers*obj3.aim):(obj1.focus==='two')?obj1.soldiers*obj1.aim:(obj3.focus==='two')?obj3.soldiers*obj3.aim:0;

    obj3.soldiers -= (obj1.focus==='three' && obj2.focus==='three')?(obj1.soldiers*obj1.aim+obj2.soldiers*obj2.aim):(obj1.focus==='three')?obj1.soldiers*obj1.aim:(obj2.focus==='three')?obj2.soldiers*obj2.aim:0;

    obj1.soldiers = Math.round(obj1.soldiers); 
    obj2.soldiers = Math.round(obj2.soldiers);
    obj3.soldiers = Math.round(obj3.soldiers);

    obj1.soldiers_lost = soldiers1_tmp-obj1.soldiers; 
    obj2.soldiers_lost = soldiers2_tmp-obj2.soldiers;  
    obj3.soldiers_lost = soldiers3_tmp-obj3.soldiers; 

    recruitment(obj1); recruitment(obj2); recruitment(obj3);
    
    console.table({obj1,obj2,obj3});
    
    obj1.aim -=(2*obj1.recruited/100)*obj1.aim;
    obj2.aim -=(2*obj2.recruited/100)*obj2.aim;
    obj3.aim -=(2*obj3.recruited/100)*obj3.aim;
    
    checkArmy(obj1); checkArmy(obj2); checkArmy(obj3);
}

const recruitment = (object) => {
    object.recruited=Math.round(object.aim*10)+Math.round(Math.random()*(10));
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

