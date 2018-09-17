var yyy = document.getElementById('xxx');

var content = yyy.getContext('2d');

// content.fillStyle = 'black';
// content.fillRect(10,10, 100, 100);

function drawCircle(x, y, radius){
  content.beginPath()
  content.arc(x, y, radius, 0, 180)
  content.stroke()
}

var painting = false

yyy.onmousedown = function(a){
  painting = true
  var x = a.clientX
  var y = a.clientY
  drawCircle(x, y, 5)
}

yyy.onmousemove = function(a){
  if (painting){
      var x = a.clientX
      var y = a.clientY
      drawCircle(x, y, 5)
  }else{

  }
}

yyy.onmouseup = function(b){
  painting = false
}