/********** Controls **********/

var canvas = document.getElementById('mainCanvas'),
    btnClear = document.getElementById('btnClear'),
    btnSave = document.getElementById('btnSave'),
    btnLoad = document.getElementById('btnLoad'),
    colorInput = document.getElementById('colorInput'),
    sizeInput = document.getElementById('sizeInput'),
    outlineInput = document.getElementById('outlineInput'),
    middlePointInput = document.getElementById('middlePointInput'),
    brushCanvas1 = document.getElementById('brushCanvas1'),
    brushCanvas2 = document.getElementById('brushCanvas2'),
    brushCanvas3 = document.getElementById('brushCanvas3'),
    brushCanvas4 = document.getElementById('brushCanvas4'),
    btnUndo = document.getElementById('btnUndo'),
    btnRedo = document.getElementById('btnRedo');

var color = colorInput.value;
var size = sizeInput.value;
var outline = outlineInput.checked;
var middlePoint = middlePointInput.checked;


btnClear.addEventListener("click", function () {
    canvas.width = canvas.width;
});

btnSave.addEventListener("click", function () {
    saveCanvas();
});

btnLoad.addEventListener("click", function () {
    loadCanvas();
});

btnUndo.addEventListener("click", function () {
    undoCanvasState();
});

btnRedo.addEventListener("click", function () {
    redoCanvasState();
});

colorInput.addEventListener("input", function () {
    return color = colorInput.value;
});

sizeInput.addEventListener("input", function () {
    return size = sizeInput.value;
});

outlineInput.addEventListener("click", function () {
    return outline = outlineInput.checked;
});

middlePointInput.addEventListener("click", function () {
    return middlePoint = middlePointInput.checked;
});

function loadBrushCanvas() {
    brushCanvasCtx = brushCanvas1.getContext('2d');
    brushCanvasCtx.beginPath();
    brushCanvasCtx.lineWidth = 10;
    brushCanvasCtx.shadowBlur = (10 / 3);
    brushCanvasCtx.shadowColor = 'F000000';
    brushCanvasCtx.lineJoin = brushCanvasCtx.lineCap = 'round';
    brushCanvasCtx.moveTo(10, 35);
    brushCanvasCtx.lineTo(290, 35);
    brushCanvasCtx.stroke();

    brushCanvasCtx = brushCanvas2.getContext('2d');
}



document.body.addEventListener("DOMContentLoaded", loadCanvas(), false);

/********* Drawing Functionality **********/



var canvas = document.getElementById('mainCanvas'),
    ctx = canvas.getContext('2d'),
    pointsArray = [],
    drawing;

/** undo redo **/
var canvasStateArray = [],
    canvasStateCount = -1;

function pushCanvasState() {
    canvasStateCount++;
    if (canvasStateCount < canvasStateArray.length) {
        canvasStateArray.length = canvasStateCount
    }
    canvasStateArray.push(canvas.toDataURL());
}

function undoCanvasState() {
    if (canvasStateCount > 0) {
        canvasStateCount--;
        var canvasSnap = new Image();
        canvasSnap.src = canvasStateArray[canvasStateCount];
        canvasSnap.onload = function () {
            canvas.width = canvas.width;
            ctx.drawImage(canvasSnap, 0, 0);
            console.log(canvasSnap);
        }
    }
}

function redoCanvasState() {
    if (canvasStateCount < canvasStateArray.length - 1) {
        canvasStateCount++;
        var canvasSnap = new Image();
        canvasSnap.src = canvasStateArray[canvasStateCount];
        canvasSnap.onload = function () {
            ctx.drawImage(canvasSnap, 0, 0);
        }

    }
}

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
    pointsArray.push({
        x: x,
        y: y
    });
    if (canvasStateArray.length === 0) {
        pushCanvasState();
    }
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);

});

canvas.addEventListener("mousemove", function (e) {
    var pos = getMousePos(this, e),
        x = pos.x,
        y = pos.y;

    if (drawing) {

        pointsArray.push({
            x: x,
            y: y
        });

        ctx.beginPath();
        ctx.moveTo(pointsArray[0].x, pointsArray[0].y);
        for (var i = 1; i < pointsArray.length; i++) {
            ctx.lineTo(pointsArray[i].x, pointsArray[i].y);
        }
        ctx.stroke();
    };
});

canvas.addEventListener("mouseup", function (e) {
    drawing = false;
    ctx.closePath();
    pushCanvasState();
    pointsArray.length = 0;
});

canvas.addEventListener("mouseout", function (e) {
    if (drawing) {
        drawing = false;
        ctx.closePath();
        pushCanvasState();
        pointsArray.length = 0;
    }
});

/********** Mobile Implementaion *********/

canvas.addEventListener("touchstart", function (e) {
    var pos = getMousePos(this, e),
        x = pos.x,
        y = pos.y;

    drawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);

});

canvas.addEventListener("touchmove", function (e) {
    var pos = getMousePos(this, e),
        x = pos.x,
        y = pos.y;

    if (drawing) {
        marker(x, y);
    }
});

canvas.addEventListener("touchend", function (e) {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener("touchleave", function (e) {
    drawing = false;
    ctx.closePath();
})

/********** Mobile Implimentation **********/
canvas.addEventListener("touchstart", function (e) {
    var pos = getMousePos(this, e),
        x = pos.x,
        y = pos.y;

    drawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);

});

canvas.addEventListener("touchmove", function (e) {
    var pos = getMousePos(this, e),
        x = pos.x,
        y = pos.y;

    if (drawing) {
        marker(x, y);
    }
});

canvas.addEventListener("touchend", function (e) {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener("touchleave", function (e) {
    drawing = false;
    ctx.closePath();
})

/********** Brushes **********/

function marker(x, y) {
    ctx.lineWidth = size;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    if (outline) {
        ctx.strokeStyle = '#FFFFFF';
    } else {
        ctx.strokeStyle = color;
    }

    ctx.shadowBlur = (size / 3);
    ctx.shadowColor = color;
    ctx.stroke();
    if (middlePoint) {
        ctx.closePath();
    }
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
        canvas.width = canvas.width;
        ctx.drawImage(img, 0, 0);
    };
    loadBrushCanvas();
}