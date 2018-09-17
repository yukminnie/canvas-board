var yyy = document.getElementById('xxx');

// 修改canvas的大小
var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight

yyy.width = pageWidth
yyy.height = pageHeight


// 防止拉伸页面改变
window.onresize = function(){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight

  yyy.width = pageWidth
  yyy.height = pageHeight
}

var content = yyy.getContext('2d');

// content.fillStyle = 'black';
// content.fillRect(10,10, 100, 100);

// 画圆
function drawCircle(x, y, radius){
  content.beginPath()
  content.arc(x, y, radius, 0, 180)
  // content.stroke()
  content.fill()
}

// 画线
function drawLine(x1, y1, x2, y2){
  content.beginPath();
  content.moveTo(x1, y1)
  content.lineWidth = 5
  content.lineTo(x2, y2)
  content.stroke()
  content.closePath()
}

var painting = false
var lastPoint = {x: undefined, y: undefined}

yyy.onmousedown = function(a){
  painting = true
  var x = a.clientX
  var y = a.clientY
  lastPoint = {'x': x, 'y': y}
  // drawCircle(x, y, 1)
  
}

yyy.onmousemove = function(a){
  if (painting){
      var x = a.clientX
      var y = a.clientY
      // drawCircle(x, y, 1)
      var newPoint = {'x': x, 'y': y}
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
  }else{

  }
}

yyy.onmouseup = function(b){
  painting = false
}