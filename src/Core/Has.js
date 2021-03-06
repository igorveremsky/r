/*

──────────────────────────────────────────
──────────────────────────────────────────
HAS
──────────────────────────────────────────
──────────────────────────────────────────

R.Has(object, 'property')

*/

R.Has = function (obj, key) {
    return obj ? hasOwnProperty.call(obj, key) : false
}
