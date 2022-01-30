let tarray = [
    {
        t_key1: 't_value1',
        t_keyA: 't_valueB'
    },
    {
        t_key2: 't_value2',
        t_keyB: 't_valueB'
    },
    {
        t_key3: 't_value3',
        t_keyC: 't_valueC'
    },
    {
        t_key4: 't_value4',
        t_keyD: 't_valueD'
    }
];

let srarray=[
    {
        s_key1: 's_value1',
        s_keyA: 's_valueB'
    },
    {
        s_key2: 's_value2',
        s_keyB: 's_valueB'
    },
    {
        s_key3: 's_value3',
        s_keyC: 's_valueC'
    },
    {
        s_key4: 's_value4',
        s_keyD: 's_valueD'
    }
];
concatarra = srarray.concat(tarray);

srarray[0].s_key1='I was here';

console.dir(concatarra);
console.log(srarray);