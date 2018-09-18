// 1，content 和 context，第一次出错系统运行正常 ？
// 2，button事件的绑定， class 的定位没有起作用
// 3，引号真的是乱糟糟

var board = document.getElementById('board');
var content = board.getContext('2d');
var log = console.log.bind(console)

autoSetCanvasSize(board)

listionToMouse(board)

// 设置尺寸
function setCanvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}

// 自动设置尺寸
function autoSetCanvasSize(canvas) {
    setCanvasSize(canvas)

    window.onresize = function() {
        setCanvasSize(canvas)
    }
}

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
    // content.lineWidth = 5
    content.lineTo(x2, y2)
    content.stroke()
    content.closePath()
}

// 开始画
function listionToMouse(canvas) {
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    // 根据特性来进行判断，而不是根据设备(针对同时支持触屏和鼠标的设备)
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function(a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (eraserEnabled) {
                using = true
                content.clearRect(x - 5, y - 5, 10, 10)
            } else {
                using = true
                lastPoint = {
                    'x': x,
                    'y': y
                }
                // drawCircle(x, y, 1)
            }
        }
        canvas.ontouchmove = function(a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (eraserEnabled) {
                if (using) {
                    content.clearRect(x - 5, y - 5, 10, 10)
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
        canvas.ontouchend = function(b) {
            using = false
        }
    } else {
        canvas.onmousedown = function(a) {
            var x = a.clientX
            var y = a.clientY
            if (eraserEnabled) {
                using = true
                content.clearRect(x - 5, y - 5, 10, 10)
            } else {
                using = true
                lastPoint = {
                    'x': x,
                    'y': y
                }
                // drawCircle(x, y, 1)
            }
        }

        canvas.onmousemove = function(a) {
            var x = a.clientX
            var y = a.clientY
            if (eraserEnabled) {
                if (using) {
                    content.clearRect(x - 5, y - 5, 10, 10)
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


        canvas.onmouseup = function(b) {
            using = false
        }
    }

}

// 橡皮擦状态
var eraserEnabled = false

// 切换开关
eraser.onclick = function() {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

pen.onclick = function() {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

black.onclick = function() {
    // content.fillStyle = 'red'
    content.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}

red.onclick = function() {
    // content.fillStyle = 'red'
    content.strokeStyle = 'red'
    red.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
}

blue.onclick = function() {
    content.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
}

green.onclick = function() {
    content.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}

thin.onclick = function() {
    thin.classList.add('active')
    thick.classList.remove('active')
    content.lineWidth = 5
}

thick.onclick = function() {
    thick.classList.add('active')
    thin.classList.remove('active')
    content.lineWidth = 10
}
