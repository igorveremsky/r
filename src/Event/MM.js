/*

──────────────────────────────────────────
──────────────────────────────────────────
MOUSEMOVE
──────────────────────────────────────────
──────────────────────────────────────────

►►►  element is optional

R.BM(this, ['mmCb'])

this.MM = new R.MM({
    element: '#element',
    cb: this.mmCb
})

this.MM.on()
this.MM.off()

mmCb (posX, posY, event) {

}

*/

R.MM = function (o) {
    this.el = R.Is.def(o.element) ? R.Select.el(o.element)[0] : document
    this.cb = o.cb
    this.iM = R.Snif.isMobile
    this.tick = false

    R.BM(this, ['gRaf', 'run'])
}

R.MM.prototype = {

    on: function () {
        this.l('add')
    },

    off: function () {
        this.l('remove')
    },

    l: function (a) {
        var type = this.iM ? 'touch' : 'mouse'
        R.L(this.el, a, type + 'move', this.gRaf)
    },

    gRaf: function (e) {
        this.e = e
        if (this.e.cancelable) {
            this.e.preventDefault()
        }

        if (!this.tick) {
            this.tick = true
            requestAnimationFrame(this.run)
        }
    },

    run: function () {
        var t = this.iM ? this.e.changedTouches[0] : this.e
        var x = t['pageX']
        var y = t['pageY']
        var e = this.e

        this.cb(x, y, e)
        this.tick = false
    }

}
