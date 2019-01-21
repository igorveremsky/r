/*

──────────────────────────────────────────
──────────────────────────────────────────
COLOR HELPER
──────────────────────────────────────────
──────────────────────────────────────────

const color = R.C('#fff')
const rgb = color.toRgb()

*/

// rgb keys constants
R.rgbck = ['cr','cg','cb'];

R.C = function (hex) {
    this.hex = hex;
}

R.C.prototype = {
    toRgb: function () {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        var hex = this.hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        var back = {};
        if (result) {
            back[R.rgbck[0]] = parseInt(result[1], 16);
            back[R.rgbck[1]] = parseInt(result[2], 16);
            back[R.rgbck[2]] = parseInt(result[3], 16);
        }

        return back;
    }
}
