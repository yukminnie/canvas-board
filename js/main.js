var yyy = document.getElementById('xxx');

// 修改canvas的大小
var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight

yyy.width = pageWidth
yyy.height = pageHeight


// 防止拉伸页面改变
window.onresize = function () {
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight

  yyy.width = pageWidth
  yyy.height = pageHeight
}

var content = yyy.getContext('2d');

// content.fillStyle = 'black';
// content.fillRect(10,10, 100, 100);

// 画圆
function drawCircle(x, y, radius) {
  content.beginPath()
  content.arc(x, y, radius, 0, 180)
  // content.stroke()
  content.fill()
}

// 画线
function drawLine(x1, y1, x2, y2) {
  content.beginPath();
  content.moveTo(x1, y1)
  content.lineWidth = 5
  content.lineTo(x2, y2)
  content.stroke()
  content.closePath()
}

var using = false
var lastPoint = {
  x: undefined,
  y: undefined
}

yyy.onmousedown = function (a) {
  var x = a.clientX
  var y = a.clientY
  if (eraserEnabled) {
    using = true
    context.clearRect(x-5, y-5, 10, 10)
  } else {
    using = true
    lastPoint = {
        'x': x,
        'y': y
  }
   // drawCircle(x, y, 1)
  }
}

yyy.onmousemove = function (a) {
    var x = a.clientX
    var y = a.clientY
    if (eraserEnabled) {
        if (using) {
            content.clearRect(x-5, y-5, 10, 10)
        }
    } else {
        if (using) {
            var newPoint = {
                'x': x,
                'y': y,
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            // drawCircle(x, y, 1)
            lastPoint = newPoint
        }
    }
}


yyy.onmouseup = function (b) {
  using = false
}

var eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = !eraserEnabled
  if (eraserEnabled) {
      eraser.textContent = '画笔'
  } else {
      eraser.textContent = '橡皮檫'
  }
}
