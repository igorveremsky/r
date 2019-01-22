/*

──────────────────────────────────────────
──────────────────────────────────────────
TIMELINE
──────────────────────────────────────────
──────────────────────────────────────────

this.tl = new R.TL()
this.tl.from({el: '#id0', p: {x: [0, 600, 'px'], rotate: [0, 360]}, d: 5000, e: 'linear'})
this.tl.from({el: '#id1', p: {x: [0, 600, 'px'], rotate: [0, 360]}, d: 5000, e: 'linear', delay: 300})

this.tl.play()

this.tl.pause()

this.tl.play({reverse: true})

*/

R.TL = function () {
    this.arr = []
    this.delay = 0
}

R.TL.prototype = {

    from: function (o, timescale) {
        this.delay += R.Has(o, 'delay') ? o.delay : 0
        o.delay = this.delay
        if (timescale) {
            o.delay = o.delay*timescale
            o.d = o.d*timescale
        }
        this.arr.push(new R.M(o))
    },

    play: function (reverse) {
        this.run('play', reverse)
    },

    pause: function () {
        this.run('pause')
    },

    tab: function (v) {
        this.run('tab', v)
    },

    run: function (type, r) {
        var arrL = this.arr.length
        var o = !r ? undefined : r
        for (var i = 0; i < arrL; i++) {
            this.arr[i][type](o)
        }
    }

}
