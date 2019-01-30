/**
 * R
 *
 * Version   →  0.0.6
 * Github    →  https://github.com/ariiiman/r
 * License   →  https://opensource.org/licenses/MIT
 * Author    →  Copyright © 2019 Aristide Benoist
 * Website   →  https://www.aristidebenoist.com
 * Date      →  Jan 30, 2019
 */
var R={};(module.exports=R).M=function(t){R.BM(this,["gRaf","loop","upSvg","upLine","upProp"]),this.v=this.varsInit(t)},R.M.prototype={varsInit:function(t){var l={el:R.Select.el(t.el),e:{value:t.e||"linear"},d:{origin:t.d||0,curr:0},delay:t.delay||0,cb:t.cb||!1,cbDelay:t.cbDelay||0,reverse:t.reverse||!1,round:t.round,progress:0,time:{elapsed:0}};l.elL=l.el.length,R.Has(t,"update")?l.update=function(){t.update(l)}:R.Has(t,"svg")?l.update=this.upSvg:R.Has(t,"line")?l.update=this.upLine:l.update=this.upProp;var i=t.p||!1,e=t.svg||!1,r=t.line||!1,s=!1;if(i){var n={},o={};i.hasOwnProperty("c")&&i.c[0]&&i.c[1]&&(n=new R.C(i.c[0]).toRgb(),o=new R.C(i.c[1]).toRgb(),R.rgbck.forEach(function(t){i[t]=[n[t],o[t]]}),delete i.c),l.prop={},l.propPos=[];var a=Object.keys(i);l.propL=a.length;for(var h=0;h<l.propL;h++){var u=a[h];l.prop[h]={name:u,origin:{start:i[u][0],end:i[u][1]},curr:i[u][0],start:i[u][0],end:i[u][1],unit:i[u][2]||"%"};var c=-1===R.rgbck.indexOf(u)?u.charAt(0):u,p="r"===c&&s?"r2":c;s="r"===c,l.propPos[p]=h}}else if(e)l.svg={type:e.type,attr:"polygon"===e.type?"points":"d",end:e.end,originArr:{},arr:{},val:[]},l.svg.start=e.start||l.el[0].getAttribute(l.svg.attr),l.svg.curr=l.svg.start,l.svg.originArr.start=this.svgSplit(l.svg.start),l.svg.originArr.end=this.svgSplit(l.svg.end),l.svg.arr.start=l.svg.originArr.start,l.svg.arr.end=l.svg.originArr.end,l.svg.arrL=l.svg.arr.start.length;else if(r){l.line={elWL:r.elWithLength,dashed:r.dashed,coeff:{start:void 0!==r.start?(100-r.start)/100:1,end:void 0!==r.end?(100-r.end)/100:0},shapeL:[],origin:{start:[],end:[]},curr:[],start:[],end:[]};for(h=0;h<l.elL;h++){var v;if(l.line.shapeL[h]=M(l.el[h]),l.line.dashed){for(var f=0,d=l.line.dashed,g=r.dashed.split(/[\s,]/),b=g.length,m=0;m<b;m++)f+=parseFloat(g[m])||0;var y="",S=Math.ceil(l.line.shapeL[h]/f);for(m=0;m<S;m++)y+=d+" ";v=y+"0 "+l.line.shapeL[h]}else v=l.line.shapeL[h];l.el[h].style.strokeDasharray=v,l.line.origin.start[h]=l.line.coeff.start*l.line.shapeL[h],l.line.origin.end[h]=l.line.coeff.end*l.line.shapeL[h],l.line.curr[h]=l.line.origin.start[h],l.line.start[h]=l.line.origin.start[h],l.line.end[h]=l.line.origin.end[h]}function M(t){if("circle"===t.tagName)return 2*t.getAttribute("r")*Math.PI;if("line"===t.tagName){var i=t.getAttribute("x1"),e=t.getAttribute("x2"),r=t.getAttribute("y1"),s=t.getAttribute("y2");return Math.sqrt((e-=i)*e+(s-=r)*s)}if("polyline"!==t.tagName)return(t=l.line.elWL||t).getTotalLength();for(var n,o=0,a=t.points.numberOfItems,h=0;h<a;h++){var u=t.points.getItem(h);0<h&&(o+=Math.sqrt(Math.pow(u.x-n.x,2)+Math.pow(u.y-n.y,2))),n=u}return o}}return l},play:function(t){this.pause(),this.varsUpd(t),this.delay.run()},pause:function(){cancelAnimationFrame(this.raf),this.needEnd=!0,this.delayUp("stop")},varsUpd:function(t){var i=t||{},e=R.Has(i,"reverse")&&i.reverse?"start":"end";if(R.Has(this.v,"prop"))for(var r=0;r<this.v.propL;r++)this.v.prop[r].end=this.v.prop[r].origin[e],this.v.prop[r].start=this.v.prop[r].curr,R.Has(i,"p")&&R.Has(i.p,this.v.prop[r].name)&&(R.Has(i.p[this.v.prop[r].name],"newEnd")&&(this.v.prop[r].end=i.p[this.v.prop[r].name].newEnd),R.Has(i.p[this.v.prop[r].name],"newStart")&&(this.v.prop[r].start=i.p[this.v.prop[r].name].newStart));else if(R.Has(this.v,"svg"))R.Has(i,"svg")&&R.Has(i.svg,"start")?this.v.svg.arr.start=i.svg.start:this.v.svg.arr.start=this.svgSplit(this.v.svg.curr),R.Has(i,"svg")&&R.Has(i.svg,"end")?this.v.svg.arr.end=i.svg.end:this.v.svg.arr.end=this.v.svg.originArr[e];else if(R.Has(this.v,"line")){for(r=0;r<this.v.elL;r++)this.v.line.start[r]=this.v.line.curr[r];if(R.Has(i,"line")&&R.Has(i.line,"end")){this.v.line.coeff.end=(100-i.line.end)/100;for(r=0;r<this.v.elL;r++)this.v.line.end[r]=this.v.line.coeff.end*this.v.line.shapeL[r]}else this.v.line.end[r]=this.v.line.origin[e][r]}this.v.d.curr=R.Has(i,"d")?i.d:this.v.d.origin-this.v.d.curr+this.v.time.elapsed,this.v.e.value=i.e||this.v.e.value,R.Is.array(this.v.e.value)?(this.v.e.calc=R.Ease[this.v.e.value[0]],this.v.e.props=this.v.e.value[1]):this.v.e.calc=R.Ease[this.v.e.value],this.v.delay=R.Has(i,"delay")?i.delay:this.v.delay,this.v.cbDelay=R.Has(i,"cbDelay")?i.cbDelay:this.v.cbDelay,this.v.cb=R.Has(i,"cb")?i.cb:this.v.cb,this.delay=new R.Delay(this.gRaf,this.v.delay),this.cbDelay=new R.Delay(this.v.cb,this.v.cbDelay)},gRaf:function(){this.v.time.start=0,this.raf=requestAnimationFrame(this.loop)},tab:function(t){this.v.time.start&&(this.v.time.start+=t),this.delayUp("tab",t)},delayUp:function(t,i){this.delay&&this.delay[t](i),this.cbDelay&&this.cbDelay[t](i)},loop:function(t){this.v.time.start||(this.v.time.start=t),this.v.time.elapsed=t-this.v.time.start,this.v.progress=0<this.v.d.curr?this.v.e.calc(Math.min(this.v.time.elapsed/this.v.d.curr,1),this.v.e.props):1,this.v.update(),this.v.progress+1e-7<1?this.raf=requestAnimationFrame(this.loop):this.needEnd&&(this.needEnd=!1,this.v.cb&&this.cbDelay.run())},upProp:function(){for(var t=0;t<this.v.propL;t++)this.v.prop[t].curr=this.lerp(this.v.prop[t].start,this.v.prop[t].end);var i=R.Has(this.v.propPos,"x")?this.v.prop[this.v.propPos.x].curr+this.v.prop[this.v.propPos.x].unit:0,e=R.Has(this.v.propPos,"y")?this.v.prop[this.v.propPos.y].curr+this.v.prop[this.v.propPos.y].unit:0,r=i+e===0?0:"translate3d("+i+","+e+",0)",s=R.Has(this.v.propPos,"r")?this.v.prop[this.v.propPos.r].name+"("+this.v.prop[this.v.propPos.r].curr+"deg)":0,n=R.Has(this.v.propPos,"r2")?this.v.prop[this.v.propPos.r2].name+"("+this.v.prop[this.v.propPos.r2].curr+"deg)":0,o=R.Has(this.v.propPos,"s")?this.v.prop[this.v.propPos.s].name+"("+this.v.prop[this.v.propPos.s].curr+")":0,a=r+s+n+o===0?0:[r,s,n,o].filter(function(t){return 0!==t}).join(" "),h=R.Has(this.v.propPos,"o")?this.v.prop[this.v.propPos.o].curr:-1,u=R.Has(this.v.propPos,"w")?this.v.prop[this.v.propPos.w].curr+this.v.prop[this.v.propPos.w].unit:0,l=R.Has(this.v.propPos,"h")?this.v.prop[this.v.propPos.h].curr+this.v.prop[this.v.propPos.h].unit:0,c=R.Has(this.v.propPos,R.rgbck[0])?this.v.prop[this.v.propPos[R.rgbck[0]]].curr:0,p=R.Has(this.v.propPos,R.rgbck[1])?this.v.prop[this.v.propPos[R.rgbck[1]]].curr:0,v=R.Has(this.v.propPos,R.rgbck[2])?this.v.prop[this.v.propPos[R.rgbck[2]]].curr:0,f=c?"rgb("+c+","+p+","+v+")":"";for(t=0;t<this.v.elL&&void 0!==this.v.el[t];t++)0!==a&&(this.v.el[t].style.transform=a),0<=h&&(this.v.el[t].style.opacity=h),0!==u&&(this.v.el[t].style.width=u),0!==l&&(this.v.el[t].style.height=l),""!==f&&(this.v.el[t].style.color=f)},upSvg:function(){this.v.svg.currTemp="";for(var t=0;t<this.v.svg.arrL;t++)this.v.svg.val[t]=isNaN(this.v.svg.arr.start[t])?this.v.svg.arr.start[t]:this.lerp(this.v.svg.arr.start[t],this.v.svg.arr.end[t]),this.v.svg.currTemp+=this.v.svg.val[t]+" ",this.v.svg.curr=this.v.svg.currTemp.trim();for(t=0;t<this.v.elL&&void 0!==this.v.el[t];t++)this.v.el[t].setAttribute(this.v.svg.attr,this.v.svg.curr)},upLine:function(){for(var t=0;t<this.v.elL;t++){var i=this.v.el[t].style;this.v.line.curr[t]=this.lerp(this.v.line.start[t],this.v.line.end[t]),i.strokeDashoffset=this.v.line.curr[t],0===this.v.progress&&(i.opacity=1)}},lerp:function(t,i){return R.R(R.Lerp.init(t,i,this.v.progress),this.v.round)},svgSplit:function(t){for(var i=[],e=t.split(" "),r=e.length,s=0;s<r;s++)for(var n=e[s].split(","),o=n.length,a=0;a<o;a++){var h=n[a];h=isNaN(h)?h:+h,i.push(h)}return i}},R.TL=function(){this.arr=[],this.delay=0},R.TL.prototype={from:function(t,i){this.delay+=R.Has(t,"delay")?t.delay:0,t.delay=this.delay,i&&(t.delay=t.delay*i,t.d=t.d*i),this.arr.push(new R.M(t))},play:function(t){this.run("play",t)},pause:function(){this.run("pause")},tab:function(t){this.run("tab",t)},run:function(t,i){for(var e=this.arr.length,r=i||void 0,s=0;s<e;s++)this.arr[s][t](r)}},R.BM=function(t,i){for(var e=i.length,r=0;r<e;r++)t[i[r]]=t[i[r]].bind(t)},R.Delay=function(t,i){this.cb=t,this.d=i,R.BM(this,["loop"])},R.Delay.prototype={run:function(){this.raf=requestAnimationFrame(this.loop)},stop:function(){cancelAnimationFrame(this.raf)},tab:function(t){this.start+=t},loop:function(t){this.start||(this.start=t),(0<this.d?Math.min((t-this.start)/this.d,1):1)+1e-7<1?this.raf=requestAnimationFrame(this.loop):this.cb&&this.cb()}},R.Ease={linear:function(t){return t},i1:function(t){return 1-Math.cos(t*(Math.PI/2))},o1:function(t){return Math.sin(t*(Math.PI/2))},io1:function(t){return-.5*(Math.cos(Math.PI*t)-1)},i2:function(t){return t*t},o2:function(t){return t*(2-t)},io2:function(t){return t<.5?2*t*t:(4-2*t)*t-1},i3:function(t){return t*t*t},o3:function(t){return--t*t*t+1},io3:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},i4:function(t){return t*t*t*t},o4:function(t){return 1- --t*t*t*t},io4:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},i5:function(t){return t*t*t*t*t},o5:function(t){return 1+--t*t*t*t*t},io5:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t},i6:function(t){return 0===t?0:Math.pow(2,10*(t-1))},o6:function(t){return 1===t?1:1-Math.pow(2,-10*t)},io6:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*d(t-1)):.5*(2-Math.pow(2,-10*--t))},cb:function(t,i){return bezier(i[0],i[1],i[2],i[3])(t)}},R.Has=function(t,i){return!!t&&hasOwnProperty.call(t,i)},R.Is={string:function(t){return"string"==typeof t},object:function(t){return t===Object(t)},array:function(t){return t.constructor===Array},def:function(t){return void 0!==t},undef:function(t){return void 0===t}},R.Lerp={init:function(t,i,e){return t*(1-e)+i*e},extend:function(t,i,e,r,s){return r+(s-r)/(e-i)*(t-1)}},R.R=function(t,i){i=void 0!==i?Math.pow(10,i):1e3;return Math.round(t*i)/i},R.Snif={uA:navigator.userAgent.toLowerCase(),get isMobileIE(){return/iemobile/i.test(this.uA)},get isMobileOpera(){return/opera mini/i.test(this.uA)},get isIOS(){return/iphone|ipad|ipod/i.test(this.uA)},get isBlackberry(){return/blackberry/i.test(this.uA)},get isMobileAndroid(){return/android.*mobile/.test(this.uA)},get isAndroid(){return this.isMobileAndroid||!this.isMobileAndroid&&/android/i.test(this.uA)},get isFirefox(){return-1<this.uA.indexOf("firefox")},get safari(){return this.uA.match(/version\/[\d\.]+.*safari/)},get isSafari(){return!!this.safari&&!this.isAndroid},get isSafariOlderThan8(){var t=8;this.isSafari&&(t=+this.safari[0].match(/version\/\d{1,2}/)[0].split("/")[1]);return t<8},get isIEolderThan11(){return-1<this.uA.indexOf("msie")},get isIE11(){return 0<navigator.appVersion.indexOf("Trident/")},get isIE(){return this.isIEolderThan11||this.isIE11},get isEdge(){return/Edge\/\d./i.test(this.uA)},get isMac(){return-1<navigator.platform.toLowerCase().indexOf("mac")},get isMobile(){return this.isMobileAndroid||this.isBlackberry||this.isIOS||this.isMobileOpera||this.isMobileIE},get isTouch(){return"ontouchstart"in window}},R.Throttle=function(t){this.delay=t.delay,this.cb=t.cb,this.onlyAtEnd=t.onlyAtEnd,this.last,this.timer},R.Throttle.prototype={init:function(){var t=this,i=!0,e=Date.now();this.last&&e<this.last+this.delay||i?(i=!1,clearTimeout(this.timer),this.timer=setTimeout(function(){t.last=e,t.cb()},this.delay)):(this.last=e,this.onlyAtEnd||(i=!1,this.cb()))}},R.G={parent:function(t){return t||document},id:function(t,i){return this.parent(i).getElementById(t)},class:function(t,i){return this.parent(i).getElementsByClassName(t)},tag:function(t,i){return this.parent(i).getElementsByTagName(t)}},R.Dom={html:document.documentElement,body:document.body},R.Select={el:function(t){var i=[];if(R.Is.string(t)){var e=t.substring(1);"#"===t.charAt(0)?i[0]=R.G.id(e):i=R.G.class(e)}else i[0]=t;return i},type:function(t){return"#"===t.charAt(0)?"id":"class"},name:function(t){return t.substring(1)}},R.Index={index:function(t,i){for(var e=i.length,r=0;r<e;r++)if(t===i[r])return r;return-1},list:function(t){var i=t.parentNode.children;return this.index(t,i)},class:function(t,i){var e=R.G.class(i);return this.index(t,e)}},R.MM=function(t){this.el=R.Is.def(t.element)?R.Select.el(t.element)[0]:document,this.cb=t.cb,this.iM=R.Snif.isMobile,this.tick=!1,R.BM(this,["gRaf","run"])},R.MM.prototype={on:function(){this.l("add")},off:function(){this.l("remove")},l:function(t){var i=this.iM?"touch":"mouse";R.L(this.el,t,i+"move",this.gRaf)},gRaf:function(t){this.e=t,this.e.cancelable&&this.e.preventDefault(),this.tick||(this.tick=!0,requestAnimationFrame(this.run))},run:function(){var t=this.iM?this.e.changedTouches[0]:this.e,i=t.pageX,e=t.pageY,r=this.e;this.cb(i,e,r),this.tick=!1}},R.RO=function(t){this.cb=t.cb,this.iM=R.Snif.isMobile,this.tick=!1,R.BM(this,["gT","gRaf","run"]),this.t=new R.Throttle({cb:this.gRaf,delay:t.throttle.delay,onlyAtEnd:t.throttle.onlyAtEnd})},R.RO.prototype={on:function(){this.l("add")},off:function(){this.l("remove")},l:function(t){var i=window;this.iM?R.L(i,t,"orientationchange",this.gT):R.L(i,t,"resize",this.gT)},gT:function(t){this.e=t,this.t.init()},gRaf:function(){this.tick||(this.tick=!0,requestAnimationFrame(this.run))},run:function(){this.cb(this.e),this.tick=!1}},R.Tab=function(t){this.arr=t,this.arrL=t.length,this.pause=0,R.BM(this,["change"])},R.Tab.prototype={on:function(){this.l("add")},off:function(){this.l("remove")},l:function(t){R.L(document,t,"visibilitychange",this.change)},change:function(){var t=performance.now();if(document.hidden)this.pause=performance.now();else for(var i=t-this.pause,e=0;e<this.arrL;e++)this.arr[e].tab(i)}},R.WT=function(t){this.cb=t,this.tick=!1,R.BM(this,["tS","gRaf","run"])},R.WT.prototype={on:function(){this.l("add")},off:function(){this.l("remove")},l:function(t){var i=document;R.L(i,t,"mouseWheel",this.gRaf),R.L(i,t,"touchstart",this.tS),R.L(i,t,"touchmove",this.gRaf)},gRaf:function(t){this.e=t,this.e.cancelable&&this.e.preventDefault(),this.tick||(this.tick=!0,requestAnimationFrame(this.run))},run:function(){var t=this.e.type;"wheel"===t?this.onWheel():"mousewheel"===t?this.onMWheel():"touchmove"===t&&this.tM()},onWheel:function(){this.type="scroll",this.delta=this.e.wheelDeltaY||-1*this.e.deltaY,R.Snif.isFirefox&&1===this.e.deltaMode&&(this.delta*=40),this.gCb()},onMWheel:function(){this.type="scroll",this.delta=this.e.wheelDeltaY?this.e.wheelDeltaY:this.e.wheelDelta,this.gCb()},tS:function(t){this.start=t.targetTouches[0].pageY},tM:function(){this.type="touch",this.delta=this.e.targetTouches[0].pageY-this.start,this.gCb()},gCb:function(){this.cb(this.delta,this.type,this.e),this.tick=!1}},R.WTP={p:function(t){t.cancelable&&t.preventDefault()},l:function(t){var i=document;R.L(i,t,"mouseWheel",this.p),R.L(i,t,"touchmove",this.p)},on:function(){this.l("add")},off:function(){this.l("remove")}},R.L=function(t,i,e,r){var s,n=document,o=(t=R.Select.el(t)).length,a=["touchmove","mousemove","scroll","mouseWheel","touchstart"],h=-1!==a.indexOf(e)&&{passive:!1};s=e===a[3]?"onwheel"in n?"wheel":void 0!==n.onmousewheel?"mousewheel":"DOMMouseScroll":"focusOut"===e?R.Snif.isFirefox?"blur":"focusout":e;for(var u=0;u<o;u++)t[u][i+"EventListener"](s,r,h)},R.ScrollToTop=function(t){var i,e=pageYOffset,r={dest:0,d:(i=R.Lerp.init(300,1500,e/t.totalH),0===e?0:i),e:e<=2500?"io"+Math.ceil(e/500):"io6",cb:t.cb};R.ScrollTo(r)},R.ScrollTo=function(t){var i=document,e=i.scrollingElement?i.scrollingElement:R.Dom.body,r=R.Snif.isFirefox||R.Snif.isIE?i.documentElement:e,s=pageYOffset,n=t.dest,o=new R.M({d:t.d,e:t.e,update:function(t){r.scrollTop=Math.round(1e3*R.Lerp.init(s,n,t.progress))/1e3},cb:a});function a(){R.WTP.off(),t.cb&&t.cb()}s===n?a():(R.WTP.on(),o.play())},R.ScrollZero=function(){window.scrollTo(0,0)},R.TopRefresh=function(){"scrollRestoration"in history?history.scrollRestoration="manual":window.onbeforeunload=function(){window.scrollTo(0,0)}},R.rgbck=["cr","cg","cb"],R.C=function(t){this.hex=t},R.C.prototype={toRgb:function(){var t=this.hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(t,i,e,r){return i+i+e+e+r+r}),i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),e={};return i&&(e[R.rgbck[0]]=parseInt(i[1],16),e[R.rgbck[1]]=parseInt(i[2],16),e[R.rgbck[2]]=parseInt(i[3],16)),e}};var NEWTON_ITERATIONS=4,NEWTON_MIN_SLOPE=.001,SUBDIVISION_PRECISION=1e-7,SUBDIVISION_MAX_ITERATIONS=10,kSplineTableSize=11,kSampleStepSize=1/(kSplineTableSize-1),float32ArraySupported="function"==typeof Float32Array;function A(t,i){return 1-3*i+3*t}function B(t,i){return 3*i-6*t}function C(t){return 3*t}function calcBezier(t,i,e){return((A(i,e)*t+B(i,e))*t+C(i))*t}function getSlope(t,i,e){return 3*A(i,e)*t*t+2*B(i,e)*t+C(i)}function binarySubdivide(t,i,e,r,s){for(var n,o,a=0;0<(n=calcBezier(o=i+(e-i)/2,r,s)-t)?e=o:i=o,Math.abs(n)>SUBDIVISION_PRECISION&&++a<SUBDIVISION_MAX_ITERATIONS;);return o}function newtonRaphsonIterate(t,i,e,r){for(var s=0;s<NEWTON_ITERATIONS;++s){var n=getSlope(i,e,r);if(0===n)return i;i-=(calcBezier(i,e,r)-t)/n}return i}function LinearEasing(t){return t}function bezier(o,i,a,e){if(!(0<=o&&o<=1&&0<=a&&a<=1))throw new Error("bezier x values must be in [0, 1] range");if(o===i&&a===e)return LinearEasing;for(var h=float32ArraySupported?new Float32Array(kSplineTableSize):new Array(kSplineTableSize),t=0;t<kSplineTableSize;++t)h[t]=calcBezier(t*kSampleStepSize,o,a);return function(t){return 0===t?0:1===t?1:calcBezier(function(t){for(var i=0,e=1,r=kSplineTableSize-1;e!==r&&h[e]<=t;++e)i+=kSampleStepSize;var s=i+(t-h[--e])/(h[e+1]-h[e])*kSampleStepSize,n=getSlope(s,o,a);return NEWTON_MIN_SLOPE<=n?newtonRaphsonIterate(t,s,o,a):0===n?s:binarySubdivide(t,i,i+kSampleStepSize,o,a)}(t),i,e)}}