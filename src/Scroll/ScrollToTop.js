/*

──────────────────────────────────────────
──────────────────────────────────────────
SCROLL TO TOP
──────────────────────────────────────────
──────────────────────────────────────────

R.ScrollToTop({
    totalH: element.offsetHeight,
    cb: afterTop
})

*/

R.ScrollToTop = function (o) {
    var curr = pageYOffset
    var opts = {
        dest: 0,
        d: duration(),
        e: ease(),
        cb: o.cb
    }

    R.ScrollTo(opts)

    function duration () {
        var coeff = R.Lerp.init(300, 1500, curr / o.totalH)

        return curr === 0 ? 0 : coeff
    }

    function ease () {
        var step = 500

        if (curr <= step * 5) {
            return 'io' + Math.ceil(curr / step)
        } else {
            return 'io6'
        }
    }
}
