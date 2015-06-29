var colors = [];

var height = document.body.clientHeight;
var width = document.body.clientWidth;

var canvas = document.getElementById('triglici');
canvas.width = width;
canvas.height = height;

var ctx = canvas.getContext('2d');
var c = [];


function draw(triangles) {

    var count = 0;
    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < triangles.length; i += 3) {
        ctx.beginPath();

        ctx.moveTo(dots[triangles[i]][0], dots[triangles[i]][1]);
        ctx.lineTo(dots[triangles[i + 1]][0], dots[triangles[i + 1]][1]);
        ctx.lineTo(dots[triangles[i + 2]][0], dots[triangles[i + 2]][1]);
        ctx.closePath();

        var grd = ctx.createLinearGradient(dots[triangles[i]][0], dots[triangles[i]][1], dots[triangles[i + 1]][0], dots[triangles[i + 1]][1]);

        var c = color(count, triangles.length / 3);
        count++;
        ctx.fillStyle = c;
        ctx.lineWidth = 1;
        ctx.strokeStyle = c;
        ctx.stroke();
        ctx.fill();
    }

}


var dots = {};

/**
 * Create dots in concentric circles
 * @param  {[type]} no       number of concentric circles
 * @param  {[type]} steps    number of steps for each circles
 * @param  {[type]} distance distance between each circle (will ignore no)
 * @return {[type]}          [description]
 */
dots.circles = function(no, steps, distance) {

    var dots = [],
        centerX = width / 2,
        centerY = height / 2,
        radius = height / no / 2,
        currentRadius = radius,
        step = steps || 20;

    if (distance) {
        radius = distance;
        currentRadius = radius;
    }

    dots[0] = [centerX, centerY];

    while (currentRadius < Math.sqrt(centerY * centerY + centerX * centerX) + radius) {
        for (var i = 0; i < step; i++) {
            dots.push([centerX + currentRadius * Math.cos(2 * Math.PI * i / step), centerY + currentRadius * Math.sin(2 * Math.PI * i / step)]);
        }
        currentRadius += radius;
    }

    return dots;

};


/**
 * Create random dots
 * @param  {[type]} no number of dots
 * @return {[type]}    [description]
 */
dots.random = function(no) {
    var dots = [
        [0, 0],
        [0, height],
        [width, 0],
        [width, height]
    ]; // corner dots

    for (var i = 0; i < no / 20; i++) {
        dots.push([0, Math.random() * height]);
        dots.push([Math.random() * width, height]);
        dots.push([width, Math.random() * height]);
        dots.push([Math.random() * width, 0]);

    }

    for (var i = 0; i < no - no / 20; i++) {
        dots.push([Math.random() * width, Math.random() * height]);
    }

    return dots;

};

dots.realRandom = function(no) {

    var dots = [];

    for (var i = 0; i < no; i++) {
        dots.push([Math.random() * width, Math.random() * height]);
    }

    return dots;
};


/**
 * Reactangles dots
 * @param  {[type]} noX [description]
 * @param  {[type]} noY [description]
 * @return {[type]}     [description]
 */
dots.rectangles = function(noX, noY) {

    var dots = [],
        w = width / noY,
        h = height / noX;

    for (var i = 0; i <= noY; i++) {
        for (var j = 0; j <= noX; j++) {
            dots.push([w * i, h * j]);
        }
    }

    return dots;

};


/**
 * Put dots in spira;
 * @param  {[type]} no     [description]
 * @param  {[type]} factor [description]
 * @return {[type]}        [description]
 */
dots.spiral = function(no, factor) {

    var dots = [];

    no = no || 1000;
    factor = factor || 1;

    for (i = 0; i < no; i++) {
        angle = factor * i;
        x = (20 + angle) * Math.cos(angle);
        y = (40 + angle) * Math.sin(angle);
        dots.push([x + width / 2, y + height / 2]);
    }

    return dots;

};


/**
 * arrows
 * @param  {[type]} noX [description]
 * @param  {[type]} noY [description]
 * @return {[type]}     [description]
 */
