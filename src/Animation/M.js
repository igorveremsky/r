/*

──────────────────────────────────────────
──────────────────────────────────────────
MEROM
──────────────────────────────────────────
──────────────────────────────────────────

OBJECT
──────

el                  elements
p                   properties
d                   duration
e                   ease
delay               delay
cb                  callback
cbDelay             callback delay
round               rounding of values
update              custom function to update external things

PROPERTIES
──────────

x                   transform3d → {x: [start, end, unit]} → unit: 'px' for pixel || % if not declared
y
rotate
rotateX
rotateY
scale
scaleX
scaleY
opacity
height
width
color

SVG
───

type                'polygon' or 'path' (path to improve)
start               optional
end

LINE
────

elWithLength        optional → The total length of the line is calculated with him if he's present (example: folio dodecagon)
dashed              '1,4' or false
start               percentage → default: 0
end                 percentage → default: 100

TRANSLATION EXAMPLE
───────────────────

this.anim = new R.M({el: '#id', p: {x: [0, 600, 'px']}, d: 2000, e: 'o4'})

this.anim.play()

this.anim.play({p: {x: {newEnd: 50}}, reverse: true})

COLOR EXAMPLE
───────────────────

this.colorAnim = new R.M({el: '#id', p: {c: ['#000', '#fff']}, d: 2000, e: 'o4'})

this.colorAnim.play()

MORPHING JS EXAMPLE
───────────────────

this.morph = new R.M({
    el: '#circle',
    svg: {
        type: 'polygon',
        end: '57.2,32.8 60.6,34.7 64.3,36.9 68.5,39.3 71.1,40.8 74.2,42.6 77.6,44.6 80.9,46.5 85,48.8 88.1,50.6 91.4,52.5 94.5,54.3 97.6,56.1 100.9,58 104.5,60.1 109,62.7 113,65 109.6,67 105.9,69.1 101.7,71.5 98.9,73.1 95.4,75.2 92,77.1 89.1,78.8 85.6,80.8 82,82.9 77.6,85.5 73.4,87.8 70.3,89.7 67.2,91.5 63.6,93.5 59.7,95.8 55.9,98 52.3,100 49.5,101.7 46.7,103.3 43.8,105 41,106.6 38,108.3 38,103 38,97.3 38,92.7 38,89.2 38,85.6 38,81.7 38,77.9 38,73.2 38,68.8 38,65 38,61.1 38,56.8 38,52.4 38,47.9 38,44.3 38,39.4 38,35.2 38,30.5 38,25.7 38,21.7 41,23.5 44.6,25.5 48.4,27.7 51.4,29.4 54,30.9'
    },
    d: 2000,
    e: 'o4'
})

this.morph.play()

MORPHING HTML EXAMPLE
─────────────────────

<svg width="130" height="130" viewBox="0 0 130 130">
    <polygon id="circle" points="65,0 71.7,0.3 78.2,1.4 85.6,3.3 92.6,6.1 97.1,8.5 102.3,11.8 107.1,15.5 111.1,19.2 116,24.7 119.4,29.5 122.7,35 125.2,40.4 127.5,47.2 129,53.5 129.8,59.6 130,65 129.8,70.6 128.9,76.9 127.5,82.9 125.2,89.5 122.6,95.1 119.6,100.3 115.7,105.7 111,111 106.6,115 101.7,118.6 95.8,122.2 90.1,125 83.1,127.4 76.3,129 70.6,129.8 65,130 59.6,129.8 53.1,128.9 46.7,127.4 40.4,125.2 34.5,122.4 29,119.1 23.9,115.3 19,111 13.9,105.1 10.6,100.6 7.2,94.8 4.8,89.5 2.3,82.4 1.1,76.9 0.3,71.2 0,65 0.3,58.8 1.1,53 2.9,45.8 5.8,38.1 8.3,33.2 11.3,28.3 14.7,23.8 19.1,18.9 23.8,14.7 28.8,11 34.1,7.8 39.3,5.3 46.5,2.7 53.2,1.1 58.9,0.3"/>
</svg>

LINE JS EXAMPLE
───────────────

this.line = new R.M({
    el: '.shape',
    line: {
        elWithLength: this.el
        dashed: '1,4',
        start: 0,
        end: 25
    },
    d: 2000,
    e: 'o4'
})

this.line.play()

LINE CIRCLE HTML EXAMPLE
────────────────────────

<svg width="30" height="30" viewBox="0 0 30 30">
    <circle class="shape" r="14.5" cx="15" cy="15"></circle>
</svg>

LINE PATH HTML EXAMPLE
──────────────────────

<svg width="100" height="100" viewBox="0 0 100 100">
    <path class="shape" d="M1,50a49,49 0 1,0 98,0a49,49 0 1,0 -98,0"/>
</svg>

LINE CSS EXAMPLE
────────────────

.shape {
    fill: none;
    stroke: pink;
    opacity: 0;
}

*/

