
const canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    toolsBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector(".size-slider"),
    colorBtns = document.querySelectorAll(".colors .first"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvas = document.querySelector(".clear");
    console.log(canvas);
    console.log(ctx);



let prevMouseX, prevMouseY, snapshot;
let isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;
let selectedColor = "#000000";

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});
// console.log(e);
const drawRect = (e) => {
    const rectWidth = e.offsetX - prevMouseX;
    const rectHeight = e.offsetY - prevMouseY;

    ctx.beginPath(); // Start a new path

    if (!fillColor.checked) {
        ctx.strokeRect(prevMouseX, prevMouseY, rectWidth, rectHeight);
    } else {
        ctx.fillRect(prevMouseX, prevMouseY, rectWidth, rectHeight);
    }
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY); // First line according to mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // Bottom line of the triangle
    ctx.closePath(); // Close the path to complete the triangle
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawCircle = (e) => {
    ctx.beginPath();
    const radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawPentagon = (e) => {
    const centerX = (prevMouseX + e.offsetX) / 2;
    const centerY = (prevMouseY + e.offsetY) / 2;
    const radius = Math.min(Math.abs(e.offsetX - prevMouseX), Math.abs(e.offsetY - prevMouseY)) / 2;

    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDrawing = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// const Drawing = (e) => {
//     if (!isDrawing) return;

//     ctx.putImageData(snapshot, 0, 0);

//     if (selectedTool === "brush" || selectedTool === "eraser") {
//         ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
//         ctx.lineTo(e.offsetX, e.offsetY);
//         ctx.stroke();
//     } else if (selectedTool === "rectangle") {
//         drawRect(e);
//     } else if (selectedTool === "circle") {
//         drawCircle(e);
//     } else if (selectedTool === "triangle") {
//         drawTriangle(e);
//     } else if (selectedTool === "pentagon") {
//         drawPentagon(e);
//     }
// }

toolsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

sizeSlider.addEventListener("change", () => {
    brushWidth = sizeSlider.value;
});

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".colors .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click",()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
let savimg = document.querySelector(".saveimg");
savimg.addEventListener("click",()=>{
    const link = document.createElement("a");
    link.download =`${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
})
const Drawing = (e) => {
    console.log("offSetX---"+e.offsetX);
    console.log("offSetY---"+e.offsetY);
    if (!isDrawing) return;

    ctx.putImageData(snapshot, 0, 0);

    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else if (selectedTool === "triangle") {
        drawTriangle(e);
    } else if (selectedTool === "pentagon") {
        drawPentagon(e);
    }
}
canvas.addEventListener("mousemove", Drawing);

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", () => { isDrawing = false; ctx.beginPath(); });


// let box = document.getElementsByClassName('box')[0];
// document.addEventListener("mousemove",function(e){

//     if(flipped == true){
        
//     }
//     box.style.display="block";
//     box.style.left =e.pageX + "px";
//     box.style.right =e.pageX +"px";
//     box.style.top=e.pageY +"px";
//     box.style.bottom =e.pageY+"px";
//     box.style.cursor ="pointer"

// })