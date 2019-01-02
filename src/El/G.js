/*

──────────────────────────────────────────
──────────────────────────────────────────
GET ELEMENT BY
──────────────────────────────────────────
──────────────────────────────────────────

const content = R.G.id('content')
const btn = R.G.class('btn')
const span = R.G.tag('span')

CHILD OF ELEMENT
────────────────

const elements = R.G.class('elements', parentEl)

*/

R.G = {
    parent: function (p) {
        return p ? p : document
    },

    id: function (el, p) {
        return this.parent(p).getElementById(el)
    },

    class: function (el, p) {
        return this.parent(p).getElementsByClassName(el)
    },

    tag: function (el, p) {
        return this.parent(p).getElementsByTagName(el)
    }
}
