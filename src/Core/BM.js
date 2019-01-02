/*

──────────────────────────────────────────
──────────────────────────────────────────
BIND MAKER
──────────────────────────────────────────
──────────────────────────────────────────

R.BM(this, ['bindFunction1', 'bindFunction2', 'bindFunction3'])

*/

R.BM = function (self, arr) {
    var arrL = arr.length

    for (var i = 0; i < arrL; i++) {
        self[arr[i]] = self[arr[i]].bind(self)
    }
}
