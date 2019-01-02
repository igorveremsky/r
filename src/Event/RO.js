/*

──────────────────────────────────────────
──────────────────────────────────────────
RESIZE & ORIENTATION
──────────────────────────────────────────
──────────────────────────────────────────

R.BM(this, ['resize'])

this.RO = new R.RO({
    cb: this.resize,
    throttle: {
        delay: 100,
        onlyAtEnd: true
    }
})

this.RO.on()
this.RO.off()

resize (event) {

}

*/

R.RO = function (o) {
    this.cb = o.cb
    this.iM = R.Snif.isMobile
    this.tick = false

    R.BM(this, ['gT', 'gRaf', 'run'])

    this.t = new R.Throttle({
        cb: this.gRaf,
        delay: o.throttle.delay,
        onlyAtEnd: o.throttle.onlyAtEnd
    })
}

R.RO.prototype = {

    on: function () {
        this.l('add')
    },

    off: function () {
        this.l('remove')
    },

    l: function (a) {
        var w = window
        if (this.iM) {
            R.L(w, a, 'orientationchange', this.gT)
        } else {
            R.L(w, a, 'resize', this.gT)
        }
    },

    gT: function (e) {
        this.e = e
        this.t.init()
    },

    gRaf: function () {
        if (!this.tick) {
            this.tick = true
            requestAnimationFrame(this.run)
        }
    },

    run: function () {
        this.cb(this.e)
        this.tick = false
    }

}
