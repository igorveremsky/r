/*

──────────────────────────────────────────
──────────────────────────────────────────
TAB
──────────────────────────────────────────
──────────────────────────────────────────

this.const tab = new R.Tab(tabArr)

this.tab.on()
this.tab.off()

*/

R.Tab = function (arr) {
    this.arr = arr
    this.arrL = arr.length
    this.pause = 0

    R.BM(this, ['change'])
}

R.Tab.prototype = {

    on: function () {
        this.l('add')
    },

    off: function () {
        this.l('remove')
    },

    l: function (a) {
        R.L(document, a, 'visibilitychange', this.change)
    },

    change: function () {
        var now = performance.now()

        if (document.hidden) {
            this.pause = performance.now()
        } else {
            var elapsed = now - this.pause
            for (var i = 0; i < this.arrL; i++) {
                this.arr[i].tab(elapsed)
            }
        }
    }

}
