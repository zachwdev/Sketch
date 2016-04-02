/********** Controls **********/

var canvas = document.getElementById("mainCanvas"),
    btnClear = document.getElementById("btnClear"),
    btnSave = document.getElementById("btnSave"),
    btnLoad = document.getElementById("btnLoad"),
    colorInput = document.getElementById('colorInput'),
    sizeInput = document.getElementById('sizeInput');

var color = colorInput.value;
var size = sizeInput.value;

btnClear.addEventListener("click", function () {
    canvas.width = canvas.width;
});

btnSave.addEventListener("click", function () {
    saveCanvas();
});

btnLoad.addEventListener("click", function () {
    loadCanvas();
});

colorInput.addEventListener("input", function(){
    return color = colorInput.value;
});

sizeInput.addEventListener("input", function(){
    return size = sizeInput.value;
})

document.body.addEventListener("DOMContentLoaded", loadCanvas(), false);

/********* Drawing Functionality **********/

var canvas = document.getElementById('mainCanvas'),
    ctx = canvas.getContext('2d'),
    drawing;

function getMousePos(canvas, e) {

    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}


canvas.addEventListener("mousedown", function (e) {
    var pos = getMousePos(this, e),
        x = pos.x,
        y = pos.y;

    drawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
    
});

canvas.addEventListener("mousemove", function (e) {
    var pos = getMousePos(this, e),
        x = pos.x,
        y = pos.y;

    if (drawing) {
        marker(x,y);
    }
});

canvas.addEventListener("mouseup", function (e) {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener("mouseout", function (e){
    drawing = false;
    ctx.closePath();
})

/********** Brushes **********/

function marker(x,y) {
    ctx.lineWidth = size;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#FFFFFF";
    ctx.shadowBlur = (size / 3);
    ctx.shadowColor = color;
    ctx.stroke();
    //makes cool start shape ctx.closePath();
}

/********** Local Storage **********/

function saveCanvas() {
    var dataUrl = canvas.toDataURL();
    localStorage.setItem("canvas", dataUrl);

}

function loadCanvas() {
    var dataURL = localStorage.getItem("canvas");
    var img = new Image;
    img.src = dataURL;
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    };
    console.log("Canvas Loaded")
}