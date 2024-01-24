/**
 * Highcharts JS v11.3.0 (2024-01-10)
 *
 * Mousewheel zoom module
 *
 * (c) 2023 Askel Eirik Johansson
 *
 * License: www.highcharts.com/license
 */!function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/mouse-wheel-zoom",["highcharts"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function n(e,t,n,i){e.hasOwnProperty(t)||(e[t]=i.apply(null,n),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}n(t,"Extensions/Annotations/NavigationBindingsUtilities.js",[t["Core/Utilities.js"]],function(e){var t=e.defined,n=e.isNumber,i=e.pick,o={backgroundColor:"string",borderColor:"string",borderRadius:"string",color:"string",fill:"string",fontSize:"string",labels:"string",name:"string",stroke:"string",title:"string"};return{annotationsFieldsTypes:o,getAssignedAxis:function(e){return e.filter(function(e){var t=e.axis.getExtremes(),o=t.min,s=t.max,r=i(e.axis.minPointOffset,0);return n(o)&&n(s)&&e.value>=o-r&&e.value<=s+r&&!e.axis.options.isInternal})[0]},getFieldType:function(e,n){var i=o[e],s=typeof n;return t(i)&&(s=i),({string:"text",number:"number",boolean:"checkbox"})[s]}}}),n(t,"Extensions/MouseWheelZoom/MouseWheelZoom.js",[t["Core/Utilities.js"],t["Extensions/Annotations/NavigationBindingsUtilities.js"]],function(e,t){var n,i,o,s=e.addEvent,r=e.isObject,a=e.pick,d=e.defined,u=e.merge,l=e.isNumber,m=t.getAssignedAxis,c=[],g={enabled:!0,sensitivity:1.1},f=function(e){var t=e.options;d(n)&&clearTimeout(n),d(i)||(i=t.startOnTick,o=t.endOnTick),(i||o)&&(t.startOnTick=!1,t.endOnTick=!1),n=setTimeout(function(){if(d(i)&&d(o)){t.startOnTick=i,t.endOnTick=o;var n=e.getExtremes(),s=n.min,r=n.max;e.forceRedraw=!0,e.setExtremes(s,r),i=o=void 0}},400)},h=function(e,t,n){if(!d(n))return .5;var i=(n-t.minPixelPadding-t.pos)/(t.len-2*t.minPixelPadding),o=t.isXAxis;return o&&!t.reversed!=!e.inverted||!o&&t.reversed?1-i:i},p=function(e,t,n,i,o){var s=t.isXAxis,r=!1;if(d(t.max)&&d(t.min)&&d(t.dataMax)&&d(t.dataMin)){s||f(t);var u,m,c=t.max-t.min,g=l(o)?o:t.min+c/2,p=h(e,t,n),x=c*i,v=a(t.options.max,t.dataMax)-a(t.options.min,t.dataMin),b=t.options.min?0:v*t.options.minPadding,y=t.options.max?0:v*t.options.maxPadding,E=a(t.options.min,t.dataMin)-b,A=v+y+b,C=((u=g-x*p)+(m=x)>E+A&&(m>A?(m=A,u=E):u=E+A-m),m>A&&(m=A),u<E&&(u=E),{rangeStart:u,rangeWidth:m}),M=C.rangeStart<a(t.options.min,E)||C.rangeStart===t.min&&C.rangeWidth>A&&C.rangeStart+C.rangeWidth<a(t.options.max,Number.MIN_VALUE)||C.rangeWidth===t.max-t.min;d(i)&&!M?(t.setExtremes(C.rangeStart,C.rangeStart+C.rangeWidth,!1),r=!0):t.setExtremes(void 0,void 0,!1)}return r},x=function(e,t,n,i,o,s,r){var d=a(r.type,e.zooming.type,""),u=/x/.test(d),l=/y/.test(d),m=n.toValue(o),c=i.toValue(s);if(e.inverted){var g=i.pos+i.len;m=n.toValue(s),c=i.toValue(o);var f=o;o=s,s=g-f+i.pos}var h=u&&p(e,n,o,t,m),x=l&&p(e,i,s,t,c),v=h||x;return v&&e.redraw(!1),v};function v(){var e,t=this,n=this,i=r(e=n.zooming.mouseWheel)?u(g,e):u(g,{enabled:!d(e)||e});i.enabled&&s(this.container,"wheel",function(e){e=t.pointer.normalize(e);var o=!n.pointer.inClass(e.target,"highcharts-no-mousewheel");if(n.isInsidePlot(e.chartX-n.plotLeft,e.chartY-n.plotTop)&&o){var s=i.sensitivity||1.1,r=e.detail||(e.deltaY||0)/120,a=m(t.pointer.getCoordinates(e).xAxis),d=m(t.pointer.getCoordinates(e).yAxis);x(n,Math.pow(s,r),a?a.axis:n.xAxis[0],d?d.axis:n.yAxis[0],e.chartX,e.chartY,i)&&e.preventDefault&&e.preventDefault()}})}return{compose:function(e){-1===c.indexOf(e)&&(c.push(e),s(e,"afterGetContainer",v))}}}),n(t,"masters/modules/mouse-wheel-zoom.src.js",[t["Core/Globals.js"],t["Extensions/MouseWheelZoom/MouseWheelZoom.js"]],function(e,t){t.compose(e.Chart)})});