'use strict';

var canvas = document.querySelector('canvas'),
    cvs = canvas.getContext('2d');
var _width = canvas.width,
    _height = canvas.height,
    angle = Math.PI/180;
var hourOn = false
var hourBtn = document.getElementById("hour")
var minuteOn = true
var minuteBtn = document.getElementById("minute")
var hourDegree = 60
var minuteDegree = 120
hourBtn.onclick = function () {
    hourOn = true
    minuteOn = false
//    console.log("小时");
}

minuteBtn.onclick = function () {
    hourOn = false
    minuteOn = true
//    console.log("分钟")
}

function drawClock(_angle) {
    cvs.clearRect(0,0,_width,_height);
    cvs.save();
//绘制圆形
    cvs.beginPath();
    cvs.strokeStyle= '#000';
    cvs.strokeWidth= 2;
    cvs.arc(_width/2,_height/2,_width/2,0,360*angle,false);
    cvs.stroke();
    cvs.closePath();
//绘制刻度
    cvs.strokeStyle='#foo';
//    cvs.strokeWidth = 1;
    cvs.translate(_width/2,_height/2);
    for(var j=0; j<12; j++){
        cvs.lineWidth = 2
        cvs.save();
        cvs.rotate(30*angle*j);
        cvs.moveTo(0,-270);
        cvs.lineTo(0,-300);
        cvs.stroke();
        
        
        for(var i=1; i<=4; i++){
            cvs.lineWidth = 1
            cvs.save();
            cvs.rotate(angle*6*i);
            cvs.moveTo(0,-290);
            cvs.lineTo(0,-300);
            cvs.stroke();
            cvs.restore();
        }
        cvs.restore();
    }


    cvs.strokeStyle= '#f00';
    cvs.strokeWidth= 2;
//绘制指针
    
    if (hourOn){

        //时针
        rotateHour(_angle);
        rotateMinute(minuteDegree)
        console.log("assdasdaasdf");
    }
    if (minuteOn){
        //分针
        rotateHour(hourDegree)
        rotateMinute(_angle);
    }
    cvs.restore();
}

function rotateMinute(degree) {
    cvs.save();
    cvs.rotate(degree*angle);
    cvs.beginPath();
    cvs.strokeStyle = "red"
    cvs.lineWidth = 4
    cvs.moveTo(0,0);
    cvs.lineTo(0,-250);
    cvs.stroke();
    cvs.closePath();
    cvs.restore();
    minuteDegree = degree
    minuteBtn.innerHTML = "分钟：" + parseInt(degree/6)
}

function rotateHour(degree) {
    cvs.save();
    cvs.rotate(degree*angle);///12);
    cvs.beginPath();
    cvs.strokeStyle = "black"
    cvs.lineWidth = 8
    cvs.moveTo(0,0);
    cvs.lineTo(0,-180);
    cvs.stroke();
    cvs.closePath();
    cvs.restore();
    hourDegree = degree
    hourBtn.innerHTML = "小时：" + parseInt(degree/30)
}
//初始化钟表
drawClock(0);

//绘制扇形图
function drawSector(x, y, r, sdegree, edegree, color) {
    var single = Math.PI / 180;
    cvs.fillStyle = color;
    cvs.beginPath();
    cvs.moveTo(x, y);

    cvs.arc(x, y, r, sdegree * single, edegree * single, false);
    cvs.closePath();
    cvs.fill();
}



var offset = canvas.getBoundingClientRect();
var flag = false;
var startX,startY,moveX,moveY,shortSide,longSide;
canvas.addEventListener('mousedown',function (e) {
    flag = true;
    startX = e.clientX-offset.left -10;
    startY = e.clientY-offset.top -10;

    shortSide = startX-_width/2;
    longSide = _height/2-startY;

    var angle = Math.round(Math.atan2(shortSide,longSide)*180/Math.PI);

    if(angle<0){
        angle = 360+angle
    }
    console.log(angle);

    drawClock(angle);

//    drawSector(_width/2,_height/2,100,-90,angle-90,'#ccc');
});

canvas.addEventListener('mousemove',function (e) {
    if(!flag) return;

    moveX = e.clientX-offset.left-10;
    moveY = e.clientY-offset.top-10;

    shortSide = moveX-_width/2;
    longSide = _height/2-moveY;

    var angle = Math.round(Math.atan2(shortSide,longSide)*180/Math.PI);

    if(angle<0){
        angle = 360+angle
    }
    console.log(angle);
    drawClock(angle);
});

canvas.addEventListener('mouseup',function () {
    flag = false;
});