dots.arrows = function(noX, noY) {

    var dots = [],
        w = width / noY,
        h = height / noX,
        move = 0;


    for (var i = 0; i <= noY; i++) {
        for (var j = 0; j <= noX; j++) {
            move = i % 2 === 0 ? 0 : h / 2;

            dots.push([w * i, h * j + move]);
        }
    }

    return dots;

};




function color(i, len) {

    return colors.gradient(i, len);

}


var colors = {
    frequency: 999,
    start: {
        r: 15,
        g: 105,
        b: 105
    },
    end: {
        r: 100,
        g: 100,
        b: 100
    }
};


colors.randomStart = function () {
    colors.start = {
        r: parseInt(Math.random() * 255),
        g: parseInt(Math.random() * 255),
        b: parseInt(Math.random() * 255)
    };
};

colors.randomStart();

colors.coscossin = function(i, len) {

    var frequency = this.frequency,
        r = Math.cos(frequency * i + 0) * colors.start.r + colors.end.r,
        g = Math.cos(frequency * i + 2) * colors.start.g + colors.end.g,
        b = Math.sin(frequency * i + 4) * colors.start.b + colors.end.b;

    var c = 'rgba(' + parseInt(r) + ',' + parseInt(g) + ',' + parseInt(b) + ',' + 1 + ')';

    return c;
};

colors.random = function(i, len) {

    var c = 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ', 1)';

    return c;
};

colors.randomOpacity = function(i, len) {

    var c = 'rgba(' + this.start.r + ',' + this.start.g + ',' + this.start.b + ',' + Math.random() + ')';

    return c;
};

colors.array = function(i, len) {
    var colors = ['rgb(255,245,240)', 'rgb(254,224,210)', 'rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(239,59,44)', 'rgb(203,24,29)', 'rgb(165,15,21)', 'rgb(103,0,13)'],
        colors = ['rgb(255,255,217)', 'rgb(237,248,177)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(29,145,192)', 'rgb(34,94,168)', 'rgb(37,52,148)', 'rgb(8,29,88)'];
    //colors = ['rgb(140,81,10)','rgb(191,129,45)','rgb(223,194,125)','rgb(246,232,195)','rgb(245,245,245)','rgb(199,234,229)','rgb(128,205,193)','rgb(53,151,143)','rgb(1,102,94)'],
    //colors = ['rgb(178,24,43)','rgb(214,96,77)','rgb(244,165,130)','rgb(253,219,199)','rgb(255,255,255)','rgb(224,224,224)','rgb(186,186,186)','rgb(135,135,135)','rgb(77,77,77)'],
    //colors = ['rgb(255,247,243)', 'rgb(253,224,221)', 'rgb(252,197,192)', 'rgb(250,159,181)', 'rgb(247,104,161)', 'rgb(221,52,151)', 'rgb(174,1,126)', 'rgb(122,1,119)', 'rgb(73,0,106)'];
    colors = ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"];

    return colors[i % colors.length];
};

var r = colors.start.r,
    g = colors.start.g,
    b = colors.start.b,
    direction = 15;

colors.gradient = function(i, len) {

    if (r < 0 || g < 0 || b < 0 || r > 254 || g > 245 || b > 254) {
        direction *= -1;
    }

    r += direction;
    g += direction;
    b += direction;

    var c = 'rgba(' + r + ',' + g + ',' + b + ', 1)';

    return c;
};




//var dots = dots.circles(15, 50);
//var dots = rectangles(5, 10);
//var dots = dots.spiral(1200);
//var dots = dots.arrows(10, 25);
//var dots = dots.random(500);
var dots = dots.random(Math.random() * 3 + 30);

// setInterval( function () {
// for (var i = 0; i < dots.length; i++) {
//     dots[i][0]+= (Math.random() * 2) - 1;
//     dots[i][1]+= (Math.random() * 2) - 1;
// }



// for (var i = 0; i < steps; i++) {
//     xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
//     yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
// }


var triangles = Delaunay.triangulate(dots);

draw(triangles);

// }, 30);