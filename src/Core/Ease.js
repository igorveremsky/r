/*

──────────────────────────────────────────
──────────────────────────────────────────
EASE
──────────────────────────────────────────
──────────────────────────────────────────

PROPERTIES
──────────

i           In
o           Out
io          InOut

1           Sine
2           Quad
3           Cubic
4           Quart
5           Quint
6           Expo

USAGE
─────

const easeMultiplier = R.Ease['linear'](multiplier)

*/

R.Ease = {
    linear: function (m) {
        return m
    },
    i1: function (m) {
        return -Math.cos(m * (Math.PI / 2)) + 1
    },
    o1: function (m) {
        return Math.sin(m * (Math.PI / 2))
    },
    io1: function (m) {
        return -0.5 * (Math.cos(Math.PI * m) - 1)
    },
    i2: function (m) {
        return m * m
    },
    o2: function (m) {
        return m * (2 - m)
    },
    io2: function (m) {
        return m < 0.5 ? 2 * m * m : -1 + (4 - 2 * m) * m
    },
    i3: function (m) {
        return m * m * m
    },
    o3: function (m) {
        return (--m) * m * m + 1
    },
    io3: function (m) {
        return m < 0.5 ? 4 * m * m * m : (m - 1) * (2 * m - 2) * (2 * m - 2) + 1
    },
    i4: function (m) {
        return m * m * m * m
    },
    o4: function (m) {
        return 1 - (--m) * m * m * m
    },
    io4: function (m) {
        return m < 0.5 ? 8 * m * m * m * m : 1 - 8 * (--m) * m * m * m
    },
    i5: function (m) {
        return m * m * m * m * m
    },
    o5: function (m) {
        return 1 + (--m) * m * m * m * m
    },
    io5: function (m) {
        return m < 0.5 ? 16 * m * m * m * m * m : 1 + 16 * (--m) * m * m * m * m
    },
    i6: function (m) {
        return (m === 0) ? 0 : Math.pow(2, 10 * (m - 1))
    },
    o6: function (m) {
        return (m === 1) ? 1 : -Math.pow(2, -10 * m) + 1
    },
    io6: function (m) {
        if (m === 0) return 0
        if (m === 1) return 1
        if ((m /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * d(m - 1))
        return 0.5 * (-Math.pow(2, -10 * --m) + 2)
    },
    cb: function (m, cbp) {
        return bezier(cbp[0], cbp[1], cbp[2], cbp[3])(m)
    }
}