R.M = function (o) {
    R.BM(this, ['gRaf', 'loop', 'upSvg', 'upLine', 'upProp'])

    this.v = this.varsInit(o)
}

R.M.prototype = {

    varsInit: function (o) {
        var v = {
            el: R.Select.el(o.el),
            e: {
                value: o.e || 'linear',
            },
            d: {
                origin: o.d || 0,
                curr: 0,
            },
            delay: o.delay || 0,
            cb: o.cb || false,
            cbDelay: o.cbDelay || 0,
            reverse: o.reverse || false,
            round: o.round,
            progress: 0,
            time: {
                elapsed: 0,
            },
        }
        v.elL = v.el.length

        // Update
        if (R.Has(o, 'update')) {
            v.update = function () {
                o.update(v)
            }
        } else if (R.Has(o, 'svg')) {
            v.update = this.upSvg
        } else if (R.Has(o, 'line')) {
            v.update = this.upLine
        } else {
            v.update = this.upProp
        }

        var p = o.p || false
        var s = o.svg || false
        var l = o.line || false

        // Prop
        var hasR = false
        if (p) {
            var sc = {}
            var ec = {}
            if (p.hasOwnProperty('c') && p['c'][0] && p['c'][1]) {
                sc = (new R.C(p['c'][0])).toRgb();
                ec = (new R.C(p['c'][1])).toRgb();

                R.rgbck.forEach(function(ck) {
                    p[ck] = [sc[ck], ec[ck]];
                });

                delete p['c'];
            }
            v.prop = {}
            v.propPos = []
            var keys = Object.keys(p)
            v.propL = keys.length
            for (var i = 0; i < v.propL; i++) {
                var key = keys[i]
                // Save prop in array
                v.prop[i] = {
                    name: key,
                    origin: {
                        start: p[key][0],
                        end: p[key][1],
                    },
                    curr: p[key][0],
                    start: p[key][0],
                    end: p[key][1],
                    unit: p[key][2] || '%',
                }
                // Save position of each prop in prop.arr
                var fChar = (R.rgbck.indexOf(key) === -1) ? key.charAt(0) : key
                var propChar = fChar === 'r' && hasR ? 'r2' : fChar
                hasR = fChar === 'r'
                v.propPos[propChar] = i
            }
            // Svg
        } else if (s) {
            v.svg = {
                type: s.type,
                attr: s.type === 'polygon' ? 'points' : 'd',
                end: s.end,
                originArr: {},
                arr: {},
                val: []
            }
            v.svg.start = s.start || v.el[0].getAttribute(v.svg.attr)
            v.svg.curr = v.svg.start
            v.svg.originArr.start = this.svgSplit(v.svg.start)
            v.svg.originArr.end = this.svgSplit(v.svg.end)
            v.svg.arr.start = v.svg.originArr.start
            v.svg.arr.end = v.svg.originArr.end
            v.svg.arrL = v.svg.arr.start.length
            // Line
        } else if (l) {
            v.line = {
                elWL: l.elWithLength,
                dashed: l.dashed,
                coeff: {
                    start: l.start !== undefined ? (100 - l.start) / 100 : 1,
                    end: l.end !== undefined ? (100 - l.end) / 100 : 0,
                },
                shapeL: [],
                origin: {
                    start: [],
                    end: [],
                },
                curr: [],
                start: [],
                end: [],
            }

            for (var i = 0; i < v.elL; i++) {
                v.line.shapeL[i] = shapeLength(v.el[i])

                var strokeD
                if (v.line.dashed) {
                    var dashL = 0
                    var dashArr = dashed.split(/[\s,]/)
                    var dashArrL = dashArr.length
                    for (var j = 0; j < dashArrL; j++) {
                        dashL += parseFloat(dashArr[j]) || 0
                    }
                    var a = ''
                    var dashCount = Math.ceil(v.line.shapeL[i] / dashL)
                    for (var j = 0; j < dashCount; j++) {
                        a += dashed + ' '
                    }
                    strokeD = a + '0' + ' ' + v.line.shapeL[i]
                } else {
                    strokeD = v.line.shapeL[i]
                }
                v.el[i].style.strokeDasharray = strokeD
                v.line.origin.start[i] = v.line.coeff.start * v.line.shapeL[i]
                v.line.origin.end[i] = v.line.coeff.end * v.line.shapeL[i]
                v.line.curr[i] = v.line.origin.start[i]
                v.line.start[i] = v.line.origin.start[i]
                v.line.end[i] = v.line.origin.end[i]
            }

            function shapeLength(el) {
                if (el.tagName === 'circle') {
                    var radius = el.getAttribute('r')
                    return 2 * radius * Math.PI
                } else if (el.tagName === 'line') {
                    var x1 = el.getAttribute('x1')
                    var x2 = el.getAttribute('x2')
                    var y1 = el.getAttribute('y1')
                    var y2 = el.getAttribute('y2')
                    return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2)
                } else if (el.tagName === 'polyline') {
                    var totalLength = 0
                    var prevPos
                    var elPtsL = el.points.numberOfItems
                    for (var i = 0; i < elPtsL; i++) {
                        var pos = el.points.getItem(i)
                        if (i > 0) {
                            totalLength += Math.sqrt(Math.pow((pos.x - prevPos.x), 2) + Math.pow((pos.y - prevPos.y), 2))
                        }
                        prevPos = pos
                    }
                    return totalLength
                } else {
                    var el = v.line.elWL || el
                    return el.getTotalLength()
                }
            }
        }

        return v
    },

    play: function (opts) {
        this.pause()
        this.varsUpd(opts)
        this.delay.run()
    },

    pause: function () {
        cancelAnimationFrame(this.raf)
        this.needEnd = true
        this.delayUp('stop')
    },

    varsUpd: function (opts) {
        var o = opts || {}
        var newEnd = R.Has(o, 'reverse') && o.reverse ? 'start' : 'end'

        // Prop
        if (R.Has(this.v, 'prop')) {
            for (var i = 0; i < this.v.propL; i++) {
                this.v.prop[i].end = this.v.prop[i].origin[newEnd]
                this.v.prop[i].start = this.v.prop[i].curr
                if (R.Has(o, 'p') && R.Has(o.p, this.v.prop[i].name)) {
                    if (R.Has(o.p[this.v.prop[i].name], 'newEnd')) {
                        this.v.prop[i].end = o.p[this.v.prop[i].name].newEnd
                    }
                    if (R.Has(o.p[this.v.prop[i].name], 'newStart')) {
                        this.v.prop[i].start = o.p[this.v.prop[i].name].newStart
                    }
                }
            }
        // Svg
        } else if (R.Has(this.v, 'svg')) {
            if (R.Has(o, 'svg') && R.Has(o.svg, 'start')) {
                this.v.svg.arr.start = o.svg.start
            } else {
                this.v.svg.arr.start = this.svgSplit(this.v.svg.curr)
            }
            if (R.Has(o, 'svg') && R.Has(o.svg, 'end')) {
                this.v.svg.arr.end = o.svg.end
            } else {
                this.v.svg.arr.end = this.v.svg.originArr[newEnd]
            }
        // Line
        } else if (R.Has(this.v, 'line')) {
            for (var i = 0; i < this.v.elL; i++) {
                this.v.line.start[i] = this.v.line.curr[i]
            }
            if (R.Has(o, 'line') && R.Has(o.line, 'end')) {
                this.v.line.coeff.end = (100 - o.line.end) / 100
                for (var i = 0; i < this.v.elL; i++) {
                    this.v.line.end[i] = this.v.line.coeff.end * this.v.line.shapeL[i]
                }
            } else {
                this.v.line.end[i] = this.v.line.origin[newEnd][i]
            }
        }

        this.v.d.curr = R.Has(o, 'd') ? o.d : this.v.d.origin - this.v.d.curr + this.v.time.elapsed
        this.v.e.value = o.e || this.v.e.value
        this.v.e.calc = R.Ease[this.v.e.value]
        this.v.delay = R.Has(o, 'delay') ? o.delay : this.v.delay
        this.v.cbDelay = R.Has(o, 'cbDelay') ? o.cbDelay : this.v.cbDelay
        this.v.cb = R.Has(o, 'cb') ? o.cb : this.v.cb

        this.delay = new R.Delay(this.gRaf, this.v.delay)
        this.cbDelay = new R.Delay(this.v.cb, this.v.cbDelay)
    },

    gRaf: function () {
        this.v.time.start = 0

        this.raf = requestAnimationFrame(this.loop)
    },

    tab: function (v) {
        if (this.v.time.start) {
            this.v.time.start += v
        }
        this.delayUp('tab', v)
    },

    delayUp: function (type, v) {
        if (this.delay) {
            this.delay[type](v)
        }
        if (this.cbDelay) {
            this.cbDelay[type](v)
        }
    },

    loop: function (now) {
        if (!this.v.time.start) this.v.time.start = now
        this.v.time.elapsed = now - this.v.time.start
        this.v.progress = this.v.d.curr > 0 ? this.v.e.calc(Math.min(this.v.time.elapsed / this.v.d.curr, 1)) : 1

        this.v.update()

        if (this.v.progress + 0.0000001 < 1) {
            this.raf = requestAnimationFrame(this.loop)
        } else if (this.needEnd) {
            this.needEnd = false
            if (this.v.cb) {
                this.cbDelay.run()
            }
        }
    },

    upProp: function () {
        // Lerp
        for (var i = 0; i < this.v.propL; i++) {
            this.v.prop[i].curr = this.lerp(this.v.prop[i].start, this.v.prop[i].end)
        }

        // Transform
        var x = R.Has(this.v.propPos, 'x') ? this.v.prop[this.v.propPos['x']].curr + this.v.prop[this.v.propPos['x']].unit : 0
        var y = R.Has(this.v.propPos, 'y') ? this.v.prop[this.v.propPos['y']].curr + this.v.prop[this.v.propPos['y']].unit : 0
        var t3d = x + y === 0 ? 0 : 'translate3d(' + x + ',' + y + ',0)'
        var r = R.Has(this.v.propPos, 'r') ? this.v.prop[this.v.propPos['r']].name + '(' + this.v.prop[this.v.propPos['r']].curr + 'deg)' : 0
        var r2 = R.Has(this.v.propPos, 'r2') ? this.v.prop[this.v.propPos['r2']].name + '(' + this.v.prop[this.v.propPos['r2']].curr + 'deg)' : 0
        var s = R.Has(this.v.propPos, 's') ? this.v.prop[this.v.propPos['s']].name + '(' + this.v.prop[this.v.propPos['s']].curr + ')' : 0
        var t = t3d + r + r2 + s === 0 ? 0 : [t3d, r, r2, s].filter(function (val) {return val !== 0}).join(' ')

        // Opacity
        var o = R.Has(this.v.propPos, 'o') ? this.v.prop[this.v.propPos['o']].curr : -1

        // Width & Height
        var w = R.Has(this.v.propPos, 'w') ? this.v.prop[this.v.propPos['w']].curr + this.v.prop[this.v.propPos['w']].unit : 0
        var h = R.Has(this.v.propPos, 'h') ? this.v.prop[this.v.propPos['h']].curr + this.v.prop[this.v.propPos['h']].unit : 0

        // Color
        var cr = R.Has(this.v.propPos, R.rgbck[0]) ? this.v.prop[this.v.propPos[R.rgbck[0]]].curr : 0
        var cg = R.Has(this.v.propPos, R.rgbck[1]) ? this.v.prop[this.v.propPos[R.rgbck[1]]].curr : 0
        var cb = R.Has(this.v.propPos, R.rgbck[2]) ? this.v.prop[this.v.propPos[R.rgbck[2]]].curr : 0
        var c = (cr) ? 'rgb('+cr+','+cg+','+cb+')' : ''

        // Dom update
        for (var i = 0; i < this.v.elL; i++) {
            if (this.v.el[i] === undefined) break
            if (t !== 0) {
                this.v.el[i].style.transform = t
            }
            if (o >= 0) {
                this.v.el[i].style.opacity = o
            }
            if (w !== 0) {
                this.v.el[i].style.width = w
            }
            if (h !== 0) {
                this.v.el[i].style.height = h
            }
            if (c !== '') {
                this.v.el[i].style.color = c
            }
        }
    },

    upSvg: function () {
        // Lerp
        this.v.svg.currTemp = ''
        for (var i = 0; i < this.v.svg.arrL; i++) {
            // if isNaN → Letter
            this.v.svg.val[i] = isNaN(this.v.svg.arr.start[i]) ? this.v.svg.arr.start[i] : this.lerp(this.v.svg.arr.start[i], this.v.svg.arr.end[i])
            this.v.svg.currTemp += this.v.svg.val[i] + ' '
            this.v.svg.curr = this.v.svg.currTemp.trim()
        }

        // Dom update
        for (var i = 0; i < this.v.elL; i++) {
            if (this.v.el[i] === undefined) break
            this.v.el[i].setAttribute(this.v.svg.attr, this.v.svg.curr)
        }
    },

    upLine: function () {
        // Lerp + Dom update
        for (var i = 0; i < this.v.elL; i++) {
            var elS = this.v.el[i].style
            this.v.line.curr[i] = this.lerp(this.v.line.start[i], this.v.line.end[i])
            elR.strokeDashoffset = this.v.line.curr[i]
            if (this.v.progress === 0) {
                elR.opacity = 1
            }
        }
    },

    lerp: function (start, end) {
        return R.R(R.Lerp.init(start, end, this.v.progress), this.v.round)
    },

    svgSplit: function (coords) {
        var arr = []
        var s = coords.split(' ')
        var sL = s.length
        for (var i = 0; i < sL; i++) {
            var s2 = s[i].split(',')
            var s2L = s2.length
            for (var j = 0; j < s2L; j++) {
                var s3 = s2[j]
                // if isNaN → Letter
                s3 = isNaN(s3) ? s3 : +s3
                arr.push(s3)
            }
        }
        return arr
    }

}
