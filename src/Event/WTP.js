/*

──────────────────────────────────────────
──────────────────────────────────────────
WHEEL & TOUCH PREVENT
──────────────────────────────────────────
──────────────────────────────────────────

R.WTP.on()
R.WTP.off()

*/

R.WTP = {
    p: function (e) {
        if (e.cancelable) {
            e.preventDefault()
        }
    },

    l: function (a) {
        var d = document
        R.L(d, a, 'mouseWheel', this.p)
        R.L(d, a, 'touchmove', this.p)
    },

    on: function () {
        this.l('add')
    },

    off: function () {
        this.l('remove')
    }
}
