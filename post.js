var width = 750,
    height = 1334;

var dots = [];
dots.push([0,0], [0, height], [width, 0], [width, height]);
for (var i = 0; i < 20; i++) {
    dots.push([Math.random() * width, Math.random() * height]);
}

var triangles = Delaunay.triangulate(dots);

var canvas = document.getElementById('triglici');
canvas.width = width;
canvas.height = height;

var ctx = canvas.getContext('2d');

for (var i = 0; i < triangles.length; i += 3) {
    ctx.beginPath();

    ctx.moveTo(dots[triangles[i]][0], dots[triangles[i]][1]);
    ctx.lineTo(dots[triangles[i + 1]][0], dots[triangles[i + 1]][1]);
    ctx.lineTo(dots[triangles[i + 2]][0], dots[triangles[i + 2]][1]);

    var c = 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ', 1)';

    ctx.closePath();
    ctx.fillStyle = c;
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = c;
    ctx.stroke();
    ctx.fill();
}

