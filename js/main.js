var board = document.getElementById('board');
var content = board.getContext('2d');

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
    content.lineWidth = 5
    content.lineTo(x2, y2)
    content.stroke()
    content.closePath()
}

// 开始画
function listionToMouse() {
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    board.onmousedown = function(a) {
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

    board.onmousemove = function(a) {
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


    board.onmouseup = function(b) {
        using = false
    }
}

// 橡皮擦状态
var eraserEnabled = false

// 切换开关
eraser.onclick = function() {
    eraserEnabled = !eraserEnabled
    if (eraserEnabled) {
        eraser.textContent = '画笔'
    } else {
        eraser.textContent = '橡皮檫'
    }
}
