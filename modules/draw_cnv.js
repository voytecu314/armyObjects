let canvas = document.getElementById('cnv');
let ctx = canvas.getContext('2d');

function draw(armies) {
    
    // ctx.beginPath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    for(let i=0; i<armies.length; i++){
        ctx.beginPath()
        ctx.moveTo(armies[i].positionX*10+2, canvas.height);
        ctx.lineTo(armies[i].positionX*10+2, canvas.height-armies[i].soldiers.regular/10);
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath()
        ctx.moveTo(armies[i].positionX*10+2, canvas.height);
        ctx.lineTo(armies[i].positionX*10+2, canvas.height-armies[i].power_range/10);
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = "green";
        ctx.font = "7px Arial";
        ctx.fillText(`${armies[i].instance_no}`,armies[i].positionX*10-1, canvas.height-armies[i].soldiers.regular/10-4);
    }
   
}

export default draw;