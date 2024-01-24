/**
 * Highcharts JS v11.3.0 (2024-01-10)
 *
 * Annotations module
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */ !(function (t) {
    "object" == typeof module && module.exports
        ? ((t.default = t), (module.exports = t))
        : "function" == typeof define && define.amd
        ? define(
              "highcharts/modules/annotations-advanced",
              ["highcharts"],
              function (i) {
                  return t(i), (t.Highcharts = i), t;
              }
          )
        : t("undefined" != typeof Highcharts ? Highcharts : void 0);
})(function (t) {
    "use strict";
    var i = t ? t._modules : {};
    function s(t, i, s, n) {
        t.hasOwnProperty(i) ||
            ((t[i] = n.apply(null, s)),
            "function" == typeof CustomEvent &&
                window.dispatchEvent(
                    new CustomEvent("HighchartsModuleLoaded", {
                        detail: { path: i, module: t[i] },
                    })
                ));
    }
    s(
        i,
        "Extensions/Annotations/AnnotationChart.js",
        [i["Core/Globals.js"], i["Core/Utilities.js"]],
        function (t, i) {
            var s;
            let { composed: n } = t,
                {
                    addEvent: e,
                    erase: o,
                    find: a,
                    fireEvent: r,
                    pick: l,
                    pushUnique: h,
                    wrap: p,
                } = i;
            function c(t, i) {
                let s = this.initAnnotation(t);
                return (
                    this.options.annotations.push(s.options),
                    l(i, !0) && (s.redraw(), s.graphic.attr({ opacity: 1 })),
                    s
                );
            }
            function d() {
                let t = this;
                (t.plotBoxClip = this.renderer.clipRect(this.plotBox)),
                    (t.controlPointsGroup = t.renderer
                        .g("control-points")
                        .attr({ zIndex: 99 })
                        .clip(t.plotBoxClip)
                        .add()),
                    t.options.annotations.forEach((i, s) => {
                        if (!t.annotations.some((t) => t.options === i)) {
                            let n = t.initAnnotation(i);
                            t.options.annotations[s] = n.options;
                        }
                    }),
                    t.drawAnnotations(),
                    e(t, "redraw", t.drawAnnotations),
                    e(t, "destroy", function () {
                        t.plotBoxClip.destroy(), t.controlPointsGroup.destroy();
                    }),
                    e(t, "exportData", function (i) {
                        let s = t.annotations,
                            n = (
                                (this.options.exporting &&
                                    this.options.exporting.csv) ||
                                {}
                            ).columnHeaderFormatter,
                            e = !i.dataRows[1].xValues,
                            o =
                                t.options.lang &&
                                t.options.lang.exportData &&
                                t.options.lang.exportData.annotationHeader,
                            a = i.dataRows[0].length,
                            r =
                                t.options.exporting &&
                                t.options.exporting.csv &&
                                t.options.exporting.csv.annotations &&
                                t.options.exporting.csv.annotations
                                    .itemDelimiter,
                            l =
                                t.options.exporting &&
                                t.options.exporting.csv &&
                                t.options.exporting.csv.annotations &&
                                t.options.exporting.csv.annotations.join;
                        s.forEach((t) => {
                            t.options.labelOptions &&
                                t.options.labelOptions.includeInDataExport &&
                                t.labels.forEach((t) => {
                                    if (t.options.text) {
                                        let s = t.options.text;
                                        t.points.forEach((t) => {
                                            let n = t.x,
                                                e = t.series.xAxis
                                                    ? t.series.xAxis.index
                                                    : -1,
                                                o = !1;
                                            if (-1 === e) {
                                                let t = i.dataRows[0].length,
                                                    a = Array(t);
                                                for (let i = 0; i < t; ++i)
                                                    a[i] = "";
                                                a.push(s),
                                                    (a.xValues = []),
                                                    (a.xValues[e] = n),
                                                    i.dataRows.push(a),
                                                    (o = !0);
                                            }
                                            if (
                                                (o ||
                                                    i.dataRows.forEach((t) => {
                                                        !o &&
                                                            t.xValues &&
                                                            void 0 !== e &&
                                                            n ===
                                                                t.xValues[e] &&
                                                            (l && t.length > a
                                                                ? (t[
                                                                      t.length -
                                                                          1
                                                                  ] += r + s)
                                                                : t.push(s),
                                                            (o = !0));
                                                    }),
                                                !o)
                                            ) {
                                                let t = i.dataRows[0].length,
                                                    o = Array(t);
                                                for (let i = 0; i < t; ++i)
                                                    o[i] = "";
                                                (o[0] = n),
                                                    o.push(s),
                                                    (o.xValues = []),
                                                    void 0 !== e &&
                                                        (o.xValues[e] = n),
                                                    i.dataRows.push(o);
                                            }
                                        });
                                    }
                                });
                        });
                        let h = 0;
                        i.dataRows.forEach((t) => {
                            h = Math.max(h, t.length);
                        });
                        let p = h - i.dataRows[0].length;
                        for (let t = 0; t < p; t++) {
                            let s = (function (t) {
                                let i;
                                return n && !1 !== (i = n(t))
                                    ? i
                                    : ((i = o + " " + t), e)
                                    ? { columnTitle: i, topLevelColumnTitle: i }
                                    : i;
                            })(t + 1);
                            e
                                ? (i.dataRows[0].push(s.topLevelColumnTitle),
                                  i.dataRows[1].push(s.columnTitle))
                                : i.dataRows[0].push(s);
                        }
                    });
            }
            function u() {
                this.plotBoxClip.attr(this.plotBox),
                    this.annotations.forEach((t) => {
                        t.redraw(),
                            t.graphic.animate(
                                { opacity: 1 },
                                t.animationConfig
                            );
                    });
            }
            function x(t) {
                let i = this.annotations,
                    s =
                        "annotations" === t.coll
                            ? t
                            : a(i, function (i) {
                                  return i.options.id === t;
                              });
                s &&
                    (r(s, "remove"),
                    o(this.options.annotations, s.options),
                    o(i, s),
                    s.destroy());
            }
            function g() {
                (this.annotations = []),
                    this.options.annotations || (this.options.annotations = []);
            }
            function y(t) {
                this.chart.hasDraggedAnnotation ||
                    t.apply(this, Array.prototype.slice.call(arguments, 1));
            }
            return (
                ((s || (s = {})).compose = function t(i, s, o) {
                    if (h(n, t)) {
                        let t = s.prototype,
                            n = o.prototype;
                        e(s, "afterInit", g),
                            (t.addAnnotation = c),
                            t.callbacks.push(d),
                            (t.collectionsWithInit.annotations = [c]),
                            t.collectionsWithUpdate.push("annotations"),
                            (t.drawAnnotations = u),
                            (t.removeAnnotation = x),
                            (t.initAnnotation = function (t) {
                                let s = i.types[t.type] || i,
                                    n = new s(this, t);
                                return this.annotations.push(n), n;
                            }),
                            p(n, "onContainerMouseDown", y);
                    }
                }),
                s
            );
        }
    ),
        s(
            i,
            "Extensions/Annotations/AnnotationDefaults.js",
            [i["Core/Utilities.js"]],
            function (t) {
                let { defined: i } = t;
                return {
                    visible: !0,
                    animation: {},
                    crop: !0,
                    draggable: "xy",
                    labelOptions: {
                        align: "center",
                        allowOverlap: !1,
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        borderColor: "#000000",
                        borderRadius: 3,
                        borderWidth: 1,
                        className: "highcharts-no-tooltip",
                        crop: !1,
                        formatter: function () {
                            return i(this.y) ? "" + this.y : "Annotation label";
                        },
                        includeInDataExport: !0,
                        overflow: "justify",
                        padding: 5,
                        shadow: !1,
                        shape: "callout",
                        style: {
                            fontSize: "0.7em",
                            fontWeight: "normal",
                            color: "contrast",
                        },
                        useHTML: !1,
                        verticalAlign: "bottom",
                        x: 0,
                        y: -16,
                    },
                    shapeOptions: {
                        stroke: "rgba(0, 0, 0, 0.75)",
                        strokeWidth: 1,
                        fill: "rgba(0, 0, 0, 0.75)",
                        r: 0,
                        snap: 2,
                    },
                    controlPointOptions: {
                        events: {},
                        style: {
                            cursor: "pointer",
                            fill: "#ffffff",
                            stroke: "#000000",
                            "stroke-width": 2,
                        },
                        height: 10,
                        symbol: "circle",
                        visible: !1,
                        width: 10,
                    },
                    events: {},
                    zIndex: 6,
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/EventEmitter.js",
            [i["Core/Globals.js"], i["Core/Utilities.js"]],
            function (t, i) {
                let { doc: s, isTouchDevice: n } = t,
                    {
                        addEvent: e,
                        fireEvent: o,
                        objectEach: a,
                        pick: r,
                        removeEvent: l,
                    } = i;
                return class {
                    addEvents() {
                        let t = this,
                            i = function (i) {
                                e(
                                    i,
                                    n ? "touchstart" : "mousedown",
                                    (i) => {
                                        t.onMouseDown(i);
                                    },
                                    { passive: !1 }
                                );
                            };
                        if (
                            (i(this.graphic.element),
                            (t.labels || []).forEach((t) => {
                                t.options.useHTML &&
                                    t.graphic.text &&
                                    i(t.graphic.text.element);
                            }),
                            a(t.options.events, (i, s) => {
                                let n = function (n) {
                                    ("click" === s && t.cancelClick) ||
                                        i.call(
                                            t,
                                            t.chart.pointer.normalize(n),
                                            t.target
                                        );
                                };
                                -1 === (t.nonDOMEvents || []).indexOf(s)
                                    ? (e(t.graphic.element, s, n, {
                                          passive: !1,
                                      }),
                                      t.graphic.div &&
                                          e(t.graphic.div, s, n, {
                                              passive: !1,
                                          }))
                                    : e(t, s, n, { passive: !1 });
                            }),
                            t.options.draggable &&
                                (e(t, "drag", t.onDrag),
                                !t.graphic.renderer.styledMode))
                        ) {
                            let i = {
                                cursor: {
                                    x: "ew-resize",
                                    y: "ns-resize",
                                    xy: "move",
                                }[t.options.draggable],
                            };
                            t.graphic.css(i),
                                (t.labels || []).forEach((t) => {
                                    t.options.useHTML &&
                                        t.graphic.text &&
                                        t.graphic.text.css(i);
                                });
                        }
                        t.isUpdating || o(t, "add");
                    }
                    destroy() {
                        this.removeDocEvents(), l(this), (this.hcEvents = null);
                    }
                    mouseMoveToRadians(t, i, s) {
                        let n = t.prevChartY - s,
                            e = t.prevChartX - i,
                            o = t.chartY - s,
                            a = t.chartX - i,
                            r;
                        return (
                            this.chart.inverted &&
                                ((r = e),
                                (e = n),
                                (n = r),
                                (r = a),
                                (a = o),
                                (o = r)),
                            Math.atan2(o, a) - Math.atan2(n, e)
                        );
                    }
                    mouseMoveToScale(t, i, s) {
                        let n = t.prevChartX - i,
                            e = t.prevChartY - s,
                            o = t.chartX - i,
                            a = t.chartY - s,
                            r = (o || 1) / (n || 1),
                            l = (a || 1) / (e || 1);
                        if (this.chart.inverted) {
                            let t = l;
                            (l = r), (r = t);
                        }
                        return { x: r, y: l };
                    }
                    mouseMoveToTranslation(t) {
                        let i = t.chartX - t.prevChartX,
                            s = t.chartY - t.prevChartY,
                            n;
                        return (
                            this.chart.inverted && ((n = s), (s = i), (i = n)),
                            { x: i, y: s }
                        );
                    }
                    onDrag(t) {
                        if (
                            this.chart.isInsidePlot(
                                t.chartX - this.chart.plotLeft,
                                t.chartY - this.chart.plotTop,
                                { visiblePlotOnly: !0 }
                            )
                        ) {
                            let i = this.mouseMoveToTranslation(t);
                            "x" === this.options.draggable && (i.y = 0),
                                "y" === this.options.draggable && (i.x = 0),
                                this.points.length
                                    ? this.translate(i.x, i.y)
                                    : (this.shapes.forEach((t) =>
                                          t.translate(i.x, i.y)
                                      ),
                                      this.labels.forEach((t) =>
                                          t.translate(i.x, i.y)
                                      )),
                                this.redraw(!1);
                        }
                    }
                    onMouseDown(t) {
                        if (
                            (t.preventDefault && t.preventDefault(),
                            2 === t.button)
                        )
                            return;
                        let i = this,
                            a = i.chart.pointer,
                            l = t?.sourceCapabilities?.firesTouchEvents || !1,
                            h = (t = a.normalize(t)).chartX,
                            p = t.chartY;
                        (i.cancelClick = !1),
                            (i.chart.hasDraggedAnnotation = !0),
                            (i.removeDrag = e(
                                s,
                                n || l ? "touchmove" : "mousemove",
                                function (t) {
                                    (i.hasDragged = !0),
                                        ((t = a.normalize(t)).prevChartX = h),
                                        (t.prevChartY = p),
                                        o(i, "drag", t),
                                        (h = t.chartX),
                                        (p = t.chartY);
                                },
                                n || l ? { passive: !1 } : void 0
                            )),
                            (i.removeMouseUp = e(
                                s,
                                n || l ? "touchend" : "mouseup",
                                function (t) {
                                    let s = r(
                                        i.target && i.target.annotation,
                                        i.target
                                    );
                                    s && (s.cancelClick = i.hasDragged),
                                        (i.cancelClick = i.hasDragged),
                                        (i.hasDragged = !1),
                                        (i.chart.hasDraggedAnnotation = !1),
                                        o(r(s, i), "afterUpdate"),
                                        i.onMouseUp(t);
                                },
                                n || l ? { passive: !1 } : void 0
                            ));
                    }
                    onMouseUp(t) {
                        let i = this.chart,
                            s = this.target || this,
                            n = i.options.annotations,
                            e = i.annotations.indexOf(s);
                        this.removeDocEvents(), (n[e] = s.options);
                    }
                    removeDocEvents() {
                        this.removeDrag &&
                            (this.removeDrag = this.removeDrag()),
                            this.removeMouseUp &&
                                (this.removeMouseUp = this.removeMouseUp());
                    }
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/ControlPoint.js",
            [
                i["Extensions/Annotations/EventEmitter.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i) {
                let { merge: s, pick: n } = i;
                return class extends t {
                    constructor(t, i, s, e) {
                        super(),
                            (this.nonDOMEvents = ["drag"]),
                            (this.chart = t),
                            (this.target = i),
                            (this.options = s),
                            (this.index = n(s.index, e));
                    }
                    destroy() {
                        super.destroy(),
                            this.graphic &&
                                (this.graphic = this.graphic.destroy()),
                            (this.chart = null),
                            (this.target = null),
                            (this.options = null);
                    }
                    redraw(t) {
                        this.graphic[t ? "animate" : "attr"](
                            this.options.positioner.call(this, this.target)
                        );
                    }
                    render() {
                        let t = this.chart,
                            i = this.options;
                        (this.graphic = t.renderer
                            .symbol(i.symbol, 0, 0, i.width, i.height)
                            .add(t.controlPointsGroup)
                            .css(i.style)),
                            this.setVisibility(i.visible),
                            this.addEvents();
                    }
                    setVisibility(t) {
                        this.graphic[t ? "show" : "hide"](),
                            (this.options.visible = t);
                    }
                    update(t) {
                        let i = this.chart,
                            n = this.target,
                            e = this.index,
                            o = s(!0, this.options, t);
                        this.destroy(),
                            this.constructor(i, n, o, e),
                            this.render(i.controlPointsGroup),
                            this.redraw();
                    }
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/MockPoint.js",
            [i["Core/Series/SeriesRegistry.js"], i["Core/Utilities.js"]],
            function (t, i) {
                let {
                        series: { prototype: s },
                    } = t,
                    { defined: n, fireEvent: e } = i;
                class o {
                    static fromPoint(t) {
                        return new o(t.series.chart, null, {
                            x: t.x,
                            y: t.y,
                            xAxis: t.series.xAxis,
                            yAxis: t.series.yAxis,
                        });
                    }
                    static pointToPixels(t, i) {
                        let s = t.series,
                            n = s.chart,
                            e = t.plotX || 0,
                            o = t.plotY || 0,
                            a;
                        return (
                            n.inverted &&
                                (t.mock
                                    ? ((e = t.plotY), (o = t.plotX))
                                    : ((e = n.plotWidth - (t.plotY || 0)),
                                      (o = n.plotHeight - (t.plotX || 0)))),
                            s &&
                                !i &&
                                ((e += (a = s.getPlotBox()).translateX),
                                (o += a.translateY)),
                            { x: e, y: o }
                        );
                    }
                    static pointToOptions(t) {
                        return {
                            x: t.x,
                            y: t.y,
                            xAxis: t.series.xAxis,
                            yAxis: t.series.yAxis,
                        };
                    }
                    constructor(t, i, n) {
                        (this.mock = !0),
                            (this.series = {
                                visible: !0,
                                chart: t,
                                getPlotBox: s.getPlotBox,
                            }),
                            (this.target = i || null),
                            (this.options = n),
                            this.applyOptions(this.getOptions());
                    }
                    applyOptions(t) {
                        (this.command = t.command),
                            this.setAxis(t, "x"),
                            this.setAxis(t, "y"),
                            this.refresh();
                    }
                    getLabelConfig() {
                        return { x: this.x, y: this.y, point: this };
                    }
                    getOptions() {
                        return this.hasDynamicOptions()
                            ? this.options(this.target)
                            : this.options;
                    }
                    hasDynamicOptions() {
                        return "function" == typeof this.options;
                    }
                    isInsidePlot() {
                        let t = this.plotX,
                            i = this.plotY,
                            s = this.series.xAxis,
                            o = this.series.yAxis,
                            a = { x: t, y: i, isInsidePlot: !0, options: {} };
                        return (
                            s &&
                                (a.isInsidePlot = n(t) && t >= 0 && t <= s.len),
                            o &&
                                (a.isInsidePlot =
                                    a.isInsidePlot &&
                                    n(i) &&
                                    i >= 0 &&
                                    i <= o.len),
                            e(this.series.chart, "afterIsInsidePlot", a),
                            a.isInsidePlot
                        );
                    }
                    refresh() {
                        let t = this.series,
                            i = t.xAxis,
                            s = t.yAxis,
                            n = this.getOptions();
                        i
                            ? ((this.x = n.x),
                              (this.plotX = i.toPixels(n.x, !0)))
                            : ((this.x = void 0), (this.plotX = n.x)),
                            s
                                ? ((this.y = n.y),
                                  (this.plotY = s.toPixels(n.y, !0)))
                                : ((this.y = null), (this.plotY = n.y)),
                            (this.isInside = this.isInsidePlot());
                    }
                    refreshOptions() {
                        let t = this.series,
                            i = t.xAxis,
                            s = t.yAxis;
                        (this.x = this.options.x =
                            i
                                ? (this.options.x = i.toValue(this.plotX, !0))
                                : this.plotX),
                            (this.y = this.options.y =
                                s ? s.toValue(this.plotY, !0) : this.plotY);
                    }
                    rotate(t, i, s) {
                        if (!this.hasDynamicOptions()) {
                            let n = Math.cos(s),
                                e = Math.sin(s),
                                o = this.plotX - t,
                                a = this.plotY - i;
                            (this.plotX = o * n - a * e + t),
                                (this.plotY = o * e + a * n + i),
                                this.refreshOptions();
                        }
                    }
                    scale(t, i, s, n) {
                        if (!this.hasDynamicOptions()) {
                            let e = this.plotX * s,
                                o = this.plotY * n;
                            (this.plotX = (1 - s) * t + e),
                                (this.plotY = (1 - n) * i + o),
                                this.refreshOptions();
                        }
                    }
                    setAxis(t, i) {
                        let s = i + "Axis",
                            e = t[s],
                            o = this.series.chart;
                        this.series[s] =
                            "object" == typeof e
                                ? e
                                : n(e)
                                ? o[s][e] || o.get(e)
                                : null;
                    }
                    toAnchor() {
                        let t = [this.plotX, this.plotY, 0, 0];
                        return (
                            this.series.chart.inverted &&
                                ((t[0] = this.plotY), (t[1] = this.plotX)),
                            t
                        );
                    }
                    translate(t, i, s, n) {
                        this.hasDynamicOptions() ||
                            ((this.plotX += s),
                            (this.plotY += n),
                            this.refreshOptions());
                    }
                }
                return o;
            }
        ),
        s(
            i,
            "Extensions/Annotations/ControlTarget.js",
            [
                i["Extensions/Annotations/ControlPoint.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s) {
                var n;
                return (
                    (function (n) {
                        function e() {
                            let i = this.controlPoints,
                                n = this.options.controlPoints || [];
                            n.forEach((e, o) => {
                                let a = s.merge(
                                    this.options.controlPointOptions,
                                    e
                                );
                                a.index || (a.index = o),
                                    (n[o] = a),
                                    i.push(new t(this.chart, this, a));
                            });
                        }
                        function o(t) {
                            let i = t.series.getPlotBox(),
                                n = t.series.chart,
                                e = t.mock
                                    ? t.toAnchor()
                                    : (n.tooltip &&
                                          n.tooltip.getAnchor.call(
                                              { chart: t.series.chart },
                                              t
                                          )) || [0, 0, 0, 0],
                                o = {
                                    x: e[0] + (this.options.x || 0),
                                    y: e[1] + (this.options.y || 0),
                                    height: e[2] || 0,
                                    width: e[3] || 0,
                                };
                            return {
                                relativePosition: o,
                                absolutePosition: s.merge(o, {
                                    x:
                                        o.x +
                                        (t.mock ? i.translateX : n.plotLeft),
                                    y:
                                        o.y +
                                        (t.mock ? i.translateY : n.plotTop),
                                }),
                            };
                        }
                        function a() {
                            this.controlPoints.forEach((t) => t.destroy()),
                                (this.chart = null),
                                (this.controlPoints = null),
                                (this.points = null),
                                (this.options = null),
                                this.annotation && (this.annotation = null);
                        }
                        function r() {
                            let t = this.options;
                            return t.points || (t.point && s.splat(t.point));
                        }
                        function l() {
                            let t, i;
                            let s = this.getPointsOptions(),
                                n = this.points,
                                e = (s && s.length) || 0;
                            for (t = 0; t < e; t++) {
                                if (!(i = this.point(s[t], n[t]))) {
                                    n.length = 0;
                                    return;
                                }
                                i.mock && i.refresh(), (n[t] = i);
                            }
                            return n;
                        }
                        function h(t, n) {
                            if (t && t.series) return t;
                            if (!n || null === n.series) {
                                if (s.isObject(t))
                                    n = new i(this.chart, this, t);
                                else if (s.isString(t))
                                    n = this.chart.get(t) || null;
                                else if ("function" == typeof t) {
                                    let s = t.call(n, this);
                                    n = s.series
                                        ? s
                                        : new i(this.chart, this, t);
                                }
                            }
                            return n;
                        }
                        function p(t) {
                            this.controlPoints.forEach((i) => i.redraw(t));
                        }
                        function c() {
                            this.controlPoints.forEach((t) => t.render());
                        }
                        function d(t, i, s, n, e) {
                            if (this.chart.inverted) {
                                let t = i;
                                (i = s), (s = t);
                            }
                            this.points.forEach(
                                (o, a) => this.transformPoint(t, i, s, n, e, a),
                                this
                            );
                        }
                        function u(t, s, n, e, o, a) {
                            let r = this.points[a];
                            r.mock || (r = this.points[a] = i.fromPoint(r)),
                                r[t](s, n, e, o);
                        }
                        function x(t, i) {
                            this.transform("translate", null, null, t, i);
                        }
                        function g(t, i, s) {
                            this.transformPoint(
                                "translate",
                                null,
                                null,
                                t,
                                i,
                                s
                            );
                        }
                        n.compose = function (t) {
                            let i = t.prototype;
                            i.addControlPoints ||
                                s.merge(!0, i, {
                                    addControlPoints: e,
                                    anchor: o,
                                    destroyControlTarget: a,
                                    getPointsOptions: r,
                                    linkPoints: l,
                                    point: h,
                                    redrawControlPoints: p,
                                    renderControlPoints: c,
                                    transform: d,
                                    transformPoint: u,
                                    translate: x,
                                    translatePoint: g,
                                });
                        };
                    })(n || (n = {})),
                    n
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Controllables/Controllable.js",
            [
                i["Extensions/Annotations/ControlTarget.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i) {
                let { merge: s } = i;
                class n {
                    constructor(t, i, s, n) {
                        (this.annotation = t),
                            (this.chart = t.chart),
                            (this.collection =
                                "label" === n ? "labels" : "shapes"),
                            (this.controlPoints = []),
                            (this.options = i),
                            (this.points = []),
                            (this.index = s),
                            (this.itemType = n),
                            this.init(t, i, s);
                    }
                    attr(...t) {
                        this.graphic.attr.apply(this.graphic, arguments);
                    }
                    attrsFromOptions(t) {
                        let i, s;
                        let n = this.constructor.attrsMap,
                            e = {},
                            o = this.chart.styledMode;
                        for (i in t)
                            (s = n[i]),
                                void 0 === n[i] ||
                                    (o &&
                                        -1 !==
                                            [
                                                "fill",
                                                "stroke",
                                                "stroke-width",
                                            ].indexOf(s)) ||
                                    (e[s] = t[i]);
                        return e;
                    }
                    destroy() {
                        this.graphic && (this.graphic = this.graphic.destroy()),
                            this.tracker &&
                                (this.tracker = this.tracker.destroy()),
                            this.destroyControlTarget();
                    }
                    init(t, i, s) {
                        (this.annotation = t),
                            (this.chart = t.chart),
                            (this.options = i),
                            (this.points = []),
                            (this.controlPoints = []),
                            (this.index = s),
                            this.linkPoints(),
                            this.addControlPoints();
                    }
                    redraw(t) {
                        this.redrawControlPoints(t);
                    }
                    render(t) {
                        this.renderControlPoints();
                    }
                    rotate(t, i, s) {
                        this.transform("rotate", t, i, s);
                    }
                    scale(t, i, s, n) {
                        this.transform("scale", t, i, s, n);
                    }
                    setControlPointsVisibility(t) {
                        this.controlPoints.forEach((i) => {
                            i.setVisibility(t);
                        });
                    }
                    shouldBeDrawn() {
                        return !!this.points.length;
                    }
                    translateShape(t, i, s) {
                        let n = this.annotation.chart,
                            e = this.annotation.userOptions,
                            o = n.annotations.indexOf(this.annotation),
                            a = n.options.annotations[o];
                        this.translatePoint(t, i, 0),
                            s && this.translatePoint(t, i, 1),
                            (a[this.collection][this.index].point =
                                this.options.point),
                            (e[this.collection][this.index].point =
                                this.options.point);
                    }
                    update(t) {
                        let i = this.annotation,
                            n = s(!0, this.options, t),
                            e = this.graphic.parentGroup,
                            o = this.constructor;
                        this.destroy();
                        let a = new o(i, n, this.index, this.itemType);
                        s(!0, this, a), this.render(e), this.redraw();
                    }
                }
                return t.compose(n), n;
            }
        ),
        s(
            i,
            "Extensions/Annotations/Controllables/ControllableDefaults.js",
            [],
            function () {
                return {
                    defaultMarkers: {
                        arrow: {
                            tagName: "marker",
                            attributes: {
                                id: "arrow",
                                refY: 5,
                                refX: 9,
                                markerWidth: 10,
                                markerHeight: 10,
                            },
                            children: [
                                {
                                    tagName: "path",
                                    attributes: {
                                        d: "M 0 0 L 10 5 L 0 10 Z",
                                        "stroke-width": 0,
                                    },
                                },
                            ],
                        },
                        "reverse-arrow": {
                            tagName: "marker",
                            attributes: {
                                id: "reverse-arrow",
                                refY: 5,
                                refX: 1,
                                markerWidth: 10,
                                markerHeight: 10,
                            },
                            children: [
                                {
                                    tagName: "path",
                                    attributes: {
                                        d: "M 0 5 L 10 0 L 10 10 Z",
                                        "stroke-width": 0,
                                    },
                                },
                            ],
                        },
                    },
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/Controllables/ControllablePath.js",
            [
                i["Extensions/Annotations/Controllables/Controllable.js"],
                i[
                    "Extensions/Annotations/Controllables/ControllableDefaults.js"
                ],
                i["Core/Globals.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n) {
                let { defaultMarkers: e } = i,
                    { composed: o } = s,
                    {
                        addEvent: a,
                        defined: r,
                        extend: l,
                        merge: h,
                        pushUnique: p,
                        uniqueKey: c,
                    } = n,
                    d = g("marker-end"),
                    u = g("marker-start"),
                    x = "rgba(192,192,192," + (s.svg ? 1e-4 : 0.002) + ")";
                function g(t) {
                    return function (i) {
                        this.attr(t, "url(#" + i + ")");
                    };
                }
                function y() {
                    this.options.defs = h(e, this.options.defs || {});
                }
                function f(t, i) {
                    let s = { attributes: { id: t } },
                        n = {
                            stroke: i.color || "none",
                            fill: i.color || "rgba(0, 0, 0, 0.75)",
                        };
                    s.children =
                        i.children &&
                        i.children.map(function (t) {
                            return h(n, t);
                        });
                    let e = h(
                            !0,
                            {
                                attributes: {
                                    markerWidth: 20,
                                    markerHeight: 20,
                                    refX: 0,
                                    refY: 0,
                                    orient: "auto",
                                },
                            },
                            i,
                            s
                        ),
                        o = this.definition(e);
                    return (o.id = t), o;
                }
                class m extends t {
                    static compose(t, i) {
                        if (p(o, this.compose)) {
                            let s = i.prototype;
                            a(t, "afterGetContainer", y), (s.addMarker = f);
                        }
                    }
                    constructor(t, i, s) {
                        super(t, i, s, "shape"), (this.type = "path");
                    }
                    toD() {
                        let t = this.options.d;
                        if (t) return "function" == typeof t ? t.call(this) : t;
                        let i = this.points,
                            s = i.length,
                            n = [],
                            e = s,
                            o = i[0],
                            a = e && this.anchor(o).absolutePosition,
                            r = 0,
                            l;
                        if (a)
                            for (n.push(["M", a.x, a.y]); ++r < s && e; )
                                (l = (o = i[r]).command || "L"),
                                    (a = this.anchor(o).absolutePosition),
                                    "M" === l
                                        ? n.push([l, a.x, a.y])
                                        : "L" === l
                                        ? n.push([l, a.x, a.y])
                                        : "Z" === l && n.push([l]),
                                    (e = o.series.visible);
                        return e && this.graphic
                            ? this.chart.renderer.crispLine(
                                  n,
                                  this.graphic.strokeWidth()
                              )
                            : null;
                    }
                    shouldBeDrawn() {
                        return super.shouldBeDrawn() || !!this.options.d;
                    }
                    render(t) {
                        let i = this.options,
                            s = this.attrsFromOptions(i);
                        (this.graphic = this.annotation.chart.renderer
                            .path([["M", 0, 0]])
                            .attr(s)
                            .add(t)),
                            i.className && this.graphic.addClass(i.className),
                            (this.tracker = this.annotation.chart.renderer
                                .path([["M", 0, 0]])
                                .addClass("highcharts-tracker-line")
                                .attr({ zIndex: 2 })
                                .add(t)),
                            this.annotation.chart.styledMode ||
                                this.tracker.attr({
                                    "stroke-linejoin": "round",
                                    stroke: x,
                                    fill: x,
                                    "stroke-width":
                                        this.graphic.strokeWidth() + 2 * i.snap,
                                }),
                            super.render(),
                            l(this.graphic, {
                                markerStartSetter: u,
                                markerEndSetter: d,
                            }),
                            this.setMarkers(this);
                    }
                    redraw(t) {
                        if (this.graphic) {
                            let i = this.toD(),
                                s = t ? "animate" : "attr";
                            i
                                ? (this.graphic[s]({ d: i }),
                                  this.tracker[s]({ d: i }))
                                : (this.graphic.attr({ d: "M 0 -9000000000" }),
                                  this.tracker.attr({ d: "M 0 -9000000000" })),
                                (this.graphic.placed = this.tracker.placed =
                                    !!i);
                        }
                        super.redraw(t);
                    }
                    setMarkers(t) {
                        let i = t.options,
                            s = t.chart,
                            n = s.options.defs,
                            e = i.fill,
                            o = r(e) && "none" !== e ? e : i.stroke;
                        ["markerStart", "markerEnd"].forEach(function (e) {
                            let a = i[e],
                                r,
                                l,
                                p,
                                d;
                            if (a) {
                                for (p in n)
                                    if (
                                        (a ===
                                            ((r = n[p]).attributes &&
                                                r.attributes.id) ||
                                            a === r.id) &&
                                        "marker" === r.tagName
                                    ) {
                                        l = r;
                                        break;
                                    }
                                l &&
                                    ((d = t[e] =
                                        s.renderer.addMarker(
                                            (i.id || c()) + "-" + a,
                                            h(l, { color: o })
                                        )),
                                    t.attr(e, d.getAttribute("id")));
                            }
                        });
                    }
                }
                return (
                    (m.attrsMap = {
                        dashStyle: "dashstyle",
                        strokeWidth: "stroke-width",
                        stroke: "stroke",
                        fill: "fill",
                        zIndex: "zIndex",
                    }),
                    m
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Controllables/ControllableRect.js",
            [
                i["Extensions/Annotations/Controllables/Controllable.js"],
                i["Extensions/Annotations/Controllables/ControllablePath.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s) {
                let { merge: n } = s;
                class e extends t {
                    constructor(t, i, s) {
                        super(t, i, s, "shape"),
                            (this.type = "rect"),
                            (this.translate = super.translateShape);
                    }
                    render(t) {
                        let i = this.attrsFromOptions(this.options);
                        (this.graphic = this.annotation.chart.renderer
                            .rect(0, -9e9, 0, 0)
                            .attr(i)
                            .add(t)),
                            super.render();
                    }
                    redraw(t) {
                        if (this.graphic) {
                            let i = this.anchor(
                                this.points[0]
                            ).absolutePosition;
                            i
                                ? this.graphic[t ? "animate" : "attr"]({
                                      x: i.x,
                                      y: i.y,
                                      width: this.options.width,
                                      height: this.options.height,
                                  })
                                : this.attr({ x: 0, y: -9e9 }),
                                (this.graphic.placed = !!i);
                        }
                        super.redraw(t);
                    }
                }
                return (
                    (e.attrsMap = n(i.attrsMap, {
                        width: "width",
                        height: "height",
                    })),
                    e
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Controllables/ControllableCircle.js",
            [
                i["Extensions/Annotations/Controllables/Controllable.js"],
                i["Extensions/Annotations/Controllables/ControllablePath.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s) {
                let { merge: n } = s;
                class e extends t {
                    constructor(t, i, s) {
                        super(t, i, s, "shape"),
                            (this.type = "circle"),
                            (this.translate = super.translateShape);
                    }
                    redraw(t) {
                        if (this.graphic) {
                            let i = this.anchor(
                                this.points[0]
                            ).absolutePosition;
                            i
                                ? this.graphic[t ? "animate" : "attr"]({
                                      x: i.x,
                                      y: i.y,
                                      r: this.options.r,
                                  })
                                : this.graphic.attr({ x: 0, y: -9e9 }),
                                (this.graphic.placed = !!i);
                        }
                        super.redraw.call(this, t);
                    }
                    render(t) {
                        let i = this.attrsFromOptions(this.options);
                        (this.graphic = this.annotation.chart.renderer
                            .circle(0, -9e9, 0)
                            .attr(i)
                            .add(t)),
                            super.render();
                    }
                    setRadius(t) {
                        this.options.r = t;
                    }
                }
                return (e.attrsMap = n(i.attrsMap, { r: "r" })), e;
            }
        ),
        s(
            i,
            "Extensions/Annotations/Controllables/ControllableEllipse.js",
            [
                i["Extensions/Annotations/Controllables/Controllable.js"],
                i["Extensions/Annotations/Controllables/ControllablePath.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s) {
                let { merge: n, defined: e } = s;
                class o extends t {
                    constructor(t, i, s) {
                        super(t, i, s, "shape"), (this.type = "ellipse");
                    }
                    init(t, i, s) {
                        e(i.yAxis) &&
                            i.points.forEach((t) => {
                                t.yAxis = i.yAxis;
                            }),
                            e(i.xAxis) &&
                                i.points.forEach((t) => {
                                    t.xAxis = i.xAxis;
                                }),
                            super.init(t, i, s);
                    }
                    render(t) {
                        (this.graphic = this.annotation.chart.renderer
                            .createElement("ellipse")
                            .attr(this.attrsFromOptions(this.options))
                            .add(t)),
                            super.render();
                    }
                    translate(t, i) {
                        super.translateShape(t, i, !0);
                    }
                    getDistanceFromLine(t, i, s, n) {
                        return (
                            Math.abs(
                                (i.y - t.y) * s -
                                    (i.x - t.x) * n +
                                    i.x * t.y -
                                    i.y * t.x
                            ) /
                            Math.sqrt(
                                (i.y - t.y) * (i.y - t.y) +
                                    (i.x - t.x) * (i.x - t.x)
                            )
                        );
                    }
                    getAttrs(t, i) {
                        let s = t.x,
                            n = t.y,
                            e = i.x,
                            o = i.y,
                            a = (s + e) / 2,
                            r = (180 * Math.atan((o - n) / (e - s))) / Math.PI;
                        a < s && (r += 180);
                        let l = this.getRY();
                        return {
                            cx: a,
                            cy: (n + o) / 2,
                            rx: Math.sqrt(
                                ((s - e) * (s - e)) / 4 +
                                    ((n - o) * (n - o)) / 4
                            ),
                            ry: l,
                            angle: r,
                        };
                    }
                    getRY() {
                        let t = this.getYAxis();
                        return e(t)
                            ? Math.abs(
                                  t.toPixels(this.options.ry) - t.toPixels(0)
                              )
                            : this.options.ry;
                    }
                    getYAxis() {
                        let t = this.options.yAxis;
                        return this.chart.yAxis[t];
                    }
                    getAbsolutePosition(t) {
                        return this.anchor(t).absolutePosition;
                    }
                    redraw(t) {
                        if (this.graphic) {
                            let i = this.getAbsolutePosition(this.points[0]),
                                s = this.getAbsolutePosition(this.points[1]),
                                n = this.getAttrs(i, s);
                            i
                                ? this.graphic[t ? "animate" : "attr"]({
                                      cx: n.cx,
                                      cy: n.cy,
                                      rx: n.rx,
                                      ry: n.ry,
                                      rotation: n.angle,
                                      rotationOriginX: n.cx,
                                      rotationOriginY: n.cy,
                                  })
                                : this.graphic.attr({ x: 0, y: -9e9 }),
                                (this.graphic.placed = !!i);
                        }
                        super.redraw(t);
                    }
                    setYRadius(t) {
                        let i = this.annotation.userOptions.shapes;
                        (this.options.ry = t),
                            i && i[0] && ((i[0].ry = t), (i[0].ry = t));
                    }
                }
                return (o.attrsMap = n(i.attrsMap, { ry: "ry" })), o;
            }
        ),
        s(
            i,
            "Extensions/Annotations/Controllables/ControllableLabel.js",
            [
                i["Extensions/Annotations/Controllables/Controllable.js"],
                i["Core/Templating.js"],
                i["Core/Globals.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n, e) {
                let { format: o } = i,
                    { composed: a } = s,
                    { extend: r, isNumber: l, pick: h, pushUnique: p } = e;
                function c(t, i, s, n, e) {
                    let o = e && e.anchorX,
                        a = e && e.anchorY,
                        r,
                        h,
                        p = s / 2;
                    return (
                        l(o) &&
                            l(a) &&
                            ((r = [["M", o, a]]),
                            (h = i - a) < 0 && (h = -n - h),
                            h < s && (p = o < t + s / 2 ? h : s - h),
                            a > i + n
                                ? r.push(["L", t + p, i + n])
                                : a < i
                                ? r.push(["L", t + p, i])
                                : o < t
                                ? r.push(["L", t, i + n / 2])
                                : o > t + s && r.push(["L", t + s, i + n / 2])),
                        r || []
                    );
                }
                class d extends t {
                    static alignedPosition(t, i) {
                        let s = t.align,
                            n = t.verticalAlign,
                            e = (i.x || 0) + (t.x || 0),
                            o = (i.y || 0) + (t.y || 0),
                            a,
                            r;
                        return (
                            "right" === s ? (a = 1) : "center" === s && (a = 2),
                            a && (e += (i.width - (t.width || 0)) / a),
                            "bottom" === n
                                ? (r = 1)
                                : "middle" === n && (r = 2),
                            r && (o += (i.height - (t.height || 0)) / r),
                            { x: Math.round(e), y: Math.round(o) }
                        );
                    }
                    static compose(t) {
                        if (p(a, this.compose)) {
                            let i = t.prototype;
                            i.symbols.connector = c;
                        }
                    }
                    static justifiedOptions(t, i, s, n) {
                        let e;
                        let o = s.align,
                            a = s.verticalAlign,
                            r = i.box ? 0 : i.padding || 0,
                            l = i.getBBox(),
                            h = {
                                align: o,
                                verticalAlign: a,
                                x: s.x,
                                y: s.y,
                                width: i.width,
                                height: i.height,
                            },
                            p = (n.x || 0) - t.plotLeft,
                            c = (n.y || 0) - t.plotTop;
                        return (
                            (e = p + r) < 0 &&
                                ("right" === o
                                    ? (h.align = "left")
                                    : (h.x = (h.x || 0) - e)),
                            (e = p + l.width - r) > t.plotWidth &&
                                ("left" === o
                                    ? (h.align = "right")
                                    : (h.x = (h.x || 0) + t.plotWidth - e)),
                            (e = c + r) < 0 &&
                                ("bottom" === a
                                    ? (h.verticalAlign = "top")
                                    : (h.y = (h.y || 0) - e)),
                            (e = c + l.height - r) > t.plotHeight &&
                                ("top" === a
                                    ? (h.verticalAlign = "bottom")
                                    : (h.y = (h.y || 0) + t.plotHeight - e)),
                            h
                        );
                    }
                    constructor(t, i, s) {
                        super(t, i, s, "label");
                    }
                    translatePoint(t, i) {
                        super.translatePoint(t, i, 0);
                    }
                    translate(t, i) {
                        let s = this.annotation.chart,
                            n = this.annotation.userOptions,
                            e = s.annotations.indexOf(this.annotation),
                            o = s.options.annotations,
                            a = o[e];
                        if (s.inverted) {
                            let s = t;
                            (t = i), (i = s);
                        }
                        (this.options.x += t),
                            (this.options.y += i),
                            (a[this.collection][this.index].x = this.options.x),
                            (a[this.collection][this.index].y = this.options.y),
                            (n[this.collection][this.index].x = this.options.x),
                            (n[this.collection][this.index].y = this.options.y);
                    }
                    render(t) {
                        let i = this.options,
                            s = this.attrsFromOptions(i),
                            n = i.style;
                        (this.graphic = this.annotation.chart.renderer
                            .label(
                                "",
                                0,
                                -9999,
                                i.shape,
                                null,
                                null,
                                i.useHTML,
                                null,
                                "annotation-label"
                            )
                            .attr(s)
                            .add(t)),
                            this.annotation.chart.styledMode ||
                                ("contrast" === n.color &&
                                    (n.color =
                                        this.annotation.chart.renderer.getContrast(
                                            d.shapesWithoutBackground.indexOf(
                                                i.shape
                                            ) > -1
                                                ? "#FFFFFF"
                                                : i.backgroundColor
                                        )),
                                this.graphic.css(i.style).shadow(i.shadow)),
                            i.className && this.graphic.addClass(i.className),
                            (this.graphic.labelrank = i.labelrank),
                            super.render();
                    }
                    redraw(t) {
                        let i = this.options,
                            s = this.text || i.format || i.text,
                            n = this.graphic,
                            e = this.points[0];
                        if (!n) {
                            this.redraw(t);
                            return;
                        }
                        n.attr({
                            text: s
                                ? o(
                                      String(s),
                                      e.getLabelConfig(),
                                      this.annotation.chart
                                  )
                                : i.formatter.call(e, this),
                        });
                        let a = this.anchor(e),
                            r = this.position(a);
                        r
                            ? ((n.alignAttr = r),
                              (r.anchorX = a.absolutePosition.x),
                              (r.anchorY = a.absolutePosition.y),
                              n[t ? "animate" : "attr"](r))
                            : n.attr({ x: 0, y: -9999 }),
                            (n.placed = !!r),
                            super.redraw(t);
                    }
                    anchor(t) {
                        let i = super.anchor.apply(this, arguments),
                            s = this.options.x || 0,
                            n = this.options.y || 0;
                        return (
                            (i.absolutePosition.x -= s),
                            (i.absolutePosition.y -= n),
                            (i.relativePosition.x -= s),
                            (i.relativePosition.y -= n),
                            i
                        );
                    }
                    position(t) {
                        let i = this.graphic,
                            s = this.annotation.chart,
                            e = s.tooltip,
                            o = this.points[0],
                            a = this.options,
                            l = t.absolutePosition,
                            p = t.relativePosition,
                            c,
                            u,
                            x,
                            g,
                            y =
                                o.series.visible &&
                                n.prototype.isInsidePlot.call(o);
                        if (i && y) {
                            let { width: t = 0, height: n = 0 } = i;
                            a.distance && e
                                ? (c = e.getPosition.call(
                                      {
                                          chart: s,
                                          distance: h(a.distance, 16),
                                          getPlayingField: e.getPlayingField,
                                      },
                                      t,
                                      n,
                                      {
                                          plotX: p.x,
                                          plotY: p.y,
                                          negative: o.negative,
                                          ttBelow: o.ttBelow,
                                          h: p.height || p.width,
                                      }
                                  ))
                                : a.positioner
                                ? (c = a.positioner.call(this))
                                : ((u = {
                                      x: l.x,
                                      y: l.y,
                                      width: 0,
                                      height: 0,
                                  }),
                                  (c = d.alignedPosition(
                                      r(a, { width: t, height: n }),
                                      u
                                  )),
                                  "justify" === this.options.overflow &&
                                      (c = d.alignedPosition(
                                          d.justifiedOptions(s, i, a, c),
                                          u
                                      ))),
                                a.crop &&
                                    ((x = c.x - s.plotLeft),
                                    (g = c.y - s.plotTop),
                                    (y =
                                        s.isInsidePlot(x, g) &&
                                        s.isInsidePlot(x + t, g + n)));
                        }
                        return y ? c : null;
                    }
                }
                return (
                    (d.attrsMap = {
                        backgroundColor: "fill",
                        borderColor: "stroke",
                        borderWidth: "stroke-width",
                        zIndex: "zIndex",
                        borderRadius: "r",
                        padding: "padding",
                    }),
                    (d.shapesWithoutBackground = ["connector"]),
                    d
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Controllables/ControllableImage.js",
            [
                i["Extensions/Annotations/Controllables/Controllable.js"],
                i["Extensions/Annotations/Controllables/ControllableLabel.js"],
            ],
            function (t, i) {
                class s extends t {
                    constructor(t, i, s) {
                        super(t, i, s, "shape"),
                            (this.type = "image"),
                            (this.translate = super.translateShape);
                    }
                    render(t) {
                        let i = this.attrsFromOptions(this.options),
                            s = this.options;
                        (this.graphic = this.annotation.chart.renderer
                            .image(s.src, 0, -9e9, s.width, s.height)
                            .attr(i)
                            .add(t)),
                            (this.graphic.width = s.width),
                            (this.graphic.height = s.height),
                            super.render();
                    }
                    redraw(t) {
                        if (this.graphic) {
                            let s = this.anchor(this.points[0]),
                                n = i.prototype.position.call(this, s);
                            n
                                ? this.graphic[t ? "animate" : "attr"]({
                                      x: n.x,
                                      y: n.y,
                                  })
                                : this.graphic.attr({ x: 0, y: -9e9 }),
                                (this.graphic.placed = !!n);
                        }
                        super.redraw(t);
                    }
                }
                return (
                    (s.attrsMap = {
                        width: "width",
                        height: "height",
                        zIndex: "zIndex",
                    }),
                    s
                );
            }
        ),
        s(i, "Core/Chart/ChartNavigationComposition.js", [], function () {
            var t;
            return (
                (function (t) {
                    t.compose = function (t) {
                        return t.navigation || (t.navigation = new i(t)), t;
                    };
                    class i {
                        constructor(t) {
                            (this.updates = []), (this.chart = t);
                        }
                        addUpdate(t) {
                            this.chart.navigation.updates.push(t);
                        }
                        update(t, i) {
                            this.updates.forEach((s) => {
                                s.call(this.chart, t, i);
                            });
                        }
                    }
                    t.Additions = i;
                })(t || (t = {})),
                t
            );
        }),
        s(
            i,
            "Extensions/Annotations/NavigationBindingsUtilities.js",
            [i["Core/Utilities.js"]],
            function (t) {
                let { defined: i, isNumber: s, pick: n } = t,
                    e = {
                        backgroundColor: "string",
                        borderColor: "string",
                        borderRadius: "string",
                        color: "string",
                        fill: "string",
                        fontSize: "string",
                        labels: "string",
                        name: "string",
                        stroke: "string",
                        title: "string",
                    };
                return {
                    annotationsFieldsTypes: e,
                    getAssignedAxis: function (t) {
                        return t.filter((t) => {
                            let i = t.axis.getExtremes(),
                                e = i.min,
                                o = i.max,
                                a = n(t.axis.minPointOffset, 0);
                            return (
                                s(e) &&
                                s(o) &&
                                t.value >= e - a &&
                                t.value <= o + a &&
                                !t.axis.options.isInternal
                            );
                        })[0];
                    },
                    getFieldType: function (t, s) {
                        let n = e[t],
                            o = typeof s;
                        return (
                            i(n) && (o = n),
                            {
                                string: "text",
                                number: "number",
                                boolean: "checkbox",
                            }[o]
                        );
                    },
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/NavigationBindingsDefaults.js",
            [
                i["Extensions/Annotations/NavigationBindingsUtilities.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i) {
                let { getAssignedAxis: s } = t,
                    { isNumber: n, merge: e } = i;
                return {
                    lang: {
                        navigation: {
                            popup: {
                                simpleShapes: "Simple shapes",
                                lines: "Lines",
                                circle: "Circle",
                                ellipse: "Ellipse",
                                rectangle: "Rectangle",
                                label: "Label",
                                shapeOptions: "Shape options",
                                typeOptions: "Details",
                                fill: "Fill",
                                format: "Text",
                                strokeWidth: "Line width",
                                stroke: "Line color",
                                title: "Title",
                                name: "Name",
                                labelOptions: "Label options",
                                labels: "Labels",
                                backgroundColor: "Background color",
                                backgroundColors: "Background colors",
                                borderColor: "Border color",
                                borderRadius: "Border radius",
                                borderWidth: "Border width",
                                style: "Style",
                                padding: "Padding",
                                fontSize: "Font size",
                                color: "Color",
                                height: "Height",
                                shapes: "Shape options",
                            },
                        },
                    },
                    navigation: {
                        bindingsClassName: "highcharts-bindings-container",
                        bindings: {
                            circleAnnotation: {
                                className: "highcharts-circle-annotation",
                                start: function (t) {
                                    let i =
                                            this.chart.pointer.getCoordinates(
                                                t
                                            ),
                                        n = s(i.xAxis),
                                        o = s(i.yAxis),
                                        a = this.chart.options.navigation;
                                    if (n && o)
                                        return this.chart.addAnnotation(
                                            e(
                                                {
                                                    langKey: "circle",
                                                    type: "basicAnnotation",
                                                    shapes: [
                                                        {
                                                            type: "circle",
                                                            point: {
                                                                x: n.value,
                                                                y: o.value,
                                                                xAxis: n.axis
                                                                    .index,
                                                                yAxis: o.axis
                                                                    .index,
                                                            },
                                                            r: 5,
                                                        },
                                                    ],
                                                },
                                                a.annotationsOptions,
                                                a.bindings.circleAnnotation
                                                    .annotationsOptions
                                            )
                                        );
                                },
                                steps: [
                                    function (t, i) {
                                        let s;
                                        let e = i.options.shapes,
                                            o = (e && e[0] && e[0].point) || {};
                                        if (n(o.xAxis) && n(o.yAxis)) {
                                            let i = this.chart.inverted,
                                                n = this.chart.xAxis[
                                                    o.xAxis
                                                ].toPixels(o.x),
                                                e = this.chart.yAxis[
                                                    o.yAxis
                                                ].toPixels(o.y);
                                            s = Math.max(
                                                Math.sqrt(
                                                    Math.pow(
                                                        i
                                                            ? e - t.chartX
                                                            : n - t.chartX,
                                                        2
                                                    ) +
                                                        Math.pow(
                                                            i
                                                                ? n - t.chartY
                                                                : e - t.chartY,
                                                            2
                                                        )
                                                ),
                                                5
                                            );
                                        }
                                        i.update({ shapes: [{ r: s }] });
                                    },
                                ],
                            },
                            ellipseAnnotation: {
                                className: "highcharts-ellipse-annotation",
                                start: function (t) {
                                    let i =
                                            this.chart.pointer.getCoordinates(
                                                t
                                            ),
                                        n = s(i.xAxis),
                                        o = s(i.yAxis),
                                        a = this.chart.options.navigation;
                                    if (n && o)
                                        return this.chart.addAnnotation(
                                            e(
                                                {
                                                    langKey: "ellipse",
                                                    type: "basicAnnotation",
                                                    shapes: [
                                                        {
                                                            type: "ellipse",
                                                            xAxis: n.axis.index,
                                                            yAxis: o.axis.index,
                                                            points: [
                                                                {
                                                                    x: n.value,
                                                                    y: o.value,
                                                                },
                                                                {
                                                                    x: n.value,
                                                                    y: o.value,
                                                                },
                                                            ],
                                                            ry: 1,
                                                        },
                                                    ],
                                                },
                                                a.annotationsOptions,
                                                a.bindings.ellipseAnnotation
                                                    .annotationOptions
                                            )
                                        );
                                },
                                steps: [
                                    function (t, i) {
                                        let s = i.shapes[0],
                                            n = s.getAbsolutePosition(
                                                s.points[1]
                                            );
                                        s.translatePoint(
                                            t.chartX - n.x,
                                            t.chartY - n.y,
                                            1
                                        ),
                                            s.redraw(!1);
                                    },
                                    function (t, i) {
                                        let s = i.shapes[0],
                                            n = s.getAbsolutePosition(
                                                s.points[0]
                                            ),
                                            e = s.getAbsolutePosition(
                                                s.points[1]
                                            ),
                                            o = s.getDistanceFromLine(
                                                n,
                                                e,
                                                t.chartX,
                                                t.chartY
                                            ),
                                            a = s.getYAxis(),
                                            r = Math.abs(
                                                a.toValue(0) - a.toValue(o)
                                            );
                                        s.setYRadius(r), s.redraw(!1);
                                    },
                                ],
                            },
                            rectangleAnnotation: {
                                className: "highcharts-rectangle-annotation",
                                start: function (t) {
                                    let i =
                                            this.chart.pointer.getCoordinates(
                                                t
                                            ),
                                        n = s(i.xAxis),
                                        o = s(i.yAxis);
                                    if (!n || !o) return;
                                    let a = n.value,
                                        r = o.value,
                                        l = n.axis.index,
                                        h = o.axis.index,
                                        p = this.chart.options.navigation;
                                    return this.chart.addAnnotation(
                                        e(
                                            {
                                                langKey: "rectangle",
                                                type: "basicAnnotation",
                                                shapes: [
                                                    {
                                                        type: "path",
                                                        points: [
                                                            {
                                                                xAxis: l,
                                                                yAxis: h,
                                                                x: a,
                                                                y: r,
                                                            },
                                                            {
                                                                xAxis: l,
                                                                yAxis: h,
                                                                x: a,
                                                                y: r,
                                                            },
                                                            {
                                                                xAxis: l,
                                                                yAxis: h,
                                                                x: a,
                                                                y: r,
                                                            },
                                                            {
                                                                xAxis: l,
                                                                yAxis: h,
                                                                x: a,
                                                                y: r,
                                                            },
                                                            { command: "Z" },
                                                        ],
                                                    },
                                                ],
                                            },
                                            p.annotationsOptions,
                                            p.bindings.rectangleAnnotation
                                                .annotationsOptions
                                        )
                                    );
                                },
                                steps: [
                                    function (t, i) {
                                        let n = i.options.shapes,
                                            e =
                                                (n && n[0] && n[0].points) ||
                                                [],
                                            o =
                                                this.chart.pointer.getCoordinates(
                                                    t
                                                ),
                                            a = s(o.xAxis),
                                            r = s(o.yAxis);
                                        if (a && r) {
                                            let t = a.value,
                                                s = r.value;
                                            (e[1].x = t),
                                                (e[2].x = t),
                                                (e[2].y = s),
                                                (e[3].y = s),
                                                i.update({
                                                    shapes: [{ points: e }],
                                                });
                                        }
                                    },
                                ],
                            },
                            labelAnnotation: {
                                className: "highcharts-label-annotation",
                                start: function (t) {
                                    let i =
                                            this.chart.pointer.getCoordinates(
                                                t
                                            ),
                                        n = s(i.xAxis),
                                        o = s(i.yAxis),
                                        a = this.chart.options.navigation;
                                    if (n && o)
                                        return this.chart.addAnnotation(
                                            e(
                                                {
                                                    langKey: "label",
                                                    type: "basicAnnotation",
                                                    labelOptions: {
                                                        format: "{y:.2f}",
                                                        overflow: "none",
                                                        crop: !0,
                                                    },
                                                    labels: [
                                                        {
                                                            point: {
                                                                xAxis: n.axis
                                                                    .index,
                                                                yAxis: o.axis
                                                                    .index,
                                                                x: n.value,
                                                                y: o.value,
                                                            },
                                                        },
                                                    ],
                                                },
                                                a.annotationsOptions,
                                                a.bindings.labelAnnotation
                                                    .annotationsOptions
                                            )
                                        );
                                },
                            },
                        },
                        events: {},
                        annotationsOptions: { animation: { defer: 0 } },
                    },
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/NavigationBindings.js",
            [
                i["Core/Chart/ChartNavigationComposition.js"],
                i["Core/Defaults.js"],
                i["Core/Templating.js"],
                i["Core/Globals.js"],
                i["Extensions/Annotations/NavigationBindingsDefaults.js"],
                i["Extensions/Annotations/NavigationBindingsUtilities.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n, e, o, a) {
                let { setOptions: r } = i,
                    { format: l } = s,
                    { composed: h, doc: p, win: c } = n,
                    { getFieldType: d } = o,
                    {
                        addEvent: u,
                        attr: x,
                        defined: g,
                        fireEvent: y,
                        isArray: f,
                        isFunction: m,
                        isNumber: A,
                        isObject: b,
                        merge: v,
                        objectEach: P,
                        pick: C,
                        pushUnique: E,
                    } = a;
                function M() {
                    this.chart.navigationBindings &&
                        this.chart.navigationBindings.deselectAnnotation();
                }
                function O() {
                    this.navigationBindings &&
                        this.navigationBindings.destroy();
                }
                function k() {
                    let t = this.options;
                    t &&
                        t.navigation &&
                        t.navigation.bindings &&
                        ((this.navigationBindings = new L(this, t.navigation)),
                        this.navigationBindings.initEvents(),
                        this.navigationBindings.initUpdate());
                }
                function w() {
                    let t = this.navigationBindings,
                        i = "highcharts-disabled-btn";
                    if (this && t) {
                        let s = !1;
                        if (
                            (this.series.forEach((t) => {
                                !t.options.isInternal && t.visible && (s = !0);
                            }),
                            this.navigationBindings &&
                                this.navigationBindings.container &&
                                this.navigationBindings.container[0])
                        ) {
                            let n = this.navigationBindings.container[0];
                            P(t.boundClassNames, (t, e) => {
                                let o = n.querySelectorAll("." + e);
                                if (o)
                                    for (let n = 0; n < o.length; n++) {
                                        let e = o[n],
                                            a = e.className;
                                        "normal" === t.noDataState
                                            ? -1 !== a.indexOf(i) &&
                                              e.classList.remove(i)
                                            : s
                                            ? -1 !== a.indexOf(i) &&
                                              e.classList.remove(i)
                                            : -1 === a.indexOf(i) &&
                                              (e.className += " " + i);
                                    }
                            });
                        }
                    }
                }
                function j() {
                    this.deselectAnnotation();
                }
                function T() {
                    this.selectedButtonElement = null;
                }
                function B(t) {
                    let i, s;
                    let n =
                        t.prototype.defaultOptions.events &&
                        t.prototype.defaultOptions.events.click;
                    function e(t) {
                        let i = this,
                            s = i.chart.navigationBindings,
                            e = s.activeAnnotation;
                        n && n.call(i, t),
                            e !== i
                                ? (s.deselectAnnotation(),
                                  (s.activeAnnotation = i),
                                  i.setControlPointsVisibility(!0),
                                  y(s, "showPopup", {
                                      annotation: i,
                                      formType: "annotation-toolbar",
                                      options: s.annotationToFields(i),
                                      onSubmit: function (t) {
                                          if ("remove" === t.actionType)
                                              (s.activeAnnotation = !1),
                                                  s.chart.removeAnnotation(i);
                                          else {
                                              let n = {};
                                              s.fieldsToOptions(t.fields, n),
                                                  s.deselectAnnotation();
                                              let e = n.typeOptions;
                                              "measure" === i.options.type &&
                                                  ((e.crosshairY.enabled =
                                                      0 !==
                                                      e.crosshairY.strokeWidth),
                                                  (e.crosshairX.enabled =
                                                      0 !==
                                                      e.crosshairX
                                                          .strokeWidth)),
                                                  i.update(n);
                                          }
                                      },
                                  }))
                                : y(s, "closePopup"),
                            (t.activeAnnotation = !0);
                    }
                    v(!0, t.prototype.defaultOptions.events, {
                        click: e,
                        touchstart: function (t) {
                            (i = t.touches[0].clientX),
                                (s = t.touches[0].clientY);
                        },
                        touchend: function (t) {
                            let n =
                                !!i &&
                                Math.sqrt(
                                    Math.pow(
                                        i - t.changedTouches[0].clientX,
                                        2
                                    ) +
                                        Math.pow(
                                            s - t.changedTouches[0].clientY,
                                            2
                                        )
                                ) >= 4;
                            n || e.call(this, t);
                        },
                    });
                }
                class L {
                    static compose(t, i) {
                        E(h, this.compose) &&
                            (u(t, "remove", M),
                            B(t),
                            P(t.types, (t) => {
                                B(t);
                            }),
                            u(i, "destroy", O),
                            u(i, "load", k),
                            u(i, "render", w),
                            u(L, "closePopup", j),
                            u(L, "deselectButton", T),
                            r(e));
                    }
                    constructor(t, i) {
                        (this.boundClassNames = void 0),
                            (this.chart = t),
                            (this.options = i),
                            (this.eventsToUnbind = []),
                            (this.container =
                                this.chart.container.getElementsByClassName(
                                    this.options.bindingsClassName || ""
                                )),
                            this.container.length ||
                                (this.container = p.getElementsByClassName(
                                    this.options.bindingsClassName || ""
                                ));
                    }
                    initEvents() {
                        let t = this,
                            i = t.chart,
                            s = t.container,
                            e = t.options;
                        (t.boundClassNames = {}),
                            P(e.bindings || {}, (i) => {
                                t.boundClassNames[i.className] = i;
                            }),
                            [].forEach.call(s, (i) => {
                                t.eventsToUnbind.push(
                                    u(i, "click", (s) => {
                                        let n = t.getButtonEvents(i, s);
                                        n &&
                                            !n.button.classList.contains(
                                                "highcharts-disabled-btn"
                                            ) &&
                                            t.bindingsButtonClick(
                                                n.button,
                                                n.events,
                                                s
                                            );
                                    })
                                );
                            }),
                            P(e.events || {}, (i, s) => {
                                m(i) &&
                                    t.eventsToUnbind.push(
                                        u(t, s, i, { passive: !1 })
                                    );
                            }),
                            t.eventsToUnbind.push(
                                u(i.container, "click", function (s) {
                                    !i.cancelClick &&
                                        i.isInsidePlot(
                                            s.chartX - i.plotLeft,
                                            s.chartY - i.plotTop,
                                            { visiblePlotOnly: !0 }
                                        ) &&
                                        t.bindingsChartClick(this, s);
                                })
                            ),
                            t.eventsToUnbind.push(
                                u(
                                    i.container,
                                    n.isTouchDevice ? "touchmove" : "mousemove",
                                    function (i) {
                                        t.bindingsContainerMouseMove(this, i);
                                    },
                                    n.isTouchDevice ? { passive: !1 } : void 0
                                )
                            );
                    }
                    initUpdate() {
                        let i = this;
                        t.compose(this.chart).navigation.addUpdate((t) => {
                            i.update(t);
                        });
                    }
                    bindingsButtonClick(t, i, s) {
                        let n = this.chart,
                            e = n.renderer.boxWrapper,
                            o = !0;
                        this.selectedButtonElement &&
                            (this.selectedButtonElement.classList ===
                                t.classList && (o = !1),
                            y(this, "deselectButton", {
                                button: this.selectedButtonElement,
                            }),
                            this.nextEvent &&
                                (this.currentUserDetails &&
                                    "annotations" ===
                                        this.currentUserDetails.coll &&
                                    n.removeAnnotation(this.currentUserDetails),
                                (this.mouseMoveEvent = this.nextEvent = !1))),
                            o
                                ? ((this.selectedButton = i),
                                  (this.selectedButtonElement = t),
                                  y(this, "selectButton", { button: t }),
                                  i.init && i.init.call(this, t, s),
                                  (i.start || i.steps) &&
                                      n.renderer.boxWrapper.addClass(
                                          "highcharts-draw-mode"
                                      ))
                                : (n.stockTools &&
                                      n.stockTools.toggleButtonActiveClass(t),
                                  e.removeClass("highcharts-draw-mode"),
                                  (this.nextEvent = !1),
                                  (this.mouseMoveEvent = !1),
                                  (this.selectedButton = null));
                    }
                    bindingsChartClick(t, i) {
                        t = this.chart;
                        let s = this.activeAnnotation,
                            n = this.selectedButton,
                            e = t.renderer.boxWrapper;
                        s &&
                            (s.cancelClick ||
                            i.activeAnnotation ||
                            !i.target.parentNode ||
                            (function (t, i) {
                                let s = c.Element.prototype,
                                    n =
                                        s.matches ||
                                        s.msMatchesSelector ||
                                        s.webkitMatchesSelector,
                                    e = null;
                                if (s.closest) e = s.closest.call(t, i);
                                else
                                    do {
                                        if (n.call(t, i)) return t;
                                        t = t.parentElement || t.parentNode;
                                    } while (null !== t && 1 === t.nodeType);
                                return e;
                            })(i.target, ".highcharts-popup")
                                ? s.cancelClick &&
                                  setTimeout(() => {
                                      s.cancelClick = !1;
                                  }, 0)
                                : y(this, "closePopup")),
                            n &&
                                n.start &&
                                (this.nextEvent
                                    ? (this.nextEvent(
                                          i,
                                          this.currentUserDetails
                                      ),
                                      this.steps &&
                                          (this.stepIndex++,
                                          n.steps[this.stepIndex]
                                              ? (this.mouseMoveEvent =
                                                    this.nextEvent =
                                                        n.steps[this.stepIndex])
                                              : (y(this, "deselectButton", {
                                                    button: this
                                                        .selectedButtonElement,
                                                }),
                                                e.removeClass(
                                                    "highcharts-draw-mode"
                                                ),
                                                n.end &&
                                                    n.end.call(
                                                        this,
                                                        i,
                                                        this.currentUserDetails
                                                    ),
                                                (this.nextEvent = !1),
                                                (this.mouseMoveEvent = !1),
                                                (this.selectedButton = null))))
                                    : ((this.currentUserDetails = n.start.call(
                                          this,
                                          i
                                      )),
                                      this.currentUserDetails && n.steps
                                          ? ((this.stepIndex = 0),
                                            (this.steps = !0),
                                            (this.mouseMoveEvent =
                                                this.nextEvent =
                                                    n.steps[this.stepIndex]))
                                          : (y(this, "deselectButton", {
                                                button: this
                                                    .selectedButtonElement,
                                            }),
                                            e.removeClass(
                                                "highcharts-draw-mode"
                                            ),
                                            (this.steps = !1),
                                            (this.selectedButton = null),
                                            n.end &&
                                                n.end.call(
                                                    this,
                                                    i,
                                                    this.currentUserDetails
                                                ))));
                    }
                    bindingsContainerMouseMove(t, i) {
                        this.mouseMoveEvent &&
                            this.mouseMoveEvent(i, this.currentUserDetails);
                    }
                    fieldsToOptions(t, i) {
                        return (
                            P(t, (t, s) => {
                                let n = parseFloat(t),
                                    e = s.split("."),
                                    o = e.length - 1;
                                if (
                                    (!A(n) ||
                                        t.match(/px|em/g) ||
                                        s.match(/format/g) ||
                                        (t = n),
                                    "undefined" !== t)
                                ) {
                                    let s = i;
                                    e.forEach((i, n) => {
                                        let a = C(e[n + 1], "");
                                        o === n
                                            ? (s[i] = t)
                                            : (s[i] ||
                                                  (s[i] = a.match(/\d/g)
                                                      ? []
                                                      : {}),
                                              (s = s[i]));
                                    });
                                }
                            }),
                            i
                        );
                    }
                    deselectAnnotation() {
                        this.activeAnnotation &&
                            (this.activeAnnotation.setControlPointsVisibility(
                                !1
                            ),
                            (this.activeAnnotation = !1));
                    }
                    annotationToFields(t) {
                        let i = t.options,
                            s = L.annotationsEditable,
                            n = s.nestedOptions,
                            e = C(
                                i.type,
                                i.shapes && i.shapes[0] && i.shapes[0].type,
                                i.labels && i.labels[0] && i.labels[0].type,
                                "label"
                            ),
                            o = L.annotationsNonEditable[i.langKey] || [],
                            a = { langKey: i.langKey, type: e };
                        function r(i, s, e, a, h) {
                            let p;
                            e &&
                                g(i) &&
                                -1 === o.indexOf(s) &&
                                ((e.indexOf && e.indexOf(s)) >= 0 ||
                                    e[s] ||
                                    !0 === e) &&
                                (f(i)
                                    ? ((a[s] = []),
                                      i.forEach((t, i) => {
                                          b(t)
                                              ? ((a[s][i] = {}),
                                                P(t, (t, e) => {
                                                    r(t, e, n[s], a[s][i], s);
                                                }))
                                              : r(t, 0, n[s], a[s], s);
                                      }))
                                    : b(i)
                                    ? ((p = {}),
                                      f(a)
                                          ? (a.push(p), (p[s] = {}), (p = p[s]))
                                          : (a[s] = p),
                                      P(i, (t, i) => {
                                          r(t, i, 0 === s ? e : n[s], p, s);
                                      }))
                                    : "format" === s
                                    ? (a[s] = [
                                          l(
                                              i,
                                              t.labels[0].points[0]
                                          ).toString(),
                                          "text",
                                      ])
                                    : f(a)
                                    ? a.push([i, d(h, i)])
                                    : (a[s] = [i, d(s, i)]));
                        }
                        return (
                            P(i, (t, o) => {
                                "typeOptions" === o
                                    ? ((a[o] = {}),
                                      P(i[o], (t, i) => {
                                          r(t, i, n, a[o], i);
                                      }))
                                    : r(t, o, s[e], a, o);
                            }),
                            a
                        );
                    }
                    getClickedClassNames(t, i) {
                        let s = i.target,
                            n = [],
                            e;
                        for (
                            ;
                            s &&
                            s.tagName &&
                            ((e = x(s, "class")) &&
                                (n = n.concat(e.split(" ").map((t) => [t, s]))),
                            (s = s.parentNode) !== t);

                        );
                        return n;
                    }
                    getButtonEvents(t, i) {
                        let s;
                        let n = this,
                            e = this.getClickedClassNames(t, i);
                        return (
                            e.forEach((t) => {
                                n.boundClassNames[t[0]] &&
                                    !s &&
                                    (s = {
                                        events: n.boundClassNames[t[0]],
                                        button: t[1],
                                    });
                            }),
                            s
                        );
                    }
                    update(t) {
                        (this.options = v(!0, this.options, t)),
                            this.removeEvents(),
                            this.initEvents();
                    }
                    removeEvents() {
                        this.eventsToUnbind.forEach((t) => t());
                    }
                    destroy() {
                        this.removeEvents();
                    }
                }
                return (
                    (L.annotationsEditable = {
                        nestedOptions: {
                            labelOptions: [
                                "style",
                                "format",
                                "backgroundColor",
                            ],
                            labels: ["style"],
                            label: ["style"],
                            style: ["fontSize", "color"],
                            background: ["fill", "strokeWidth", "stroke"],
                            innerBackground: ["fill", "strokeWidth", "stroke"],
                            outerBackground: ["fill", "strokeWidth", "stroke"],
                            shapeOptions: ["fill", "strokeWidth", "stroke"],
                            shapes: ["fill", "strokeWidth", "stroke"],
                            line: ["strokeWidth", "stroke"],
                            backgroundColors: [!0],
                            connector: ["fill", "strokeWidth", "stroke"],
                            crosshairX: ["strokeWidth", "stroke"],
                            crosshairY: ["strokeWidth", "stroke"],
                        },
                        circle: ["shapes"],
                        ellipse: ["shapes"],
                        verticalLine: [],
                        label: ["labelOptions"],
                        measure: ["background", "crosshairY", "crosshairX"],
                        fibonacci: [],
                        tunnel: ["background", "line", "height"],
                        pitchfork: ["innerBackground", "outerBackground"],
                        rect: ["shapes"],
                        crookedLine: [],
                        basicAnnotation: ["shapes", "labelOptions"],
                    }),
                    (L.annotationsNonEditable = {
                        rectangle: ["crosshairX", "crosshairY", "labelOptions"],
                        ellipse: ["labelOptions"],
                        circle: ["labelOptions"],
                    }),
                    L
                );
            }
        ),
        s(
            i,
            "Shared/BaseForm.js",
            [i["Core/Renderer/HTML/AST.js"], i["Core/Utilities.js"]],
            function (t, i) {
                let { addEvent: s, createElement: n } = i;
                return class {
                    constructor(t, i) {
                        (this.iconsURL = i),
                            (this.container = this.createPopupContainer(t)),
                            (this.closeButton = this.addCloseButton());
                    }
                    createPopupContainer(
                        t,
                        i = "highcharts-popup highcharts-no-tooltip"
                    ) {
                        return n("div", { className: i }, void 0, t);
                    }
                    addCloseButton(t = "highcharts-popup-close") {
                        let i = this,
                            e = this.iconsURL,
                            o = n(
                                "div",
                                { className: t },
                                void 0,
                                this.container
                            );
                        return (
                            (o.style["background-image"] =
                                "url(" +
                                (e.match(/png|svg|jpeg|jpg|gif/gi)
                                    ? e
                                    : e + "close.svg") +
                                ")"),
                            ["click", "touchstart"].forEach((t) => {
                                s(o, t, i.closeButtonEvents.bind(i));
                            }),
                            s(document, "keydown", function (t) {
                                "Escape" === t.code && i.closeButtonEvents();
                            }),
                            o
                        );
                    }
                    closeButtonEvents() {
                        this.closePopup();
                    }
                    showPopup(i = "highcharts-annotation-toolbar") {
                        let s = this.container,
                            n = this.closeButton;
                        (this.type = void 0),
                            (s.innerHTML = t.emptyHTML),
                            s.className.indexOf(i) >= 0 &&
                                (s.classList.remove(i),
                                s.removeAttribute("style")),
                            s.appendChild(n),
                            (s.style.display = "block"),
                            (s.style.height = "");
                    }
                    closePopup() {
                        this.container.style.display = "none";
                    }
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/Popup/PopupAnnotations.js",
            [i["Core/Globals.js"], i["Core/Utilities.js"]],
            function (t, i) {
                let { doc: s, isFirefox: n } = t,
                    {
                        createElement: e,
                        isArray: o,
                        isObject: a,
                        objectEach: r,
                        pick: l,
                        stableSort: h,
                    } = i;
                function p(t, i, l, c, d, u) {
                    let x, g;
                    if (!i) return;
                    let y = this.addInput,
                        f = this.lang;
                    r(c, (s, n) => {
                        (x = "" !== l ? l + "." + n : n),
                            a(s) &&
                                (!o(s) || (o(s) && a(s[0]))
                                    ? ((g = f[n] || n).match(/\d/g) ||
                                          d.push([!0, g, t]),
                                      p.call(this, t, i, x, s, d, !1))
                                    : d.push([this, x, "annotation", t, s]));
                    }),
                        u &&
                            (h(d, (t) => (t[1].match(/format/g) ? -1 : 1)),
                            n && d.reverse(),
                            d.forEach((t) => {
                                !0 === t[0]
                                    ? e(
                                          "span",
                                          {
                                              className:
                                                  "highcharts-annotation-title",
                                          },
                                          void 0,
                                          t[2]
                                      ).appendChild(s.createTextNode(t[1]))
                                    : ((t[4] = {
                                          value: t[4][0],
                                          type: t[4][1],
                                      }),
                                      y.apply(t[0], t.splice(1)));
                            }));
                }
                return {
                    addForm: function (t, i, n, o) {
                        if (!t) return;
                        let a = this.container,
                            r = this.lang,
                            l = e(
                                "h2",
                                { className: "highcharts-popup-main-title" },
                                void 0,
                                a
                            );
                        l.appendChild(
                            s.createTextNode(r[i.langKey] || i.langKey || "")
                        ),
                            (l = e(
                                "div",
                                {
                                    className:
                                        "highcharts-popup-lhs-col highcharts-popup-lhs-full",
                                },
                                void 0,
                                a
                            ));
                        let h = e(
                            "div",
                            { className: "highcharts-popup-bottom-row" },
                            void 0,
                            a
                        );
                        p.call(this, l, t, "", i, [], !0),
                            this.addButton(
                                h,
                                o
                                    ? r.addButton || "Add"
                                    : r.saveButton || "Save",
                                o ? "add" : "save",
                                a,
                                n
                            );
                    },
                    addToolbar: function (t, i, n) {
                        let o = this.lang,
                            a = this.container,
                            r = this.showForm,
                            h = "highcharts-annotation-toolbar";
                        -1 === a.className.indexOf(h) &&
                            (a.className +=
                                " " + h + " highcharts-no-mousewheel"),
                            t && (a.style.top = t.plotTop + 10 + "px"),
                            e("span", void 0, void 0, a).appendChild(
                                s.createTextNode(
                                    l(
                                        o[i.langKey] || i.langKey,
                                        i.shapes && i.shapes[0].type,
                                        ""
                                    )
                                )
                            );
                        let p = this.addButton(
                            a,
                            o.removeButton || "Remove",
                            "remove",
                            a,
                            n
                        );
                        (p.className += " highcharts-annotation-remove-button"),
                            (p.style["background-image"] =
                                "url(" + this.iconsURL + "destroy.svg)"),
                            (p = this.addButton(
                                a,
                                o.editButton || "Edit",
                                "edit",
                                a,
                                () => {
                                    r.call(this, "annotation-edit", t, i, n);
                                }
                            )),
                            (p.className +=
                                " highcharts-annotation-edit-button"),
                            (p.style["background-image"] =
                                "url(" + this.iconsURL + "edit.svg)");
                    },
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/Popup/PopupIndicators.js",
            [
                i["Core/Renderer/HTML/AST.js"],
                i["Core/Globals.js"],
                i["Extensions/Annotations/NavigationBindingsUtilities.js"],
                i["Core/Series/SeriesRegistry.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n, e) {
                var o, a;
                let { doc: r } = i,
                    { annotationsFieldsTypes: l } = s,
                    { seriesTypes: h } = n,
                    {
                        addEvent: p,
                        createElement: c,
                        defined: d,
                        isArray: u,
                        isObject: x,
                        objectEach: g,
                        stableSort: y,
                    } = e;
                ((a = o || (o = {}))[(a["params.algorithm"] = 0)] =
                    "params.algorithm"),
                    (a[(a["params.average"] = 1)] = "params.average");
                let f = {
                    "algorithm-pivotpoints": [
                        "standard",
                        "fibonacci",
                        "camarilla",
                    ],
                    "average-disparityindex": [
                        "sma",
                        "ema",
                        "dema",
                        "tema",
                        "wma",
                    ],
                };
                function m(t) {
                    let i = c(
                            "div",
                            { className: "highcharts-popup-lhs-col" },
                            void 0,
                            t
                        ),
                        s = c(
                            "div",
                            { className: "highcharts-popup-rhs-col" },
                            void 0,
                            t
                        );
                    return (
                        c(
                            "div",
                            { className: "highcharts-popup-rhs-col-wrapper" },
                            void 0,
                            s
                        ),
                        { lhsCol: i, rhsCol: s }
                    );
                }
                function A(i, s, n, e) {
                    let o = s.params || s.options.params;
                    (e.innerHTML = t.emptyHTML),
                        c(
                            "h3",
                            { className: "highcharts-indicator-title" },
                            void 0,
                            e
                        ).appendChild(
                            r.createTextNode(k(s, n).indicatorFullName)
                        ),
                        c(
                            "input",
                            {
                                type: "hidden",
                                name: "highcharts-type-" + n,
                                value: n,
                            },
                            void 0,
                            e
                        ),
                        w.call(
                            this,
                            n,
                            "series",
                            i,
                            e,
                            s,
                            s.linkedParent && s.linkedParent.options.id
                        ),
                        o.volumeSeriesID &&
                            w.call(
                                this,
                                n,
                                "volume",
                                i,
                                e,
                                s,
                                s.linkedParent && o.volumeSeriesID
                            ),
                        v.call(this, i, "params", o, n, e);
                }
                function b(i, s, n, e) {
                    let o = this,
                        a = o.lang,
                        l = s.querySelectorAll(".highcharts-popup-lhs-col")[0],
                        h = s.querySelectorAll(".highcharts-popup-rhs-col")[0],
                        d = "edit" === n,
                        x = d ? i.series : i.options.plotOptions || {};
                    if (!i && x) return;
                    let g,
                        f = [];
                    d || u(x)
                        ? u(x) && (f = O.call(this, x))
                        : (f = M.call(this, x, e)),
                        y(f, (t, i) => {
                            let s = t.indicatorFullName.toLowerCase(),
                                n = i.indicatorFullName.toLowerCase();
                            return s < n ? -1 : s > n ? 1 : 0;
                        }),
                        l.children[1] && l.children[1].remove();
                    let m = c(
                            "ul",
                            { className: "highcharts-indicator-list" },
                            void 0,
                            l
                        ),
                        b = h.querySelectorAll(
                            ".highcharts-popup-rhs-col-wrapper"
                        )[0];
                    f.forEach((t) => {
                        let {
                            indicatorFullName: s,
                            indicatorType: n,
                            series: e,
                        } = t;
                        (g = c(
                            "li",
                            { className: "highcharts-indicator-list" },
                            void 0,
                            m
                        )).appendChild(r.createTextNode(s)),
                            ["click", "touchstart"].forEach((t) => {
                                p(g, t, function () {
                                    let t = b.parentNode.children[1];
                                    A.call(o, i, e, n, b),
                                        t && (t.style.display = "block"),
                                        d &&
                                            e.options &&
                                            c(
                                                "input",
                                                {
                                                    type: "hidden",
                                                    name: "highcharts-id-" + n,
                                                    value: e.options.id,
                                                },
                                                void 0,
                                                b
                                            ).setAttribute(
                                                "highcharts-data-series-id",
                                                e.options.id
                                            );
                                });
                            });
                    }),
                        m.childNodes.length > 0
                            ? m.childNodes[0].click()
                            : d ||
                              (t.setElementHTML(
                                  b.parentNode.children[0],
                                  a.noFilterMatch || ""
                              ),
                              (b.parentNode.children[1].style.display =
                                  "none"));
                }
                function v(t, i, s, n, e) {
                    if (!t) return;
                    let a = this.addInput;
                    g(s, (s, r) => {
                        l[r];
                        let h = i + "." + r;
                        if (d(s) && h) {
                            if (
                                (x(s) &&
                                    (a.call(this, h, n, e, {}),
                                    v.call(this, t, h, s, n, e)),
                                h in o)
                            ) {
                                let o = C.call(this, n, h, e);
                                E.call(this, t, i, o, n, r, s);
                            } else
                                "params.volumeSeriesID" === h ||
                                    u(s) ||
                                    a.call(this, h, n, e, {
                                        value: s,
                                        type: "number",
                                    });
                        }
                    });
                }
                function P(t, i) {
                    let s = this,
                        n = i.querySelectorAll(".highcharts-popup-lhs-col")[0],
                        e = this.lang.clearFilter,
                        o = c(
                            "div",
                            { className: "highcharts-input-wrapper" },
                            void 0,
                            n
                        ),
                        a = function (i) {
                            b.call(s, t, s.container, "add", i);
                        },
                        r = this.addInput("searchIndicators", "input", o, {
                            value: "",
                            type: "text",
                            htmlFor: "search-indicators",
                            labelClassName:
                                "highcharts-input-search-indicators-label",
                        }),
                        l = c("a", { textContent: e }, void 0, o);
                    r.classList.add("highcharts-input-search-indicators"),
                        l.classList.add("clear-filter-button"),
                        p(r, "input", function (t) {
                            a(this.value),
                                this.value.length
                                    ? (l.style.display = "inline-block")
                                    : (l.style.display = "none");
                        }),
                        ["click", "touchstart"].forEach((t) => {
                            p(l, t, function () {
                                (r.value = ""),
                                    a(""),
                                    (l.style.display = "none");
                            });
                        });
                }
                function C(t, i, s) {
                    let n = i.split("."),
                        e = n[n.length - 1],
                        o = "highcharts-" + i + "-type-" + t,
                        a = this.lang;
                    c("label", { htmlFor: o }, null, s).appendChild(
                        r.createTextNode(a[e] || i)
                    );
                    let l = c(
                        "select",
                        {
                            name: o,
                            className: "highcharts-popup-field",
                            id: "highcharts-select-" + i,
                        },
                        null,
                        s
                    );
                    return l.setAttribute("id", "highcharts-select-" + i), l;
                }
                function E(t, i, s, n, e, o, a) {
                    if ("series" === i || "volume" === i)
                        t.series.forEach((t) => {
                            let n = t.options,
                                e = n.name || n.params ? t.name : n.id || "";
                            "highcharts-navigator-series" !== n.id &&
                                n.id !== (a && a.options && a.options.id) &&
                                (d(o) ||
                                    "volume" !== i ||
                                    "column" !== t.type ||
                                    (o = n.id),
                                c(
                                    "option",
                                    { value: n.id },
                                    void 0,
                                    s
                                ).appendChild(r.createTextNode(e)));
                        });
                    else if (n && e) {
                        let t = f[e + "-" + n];
                        t.forEach((t) => {
                            c("option", { value: t }, void 0, s).appendChild(
                                r.createTextNode(t)
                            );
                        });
                    }
                    d(o) && (s.value = o);
                }
                function M(t, i) {
                    let s;
                    this.indicators;
                    let n = this.chart && this.chart.options.lang,
                        e =
                            n &&
                            n.navigation &&
                            n.navigation.popup &&
                            n.navigation.popup.indicatorAliases,
                        o = [];
                    return (
                        g(t, (t, n) => {
                            let a = t && t.options;
                            if (t.params || (a && a.params)) {
                                let { indicatorFullName: a, indicatorType: r } =
                                    k(t, n);
                                if (i) {
                                    let n = i.replace(
                                            /[.*+?^${}()|[\]\\]/g,
                                            "\\$&"
                                        ),
                                        l = RegExp(n, "i"),
                                        h = (e && e[r] && e[r].join(" ")) || "";
                                    (a.match(l) || h.match(l)) &&
                                        ((s = {
                                            indicatorFullName: a,
                                            indicatorType: r,
                                            series: t,
                                        }),
                                        o.push(s));
                                } else
                                    (s = {
                                        indicatorFullName: a,
                                        indicatorType: r,
                                        series: t,
                                    }),
                                        o.push(s);
                            }
                        }),
                        o
                    );
                }
                function O(t) {
                    let i = [];
                    return (
                        t.forEach((t) => {
                            t.is("sma") &&
                                i.push({
                                    indicatorFullName: t.name,
                                    indicatorType: t.type,
                                    series: t,
                                });
                        }),
                        i
                    );
                }
                function k(t, i) {
                    let s = t.options,
                        n =
                            (h[i] && h[i].prototype.nameBase) ||
                            i.toUpperCase(),
                        e = i;
                    return (
                        s && s.type && ((e = t.options.type), (n = t.name)),
                        { indicatorFullName: n, indicatorType: e }
                    );
                }
                function w(t, i, s, n, e, o) {
                    if ((this.indicators, !s)) return;
                    let a = C.call(this, t, i, n);
                    E.call(this, s, i, a, void 0, void 0, void 0, e),
                        d(o) && (a.value = o);
                }
                return {
                    addForm: function (t, i, s) {
                        let n;
                        let e = this.lang;
                        if (!t) return;
                        this.tabs.init.call(this, t);
                        let o = this.container.querySelectorAll(
                            ".highcharts-tab-item-content"
                        );
                        m(o[0]),
                            P.call(this, t, o[0]),
                            b.call(this, t, o[0], "add"),
                            (n = o[0].querySelectorAll(
                                ".highcharts-popup-rhs-col"
                            )[0]),
                            this.addButton(
                                n,
                                e.addButton || "add",
                                "add",
                                n,
                                s
                            ),
                            m(o[1]),
                            b.call(this, t, o[1], "edit"),
                            (n = o[1].querySelectorAll(
                                ".highcharts-popup-rhs-col"
                            )[0]),
                            this.addButton(
                                n,
                                e.saveButton || "save",
                                "edit",
                                n,
                                s
                            ),
                            this.addButton(
                                n,
                                e.removeButton || "remove",
                                "remove",
                                n,
                                s
                            );
                    },
                    getAmount: function () {
                        let t = 0;
                        return (
                            this.series.forEach((i) => {
                                (i.params || i.options.params) && t++;
                            }),
                            t
                        );
                    },
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/Popup/PopupTabs.js",
            [i["Core/Globals.js"], i["Core/Utilities.js"]],
            function (t, i) {
                let { doc: s } = t,
                    { addEvent: n, createElement: e } = i;
                function o() {
                    let t = this.container;
                    return e(
                        "div",
                        {
                            className:
                                "highcharts-tab-item-content highcharts-no-mousewheel",
                        },
                        void 0,
                        t
                    );
                }
                function a(t, i) {
                    let n = this.container,
                        o = this.lang,
                        a = "highcharts-tab-item";
                    0 === i && (a += " highcharts-tab-disabled");
                    let r = e("span", { className: a }, void 0, n);
                    return (
                        r.appendChild(s.createTextNode(o[t + "Button"] || t)),
                        r.setAttribute("highcharts-data-tab-type", t),
                        r
                    );
                }
                function r() {
                    let t = this.container,
                        i = t.querySelectorAll(".highcharts-tab-item"),
                        s = t.querySelectorAll(".highcharts-tab-item-content");
                    for (let t = 0; t < i.length; t++)
                        i[t].classList.remove("highcharts-tab-item-active"),
                            s[t].classList.remove("highcharts-tab-item-show");
                }
                function l(t, i) {
                    let s = this.container.querySelectorAll(
                        ".highcharts-tab-item-content"
                    );
                    (t.className += " highcharts-tab-item-active"),
                        (s[i].className += " highcharts-tab-item-show");
                }
                function h(t) {
                    let i = this,
                        s = this.container,
                        e = s.querySelectorAll(".highcharts-tab-item");
                    e.forEach((s, e) => {
                        (0 !== t ||
                            "edit" !==
                                s.getAttribute("highcharts-data-tab-type")) &&
                            ["click", "touchstart"].forEach((t) => {
                                n(s, t, function () {
                                    r.call(i), l.call(i, this, e);
                                });
                            });
                    });
                }
                return {
                    init: function (t) {
                        if (!t) return;
                        let i = this.indicators.getAmount.call(t),
                            s = a.call(this, "add");
                        a.call(this, "edit", i),
                            o.call(this),
                            o.call(this),
                            h.call(this, i),
                            l.call(this, s, 0);
                    },
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/Popup/Popup.js",
            [
                i["Shared/BaseForm.js"],
                i["Core/Globals.js"],
                i["Core/Defaults.js"],
                i["Extensions/Annotations/Popup/PopupAnnotations.js"],
                i["Extensions/Annotations/Popup/PopupIndicators.js"],
                i["Extensions/Annotations/Popup/PopupTabs.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n, e, o, a) {
                let { doc: r } = i,
                    { getOptions: l } = s,
                    {
                        addEvent: h,
                        createElement: p,
                        extend: c,
                        fireEvent: d,
                        pick: u,
                    } = a;
                class x extends t {
                    constructor(t, i, s) {
                        super(t, i),
                            (this.chart = s),
                            (this.lang =
                                (l().lang.navigation || {}).popup || {}),
                            h(this.container, "mousedown", () => {
                                let t =
                                    s &&
                                    s.navigationBindings &&
                                    s.navigationBindings.activeAnnotation;
                                if (t) {
                                    t.cancelClick = !0;
                                    let i = h(r, "click", () => {
                                        setTimeout(() => {
                                            t.cancelClick = !1;
                                        }, 0),
                                            i();
                                    });
                                }
                            });
                    }
                    addInput(t, i, s, n) {
                        let e = t.split("."),
                            o = e[e.length - 1],
                            a = this.lang,
                            l = "highcharts-" + i + "-" + u(n.htmlFor, o);
                        o.match(/^\d+$/) ||
                            p(
                                "label",
                                { htmlFor: l, className: n.labelClassName },
                                void 0,
                                s
                            ).appendChild(r.createTextNode(a[o] || o));
                        let h = p(
                            "input",
                            {
                                name: l,
                                value: n.value,
                                type: n.type,
                                className: "highcharts-popup-field",
                            },
                            void 0,
                            s
                        );
                        return h.setAttribute("highcharts-data-name", t), h;
                    }
                    closeButtonEvents() {
                        if (this.chart) {
                            let t = this.chart.navigationBindings;
                            d(t, "closePopup"),
                                t &&
                                    t.selectedButtonElement &&
                                    d(t, "deselectButton", {
                                        button: t.selectedButtonElement,
                                    });
                        } else super.closeButtonEvents();
                    }
                    addButton(t, i, s, n, e) {
                        let o = p("button", void 0, void 0, t);
                        return (
                            o.appendChild(r.createTextNode(i)),
                            e &&
                                ["click", "touchstart"].forEach((t) => {
                                    h(
                                        o,
                                        t,
                                        () => (
                                            this.closePopup(),
                                            e(
                                                (function (t, i) {
                                                    let s =
                                                            Array.prototype.slice.call(
                                                                t.querySelectorAll(
                                                                    "input"
                                                                )
                                                            ),
                                                        n =
                                                            Array.prototype.slice.call(
                                                                t.querySelectorAll(
                                                                    "select"
                                                                )
                                                            ),
                                                        e = t.querySelectorAll(
                                                            "#highcharts-select-series > option:checked"
                                                        )[0],
                                                        o = t.querySelectorAll(
                                                            "#highcharts-select-volume > option:checked"
                                                        )[0],
                                                        a = {
                                                            actionType: i,
                                                            linkedTo:
                                                                (e &&
                                                                    e.getAttribute(
                                                                        "value"
                                                                    )) ||
                                                                "",
                                                            fields: {},
                                                        };
                                                    return (
                                                        s.forEach((t) => {
                                                            let i =
                                                                    t.getAttribute(
                                                                        "highcharts-data-name"
                                                                    ),
                                                                s =
                                                                    t.getAttribute(
                                                                        "highcharts-data-series-id"
                                                                    );
                                                            s
                                                                ? (a.seriesId =
                                                                      t.value)
                                                                : i
                                                                ? (a.fields[i] =
                                                                      t.value)
                                                                : (a.type =
                                                                      t.value);
                                                        }),
                                                        n.forEach((t) => {
                                                            let i = t.id;
                                                            if (
                                                                "highcharts-select-series" !==
                                                                    i &&
                                                                "highcharts-select-volume" !==
                                                                    i
                                                            ) {
                                                                let s =
                                                                    i.split(
                                                                        "highcharts-select-"
                                                                    )[1];
                                                                a.fields[s] =
                                                                    t.value;
                                                            }
                                                        }),
                                                        o &&
                                                            (a.fields[
                                                                "params.volumeSeriesID"
                                                            ] =
                                                                o.getAttribute(
                                                                    "value"
                                                                ) || ""),
                                                        a
                                                    );
                                                })(n, s)
                                            )
                                        )
                                    );
                                }),
                            o
                        );
                    }
                    showForm(t, i, s, n) {
                        i &&
                            (this.showPopup(),
                            "indicators" === t &&
                                this.indicators.addForm.call(this, i, s, n),
                            "annotation-toolbar" === t &&
                                this.annotations.addToolbar.call(this, i, s, n),
                            "annotation-edit" === t &&
                                this.annotations.addForm.call(this, i, s, n),
                            "flag" === t &&
                                this.annotations.addForm.call(
                                    this,
                                    i,
                                    s,
                                    n,
                                    !0
                                ),
                            (this.type = t),
                            (this.container.style.height =
                                this.container.offsetHeight + "px"));
                    }
                }
                return (
                    c(x.prototype, { annotations: n, indicators: e, tabs: o }),
                    x
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Popup/PopupComposition.js",
            [
                i["Core/Globals.js"],
                i["Extensions/Annotations/Popup/Popup.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s) {
                let { composed: n } = t,
                    { addEvent: e, pushUnique: o, wrap: a } = s;
                function r() {
                    this.popup && this.popup.closePopup();
                }
                function l(t) {
                    this.popup ||
                        (this.popup = new i(
                            this.chart.container,
                            this.chart.options.navigation.iconsURL ||
                                (this.chart.options.stockTools &&
                                    this.chart.options.stockTools.gui
                                        .iconsURL) ||
                                "https://code.highcharts.com/11.3.0/gfx/stock-icons/",
                            this.chart
                        )),
                        this.popup.showForm(
                            t.formType,
                            this.chart,
                            t.options,
                            t.onSubmit
                        );
                }
                function h(t, i) {
                    this.inClass(i.target, "highcharts-popup") ||
                        t.apply(this, Array.prototype.slice.call(arguments, 1));
                }
                return {
                    compose: function t(i, s) {
                        o(n, t) &&
                            (e(i, "closePopup", r),
                            e(i, "showPopup", l),
                            a(s.prototype, "onContainerMouseDown", h));
                    },
                };
            }
        ),
        s(
            i,
            "Extensions/Annotations/Annotation.js",
            [
                i["Core/Animation/AnimationUtilities.js"],
                i["Extensions/Annotations/AnnotationChart.js"],
                i["Extensions/Annotations/AnnotationDefaults.js"],
                i["Extensions/Annotations/Controllables/ControllableRect.js"],
                i["Extensions/Annotations/Controllables/ControllableCircle.js"],
                i[
                    "Extensions/Annotations/Controllables/ControllableEllipse.js"
                ],
                i["Extensions/Annotations/Controllables/ControllablePath.js"],
                i["Extensions/Annotations/Controllables/ControllableImage.js"],
                i["Extensions/Annotations/Controllables/ControllableLabel.js"],
                i["Extensions/Annotations/ControlPoint.js"],
                i["Extensions/Annotations/ControlTarget.js"],
                i["Extensions/Annotations/EventEmitter.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Extensions/Annotations/NavigationBindings.js"],
                i["Extensions/Annotations/Popup/PopupComposition.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n, e, o, a, r, l, h, p, c, d, u, x, g) {
                let { getDeferredAnimation: y } = t,
                    {
                        destroyObjectProperties: f,
                        erase: m,
                        fireEvent: A,
                        merge: b,
                        pick: v,
                        splat: P,
                    } = g;
                function C(t, i) {
                    let s = {};
                    return (
                        ["labels", "shapes"].forEach((n) => {
                            let e = t[n];
                            e &&
                                (i[n]
                                    ? (s[n] = P(i[n]).map(function (t, i) {
                                          return b(e[i], t);
                                      }))
                                    : (s[n] = t[n]));
                        }),
                        s
                    );
                }
                class E extends c {
                    static compose(t, s, n) {
                        i.compose(E, t, s),
                            l.compose(n),
                            a.compose(t, n),
                            u.compose(E, t),
                            x.compose(u, s);
                    }
                    constructor(t, i) {
                        super(),
                            (this.coll = "annotations"),
                            (this.chart = t),
                            (this.points = []),
                            (this.controlPoints = []),
                            (this.coll = "annotations"),
                            (this.index = -1),
                            (this.labels = []),
                            (this.shapes = []),
                            (this.options = b(this.defaultOptions, i)),
                            (this.userOptions = i);
                        let s = C(this.options, i);
                        (this.options.labels = s.labels),
                            (this.options.shapes = s.shapes),
                            this.init(t, this.options);
                    }
                    addClipPaths() {
                        this.setClipAxes(),
                            this.clipXAxis &&
                                this.clipYAxis &&
                                this.options.crop &&
                                (this.clipRect = this.chart.renderer.clipRect(
                                    this.getClipBox()
                                ));
                    }
                    addLabels() {
                        let t = this.options.labels || [];
                        t.forEach((i, s) => {
                            let n = this.initLabel(i, s);
                            b(!0, t[s], n.options);
                        });
                    }
                    addShapes() {
                        let t = this.options.shapes || [];
                        t.forEach((i, s) => {
                            let n = this.initShape(i, s);
                            b(!0, t[s], n.options);
                        });
                    }
                    destroy() {
                        let t = this.chart,
                            i = function (t) {
                                t.destroy();
                            };
                        this.labels.forEach(i),
                            this.shapes.forEach(i),
                            (this.clipXAxis = null),
                            (this.clipYAxis = null),
                            m(t.labelCollectors, this.labelCollector),
                            super.destroy(),
                            this.destroyControlTarget(),
                            f(this, t);
                    }
                    destroyItem(t) {
                        m(this[t.itemType + "s"], t), t.destroy();
                    }
                    getClipBox() {
                        if (this.clipXAxis && this.clipYAxis)
                            return {
                                x: this.clipXAxis.left,
                                y: this.clipYAxis.top,
                                width: this.clipXAxis.width,
                                height: this.clipYAxis.height,
                            };
                    }
                    initProperties(t, i) {
                        this.setOptions(i);
                        let s = C(this.options, i);
                        (this.options.labels = s.labels),
                            (this.options.shapes = s.shapes),
                            (this.chart = t),
                            (this.points = []),
                            (this.controlPoints = []),
                            (this.coll = "annotations"),
                            (this.userOptions = i),
                            (this.labels = []),
                            (this.shapes = []);
                    }
                    init(t, i, s = this.index) {
                        let n = this.chart,
                            e = this.options.animation;
                        (this.index = s),
                            this.linkPoints(),
                            this.addControlPoints(),
                            this.addShapes(),
                            this.addLabels(),
                            this.setLabelCollector(),
                            (this.animationConfig = y(n, e));
                    }
                    initLabel(t, i) {
                        let s = b(
                                this.options.labelOptions,
                                {
                                    controlPointOptions:
                                        this.options.controlPointOptions,
                                },
                                t
                            ),
                            n = new l(this, s, i);
                        return (n.itemType = "label"), this.labels.push(n), n;
                    }
                    initShape(t, i) {
                        let s = b(
                                this.options.shapeOptions,
                                {
                                    controlPointOptions:
                                        this.options.controlPointOptions,
                                },
                                t
                            ),
                            n = new E.shapesMap[s.type](this, s, i);
                        return (n.itemType = "shape"), this.shapes.push(n), n;
                    }
                    redraw(t) {
                        this.linkPoints(),
                            this.graphic || this.render(),
                            this.clipRect &&
                                this.clipRect.animate(this.getClipBox()),
                            this.redrawItems(this.shapes, t),
                            this.redrawItems(this.labels, t),
                            this.redrawControlPoints(t);
                    }
                    redrawItem(t, i) {
                        t.linkPoints(),
                            t.shouldBeDrawn()
                                ? (t.graphic || this.renderItem(t),
                                  t.redraw(v(i, !0) && t.graphic.placed),
                                  t.points.length &&
                                      (function (t) {
                                          let i = t.graphic,
                                              s = t.points.some(
                                                  (t) =>
                                                      !1 !== t.series.visible &&
                                                      !1 !== t.visible
                                              );
                                          i &&
                                              (s
                                                  ? "hidden" === i.visibility &&
                                                    i.show()
                                                  : i.hide());
                                      })(t))
                                : this.destroyItem(t);
                    }
                    redrawItems(t, i) {
                        let s = t.length;
                        for (; s--; ) this.redrawItem(t[s], i);
                    }
                    remove() {
                        return this.chart.removeAnnotation(this);
                    }
                    render() {
                        let t = this.chart.renderer;
                        (this.graphic = t
                            .g("annotation")
                            .attr({
                                opacity: 0,
                                zIndex: this.options.zIndex,
                                visibility: this.options.visible
                                    ? "inherit"
                                    : "hidden",
                            })
                            .add()),
                            (this.shapesGroup = t
                                .g("annotation-shapes")
                                .add(this.graphic)),
                            this.options.crop &&
                                this.shapesGroup.clip(this.chart.plotBoxClip),
                            (this.labelsGroup = t
                                .g("annotation-labels")
                                .attr({ translateX: 0, translateY: 0 })
                                .add(this.graphic)),
                            this.addClipPaths(),
                            this.clipRect && this.graphic.clip(this.clipRect),
                            this.renderItems(this.shapes),
                            this.renderItems(this.labels),
                            this.addEvents(),
                            this.renderControlPoints();
                    }
                    renderItem(t) {
                        t.render(
                            "label" === t.itemType
                                ? this.labelsGroup
                                : this.shapesGroup
                        );
                    }
                    renderItems(t) {
                        let i = t.length;
                        for (; i--; ) this.renderItem(t[i]);
                    }
                    setClipAxes() {
                        let t = this.chart.xAxis,
                            i = this.chart.yAxis,
                            s = (this.options.labels || [])
                                .concat(this.options.shapes || [])
                                .reduce((s, n) => {
                                    let e =
                                        n &&
                                        (n.point || (n.points && n.points[0]));
                                    return [
                                        t[e && e.xAxis] || s[0],
                                        i[e && e.yAxis] || s[1],
                                    ];
                                }, []);
                        (this.clipXAxis = s[0]), (this.clipYAxis = s[1]);
                    }
                    setControlPointsVisibility(t) {
                        let i = function (i) {
                            i.setControlPointsVisibility(t);
                        };
                        this.controlPoints.forEach((i) => {
                            i.setVisibility(t);
                        }),
                            this.shapes.forEach(i),
                            this.labels.forEach(i);
                    }
                    setLabelCollector() {
                        let t = this;
                        (t.labelCollector = function () {
                            return t.labels.reduce(function (t, i) {
                                return (
                                    i.options.allowOverlap || t.push(i.graphic),
                                    t
                                );
                            }, []);
                        }),
                            t.chart.labelCollectors.push(t.labelCollector);
                    }
                    setOptions(t) {
                        this.options = b(this.defaultOptions, t);
                    }
                    setVisibility(t) {
                        let i = this.options,
                            s = this.chart.navigationBindings,
                            n = v(t, !i.visible);
                        if (
                            (this.graphic.attr(
                                "visibility",
                                n ? "inherit" : "hidden"
                            ),
                            !n)
                        ) {
                            let t = function (t) {
                                t.setControlPointsVisibility(n);
                            };
                            this.shapes.forEach(t),
                                this.labels.forEach(t),
                                s.activeAnnotation === this &&
                                    s.popup &&
                                    "annotation-toolbar" === s.popup.type &&
                                    A(s, "closePopup");
                        }
                        i.visible = n;
                    }
                    update(t, i) {
                        let s = this.chart,
                            n = C(this.userOptions, t),
                            e = s.annotations.indexOf(this),
                            o = b(!0, this.userOptions, t);
                        (o.labels = n.labels),
                            (o.shapes = n.shapes),
                            this.destroy(),
                            this.initProperties(s, o),
                            this.init(s, o),
                            (s.options.annotations[e] = o),
                            (this.isUpdating = !0),
                            v(i, !0) && s.drawAnnotations(),
                            A(this, "afterUpdate"),
                            (this.isUpdating = !1);
                    }
                }
                return (
                    (E.ControlPoint = h),
                    (E.MockPoint = d),
                    (E.shapesMap = {
                        rect: n,
                        circle: e,
                        ellipse: o,
                        path: a,
                        image: r,
                    }),
                    (E.types = {}),
                    (E.prototype.defaultOptions = s),
                    (E.prototype.nonDOMEvents = [
                        "add",
                        "afterUpdate",
                        "drag",
                        "remove",
                    ]),
                    p.compose(E),
                    E
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/BasicAnnotation.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s) {
                let { merge: n } = s;
                class e extends t {
                    addControlPoints() {
                        let t = this.options,
                            i = e.basicControlPoints,
                            s = this.basicType,
                            n = t.labels || t.shapes || [];
                        n.forEach((t) => {
                            t.controlPoints = i[s];
                        });
                    }
                    init() {
                        let t = this.options;
                        if (t.shapes) {
                            delete t.labelOptions;
                            let i = t.shapes[0].type;
                            i && "path" !== i
                                ? (this.basicType = i)
                                : (this.basicType = "rectangle");
                        } else delete t.shapes, (this.basicType = "label");
                        super.init.apply(this, arguments);
                    }
                }
                return (
                    (e.basicControlPoints = {
                        label: [
                            {
                                symbol: "triangle-down",
                                positioner: function (t) {
                                    if (!t.graphic.placed)
                                        return { x: 0, y: -9e7 };
                                    let s = i.pointToPixels(t.points[0]);
                                    return {
                                        x: s.x - (this.graphic.width || 0) / 2,
                                        y: s.y - (this.graphic.height || 0) / 2,
                                    };
                                },
                                events: {
                                    drag: function (t, i) {
                                        let s = this.mouseMoveToTranslation(t);
                                        i.translatePoint(s.x, s.y),
                                            (i.annotation.userOptions.labels[0].point =
                                                i.options.point),
                                            i.redraw(!1);
                                    },
                                },
                            },
                            {
                                symbol: "square",
                                positioner: function (t) {
                                    return t.graphic.placed
                                        ? {
                                              x:
                                                  t.graphic.alignAttr.x -
                                                  (this.graphic.width || 0) / 2,
                                              y:
                                                  t.graphic.alignAttr.y -
                                                  (this.graphic.height || 0) /
                                                      2,
                                          }
                                        : { x: 0, y: -9e7 };
                                },
                                events: {
                                    drag: function (t, i) {
                                        let s = this.mouseMoveToTranslation(t);
                                        i.translate(s.x, s.y),
                                            (i.annotation.userOptions.labels[0].point =
                                                i.options.point),
                                            i.redraw(!1);
                                    },
                                },
                            },
                        ],
                        rectangle: [
                            {
                                positioner: function (t) {
                                    let s = i.pointToPixels(t.points[2]);
                                    return { x: s.x - 4, y: s.y - 4 };
                                },
                                events: {
                                    drag: function (t, i) {
                                        let s = i.annotation,
                                            n =
                                                this.chart.pointer.getCoordinates(
                                                    t
                                                ),
                                            e = i.options.points,
                                            o = s.userOptions.shapes,
                                            a = s.clipXAxis?.index || 0,
                                            r = s.clipYAxis?.index || 0,
                                            l = n.xAxis[a].value,
                                            h = n.yAxis[r].value;
                                        (e[1].x = l),
                                            (e[2].x = l),
                                            (e[2].y = h),
                                            (e[3].y = h),
                                            o &&
                                                o[0] &&
                                                (o[0].points =
                                                    i.options.points),
                                            s.redraw(!1);
                                    },
                                },
                            },
                        ],
                        circle: [
                            {
                                positioner: function (t) {
                                    let s = i.pointToPixels(t.points[0]),
                                        n = t.options.r;
                                    return {
                                        x:
                                            s.x +
                                            n * Math.cos(Math.PI / 4) -
                                            (this.graphic.width || 0) / 2,
                                        y:
                                            s.y +
                                            n * Math.sin(Math.PI / 4) -
                                            (this.graphic.height || 0) / 2,
                                    };
                                },
                                events: {
                                    drag: function (t, i) {
                                        let s = i.annotation,
                                            n = this.mouseMoveToTranslation(t),
                                            e = s.userOptions.shapes;
                                        i.setRadius(
                                            Math.max(
                                                i.options.r +
                                                    n.y / Math.sin(Math.PI / 4),
                                                5
                                            )
                                        ),
                                            e &&
                                                e[0] &&
                                                ((e[0].r = i.options.r),
                                                (e[0].point = i.options.point)),
                                            i.redraw(!1);
                                    },
                                },
                            },
                        ],
                        ellipse: [
                            {
                                positioner: function (t) {
                                    let i = t.getAbsolutePosition(t.points[0]);
                                    return {
                                        x: i.x - (this.graphic.width || 0) / 2,
                                        y: i.y - (this.graphic.height || 0) / 2,
                                    };
                                },
                                events: {
                                    drag: function (t, i) {
                                        let s = i.getAbsolutePosition(
                                            i.points[0]
                                        );
                                        i.translatePoint(
                                            t.chartX - s.x,
                                            t.chartY - s.y,
                                            0
                                        ),
                                            i.redraw(!1);
                                    },
                                },
                            },
                            {
                                positioner: function (t) {
                                    let i = t.getAbsolutePosition(t.points[1]);
                                    return {
                                        x: i.x - (this.graphic.width || 0) / 2,
                                        y: i.y - (this.graphic.height || 0) / 2,
                                    };
                                },
                                events: {
                                    drag: function (t, i) {
                                        let s = i.getAbsolutePosition(
                                            i.points[1]
                                        );
                                        i.translatePoint(
                                            t.chartX - s.x,
                                            t.chartY - s.y,
                                            1
                                        ),
                                            i.redraw(!1);
                                    },
                                },
                            },
                            {
                                positioner: function (t) {
                                    let i = t.getAbsolutePosition(t.points[0]),
                                        s = t.getAbsolutePosition(t.points[1]),
                                        n = t.getAttrs(i, s);
                                    return {
                                        x:
                                            n.cx -
                                            (this.graphic.width || 0) / 2 +
                                            n.ry *
                                                Math.sin(
                                                    (n.angle * Math.PI) / 180
                                                ),
                                        y:
                                            n.cy -
                                            (this.graphic.height || 0) / 2 -
                                            n.ry *
                                                Math.cos(
                                                    (n.angle * Math.PI) / 180
                                                ),
                                    };
                                },
                                events: {
                                    drag: function (t, i) {
                                        let s = i.getAbsolutePosition(
                                                i.points[0]
                                            ),
                                            n = i.getAbsolutePosition(
                                                i.points[1]
                                            ),
                                            e = i.getDistanceFromLine(
                                                s,
                                                n,
                                                t.chartX,
                                                t.chartY
                                            ),
                                            o = i.getYAxis(),
                                            a = Math.abs(
                                                o.toValue(0) - o.toValue(e)
                                            );
                                        i.setYRadius(a), i.redraw(!1);
                                    },
                                },
                            },
                        ],
                    }),
                    (e.prototype.defaultOptions = n(
                        t.prototype.defaultOptions,
                        {}
                    )),
                    (t.types.basicAnnotation = e),
                    e
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/CrookedLine.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/ControlPoint.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n) {
                let { merge: e } = n;
                class o extends t {
                    setClipAxes() {
                        (this.clipXAxis =
                            this.chart.xAxis[this.options.typeOptions.xAxis]),
                            (this.clipYAxis =
                                this.chart.yAxis[
                                    this.options.typeOptions.yAxis
                                ]);
                    }
                    getPointsOptions() {
                        let t = this.options.typeOptions;
                        return (t.points || []).map(
                            (i) => ((i.xAxis = t.xAxis), (i.yAxis = t.yAxis), i)
                        );
                    }
                    getControlPointsOptions() {
                        return this.getPointsOptions();
                    }
                    addControlPoints() {
                        this.getControlPointsOptions().forEach(function (t, s) {
                            let n = new i(
                                this.chart,
                                this,
                                e(
                                    this.options.controlPointOptions,
                                    t.controlPoint
                                ),
                                s
                            );
                            this.controlPoints.push(n),
                                (t.controlPoint = n.options);
                        }, this);
                    }
                    addShapes() {
                        let t = this.options.typeOptions,
                            i = this.initShape(
                                e(t.line, {
                                    type: "path",
                                    points: this.points.map(
                                        (t, i) =>
                                            function (t) {
                                                return t.annotation.points[i];
                                            }
                                    ),
                                }),
                                0
                            );
                        t.line = i.options;
                    }
                }
                return (
                    (o.prototype.defaultOptions = e(
                        t.prototype.defaultOptions,
                        {
                            typeOptions: {
                                xAxis: 0,
                                yAxis: 0,
                                line: { fill: "none" },
                            },
                            controlPointOptions: {
                                positioner: function (t) {
                                    let i = this.graphic,
                                        n = s.pointToPixels(
                                            t.points[this.index]
                                        );
                                    return {
                                        x: n.x - (i.width || 0) / 2,
                                        y: n.y - (i.height || 0) / 2,
                                    };
                                },
                                events: {
                                    drag: function (t, i) {
                                        if (
                                            i.chart.isInsidePlot(
                                                t.chartX - i.chart.plotLeft,
                                                t.chartY - i.chart.plotTop,
                                                { visiblePlotOnly: !0 }
                                            )
                                        ) {
                                            let s =
                                                    this.mouseMoveToTranslation(
                                                        t
                                                    ),
                                                n = i.options.typeOptions;
                                            i.translatePoint(
                                                s.x,
                                                s.y,
                                                this.index
                                            ),
                                                (n.points[this.index].x =
                                                    i.points[this.index].x),
                                                (n.points[this.index].y =
                                                    i.points[this.index].y),
                                                i.redraw(!1);
                                        }
                                    },
                                },
                            },
                        }
                    )),
                    (t.types.crookedLine = o),
                    o
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/ElliottWave.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/Types/CrookedLine.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s) {
                let { merge: n } = s;
                class e extends i {
                    addLabels() {
                        this.getPointsOptions().forEach((t, i) => {
                            let s = this.options.typeOptions,
                                e = this.initLabel(
                                    n(t.label, {
                                        text: s.labels[i],
                                        point: function (t) {
                                            return t.annotation.points[i];
                                        },
                                    }),
                                    !1
                                );
                            t.label = e.options;
                        });
                    }
                }
                return (
                    (e.prototype.defaultOptions = n(
                        i.prototype.defaultOptions,
                        {
                            typeOptions: {
                                labels: [
                                    "(0)",
                                    "(A)",
                                    "(B)",
                                    "(C)",
                                    "(D)",
                                    "(E)",
                                ],
                                line: { strokeWidth: 1 },
                            },
                            labelOptions: {
                                align: "center",
                                allowOverlap: !0,
                                crop: !0,
                                overflow: "none",
                                type: "rect",
                                backgroundColor: "none",
                                borderWidth: 0,
                                y: -5,
                            },
                        }
                    )),
                    (t.types.elliottWave = e),
                    e
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/Tunnel.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/ControlPoint.js"],
                i["Extensions/Annotations/Types/CrookedLine.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n, e) {
                let { merge: o } = e;
                class a extends s {
                    getPointsOptions() {
                        let t = s.prototype.getPointsOptions.call(this),
                            i = this.options.typeOptions.yAxis || 0,
                            n = this.chart.yAxis[i];
                        if (
                            ((t[2] = this.heightPointOptions(t[1])),
                            (t[3] = this.heightPointOptions(t[0])),
                            n && n.logarithmic)
                        ) {
                            let i = n.toPixels(t[2].y) - n.toPixels(t[1].y),
                                s = n.toPixels(t[0].y) + i;
                            t[3].y = n.toValue(s);
                        }
                        return t;
                    }
                    getControlPointsOptions() {
                        return this.getPointsOptions().slice(0, 2);
                    }
                    heightPointOptions(t) {
                        let i = o(t),
                            s = this.options.typeOptions;
                        return (i.y += s.height), i;
                    }
                    addControlPoints() {
                        s.prototype.addControlPoints.call(this);
                        let t = this.options,
                            n = t.typeOptions,
                            e = new i(
                                this.chart,
                                this,
                                o(t.controlPointOptions, n.heightControlPoint),
                                2
                            );
                        this.controlPoints.push(e),
                            (n.heightControlPoint = e.options);
                    }
                    addShapes() {
                        this.addLine(), this.addBackground();
                    }
                    addLine() {
                        let t = this.initShape(
                            o(this.options.typeOptions.line, {
                                type: "path",
                                points: [
                                    this.points[0],
                                    this.points[1],
                                    function (t) {
                                        let i = n.pointToOptions(
                                            t.annotation.points[2]
                                        );
                                        return (i.command = "M"), i;
                                    },
                                    this.points[3],
                                ],
                            }),
                            0
                        );
                        this.options.typeOptions.line = t.options;
                    }
                    addBackground() {
                        let t = this.initShape(
                            o(this.options.typeOptions.background, {
                                type: "path",
                                points: this.points.slice(),
                            }),
                            1
                        );
                        this.options.typeOptions.background = t.options;
                    }
                    translateSide(t, i, s) {
                        let n = Number(s),
                            e = 0 === n ? 3 : 2;
                        this.translatePoint(t, i, n),
                            this.translatePoint(t, i, e);
                    }
                    translateHeight(t) {
                        this.translatePoint(0, t, 2),
                            this.translatePoint(0, t, 3),
                            (this.options.typeOptions.height =
                                this.points[3].y - this.points[0].y),
                            (this.userOptions.typeOptions.height =
                                this.options.typeOptions.height);
                    }
                }
                return (
                    (a.prototype.defaultOptions = o(
                        s.prototype.defaultOptions,
                        {
                            typeOptions: {
                                background: {
                                    fill: "rgba(130, 170, 255, 0.4)",
                                    strokeWidth: 0,
                                },
                                line: { strokeWidth: 1 },
                                height: -2,
                                heightControlPoint: {
                                    positioner: function (t) {
                                        let i = n.pointToPixels(t.points[2]),
                                            s = n.pointToPixels(t.points[3]),
                                            e = (i.x + s.x) / 2;
                                        return {
                                            x:
                                                e -
                                                (this.graphic.width || 0) / 2,
                                            y:
                                                ((s.y - i.y) / (s.x - i.x)) *
                                                    (e - i.x) +
                                                i.y -
                                                (this.graphic.height || 0) / 2,
                                        };
                                    },
                                    events: {
                                        drag: function (t, i) {
                                            i.chart.isInsidePlot(
                                                t.chartX - i.chart.plotLeft,
                                                t.chartY - i.chart.plotTop,
                                                { visiblePlotOnly: !0 }
                                            ) &&
                                                (i.translateHeight(
                                                    this.mouseMoveToTranslation(
                                                        t
                                                    ).y
                                                ),
                                                i.redraw(!1));
                                        },
                                    },
                                },
                            },
                            controlPointOptions: {
                                events: {
                                    drag: function (t, i) {
                                        if (
                                            i.chart.isInsidePlot(
                                                t.chartX - i.chart.plotLeft,
                                                t.chartY - i.chart.plotTop,
                                                { visiblePlotOnly: !0 }
                                            )
                                        ) {
                                            let s =
                                                this.mouseMoveToTranslation(t);
                                            i.translateSide(
                                                s.x,
                                                s.y,
                                                !!this.index
                                            ),
                                                i.redraw(!1);
                                        }
                                    },
                                },
                            },
                        }
                    )),
                    (t.types.tunnel = a),
                    a
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/InfinityLine.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/Types/CrookedLine.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n) {
                let { merge: e } = n;
                class o extends i {
                    static edgePoint(t, i) {
                        return function (n) {
                            let e = n.annotation,
                                a = e.options.typeOptions.type,
                                r = e.points;
                            return (
                                ("horizontalLine" === a ||
                                    "verticalLine" === a) &&
                                    (r = [
                                        r[0],
                                        new s(e.chart, r[0].target, {
                                            x:
                                                r[0].x +
                                                +("horizontalLine" === a),
                                            y: r[0].y + +("verticalLine" === a),
                                            xAxis: r[0].options.xAxis,
                                            yAxis: r[0].options.yAxis,
                                        }),
                                    ]),
                                o.findEdgePoint(r[t], r[i])
                            );
                        };
                    }
                    static findEdgeCoordinate(t, i, s, n) {
                        let e = "x" === s ? "y" : "x";
                        return (
                            ((i[s] - t[s]) * (n - t[e])) / (i[e] - t[e]) + t[s]
                        );
                    }
                    static findEdgePoint(t, i) {
                        let n, e, a;
                        let r = t.series.chart,
                            l = t.series.xAxis,
                            h = i.series.yAxis,
                            p = s.pointToPixels(t),
                            c = s.pointToPixels(i),
                            d = c.x - p.x,
                            u = c.y - p.y,
                            x = l.left,
                            g = x + l.width,
                            y = h.top,
                            f = y + h.height,
                            m = d < 0 ? x : g,
                            A = u < 0 ? y : f,
                            b = { x: 0 === d ? p.x : m, y: 0 === u ? p.y : A };
                        return (
                            0 !== d &&
                                0 !== u &&
                                ((e = o.findEdgeCoordinate(p, c, "y", m)),
                                (n = o.findEdgeCoordinate(p, c, "x", A)),
                                e >= y && e <= f
                                    ? ((b.x = m), (b.y = e))
                                    : ((b.x = n), (b.y = A))),
                            (b.x -= r.plotLeft),
                            (b.y -= r.plotTop),
                            t.series.chart.inverted &&
                                ((a = b.x), (b.x = b.y), (b.y = a)),
                            b
                        );
                    }
                    addShapes() {
                        let t = this.options.typeOptions,
                            i = [this.points[0], o.endEdgePoint];
                        t.type.match(/line/gi) && (i[0] = o.startEdgePoint);
                        let s = this.initShape(
                            e(t.line, { type: "path", points: i }),
                            0
                        );
                        t.line = s.options;
                    }
                }
                return (
                    (o.endEdgePoint = o.edgePoint(0, 1)),
                    (o.startEdgePoint = o.edgePoint(1, 0)),
                    (o.prototype.defaultOptions = e(
                        i.prototype.defaultOptions,
                        {}
                    )),
                    (t.types.infinityLine = o),
                    o
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/TimeCycles.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/Types/CrookedLine.js"],
                i["Extensions/Annotations/ControlPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n) {
                let { merge: e, isNumber: o, defined: a } = n;
                class r extends i {
                    init(t, i, s) {
                        a(i.yAxis) &&
                            i.points.forEach((t) => {
                                t.yAxis = i.yAxis;
                            }),
                            a(i.xAxis) &&
                                i.points.forEach((t) => {
                                    t.xAxis = i.xAxis;
                                }),
                            super.init(t, i, s);
                    }
                    setPath() {
                        this.shapes[0].options.d = this.getPath();
                    }
                    getPath() {
                        return [["M", this.startX, this.y]].concat(
                            (function (t, i, s, n) {
                                let e = [];
                                for (let o = 1; o <= i; o++)
                                    e.push([
                                        "A",
                                        t / 2,
                                        t / 2,
                                        0,
                                        1,
                                        1,
                                        s + o * t,
                                        n,
                                    ]);
                                return e;
                            })(
                                this.pixelInterval,
                                this.numberOfCircles,
                                this.startX,
                                this.y
                            )
                        );
                    }
                    addShapes() {
                        let t = this.options.typeOptions;
                        this.setPathProperties();
                        let i = this.initShape(
                            e(t.line, {
                                type: "path",
                                d: this.getPath(),
                                points: this.options.points,
                            }),
                            0
                        );
                        t.line = i.options;
                    }
                    addControlPoints() {
                        let t = this.options,
                            i = t.typeOptions;
                        (t.controlPointOptions.style.cursor = this.chart
                            .inverted
                            ? "ns-resize"
                            : "ew-resize"),
                            i.controlPointOptions.forEach((i) => {
                                let n = e(t.controlPointOptions, i),
                                    o = new s(this.chart, this, n, 0);
                                this.controlPoints.push(o);
                            });
                    }
                    setPathProperties() {
                        let t = this.options.typeOptions,
                            i = t.points;
                        if (!i) return;
                        let s = i[0],
                            n = i[1],
                            e = t.xAxis || 0,
                            a = t.yAxis || 0,
                            r = this.chart.xAxis[e],
                            l = this.chart.yAxis[a],
                            h = s.x,
                            p = s.y,
                            c = n.x;
                        if (!h || !c) return;
                        let d = o(p) ? l.toPixels(p) : l.top + l.height,
                            u = o(h) ? r.toPixels(h) : r.left,
                            x = o(c) ? r.toPixels(c) : r.left + 30,
                            g = r.len,
                            y = Math.round(Math.max(Math.abs(x - u), 2)),
                            f = (Math.floor((u - r.left) / y) + 1) * y;
                        (this.startX = u - f),
                            (this.y = d),
                            (this.pixelInterval = y),
                            (this.numberOfCircles = Math.floor(g / y) + 2);
                    }
                    redraw(t) {
                        this.setPathProperties(),
                            this.setPath(),
                            super.redraw(t);
                    }
                }
                return (
                    (r.prototype.defaultOptions = e(
                        i.prototype.defaultOptions,
                        {
                            typeOptions: {
                                controlPointOptions: [
                                    {
                                        positioner: function (t) {
                                            let i = t.points[0],
                                                s =
                                                    t.anchor(
                                                        i
                                                    ).absolutePosition;
                                            return {
                                                x:
                                                    s.x -
                                                    (this.graphic.width || 0) /
                                                        2,
                                                y:
                                                    t.y -
                                                    (this.graphic.height || 0),
                                            };
                                        },
                                        events: {
                                            drag: function (t, i) {
                                                let s = i.anchor(
                                                    i.points[0]
                                                ).absolutePosition;
                                                i.translatePoint(
                                                    t.chartX - s.x,
                                                    0,
                                                    0
                                                ),
                                                    i.redraw(!1);
                                            },
                                        },
                                    },
                                    {
                                        positioner: function (t) {
                                            let i = t.points[1],
                                                s =
                                                    t.anchor(
                                                        i
                                                    ).absolutePosition;
                                            return {
                                                x:
                                                    s.x -
                                                    (this.graphic.width || 0) /
                                                        2,
                                                y:
                                                    t.y -
                                                    (this.graphic.height || 0),
                                            };
                                        },
                                        events: {
                                            drag: function (t, i) {
                                                let s = i.anchor(
                                                    i.points[1]
                                                ).absolutePosition;
                                                i.translatePoint(
                                                    t.chartX - s.x,
                                                    0,
                                                    1
                                                ),
                                                    i.redraw(!1);
                                            },
                                        },
                                    },
                                ],
                            },
                        }
                    )),
                    (t.types.timeCycles = r),
                    r
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/Fibonacci.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Extensions/Annotations/Types/Tunnel.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n) {
                let { merge: e } = n;
                function o(t, i) {
                    return function () {
                        let s = this.annotation;
                        if (!s.startRetracements || !s.endRetracements)
                            return [];
                        let n = this.anchor(
                                s.startRetracements[t]
                            ).absolutePosition,
                            e = this.anchor(
                                s.endRetracements[t]
                            ).absolutePosition,
                            o = [
                                ["M", Math.round(n.x), Math.round(n.y)],
                                ["L", Math.round(e.x), Math.round(e.y)],
                            ];
                        if (i) {
                            let i = this.anchor(
                                    s.endRetracements[t - 1]
                                ).absolutePosition,
                                n = this.anchor(
                                    s.startRetracements[t - 1]
                                ).absolutePosition;
                            o.push(
                                ["L", Math.round(i.x), Math.round(i.y)],
                                ["L", Math.round(n.x), Math.round(n.y)]
                            );
                        }
                        return o;
                    };
                }
                class a extends s {
                    linkPoints() {
                        super.linkPoints(), this.linkRetracementsPoints();
                    }
                    linkRetracementsPoints() {
                        let t = this.points,
                            i = t[0].y - t[3].y,
                            s = t[1].y - t[2].y,
                            n = t[0].x,
                            e = t[1].x;
                        a.levels.forEach((o, r) => {
                            let l = t[0].y - i * o,
                                h = t[1].y - s * o,
                                p = this.options.typeOptions.reversed
                                    ? a.levels.length - r - 1
                                    : r;
                            (this.startRetracements =
                                this.startRetracements || []),
                                (this.endRetracements =
                                    this.endRetracements || []),
                                this.linkRetracementPoint(
                                    p,
                                    n,
                                    l,
                                    this.startRetracements
                                ),
                                this.linkRetracementPoint(
                                    p,
                                    e,
                                    h,
                                    this.endRetracements
                                );
                        });
                    }
                    linkRetracementPoint(t, s, n, e) {
                        let o = e[t],
                            a = this.options.typeOptions;
                        o
                            ? ((o.options.x = s),
                              (o.options.y = n),
                              o.refresh())
                            : (e[t] = new i(this.chart, this, {
                                  x: s,
                                  y: n,
                                  xAxis: a.xAxis,
                                  yAxis: a.yAxis,
                              }));
                    }
                    addShapes() {
                        a.levels.forEach(function (t, i) {
                            let {
                                backgroundColors: s,
                                lineColor: n,
                                lineColors: e,
                            } = this.options.typeOptions;
                            this.initShape(
                                { type: "path", d: o(i), stroke: e[i] || n },
                                i
                            ),
                                i > 0 &&
                                    this.initShape({
                                        type: "path",
                                        fill: s[i - 1],
                                        strokeWidth: 0,
                                        d: o(i, !0),
                                    });
                        }, this);
                    }
                    addLabels() {
                        a.levels.forEach(function (t, s) {
                            let n = this.options.typeOptions,
                                o = this.initLabel(
                                    e(n.labels[s], {
                                        point: function (t) {
                                            let n = i.pointToOptions(
                                                t.annotation.startRetracements[
                                                    s
                                                ]
                                            );
                                            return n;
                                        },
                                        text: t.toString(),
                                    })
                                );
                            n.labels[s] = o.options;
                        }, this);
                    }
                }
                return (
                    (a.levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]),
                    (a.prototype.defaultOptions = e(
                        s.prototype.defaultOptions,
                        {
                            typeOptions: {
                                reversed: !1,
                                height: 2,
                                backgroundColors: [
                                    "rgba(130, 170, 255, 0.4)",
                                    "rgba(139, 191, 216, 0.4)",
                                    "rgba(150, 216, 192, 0.4)",
                                    "rgba(156, 229, 161, 0.4)",
                                    "rgba(162, 241, 130, 0.4)",
                                    "rgba(169, 255, 101, 0.4)",
                                ],
                                lineColor: "#999999",
                                lineColors: [],
                                labels: [],
                            },
                            labelOptions: {
                                allowOverlap: !0,
                                align: "right",
                                backgroundColor: "none",
                                borderWidth: 0,
                                crop: !1,
                                overflow: "none",
                                shape: "rect",
                                style: { color: "grey" },
                                verticalAlign: "middle",
                                y: 0,
                            },
                        }
                    )),
                    (t.types.fibonacci = a),
                    a
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/FibonacciTimeZones.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/ControlPoint.js"],
                i["Extensions/Annotations/Types/CrookedLine.js"],
                i["Extensions/Annotations/Types/InfinityLine.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n, e, o) {
                let { merge: a } = o;
                function r(t, i, s) {
                    return function (o) {
                        let a = o.annotation.chart,
                            r = a.inverted ? a.plotTop : a.plotLeft,
                            l = o.annotation.points,
                            h = l[0].series.xAxis,
                            p = l.length > 1 ? l[1].plotX - l[0].plotX : 0,
                            c = h.toValue(l[0].plotX + r + s * p);
                        return (
                            (l = [
                                new e(a, l[0].target, {
                                    x: c,
                                    y: 0,
                                    xAxis: l[0].options.xAxis,
                                    yAxis: l[0].options.yAxis,
                                }),
                                new e(a, l[0].target, {
                                    x: c,
                                    y: 1,
                                    xAxis: l[0].options.xAxis,
                                    yAxis: l[0].options.yAxis,
                                }),
                            ]),
                            n.findEdgePoint(l[t], l[i])
                        );
                    };
                }
                class l extends s {
                    addShapes() {
                        let t = 1,
                            i = 1;
                        for (let s = 0; s < 11; s++) {
                            let n = s ? t : 0,
                                e = [r(1, 0, n), r(0, 1, n)];
                            (t = (i = t + i) - t),
                                1 === s &&
                                    (this.secondLineEdgePoints = [e[0], e[1]]),
                                this.initShape(
                                    a(this.options.typeOptions.line, {
                                        type: "path",
                                        points: e,
                                    }),
                                    s
                                );
                        }
                    }
                    addControlPoints() {
                        let t = this.options,
                            s = t.typeOptions,
                            n = new i(
                                this.chart,
                                this,
                                a(t.controlPointOptions, s.controlPointOptions),
                                0
                            );
                        this.controlPoints.push(n),
                            (s.controlPointOptions = n.options);
                    }
                }
                return (
                    (l.prototype.defaultOptions = a(
                        s.prototype.defaultOptions,
                        {
                            typeOptions: {
                                line: {
                                    stroke: "rgba(0, 0, 0, 0.75)",
                                    strokeWidth: 1,
                                    fill: void 0,
                                },
                                controlPointOptions: {
                                    positioner: function () {
                                        let t = this.target,
                                            i = this.graphic,
                                            s = t.secondLineEdgePoints,
                                            n = { annotation: t },
                                            e = s[0](n).y,
                                            o = s[1](n).y,
                                            a = this.chart.plotLeft,
                                            r = this.chart.plotTop,
                                            l = s[0](n).x,
                                            h = (e + o) / 2;
                                        return (
                                            this.chart.inverted &&
                                                ([l, h] = [h, l]),
                                            {
                                                x: a + l - (i.width || 0) / 2,
                                                y: r + h - (i.height || 0) / 2,
                                            }
                                        );
                                    },
                                    events: {
                                        drag: function (t, i) {
                                            let s = i.chart.isInsidePlot(
                                                t.chartX - i.chart.plotLeft,
                                                t.chartY - i.chart.plotTop,
                                                { visiblePlotOnly: !0 }
                                            );
                                            if (s) {
                                                let s =
                                                    this.mouseMoveToTranslation(
                                                        t
                                                    );
                                                i.translatePoint(s.x, 0, 1),
                                                    i.redraw(!1);
                                            }
                                        },
                                    },
                                },
                            },
                        }
                    )),
                    (t.types.fibonacciTimeZones = l),
                    l
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/Pitchfork.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/Types/InfinityLine.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s, n) {
                let { merge: e } = n;
                class o extends i {
                    static outerLineEdgePoint(t) {
                        return function (i) {
                            let n = i.annotation,
                                e = n.points;
                            return o.findEdgePoint(
                                e[t],
                                e[0],
                                new s(n.chart, i, n.midPointOptions())
                            );
                        };
                    }
                    static findEdgePoint(t, i, s) {
                        let n = Math.atan2(
                            s.plotY - i.plotY,
                            s.plotX - i.plotX
                        );
                        return {
                            x: t.plotX + 1e7 * Math.cos(n),
                            y: t.plotY + 1e7 * Math.sin(n),
                        };
                    }
                    static middleLineEdgePoint(t) {
                        let n = t.annotation,
                            e = n.points;
                        return i.findEdgePoint(
                            e[0],
                            new s(n.chart, t, n.midPointOptions())
                        );
                    }
                    midPointOptions() {
                        let t = this.points;
                        return {
                            x: (t[1].x + t[2].x) / 2,
                            y: (t[1].y + t[2].y) / 2,
                            xAxis: t[0].series.xAxis,
                            yAxis: t[0].series.yAxis,
                        };
                    }
                    addShapes() {
                        this.addLines(), this.addBackgrounds();
                    }
                    addLines() {
                        this.initShape(
                            {
                                type: "path",
                                points: [this.points[0], o.middleLineEdgePoint],
                            },
                            0
                        ),
                            this.initShape(
                                {
                                    type: "path",
                                    points: [
                                        this.points[1],
                                        o.topLineEdgePoint,
                                    ],
                                },
                                1
                            ),
                            this.initShape(
                                {
                                    type: "path",
                                    points: [
                                        this.points[2],
                                        o.bottomLineEdgePoint,
                                    ],
                                },
                                2
                            );
                    }
                    addBackgrounds() {
                        let t = this.shapes,
                            i = this.options.typeOptions,
                            s = this.initShape(
                                e(i.innerBackground, {
                                    type: "path",
                                    points: [
                                        function (t) {
                                            let i = t.annotation,
                                                s = i.points,
                                                n = i.midPointOptions();
                                            return {
                                                x: (s[1].x + n.x) / 2,
                                                y: (s[1].y + n.y) / 2,
                                                xAxis: n.xAxis,
                                                yAxis: n.yAxis,
                                            };
                                        },
                                        t[1].points[1],
                                        t[2].points[1],
                                        function (t) {
                                            let i = t.annotation,
                                                s = i.points,
                                                n = i.midPointOptions();
                                            return {
                                                x: (n.x + s[2].x) / 2,
                                                y: (n.y + s[2].y) / 2,
                                                xAxis: n.xAxis,
                                                yAxis: n.yAxis,
                                            };
                                        },
                                    ],
                                }),
                                3
                            ),
                            n = this.initShape(
                                e(i.outerBackground, {
                                    type: "path",
                                    points: [
                                        this.points[1],
                                        t[1].points[1],
                                        t[2].points[1],
                                        this.points[2],
                                    ],
                                }),
                                4
                            );
                        (i.innerBackground = s.options),
                            (i.outerBackground = n.options);
                    }
                }
                return (
                    (o.topLineEdgePoint = o.outerLineEdgePoint(1)),
                    (o.bottomLineEdgePoint = o.outerLineEdgePoint(0)),
                    (o.prototype.defaultOptions = e(
                        i.prototype.defaultOptions,
                        {
                            typeOptions: {
                                innerBackground: {
                                    fill: "rgba(130, 170, 255, 0.4)",
                                    strokeWidth: 0,
                                },
                                outerBackground: {
                                    fill: "rgba(156, 229, 161, 0.4)",
                                    strokeWidth: 0,
                                },
                            },
                        }
                    )),
                    (t.types.pitchfork = o),
                    o
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/VerticalLine.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/MockPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s) {
                let { merge: n, pick: e } = s;
                class o extends t {
                    static connectorFirstPoint(t) {
                        let s = t.annotation,
                            n = s.chart,
                            o = n.inverted,
                            a = s.points[0],
                            r = e(a.series.yAxis && a.series.yAxis.left, 0),
                            l = e(a.series.yAxis && a.series.yAxis.top, 0),
                            h = s.options.typeOptions.label.offset,
                            p = i.pointToPixels(a, !0)[o ? "x" : "y"];
                        return {
                            x: a.x,
                            xAxis: a.series.xAxis,
                            y: p + h + (o ? r - n.plotLeft : l - n.plotTop),
                        };
                    }
                    static connectorSecondPoint(t) {
                        let s = t.annotation,
                            n = s.chart,
                            o = n.inverted,
                            a = s.options.typeOptions,
                            r = s.points[0],
                            l = e(r.series.yAxis && r.series.yAxis.left, 0),
                            h = e(r.series.yAxis && r.series.yAxis.top, 0),
                            p = i.pointToPixels(r, !0)[o ? "x" : "y"],
                            c = a.yOffset;
                        return (
                            a.label.offset < 0 && (c *= -1),
                            {
                                x: r.x,
                                xAxis: r.series.xAxis,
                                y: p + c + (o ? l - n.plotLeft : h - n.plotTop),
                            }
                        );
                    }
                    getPointsOptions() {
                        return [this.options.typeOptions.point];
                    }
                    addShapes() {
                        let t = this.options.typeOptions,
                            i = this.initShape(
                                n(t.connector, {
                                    type: "path",
                                    points: [
                                        o.connectorFirstPoint,
                                        o.connectorSecondPoint,
                                    ],
                                }),
                                0
                            );
                        (t.connector = i.options),
                            (this.userOptions.typeOptions.point = t.point);
                    }
                    addLabels() {
                        let t = this.options.typeOptions,
                            i = t.label,
                            s = 0,
                            e = i.offset,
                            o = i.offset < 0 ? "bottom" : "top",
                            a = "center";
                        this.chart.inverted &&
                            ((s = i.offset),
                            (e = 0),
                            (o = "middle"),
                            (a = i.offset < 0 ? "right" : "left"));
                        let r = this.initLabel(
                            n(i, { verticalAlign: o, align: a, x: s, y: e })
                        );
                        t.label = r.options;
                    }
                }
                return (
                    (o.prototype.defaultOptions = n(
                        t.prototype.defaultOptions,
                        {
                            typeOptions: {
                                yOffset: 10,
                                label: {
                                    offset: -40,
                                    point: function (t) {
                                        return t.annotation.points[0];
                                    },
                                    allowOverlap: !0,
                                    backgroundColor: "none",
                                    borderWidth: 0,
                                    crop: !0,
                                    overflow: "none",
                                    shape: "rect",
                                    text: "{y:.2f}",
                                },
                                connector: {
                                    strokeWidth: 1,
                                    markerEnd: "arrow",
                                },
                            },
                        }
                    )),
                    (t.types.verticalLine = o),
                    o
                );
            }
        ),
        s(
            i,
            "Extensions/Annotations/Types/Measure.js",
            [
                i["Extensions/Annotations/Annotation.js"],
                i["Extensions/Annotations/ControlPoint.js"],
                i["Core/Utilities.js"],
            ],
            function (t, i, s) {
                let {
                    defined: n,
                    extend: e,
                    isNumber: o,
                    merge: a,
                    pick: r,
                } = s;
                function l() {
                    let t = "";
                    return (
                        "" !== this.max &&
                            "" !== this.min &&
                            (t = (this.max + this.min) / 2),
                        t
                    );
                }
                function h() {
                    let t = this.chart.series,
                        i = c(
                            this.xAxisMin,
                            this.xAxisMax,
                            this.yAxisMin,
                            this.yAxisMax
                        ),
                        s = 0,
                        n = !1;
                    return (
                        t.forEach((t) => {
                            t.visible &&
                                "highcharts-navigator-series" !==
                                    t.options.id &&
                                t.points.forEach((t) => {
                                    !t.isNull &&
                                        t.x > i.xAxisMin &&
                                        t.x <= i.xAxisMax &&
                                        t.y > i.yAxisMin &&
                                        t.y <= i.yAxisMax &&
                                        (s++, (n = !0));
                                });
                        }),
                        n || (s = ""),
                        s
                    );
                }
                function p() {
                    return (
                        "Min: " +
                        this.min +
                        "<br>Max: " +
                        this.max +
                        "<br>Average: " +
                        this.average +
                        "<br>Bins: " +
                        this.bins
                    );
                }
                function c(t, i, s, n) {
                    return {
                        xAxisMin: Math.min(i, t),
                        xAxisMax: Math.max(i, t),
                        yAxisMin: Math.min(n, s),
                        yAxisMax: Math.max(n, s),
                    };
                }
                function d(t, i, s) {
                    return t.toValue(t.toPixels(i) + s);
                }
                function u() {
                    let t = this.options.typeOptions,
                        i = this.chart,
                        s = i.inverted,
                        n = i.xAxis[t.xAxis],
                        e = i.yAxis[t.yAxis],
                        a = t.background,
                        r = s ? a.height : a.width,
                        l = s ? a.width : a.height,
                        h = t.selectType,
                        p = s ? n.left : e.top,
                        c = s ? e.top : n.left;
                    (this.startXMin = t.point.x),
                        (this.startYMin = t.point.y),
                        o(r)
                            ? (this.startXMax = this.startXMin + r)
                            : (this.startXMax = d(
                                  n,
                                  this.startXMin,
                                  parseFloat(r)
                              )),
                        o(l)
                            ? (this.startYMax = this.startYMin - l)
                            : (this.startYMax = d(
                                  e,
                                  this.startYMin,
                                  parseFloat(l)
                              )),
                        "x" === h
                            ? ((this.startYMin = e.toValue(p)),
                              (this.startYMax = e.toValue(p + e.len)))
                            : "y" === h &&
                              ((this.startXMin = n.toValue(c)),
                              (this.startXMax = n.toValue(c + n.len)));
                }
                function x() {
                    let t = this.chart.series,
                        i = c(
                            this.xAxisMin,
                            this.xAxisMax,
                            this.yAxisMin,
                            this.yAxisMax
                        ),
                        s = -1 / 0,
                        n = !1;
                    return (
                        t.forEach((t) => {
                            t.visible &&
                                "highcharts-navigator-series" !==
                                    t.options.id &&
                                t.points.forEach((t) => {
                                    !t.isNull &&
                                        t.y > s &&
                                        t.x > i.xAxisMin &&
                                        t.x <= i.xAxisMax &&
                                        t.y > i.yAxisMin &&
                                        t.y <= i.yAxisMax &&
                                        ((s = t.y), (n = !0));
                                });
                        }),
                        n || (s = ""),
                        s
                    );
                }
                function g() {
                    let t = this.chart.series,
                        i = c(
                            this.xAxisMin,
                            this.xAxisMax,
                            this.yAxisMin,
                            this.yAxisMax
                        ),
                        s = 1 / 0,
                        n = !1;
                    return (
                        t.forEach((t) => {
                            t.visible &&
                                "highcharts-navigator-series" !==
                                    t.options.id &&
                                t.points.forEach((t) => {
                                    !t.isNull &&
                                        t.y < s &&
                                        t.x > i.xAxisMin &&
                                        t.x <= i.xAxisMax &&
                                        t.y > i.yAxisMin &&
                                        t.y <= i.yAxisMax &&
                                        ((s = t.y), (n = !0));
                                });
                        }),
                        n || (s = ""),
                        s
                    );
                }
                function y(t) {
                    let i = this.options.typeOptions,
                        s = this.chart.xAxis[i.xAxis],
                        n = this.chart.yAxis[i.yAxis],
                        e = this.offsetX,
                        o = this.offsetY;
                    (this.xAxisMin = d(s, this.startXMin, e)),
                        (this.xAxisMax = d(s, this.startXMax, e)),
                        (this.yAxisMin = d(n, this.startYMin, o)),
                        (this.yAxisMax = d(n, this.startYMax, o)),
                        (this.min = g.call(this)),
                        (this.max = x.call(this)),
                        (this.average = l.call(this)),
                        (this.bins = h.call(this)),
                        t && this.resize(0, 0);
                }
                function f(t, i, s, n, e) {
                    let o = this.options.typeOptions,
                        a = o.selectType,
                        r = this.chart.xAxis[o.xAxis],
                        l = this.chart.yAxis[o.yAxis],
                        h = this.startXMin,
                        p = this.startXMax,
                        c = this.startYMin,
                        u = this.startYMax,
                        x = this.offsetX,
                        g = this.offsetY;
                    i &&
                        ("x" === a
                            ? 0 === s
                                ? (this.startXMin = d(r, h, n))
                                : (this.startXMax = d(r, p, n))
                            : "y" === a
                            ? 0 === s
                                ? (this.startYMin = d(l, c, e))
                                : (this.startYMax = d(l, u, e))
                            : ((this.startXMax = d(r, p, n)),
                              (this.startYMax = d(l, u, e)))),
                        t &&
                            ((this.startXMin = d(r, h, x)),
                            (this.startXMax = d(r, p, x)),
                            (this.startYMin = d(l, c, g)),
                            (this.startYMax = d(l, u, g)),
                            (this.offsetX = 0),
                            (this.offsetY = 0)),
                        (this.options.typeOptions.point = {
                            x: this.startXMin,
                            y: this.startYMin,
                        }),
                        (this.userOptions.typeOptions.point = {
                            x: this.startXMin,
                            y: this.startYMin,
                        });
                }
                class m extends t {
                    init(t, i, s) {
                        super.init(t, i, s),
                            (this.offsetX = 0),
                            (this.offsetY = 0),
                            (this.resizeX = 0),
                            (this.resizeY = 0),
                            u.call(this),
                            this.addValues(),
                            this.addShapes();
                    }
                    setClipAxes() {
                        (this.clipXAxis =
                            this.chart.xAxis[this.options.typeOptions.xAxis]),
                            (this.clipYAxis =
                                this.chart.yAxis[
                                    this.options.typeOptions.yAxis
                                ]);
                    }
                    pointsOptions() {
                        return this.options.points;
                    }
                    shapePointsOptions() {
                        let t = this.options.typeOptions,
                            i = t.xAxis,
                            s = t.yAxis;
                        return [
                            {
                                x: this.xAxisMin,
                                y: this.yAxisMin,
                                xAxis: i,
                                yAxis: s,
                            },
                            {
                                x: this.xAxisMax,
                                y: this.yAxisMin,
                                xAxis: i,
                                yAxis: s,
                            },
                            {
                                x: this.xAxisMax,
                                y: this.yAxisMax,
                                xAxis: i,
                                yAxis: s,
                            },
                            {
                                x: this.xAxisMin,
                                y: this.yAxisMax,
                                xAxis: i,
                                yAxis: s,
                            },
                        ];
                    }
                    addControlPoints() {
                        let t = this.chart.inverted,
                            s = this.options.controlPointOptions,
                            e = this.options.typeOptions.selectType;
                        n(
                            this.userOptions.controlPointOptions &&
                                this.userOptions.controlPointOptions.style
                                    .cursor
                        ) ||
                            ("x" === e
                                ? (s.style.cursor = t
                                      ? "ns-resize"
                                      : "ew-resize")
                                : "y" !== e ||
                                  (s.style.cursor = t
                                      ? "ew-resize"
                                      : "ns-resize"));
                        let o = new i(
                            this.chart,
                            this,
                            this.options.controlPointOptions,
                            0
                        );
                        this.controlPoints.push(o),
                            "xy" !== e &&
                                ((o = new i(
                                    this.chart,
                                    this,
                                    this.options.controlPointOptions,
                                    1
                                )),
                                this.controlPoints.push(o));
                    }
                    addValues(t) {
                        let i = this.options.typeOptions,
                            s = i.label.formatter;
                        y.call(this, t),
                            i.label.enabled &&
                                (this.labels.length > 0
                                    ? (this.labels[0].text =
                                          (s && s.call(this)) || p.call(this))
                                    : this.initLabel(
                                          e(
                                              {
                                                  shape: "rect",
                                                  backgroundColor: "none",
                                                  color: "black",
                                                  borderWidth: 0,
                                                  dashStyle: "Dash",
                                                  overflow: "allow",
                                                  align: "left",
                                                  y: 0,
                                                  x: 0,
                                                  verticalAlign: "top",
                                                  crop: !0,
                                                  xAxis: 0,
                                                  yAxis: 0,
                                                  point: function (t) {
                                                      let s = t.annotation,
                                                          n = t.options;
                                                      return {
                                                          x: s.xAxisMin,
                                                          y: s.yAxisMin,
                                                          xAxis: r(
                                                              i.xAxis,
                                                              n.xAxis
                                                          ),
                                                          yAxis: r(
                                                              i.yAxis,
                                                              n.yAxis
                                                          ),
                                                      };
                                                  },
                                                  text:
                                                      (s && s.call(this)) ||
                                                      p.call(this),
                                              },
                                              i.label
                                          ),
                                          void 0
                                      ));
                    }
                    addShapes() {
                        this.addCrosshairs(), this.addBackground();
                    }
                    addBackground() {
                        let t = this.shapePointsOptions();
                        void 0 !== t[0].x &&
                            this.initShape(
                                e(
                                    {
                                        type: "path",
                                        points: this.shapePointsOptions(),
                                    },
                                    this.options.typeOptions.background
                                ),
                                2
                            );
                    }
                    addCrosshairs() {
                        let t = this.chart,
                            i = this.options.typeOptions,
                            s = this.options.typeOptions.point,
                            n = t.xAxis[i.xAxis],
                            o = t.yAxis[i.yAxis],
                            r = t.inverted,
                            l = { point: s, type: "path" },
                            h = n.toPixels(this.xAxisMin),
                            p = n.toPixels(this.xAxisMax),
                            c = o.toPixels(this.yAxisMin),
                            d = o.toPixels(this.yAxisMax),
                            u = [],
                            x = [],
                            g,
                            y,
                            f;
                        r &&
                            ((f = h),
                            (h = c),
                            (c = f),
                            (f = p),
                            (p = d),
                            (d = f)),
                            i.crosshairX.enabled &&
                                (u = [
                                    ["M", h, c + (d - c) / 2],
                                    ["L", p, c + (d - c) / 2],
                                ]),
                            i.crosshairY.enabled &&
                                (x = [
                                    ["M", h + (p - h) / 2, c],
                                    ["L", h + (p - h) / 2, d],
                                ]),
                            this.shapes.length > 0
                                ? ((this.shapes[0].options.d = u),
                                  (this.shapes[1].options.d = x))
                                : ((g = a(l, i.crosshairX)),
                                  (y = a(l, i.crosshairY)),
                                  this.initShape(e({ d: u }, g), 0),
                                  this.initShape(e({ d: x }, y), 1));
                    }
                    onDrag(t) {
                        let i = this.mouseMoveToTranslation(t),
                            s = this.options.typeOptions.selectType,
                            n = "y" === s ? 0 : i.x,
                            e = "x" === s ? 0 : i.y;
                        this.translate(n, e),
                            (this.offsetX += n),
                            (this.offsetY += e),
                            this.redraw(!1, !1, !0);
                    }
                    resize(t, i, s, n) {
                        let e = this.shapes[2];
                        "x" === n
                            ? 0 === s
                                ? (e.translatePoint(t, 0, 0),
                                  e.translatePoint(t, i, 3))
                                : (e.translatePoint(t, 0, 1),
                                  e.translatePoint(t, i, 2))
                            : "y" === n
                            ? 0 === s
                                ? (e.translatePoint(0, i, 0),
                                  e.translatePoint(0, i, 1))
                                : (e.translatePoint(0, i, 2),
                                  e.translatePoint(0, i, 3))
                            : (e.translatePoint(t, 0, 1),
                              e.translatePoint(t, i, 2),
                              e.translatePoint(0, i, 3)),
                            f.call(this, !1, !0, s, t, i),
                            (this.options.typeOptions.background.height =
                                Math.abs(this.startYMax - this.startYMin)),
                            (this.options.typeOptions.background.width =
                                Math.abs(this.startXMax - this.startXMin));
                    }
                    redraw(t, i, s) {
                        this.linkPoints(),
                            this.graphic || this.render(),
                            s && f.call(this, !0, !1),
                            this.clipRect &&
                                this.clipRect.animate(this.getClipBox()),
                            this.addValues(i),
                            this.addCrosshairs(),
                            this.redrawItems(this.shapes, t),
                            this.redrawItems(this.labels, t),
                            this.controlPoints.forEach((t) => t.redraw());
                    }
                    translate(t, i) {
                        this.shapes.forEach((s) => s.translate(t, i));
                    }
                }
                return (
                    (m.prototype.defaultOptions = a(
                        t.prototype.defaultOptions,
                        {
                            typeOptions: {
                                selectType: "xy",
                                xAxis: 0,
                                yAxis: 0,
                                background: {
                                    fill: "rgba(130, 170, 255, 0.4)",
                                    strokeWidth: 0,
                                    stroke: void 0,
                                },
                                crosshairX: {
                                    enabled: !0,
                                    zIndex: 6,
                                    dashStyle: "Dash",
                                    markerEnd: "arrow",
                                },
                                crosshairY: {
                                    enabled: !0,
                                    zIndex: 6,
                                    dashStyle: "Dash",
                                    markerEnd: "arrow",
                                },
                                label: {
                                    enabled: !0,
                                    style: {
                                        fontSize: "0.7em",
                                        color: "#666666",
                                    },
                                    formatter: void 0,
                                },
                            },
                            controlPointOptions: {
                                positioner: function (t) {
                                    let i = this.index,
                                        s = t.chart,
                                        n = t.options,
                                        e = n.typeOptions,
                                        o = e.selectType,
                                        a = n.controlPointOptions,
                                        r = s.inverted,
                                        l = s.xAxis[e.xAxis],
                                        h = s.yAxis[e.yAxis],
                                        p = c(
                                            t.xAxisMin,
                                            t.xAxisMax,
                                            t.yAxisMin,
                                            t.yAxisMax
                                        ),
                                        d = t.xAxisMax,
                                        u = t.yAxisMax,
                                        x,
                                        g;
                                    return (
                                        "x" === o &&
                                            ((u =
                                                (p.yAxisMax + p.yAxisMin) / 2),
                                            0 === i && (d = t.xAxisMin)),
                                        "y" === o &&
                                            ((d =
                                                p.xAxisMin +
                                                (p.xAxisMax - p.xAxisMin) / 2),
                                            0 === i && (u = t.yAxisMin)),
                                        r
                                            ? ((x = h.toPixels(u)),
                                              (g = l.toPixels(d)))
                                            : ((x = l.toPixels(d)),
                                              (g = h.toPixels(u))),
                                        {
                                            x: x - a.width / 2,
                                            y: g - a.height / 2,
                                        }
                                    );
                                },
                                events: {
                                    drag: function (t, i) {
                                        let s = this.mouseMoveToTranslation(t),
                                            n =
                                                i.options.typeOptions
                                                    .selectType,
                                            e = this.index,
                                            o = "y" === n ? 0 : s.x,
                                            a = "x" === n ? 0 : s.y;
                                        i.resize(o, a, e, n),
                                            (i.resizeX += o),
                                            (i.resizeY += a),
                                            i.redraw(!1, !0);
                                    },
                                },
                            },
                        }
                    )),
                    (t.types.measure = m),
                    m
                );
            }
        ),
        s(
            i,
            "masters/modules/annotations-advanced.src.js",
            [i["Core/Globals.js"], i["Extensions/Annotations/Annotation.js"]],
            function (t, i) {
                (t.Annotation = i),
                    i.compose(t.Chart, t.Pointer, t.SVGRenderer);
            }
        );
});
