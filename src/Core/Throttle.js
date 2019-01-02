/*

──────────────────────────────────────────
──────────────────────────────────────────
THROTTLE
──────────────────────────────────────────
──────────────────────────────────────────

►►►  firstTime for window resizer

const throttle = new R.Throttle({
    cb: callback,
    delay: 200
    onlyAtEnd: true
})

throttle.init()

*/

R.Throttle = function (o) {
    this.delay = o.delay
    this.cb = o.cb
    this.onlyAtEnd = o.onlyAtEnd
    this.last
    this.timer
}

R.Throttle.prototype = {

    init: function () {
        var self = this
        var firstTime = true
        var now = Date.now()
        if ((this.last && now < this.last + this.delay) || firstTime) {
            firstTime = false
            clearTimeout(this.timer)
            this.timer = setTimeout(function () {
                self.last = now
                self.cb()
            }, this.delay)
        } else {
            this.last = now
            if (!this.onlyAtEnd) {
                firstTime = false
                this.cb()
            }
        }
    }

}
