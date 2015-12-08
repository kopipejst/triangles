var triglici = {};

triglici.draw = function (params) {

    var width = params.width || document.body.clientWidth,
        height = params.height || document.body.clientHeight,
        canvas = params.canvas,
        ctx = canvas.getContext('2d');

    params.dotsParams = params.dotsParams || [];
    params.colorParams = params.colorParams || [];

    var dotsParams = params.dotsParams.concat([width, height]),
        dots = params.dots.apply(null, dotsParams),
        triangles = Delaunay.triangulate(dots);

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < triangles.length; i += 3) {
        ctx.beginPath();

        ctx.moveTo(dots[triangles[i]][0], dots[triangles[i]][1]);
        ctx.lineTo(dots[triangles[i + 1]][0], dots[triangles[i + 1]][1]);
        ctx.lineTo(dots[triangles[i + 2]][0], dots[triangles[i + 2]][1]);
        ctx.closePath();

        var colorParams = params.colorParams.concat([i/3, triangles.length / 3]),
            c = params.color.apply(null, colorParams);

        ctx.fillStyle = c;
        ctx.lineWidth = 1;
        ctx.strokeStyle = c;

        ctx.stroke();
        ctx.fill();
    }

}









