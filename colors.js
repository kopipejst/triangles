var colors = {
    current: 0
};

/**
 * Random color
 * @param  {[type]} i   [description]
 * @param  {[type]} len [description]
 * @return {[type]}     [description]
 */
colors.randomColor = function(i, len) {

    var c = 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ', 1)';

    return c;
};

/**
 * Random opacity for same color
 * @param  {[type]} color rbg
 * @param  {[type]} i     [description]
 * @param  {[type]} len   [description]
 * @return {[type]}       [description]
 */
colors.randomOpacity = function(color, i, len) {
    var c = color.replace(')',  ',' + Math.random() + ')').replace('rgb', 'rgba');
    return c;
};

/**
 * Return next color from array
 * @param  {[type]} colors [description]
 * @param  {[type]} i      [description]
 * @param  {[type]} len    [description]
 * @return {[type]}        [description]
 */
colors.array = function(array, i, len) {

    array = array || ['rgb(78,24,43)','rgb(214,96,77)','rgb(244,165,130)','rgb(253,219,199)','rgb(255,255,255)','rgb(224,224,224)','rgb(186,186,186)','rgb(135,135,135)','rgb(77,77,77)'];

    return array[i % array.length];
};

/**
 * Gradient of one color
 * @param  {[type]} color rgb
 * @param  {[type]} i     [description]
 * @param  {[type]} len   [description]
 * @return {[type]}       [description]
 */
colors.gradient = function(color, step, i, len) {

    if (!colors.current) {
        var ca = color.replace('rgb(', '').replace(')', '').split(',');
        colors.current = { r: parseInt(ca[0]), g: parseInt(ca[1]), b: parseInt(ca[2])} || { r: 10, g: 40, b: 120 };
        colors.current.direction = 1;
    }

    if (colors.current.r < 0 || colors.current.g < 0 || colors.current.b < 0 || colors.current.r > 254 || colors.current.g > 245 || colors.current.b > 254) {
        colors.current.direction *= -1;
    }

    colors.current.r += step * colors.current.direction;
    colors.current.g += step * colors.current.direction;
    colors.current.b += step * colors.current.direction;

    var c = 'rgba(' + colors.current.r + ',' + colors.current.g + ',' + colors.current.b + ', 1)';

    return c;
};

/**
 * Interesting colors based on start and end color
 * @param  {[type]} colorStart [description]
 * @param  {[type]} colorEnd   [description]
 * @param  {[type]} i          [description]
 * @param  {[type]} len        [description]
 * @return {[type]}            [description]
 */
colors.coscossin = function(r1, g1, b1, r2, g2, b2, i, len) {

    var r = Math.cos(999 * i + 0) * r1 + r2,
        g = Math.cos(999 * i + 2) * g1 + g2,
        b = Math.sin(999 * i + 4) * b1 + b2;

    var c = 'rgba(' + parseInt(r) + ',' + parseInt(g) + ',' + parseInt(b) + ',' + 1 + ')';
    
    return c;
};