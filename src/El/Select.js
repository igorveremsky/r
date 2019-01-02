/*

──────────────────────────────────────────
──────────────────────────────────────────
SELECT
──────────────────────────────────────────
──────────────────────────────────────────

const el[0] = R.Select.el(selector)
const type = R.Select.type(selector)
const name = R.Select.name(selector)

*/

R.Select = {
    el: function (v) {
        var el = []
        if (R.Is.string(v)) {
            var elName = v.substring(1)
            if (v.charAt(0) === '#') {
                el[0] = R.G.id(elName)
            } else {
                el = R.G.class(elName)
            }
        } else {
            el[0] = v
        }
        return el
    },

    type: function (v) {
        return v.charAt(0) === '#' ? 'id' : 'class'
    },

    name: function (v) {
        return v.substring(1)
    }
}
