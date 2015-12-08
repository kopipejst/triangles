var dots = {};

/**
 * Create random dots
 * @param  {[type]} no     [description]
 * @param  {[type]} width  [description]
 * @param  {[type]} height [description]
 * @return {[type]}        [description]
 */
dots.random = function (no, width, height) {
    var dots = [];

    for (var i = 0; i < no; i++) {
        dots.push([Math.random() * width, Math.random() * height]);
    }

    return dots;

};

/**
 * Add random dots on edges to make full screen
 * @param  {[type]} no     [description]
 * @param  {[type]} edges  [description]
 * @param  {[type]} width  [description]
 * @param  {[type]} height [description]
 * @return {[type]}        [description]
 */
dots.randomFullScreen = function(no, edges, width, height) {

    var dots = [
        [0, 0],
        [0, height],
        [width, 0],
        [width, height]
    ]; // corner dots

    for (var i = 0; i < edges; i++) {
        dots.push([0, Math.random() * height]);
        dots.push([Math.random() * width, height]);
        dots.push([width, Math.random() * height]);
        dots.push([Math.random() * width, 0]);

    }

    for (var i = 0; i < no; i++) {
        dots.push([Math.random() * width, Math.random() * height]);
    }

    return dots;

};


/**
 * @param  {[type]} no       number of concentric circles
 * @param  {[type]} steps    number of steps for each circles
 * @param  {[type]} distance distance between each circle (will ignore no)
 * @param  {[type]} width    [description]
 * @param  {[type]} height   [description]
 * @return {[type]}          [description]
 */
dots.circles = function(no, steps, distance, width, height) {

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
 * Reactangles dots (grid)
 * @param  {[type]} noX    [description]
 * @param  {[type]} noY    [description]
 * @param  {[type]} width  [description]
 * @param  {[type]} height [description]
 * @return {[type]}        [description]
 */
dots.rectangles = function(noX, noY, width, height) {

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
 * Dots in spiral
 * @param  {[type]} no     [description]
 * @param  {[type]} factor [description]
 * @param  {[type]} width  [description]
 * @param  {[type]} height [description]
 * @return {[type]}        [description]
 */
dots.spiral = function(no, factor, width, height) {

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
 * Arrows
 * @param  {[type]} noX    [description]
 * @param  {[type]} noY    [description]
 * @param  {[type]} width  [description]
 * @param  {[type]} height [description]
 * @return {[type]}        [description]
 */
dots.arrows = function(noX, noY, width, height) {

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