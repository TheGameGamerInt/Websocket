let socket = new WebSocket('ws://'+ (window.location.href.slice(window.location.protocol.length+2)))

socket.onopen = (event) => {
    socket.send('new')
}


let canvas, ctx,
s = 5,
scale = 1,
size = 1000
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    canvas.width = size * scale
    canvas.height = size * scale
    w = canvas.width;
    h = canvas.height;

    canvas.onclick = (event) => {
        ctx.fillStyle = document.getElementById('col').value
        ctx.fillRect(event.offsetX - event.offsetX%s, event.offsetY - event.offsetY%s,s,s)
        socket.send(canvas.toDataURL())
    }
    
socket.onmessage = (msg) => {
    if (msg.data == 'empty') return;
    let img=new Image();
    img.onload=start;
    img.src=msg.data;
    function start(){
        ctx.drawImage(img,0,0);
    }
}