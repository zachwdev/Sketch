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

    ctx.lineWidth = 6;
    ctx.lineJoin = ctx.lineCap = 'round';
    drawing = true;
    ctx.moveTo(x, y);
});

canvas.addEventListener("mousemove", function (e) {
    var pos = getMousePos(this, e),
        x = pos.x,
        y = pos.y;

    if (drawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup", function (e) {
    drawing = false;
});


/********** Controls **********/

var btnClear = document.getElementById("btnClear"),
    btnSave = document.getElementById("btnSave"),
    btnLoad = document.getElementById("btnLoad");

btnClear.addEventListener("click", function (e) {
    canvas.width = canvas.width;
});

btnSave.addEventListener("click", function (e) {
    saveCanvas();
});

btnLoad.addEventListener("click", function(e){
   loadCanvas(); 
});


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