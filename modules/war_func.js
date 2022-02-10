let cnt = 0;
let randPos = [];

const war = (armies) => {

    let table_hd = document.getElementById('table_header');

    cnt++;

    for (let i = 0; i < armies.length; i++) {
        randPos[i] = i;
    }

    for (let i = 0; i < armies.length; i++) {
        armies[i].calcPositionX(randPos);
    }

    for (let i = 0; i < armies.length; i++) {

            armies[i].countPowerUnit();
            armies[i].calcRange();
            armies[i].setFocus(armies);

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

    }


    for (let i = 0; i < armies.length; i++) {

        if (armies[i].war_status === 'READY' && armies.length > 1) {

            if (armies[i].shoot(armies) === 0) i = i - 1;

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

export default war;