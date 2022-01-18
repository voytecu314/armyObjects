let obj1 = {label: 'one', soldiers: 0, soldiers_lost: 0, aim: 0, focus: 'two', recruited: undefined};
let obj2 = {label: 'two', soldiers: 0, soldiers_lost: 0, aim: 0, focus: 'three', recruited: undefined};
let obj3 = {label: 'three', soldiers: 0, soldiers_lost: 0, aim: 0, focus: 'one', recruited: undefined};

obj1.soldiers = Math.ceil(Math.random()*100)+50;
obj2.soldiers = Math.ceil(Math.random()*100)+50;
obj3.soldiers = Math.ceil(Math.random()*100)+50;

function fc () {
    let soldiers1_tmp = obj1.soldiers, soldiers2_tmp = obj2.soldiers, soldiers3_tmp = obj3.soldiers;

    obj1Power = Math.ceil(Math.random()*5);
    obj2Power = Math.ceil(Math.random()*5);
    obj3Power = Math.ceil(Math.random()*5);

    obj1.aim = (obj1.aim+obj1Power/100);
    obj2.aim = (obj2.aim+obj2Power/100);
    obj3.aim = (obj3.aim+obj3Power/100);

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
    checkArmy(obj1); checkArmy(obj2); checkArmy(obj3);
}

const recruitment = (object) => {
    object.recruited=Math.round(object.aim*10)+Math.round(Math.random()*10);
    object.soldiers+=object.recruited;
}

const checkArmy = (object) => {
        if(object.soldiers<=0) {
            console.log(`Army ${object.label} looses`);
            clearInterval(zeit);
        }
    }

console.table({obj1,obj2,obj3});
const zeit = setInterval( fc ,4000 );

