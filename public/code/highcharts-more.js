/**
 * Highcharts JS v11.3.0 (2024-01-10)
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */ !(function (t) {
    "object" == typeof module && module.exports
        ? ((t.default = t), (module.exports = t))
        : "function" == typeof define && define.amd
        ? define("highcharts/highcharts-more", ["highcharts"], function (e) {
              return t(e), (t.Highcharts = e), t;
          })
        : t("undefined" != typeof Highcharts ? Highcharts : void 0);
})(function (t) {
    "use strict";
    var e = t ? t._modules : {};
    function i(t, e, i, s) {
        t.hasOwnProperty(e) ||
            ((t[e] = s.apply(null, i)),
            "function" == typeof CustomEvent &&
                window.dispatchEvent(
                    new CustomEvent("HighchartsModuleLoaded", {
                        detail: { path: e, module: t[e] },
                    })
                ));
    }
    i(
        e,
        "Extensions/Pane/PaneComposition.js",
        [e["Core/Globals.js"], e["Core/Utilities.js"]],
        function (t, e) {
            let { composed: i } = t,
                {
                    addEvent: s,
                    correctFloat: o,
                    defined: a,
                    pick: r,
                    pushUnique: n,
                } = e;
            function l(t) {
                let e;
                let i = this;
                return (
                    t &&
                        i.pane.forEach((s) => {
                            let o = t.chartX - i.plotLeft,
                                a = t.chartY - i.plotTop;
                            h(o, a, s.center) && (e = s);
                        }),
                    e
                );
            }
            function h(t, e, i, s, r) {
                let n = !0,
                    l = i[0],
                    h = i[1],
                    p = Math.sqrt(Math.pow(t - l, 2) + Math.pow(e - h, 2));
                if (a(s) && a(r)) {
                    let i = Math.atan2(o(e - h, 8), o(t - l, 8));
                    r !== s &&
                        (n =
                            s > r
                                ? (i >= s && i <= Math.PI) ||
                                  (i <= r && i >= -Math.PI)
                                : i >= s && i <= o(r, 8));
                }
                return p <= Math.ceil(i[2] / 2) && n;
            }
            function p(t) {
                this.polar &&
                    (t.options.inverted && ([t.x, t.y] = [t.y, t.x]),
                    (t.isInsidePlot = this.pane.some((e) =>
                        h(
                            t.x,
                            t.y,
                            e.center,
                            e.axis && e.axis.normalizedStartAngleRad,
                            e.axis && e.axis.normalizedEndAngleRad
                        )
                    )));
            }
            function d(t) {
                let e = this.chart;
                t.hoverPoint &&
                    t.hoverPoint.plotX &&
                    t.hoverPoint.plotY &&
                    e.hoverPane &&
                    !h(
                        t.hoverPoint.plotX,
                        t.hoverPoint.plotY,
                        e.hoverPane.center
                    ) &&
                    (t.hoverPoint = void 0);
            }
            function c(t) {
                let e = this.chart;
                e.polar
                    ? ((e.hoverPane = e.getHoverPane(t)),
                      (t.filter = function (i) {
                          return (
                              i.visible &&
                              !(!t.shared && i.directTouch) &&
                              r(i.options.enableMouseTracking, !0) &&
                              (!e.hoverPane || i.xAxis.pane === e.hoverPane)
                          );
                      }))
                    : (e.hoverPane = void 0);
            }
            return {
                compose: function t(e, o) {
                    if (n(i, t)) {
                        let t = e.prototype;
                        t.collectionsWithUpdate.push("pane"),
                            (t.getHoverPane = l),
                            s(e, "afterIsInsidePlot", p),
                            s(o, "afterGetHoverData", d),
                            s(o, "beforeGetHoverData", c);
                    }
                },
            };
        }
    ),
        i(e, "Extensions/Pane/PaneDefaults.js", [], function () {
            let t = {
                shape: "circle",
                borderWidth: 1,
                borderColor: "#cccccc",
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, "#ffffff"],
                        [1, "#e6e6e6"],
                    ],
                },
                from: -Number.MAX_VALUE,
                innerRadius: 0,
                to: Number.MAX_VALUE,
                outerRadius: "105%",
            };
            return {
                pane: {
                    center: ["50%", "50%"],
                    size: "85%",
                    innerSize: "0%",
                    startAngle: 0,
                },
                background: t,
            };
        }),
        i(
            e,
            "Extensions/Pane/Pane.js",
            [
                e["Series/CenteredUtilities.js"],
                e["Extensions/Pane/PaneComposition.js"],
                e["Extensions/Pane/PaneDefaults.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s) {
                let { extend: o, merge: a, splat: r } = s;
                class n {
                    constructor(t, e) {
                        (this.coll = "pane"), this.init(t, e);
                    }
                    init(t, e) {
                        (this.chart = e),
                            (this.background = []),
                            e.pane.push(this),
                            this.setOptions(t);
                    }
                    setOptions(t) {
                        this.options = t = a(
                            i.pane,
                            this.chart.angular ? { background: {} } : void 0,
                            t
                        );
                    }
                    render() {
                        let t = this.options,
                            e = this.chart.renderer;
                        this.group ||
                            (this.group = e
                                .g("pane-group")
                                .attr({ zIndex: t.zIndex || 0 })
                                .add()),
                            this.updateCenter();
                        let s = this.options.background;
                        if (s) {
                            s = r(s);
                            let t = Math.max(
                                s.length,
                                this.background.length || 0
                            );
                            for (let e = 0; e < t; e++)
                                s[e] && this.axis
                                    ? this.renderBackground(
                                          a(i.background, s[e]),
                                          e
                                      )
                                    : this.background[e] &&
                                      ((this.background[e] =
                                          this.background[e].destroy()),
                                      this.background.splice(e, 1));
                        }
                    }
                    renderBackground(t, e) {
                        let i = {
                                class: "highcharts-pane " + (t.className || ""),
                            },
                            s = "animate";
                        this.chart.styledMode ||
                            o(i, {
                                fill: t.backgroundColor,
                                stroke: t.borderColor,
                                "stroke-width": t.borderWidth,
                            }),
                            this.background[e] ||
                                ((this.background[e] = this.chart.renderer
                                    .path()
                                    .add(this.group)),
                                (s = "attr")),
                            this.background[e][s]({
                                d: this.axis.getPlotBandPath(t.from, t.to, t),
                            }).attr(i);
                    }
                    updateCenter(e) {
                        this.center = (e || this.axis || {}).center =
                            t.getCenter.call(this);
                    }
                    update(t, e) {
                        a(!0, this.options, t),
                            this.setOptions(this.options),
                            this.render(),
                            this.chart.axes.forEach(function (t) {
                                t.pane === this &&
                                    ((t.pane = null), t.update({}, e));
                            }, this);
                    }
                }
                return (n.compose = e.compose), n;
            }
        ),
        i(
            e,
            "Series/AreaRange/AreaRangePoint.js",
            [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
            function (t, e) {
                let {
                        area: {
                            prototype: {
                                pointClass: i,
                                pointClass: { prototype: s },
                            },
                        },
                    } = t.seriesTypes,
                    { defined: o, isNumber: a, merge: r } = e;
                return class extends i {
                    setState() {
                        let t = this.state,
                            e = this.series,
                            i = e.chart.polar;
                        e.options.marker,
                            e.symbol,
                            o(this.plotHigh) ||
                                (this.plotHigh = e.yAxis.toPixels(
                                    this.high,
                                    !0
                                )),
                            o(this.plotLow) ||
                                (this.plotLow = this.plotY =
                                    e.yAxis.toPixels(this.low, !0)),
                            (e.lowerStateMarkerGraphic = e.stateMarkerGraphic),
                            (e.stateMarkerGraphic = e.upperStateMarkerGraphic),
                            (this.graphic = this.graphics && this.graphics[1]),
                            (this.plotY = this.plotHigh),
                            i &&
                                a(this.plotHighX) &&
                                (this.plotX = this.plotHighX),
                            s.setState.apply(this, arguments),
                            (this.state = t),
                            (this.plotY = this.plotLow),
                            (this.graphic = this.graphics && this.graphics[0]),
                            i &&
                                a(this.plotLowX) &&
                                (this.plotX = this.plotLowX),
                            (e.upperStateMarkerGraphic = e.stateMarkerGraphic),
                            (e.stateMarkerGraphic = e.lowerStateMarkerGraphic),
                            (e.lowerStateMarkerGraphic = void 0);
                        let r = e.modifyMarkerSettings();
                        s.setState.apply(this, arguments),
                            e.restoreMarkerSettings(r);
                    }
                    haloPath() {
                        let t = this.series.chart.polar,
                            e = [];
                        return (
                            (this.plotY = this.plotLow),
                            t &&
                                a(this.plotLowX) &&
                                (this.plotX = this.plotLowX),
                            this.isInside &&
                                (e = s.haloPath.apply(this, arguments)),
                            (this.plotY = this.plotHigh),
                            t &&
                                a(this.plotHighX) &&
                                (this.plotX = this.plotHighX),
                            this.isTopInside &&
                                (e = e.concat(
                                    s.haloPath.apply(this, arguments)
                                )),
                            e
                        );
                    }
                    isValid() {
                        return a(this.low) && a(this.high);
                    }
                };
            }
        ),
        i(
            e,
            "Series/AreaRange/AreaRangeSeries.js",
            [
                e["Series/AreaRange/AreaRangePoint.js"],
                e["Core/Globals.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s) {
                let { noop: o } = e,
                    {
                        area: a,
                        area: { prototype: r },
                        column: { prototype: n },
                    } = i.seriesTypes,
                    {
                        addEvent: l,
                        defined: h,
                        extend: p,
                        isArray: d,
                        isNumber: c,
                        pick: u,
                        merge: g,
                    } = s;
                class f extends a {
                    toYData(t) {
                        return [t.low, t.high];
                    }
                    highToXY(t) {
                        let e = this.chart,
                            i = this.xAxis.postTranslate(
                                t.rectPlotX || 0,
                                this.yAxis.len - (t.plotHigh || 0)
                            );
                        (t.plotHighX = i.x - e.plotLeft),
                            (t.plotHigh = i.y - e.plotTop),
                            (t.plotLowX = t.plotX);
                    }
                    getGraphPath(t) {
                        let e = [],
                            i = [],
                            s = r.getGraphPath,
                            o = this.options,
                            a = this.chart.polar,
                            n = a && !1 !== o.connectEnds,
                            l = o.connectNulls,
                            h,
                            p,
                            d,
                            c = o.step;
                        for (h = (t = t || this.points).length; h--; ) {
                            p = t[h];
                            let s = a
                                ? {
                                      plotX: p.rectPlotX,
                                      plotY: p.yBottom,
                                      doCurve: !1,
                                  }
                                : {
                                      plotX: p.plotX,
                                      plotY: p.plotY,
                                      doCurve: !1,
                                  };
                            p.isNull ||
                                n ||
                                l ||
                                (t[h + 1] && !t[h + 1].isNull) ||
                                i.push(s),
                                (d = {
                                    polarPlotY: p.polarPlotY,
                                    rectPlotX: p.rectPlotX,
                                    yBottom: p.yBottom,
                                    plotX: u(p.plotHighX, p.plotX),
                                    plotY: p.plotHigh,
                                    isNull: p.isNull,
                                }),
                                i.push(d),
                                e.push(d),
                                p.isNull ||
                                    n ||
                                    l ||
                                    (t[h - 1] && !t[h - 1].isNull) ||
                                    i.push(s);
                        }
                        let g = s.call(this, t);
                        c &&
                            (!0 === c && (c = "left"),
                            (o.step = {
                                left: "right",
                                center: "center",
                                right: "left",
                            }[c]));
                        let f = s.call(this, e),
                            b = s.call(this, i);
                        o.step = c;
                        let m = [].concat(g, f);
                        return (
                            !this.chart.polar &&
                                b[0] &&
                                "M" === b[0][0] &&
                                (b[0] = ["L", b[0][1], b[0][2]]),
                            (this.graphPath = m),
                            (this.areaPath = g.concat(b)),
                            (m.isArea = !0),
                            (m.xMap = g.xMap),
                            (this.areaPath.xMap = g.xMap),
                            m
                        );
                    }
                    drawDataLabels() {
                        let t, e, i, s, o;
                        let a = this.points,
                            n = a.length,
                            l = [],
                            h = this.options.dataLabels,
                            c = this.chart.inverted;
                        if (h) {
                            if (
                                (d(h)
                                    ? ((s = h[0] || { enabled: !1 }),
                                      (o = h[1] || { enabled: !1 }))
                                    : (((s = p({}, h)).x = h.xHigh),
                                      (s.y = h.yHigh),
                                      ((o = p({}, h)).x = h.xLow),
                                      (o.y = h.yLow)),
                                s.enabled || this.hasDataLabels?.())
                            ) {
                                for (t = n; t--; )
                                    if ((e = a[t])) {
                                        let {
                                            plotHigh: o = 0,
                                            plotLow: a = 0,
                                        } = e;
                                        (i = s.inside ? o < a : o > a),
                                            (e.y = e.high),
                                            (e._plotY = e.plotY),
                                            (e.plotY = o),
                                            (l[t] = e.dataLabel),
                                            (e.dataLabel = e.dataLabelUpper),
                                            (e.below = i),
                                            c
                                                ? s.align ||
                                                  (s.align = i
                                                      ? "right"
                                                      : "left")
                                                : s.verticalAlign ||
                                                  (s.verticalAlign = i
                                                      ? "top"
                                                      : "bottom");
                                    }
                                for (
                                    this.options.dataLabels = s,
                                        r.drawDataLabels &&
                                            r.drawDataLabels.apply(
                                                this,
                                                arguments
                                            ),
                                        t = n;
                                    t--;

                                )
                                    (e = a[t]) &&
                                        ((e.dataLabelUpper = e.dataLabel),
                                        (e.dataLabel = l[t]),
                                        delete e.dataLabels,
                                        (e.y = e.low),
                                        (e.plotY = e._plotY));
                            }
                            if (o.enabled || this.hasDataLabels?.()) {
                                for (t = n; t--; )
                                    if ((e = a[t])) {
                                        let {
                                            plotHigh: t = 0,
                                            plotLow: s = 0,
                                        } = e;
                                        (i = o.inside ? t < s : t > s),
                                            (e.below = !i),
                                            c
                                                ? o.align ||
                                                  (o.align = i
                                                      ? "left"
                                                      : "right")
                                                : o.verticalAlign ||
                                                  (o.verticalAlign = i
                                                      ? "bottom"
                                                      : "top");
                                    }
                                (this.options.dataLabels = o),
                                    r.drawDataLabels &&
                                        r.drawDataLabels.apply(this, arguments);
                            }
                            if (s.enabled)
                                for (t = n; t--; )
                                    (e = a[t]) &&
                                        (e.dataLabels = [
                                            e.dataLabelUpper,
                                            e.dataLabel,
                                        ].filter(function (t) {
                                            return !!t;
                                        }));
                            this.options.dataLabels = h;
                        }
                    }
                    alignDataLabel() {
                        n.alignDataLabel.apply(this, arguments);
                    }
                    modifyMarkerSettings() {
                        let t = {
                            marker: this.options.marker,
                            symbol: this.symbol,
                        };
                        if (this.options.lowMarker) {
                            let {
                                options: { marker: t, lowMarker: e },
                            } = this;
                            (this.options.marker = g(t, e)),
                                e.symbol && (this.symbol = e.symbol);
                        }
                        return t;
                    }
                    restoreMarkerSettings(t) {
                        (this.options.marker = t.marker),
                            (this.symbol = t.symbol);
                    }
                    drawPoints() {
                        let t, e;
                        let i = this.points.length,
                            s = this.modifyMarkerSettings();
                        for (
                            r.drawPoints.apply(this, arguments),
                                this.restoreMarkerSettings(s),
                                t = 0;
                            t < i;

                        )
                            ((e = this.points[t]).graphics = e.graphics || []),
                                (e.origProps = {
                                    plotY: e.plotY,
                                    plotX: e.plotX,
                                    isInside: e.isInside,
                                    negative: e.negative,
                                    zone: e.zone,
                                    y: e.y,
                                }),
                                (e.graphic || e.graphics[0]) &&
                                    (e.graphics[0] = e.graphic),
                                (e.graphic = e.graphics[1]),
                                (e.plotY = e.plotHigh),
                                h(e.plotHighX) && (e.plotX = e.plotHighX),
                                (e.y = u(e.high, e.origProps.y)),
                                (e.negative =
                                    e.y < (this.options.threshold || 0)),
                                this.zones.length && (e.zone = e.getZone()),
                                this.chart.polar ||
                                    (e.isInside = e.isTopInside =
                                        void 0 !== e.plotY &&
                                        e.plotY >= 0 &&
                                        e.plotY <= this.yAxis.len &&
                                        e.plotX >= 0 &&
                                        e.plotX <= this.xAxis.len),
                                t++;
                        for (
                            r.drawPoints.apply(this, arguments), t = 0;
                            t < i;

                        )
                            ((e = this.points[t]).graphics = e.graphics || []),
                                (e.graphic || e.graphics[1]) &&
                                    (e.graphics[1] = e.graphic),
                                (e.graphic = e.graphics[0]),
                                e.origProps &&
                                    (p(e, e.origProps), delete e.origProps),
                                t++;
                    }
                    hasMarkerChanged(t, e) {
                        let i = t.lowMarker,
                            s = e.lowMarker || {};
                        return (
                            (i &&
                                (!1 === i.enabled ||
                                    s.symbol !== i.symbol ||
                                    s.height !== i.height ||
                                    s.width !== i.width)) ||
                            super.hasMarkerChanged(t, e)
                        );
                    }
                }
                return (
                    (f.defaultOptions = g(a.defaultOptions, {
                        lineWidth: 1,
                        threshold: null,
                        tooltip: {
                            pointFormat:
                                '<span style="color:{series.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>',
                        },
                        trackByArea: !0,
                        dataLabels: {
                            align: void 0,
                            verticalAlign: void 0,
                            xLow: 0,
                            xHigh: 0,
                            yLow: 0,
                            yHigh: 0,
                        },
                    })),
                    l(
                        f,
                        "afterTranslate",
                        function () {
                            "low,high" === this.pointArrayMap.join(",") &&
                                this.points.forEach((t) => {
                                    let e = t.high,
                                        i = t.plotY;
                                    t.isNull
                                        ? (t.plotY = void 0)
                                        : ((t.plotLow = i),
                                          (t.plotHigh = c(e)
                                              ? this.yAxis.translate(
                                                    this.dataModify
                                                        ? this.dataModify.modifyValue(
                                                              e
                                                          )
                                                        : e,
                                                    !1,
                                                    !0,
                                                    void 0,
                                                    !0
                                                )
                                              : void 0),
                                          this.dataModify &&
                                              (t.yBottom = t.plotHigh));
                                });
                        },
                        { order: 0 }
                    ),
                    l(
                        f,
                        "afterTranslate",
                        function () {
                            this.chart.inverted,
                                this.points.forEach((t) => {
                                    if (this.chart.polar)
                                        this.highToXY(t),
                                            (t.plotLow = t.plotY),
                                            (t.tooltipPos = [
                                                ((t.plotHighX || 0) +
                                                    (t.plotLowX || 0)) /
                                                    2,
                                                ((t.plotHigh || 0) +
                                                    (t.plotLow || 0)) /
                                                    2,
                                            ]);
                                    else {
                                        let e = t.pos(!1, t.plotLow),
                                            i = t.pos(!1, t.plotHigh);
                                        e &&
                                            i &&
                                            ((e[0] = (e[0] + i[0]) / 2),
                                            (e[1] = (e[1] + i[1]) / 2)),
                                            (t.tooltipPos = e);
                                    }
                                });
                        },
                        { order: 3 }
                    ),
                    p(f.prototype, {
                        deferTranslatePolar: !0,
                        pointArrayMap: ["low", "high"],
                        pointClass: t,
                        pointValKey: "low",
                        setStackedPoints: o,
                    }),
                    i.registerSeriesType("arearange", f),
                    f
                );
            }
        ),
        i(
            e,
            "Series/AreaSplineRange/AreaSplineRangeSeries.js",
            [
                e["Series/AreaRange/AreaRangeSeries.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i) {
                let {
                        spline: { prototype: s },
                    } = e.seriesTypes,
                    { merge: o, extend: a } = i;
                class r extends t {}
                return (
                    (r.defaultOptions = o(t.defaultOptions)),
                    a(r.prototype, { getPointSpline: s.getPointSpline }),
                    e.registerSeriesType("areasplinerange", r),
                    r
                );
            }
        ),
        i(e, "Series/BoxPlot/BoxPlotSeriesDefaults.js", [], function () {
            return {
                threshold: null,
                tooltip: {
                    pointFormat:
                        '<span style="color:{point.color}">●</span> <b>{series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>',
                },
                whiskerLength: "50%",
                fillColor: "#ffffff",
                lineWidth: 1,
                medianWidth: 2,
                whiskerWidth: 2,
            };
        }),
        i(
            e,
            "Series/BoxPlot/BoxPlotSeries.js",
            [
                e["Series/BoxPlot/BoxPlotSeriesDefaults.js"],
                e["Series/Column/ColumnSeries.js"],
                e["Core/Globals.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, o) {
                let { noop: a } = i,
                    { extend: r, merge: n, pick: l } = o;
                class h extends e {
                    pointAttribs() {
                        return {};
                    }
                    translate() {
                        let t = this.yAxis,
                            e = this.pointArrayMap;
                        super.translate.apply(this),
                            this.points.forEach(function (i) {
                                e.forEach(function (e) {
                                    null !== i[e] &&
                                        (i[e + "Plot"] = t.translate(
                                            i[e],
                                            0,
                                            1,
                                            0,
                                            1
                                        ));
                                }),
                                    (i.plotHigh = i.highPlot);
                            });
                    }
                    drawPoints() {
                        let t = this.points,
                            e = this.options,
                            i = this.chart,
                            s = i.renderer,
                            o = !1 !== this.doQuartiles,
                            a = this.options.whiskerLength,
                            r,
                            n,
                            h,
                            p,
                            d,
                            c,
                            u,
                            g = 0,
                            f,
                            b,
                            m,
                            y,
                            x,
                            P,
                            S;
                        for (let M of t) {
                            b = M.graphic;
                            let t = b ? "animate" : "attr",
                                L = M.shapeArgs,
                                k = {},
                                v = {},
                                C = {},
                                w = {},
                                A = M.color || this.color;
                            if (void 0 !== M.plotY) {
                                let N;
                                (m = Math.round(L.width)),
                                    (x = (y = Math.floor(L.x)) + m),
                                    (P = Math.round(m / 2)),
                                    (r = Math.floor(o ? M.q1Plot : M.lowPlot)),
                                    (n = Math.floor(o ? M.q3Plot : M.lowPlot)),
                                    (h = Math.floor(M.highPlot)),
                                    (p = Math.floor(M.lowPlot)),
                                    b ||
                                        ((M.graphic = b =
                                            s.g("point").add(this.group)),
                                        (M.stem = s
                                            .path()
                                            .addClass("highcharts-boxplot-stem")
                                            .add(b)),
                                        a &&
                                            (M.whiskers = s
                                                .path()
                                                .addClass(
                                                    "highcharts-boxplot-whisker"
                                                )
                                                .add(b)),
                                        o &&
                                            (M.box = s
                                                .path(f)
                                                .addClass(
                                                    "highcharts-boxplot-box"
                                                )
                                                .add(b)),
                                        (M.medianShape = s
                                            .path(c)
                                            .addClass(
                                                "highcharts-boxplot-median"
                                            )
                                            .add(b))),
                                    i.styledMode ||
                                        ((v.stroke =
                                            M.stemColor || e.stemColor || A),
                                        (v["stroke-width"] = l(
                                            M.stemWidth,
                                            e.stemWidth,
                                            e.lineWidth
                                        )),
                                        (v.dashstyle =
                                            M.stemDashStyle ||
                                            e.stemDashStyle ||
                                            e.dashStyle),
                                        M.stem.attr(v),
                                        a &&
                                            ((C.stroke =
                                                M.whiskerColor ||
                                                e.whiskerColor ||
                                                A),
                                            (C["stroke-width"] = l(
                                                M.whiskerWidth,
                                                e.whiskerWidth,
                                                e.lineWidth
                                            )),
                                            (C.dashstyle =
                                                M.whiskerDashStyle ||
                                                e.whiskerDashStyle ||
                                                e.dashStyle),
                                            M.whiskers.attr(C)),
                                        o &&
                                            ((k.fill =
                                                M.fillColor ||
                                                e.fillColor ||
                                                A),
                                            (k.stroke = e.lineColor || A),
                                            (k["stroke-width"] =
                                                e.lineWidth || 0),
                                            (k.dashstyle =
                                                M.boxDashStyle ||
                                                e.boxDashStyle ||
                                                e.dashStyle),
                                            M.box.attr(k)),
                                        (w.stroke =
                                            M.medianColor ||
                                            e.medianColor ||
                                            A),
                                        (w["stroke-width"] = l(
                                            M.medianWidth,
                                            e.medianWidth,
                                            e.lineWidth
                                        )),
                                        (w.dashstyle =
                                            M.medianDashStyle ||
                                            e.medianDashStyle ||
                                            e.dashStyle),
                                        M.medianShape.attr(w)),
                                    (N = [
                                        [
                                            "M",
                                            (g =
                                                y +
                                                P +
                                                (u =
                                                    (M.stem.strokeWidth() % 2) /
                                                    2)),
                                            n,
                                        ],
                                        ["L", g, h],
                                        ["M", g, r],
                                        ["L", g, p],
                                    ]),
                                    M.stem[t]({ d: N }),
                                    o &&
                                        ((r =
                                            Math.floor(r) +
                                            (u =
                                                (M.box.strokeWidth() % 2) / 2)),
                                        (n = Math.floor(n) + u),
                                        (y += u),
                                        (x += u),
                                        (N = [
                                            ["M", y, n],
                                            ["L", y, r],
                                            ["L", x, r],
                                            ["L", x, n],
                                            ["L", y, n],
                                            ["Z"],
                                        ]),
                                        M.box[t]({ d: N })),
                                    a &&
                                        ((h += u =
                                            (M.whiskers.strokeWidth() % 2) / 2),
                                        (p += u),
                                        (N = [
                                            [
                                                "M",
                                                g -
                                                    (S = /%$/.test(a)
                                                        ? (P * parseFloat(a)) /
                                                          100
                                                        : a / 2),
                                                h,
                                            ],
                                            ["L", g + S, h],
                                            ["M", g - S, p],
                                            ["L", g + S, p],
                                        ]),
                                        M.whiskers[t]({ d: N })),
                                    (N = [
                                        [
                                            "M",
                                            y,
                                            (d =
                                                Math.round(M.medianPlot) +
                                                (u =
                                                    (M.medianShape.strokeWidth() %
                                                        2) /
                                                    2)),
                                        ],
                                        ["L", x, d],
                                    ]),
                                    M.medianShape[t]({ d: N });
                            }
                        }
                    }
                    toYData(t) {
                        return [t.low, t.q1, t.median, t.q3, t.high];
                    }
                }
                return (
                    (h.defaultOptions = n(e.defaultOptions, t)),
                    r(h.prototype, {
                        pointArrayMap: ["low", "q1", "median", "q3", "high"],
                        pointValKey: "high",
                        drawDataLabels: a,
                        setStackedPoints: a,
                    }),
                    s.registerSeriesType("boxplot", h),
                    h
                );
            }
        ),
        i(e, "Series/Bubble/BubbleLegendDefaults.js", [], function () {
            return {
                borderColor: void 0,
                borderWidth: 2,
                className: void 0,
                color: void 0,
                connectorClassName: void 0,
                connectorColor: void 0,
                connectorDistance: 60,
                connectorWidth: 1,
                enabled: !1,
                labels: {
                    className: void 0,
                    allowOverlap: !1,
                    format: "",
                    formatter: void 0,
                    align: "right",
                    style: { fontSize: "0.9em", color: "#000000" },
                    x: 0,
                    y: 0,
                },
                maxSize: 60,
                minSize: 10,
                legendIndex: 0,
                ranges: {
                    value: void 0,
                    borderColor: void 0,
                    color: void 0,
                    connectorColor: void 0,
                },
                sizeBy: "area",
                sizeByAbsoluteValue: !1,
                zIndex: 1,
                zThreshold: 0,
            };
        }),
        i(
            e,
            "Series/Bubble/BubbleLegendItem.js",
            [
                e["Core/Color/Color.js"],
                e["Core/Templating.js"],
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s) {
                let { parse: o } = t,
                    { noop: a } = i,
                    {
                        arrayMax: r,
                        arrayMin: n,
                        isNumber: l,
                        merge: h,
                        pick: p,
                        stableSort: d,
                    } = s;
                return class {
                    constructor(t, e) {
                        (this.setState = a), this.init(t, e);
                    }
                    init(t, e) {
                        (this.options = t),
                            (this.visible = !0),
                            (this.chart = e.chart),
                            (this.legend = e);
                    }
                    addToLegend(t) {
                        t.splice(this.options.legendIndex, 0, this);
                    }
                    drawLegendSymbol(t) {
                        let e;
                        this.chart;
                        let i = p(t.options.itemDistance, 20),
                            s = this.legendItem || {},
                            o = this.options,
                            a = o.ranges,
                            r = o.connectorDistance;
                        if (!a || !a.length || !l(a[0].value)) {
                            t.options.bubbleLegend.autoRanges = !0;
                            return;
                        }
                        d(a, function (t, e) {
                            return e.value - t.value;
                        }),
                            (this.ranges = a),
                            this.setOptions(),
                            this.render();
                        let n = this.getMaxLabelSize(),
                            h = this.ranges[0].radius,
                            c = 2 * h;
                        (e = (e = r - h + n.width) > 0 ? e : 0),
                            (this.maxLabel = n),
                            (this.movementX =
                                "left" === o.labels.align ? e : 0),
                            (s.labelWidth = c + e + i),
                            (s.labelHeight = c + n.height / 2);
                    }
                    setOptions() {
                        let t = this.ranges,
                            e = this.options,
                            i = this.chart.series[e.seriesIndex],
                            s = this.legend.baseline,
                            a = {
                                zIndex: e.zIndex,
                                "stroke-width": e.borderWidth,
                            },
                            r = {
                                zIndex: e.zIndex,
                                "stroke-width": e.connectorWidth,
                            },
                            n = {
                                align:
                                    this.legend.options.rtl ||
                                    "left" === e.labels.align
                                        ? "right"
                                        : "left",
                                zIndex: e.zIndex,
                            },
                            l = i.options.marker.fillOpacity,
                            d = this.chart.styledMode;
                        t.forEach(function (c, u) {
                            d ||
                                ((a.stroke = p(
                                    c.borderColor,
                                    e.borderColor,
                                    i.color
                                )),
                                (a.fill = p(
                                    c.color,
                                    e.color,
                                    1 !== l
                                        ? o(i.color).setOpacity(l).get("rgba")
                                        : i.color
                                )),
                                (r.stroke = p(
                                    c.connectorColor,
                                    e.connectorColor,
                                    i.color
                                ))),
                                (t[u].radius = this.getRangeRadius(c.value)),
                                (t[u] = h(t[u], {
                                    center: t[0].radius - t[u].radius + s,
                                })),
                                d ||
                                    h(!0, t[u], {
                                        bubbleAttribs: h(a),
                                        connectorAttribs: h(r),
                                        labelAttribs: n,
                                    });
                        }, this);
                    }
                    getRangeRadius(t) {
                        let e = this.options,
                            i = this.options.seriesIndex,
                            s = this.chart.series[i],
                            o = e.ranges[0].value,
                            a = e.ranges[e.ranges.length - 1].value,
                            r = e.minSize,
                            n = e.maxSize;
                        return s.getRadius.call(this, a, o, r, n, t);
                    }
                    render() {
                        let t = this.legendItem || {},
                            e = this.chart.renderer,
                            i = this.options.zThreshold;
                        for (let s of (this.symbols ||
                            (this.symbols = {
                                connectors: [],
                                bubbleItems: [],
                                labels: [],
                            }),
                        (t.symbol = e.g("bubble-legend")),
                        (t.label = e
                            .g("bubble-legend-item")
                            .css(this.legend.itemStyle || {})),
                        (t.symbol.translateX = 0),
                        (t.symbol.translateY = 0),
                        t.symbol.add(t.label),
                        t.label.add(t.group),
                        this.ranges))
                            s.value >= i && this.renderRange(s);
                        this.hideOverlappingLabels();
                    }
                    renderRange(t) {
                        let e = this.ranges[0],
                            i = this.legend,
                            s = this.options,
                            o = s.labels,
                            a = this.chart,
                            r = a.series[s.seriesIndex],
                            n = a.renderer,
                            l = this.symbols,
                            h = l.labels,
                            p = t.center,
                            d = Math.abs(t.radius),
                            c = s.connectorDistance || 0,
                            u = o.align,
                            g = i.options.rtl,
                            f = s.borderWidth,
                            b = s.connectorWidth,
                            m = e.radius || 0,
                            y = p - d - f / 2 + b / 2,
                            x = (y % 1 ? 1 : 0.5) - (b % 2 ? 0 : 0.5),
                            P = n.styledMode,
                            S = g || "left" === u ? -c : c;
                        "center" === u &&
                            ((S = 0),
                            (s.connectorDistance = 0),
                            (t.labelAttribs.align = "center")),
                            l.bubbleItems.push(
                                n
                                    .circle(m, p + x, d)
                                    .attr(P ? {} : t.bubbleAttribs)
                                    .addClass(
                                        (P
                                            ? "highcharts-color-" +
                                              r.colorIndex +
                                              " "
                                            : "") +
                                            "highcharts-bubble-legend-symbol " +
                                            (s.className || "")
                                    )
                                    .add(this.legendItem.symbol)
                            ),
                            l.connectors.push(
                                n
                                    .path(
                                        n.crispLine(
                                            [
                                                ["M", m, y],
                                                ["L", m + S, y],
                                            ],
                                            s.connectorWidth
                                        )
                                    )
                                    .attr(P ? {} : t.connectorAttribs)
                                    .addClass(
                                        (P
                                            ? "highcharts-color-" +
                                              this.options.seriesIndex +
                                              " "
                                            : "") +
                                            "highcharts-bubble-legend-connectors " +
                                            (s.connectorClassName || "")
                                    )
                                    .add(this.legendItem.symbol)
                            );
                        let M = n
                                .text(this.formatLabel(t))
                                .attr(P ? {} : t.labelAttribs)
                                .css(P ? {} : o.style)
                                .addClass(
                                    "highcharts-bubble-legend-labels " +
                                        (s.labels.className || "")
                                )
                                .add(this.legendItem.symbol),
                            L = {
                                x: m + S + s.labels.x,
                                y: y + s.labels.y + 0.4 * M.getBBox().height,
                            };
                        M.attr(L),
                            h.push(M),
                            (M.placed = !0),
                            (M.alignAttr = L);
                    }
                    getMaxLabelSize() {
                        let t, e;
                        let i = this.symbols.labels;
                        return (
                            i.forEach(function (i) {
                                (e = i.getBBox(!0)),
                                    (t = t ? (e.width > t.width ? e : t) : e);
                            }),
                            t || {}
                        );
                    }
                    formatLabel(t) {
                        let i = this.options,
                            s = i.labels.formatter,
                            o = i.labels.format,
                            { numberFormatter: a } = this.chart;
                        return o
                            ? e.format(o, t)
                            : s
                            ? s.call(t)
                            : a(t.value, 1);
                    }
                    hideOverlappingLabels() {
                        let t = this.chart,
                            e = this.options.labels.allowOverlap,
                            i = this.symbols;
                        !e &&
                            i &&
                            (t.hideOverlappingLabels(i.labels),
                            i.labels.forEach(function (t, e) {
                                t.newOpacity
                                    ? t.newOpacity !== t.oldOpacity &&
                                      i.connectors[e].show()
                                    : i.connectors[e].hide();
                            }));
                    }
                    getRanges() {
                        let t = this.legend.bubbleLegend,
                            e = t.chart.series,
                            i = t.options.ranges,
                            s,
                            o,
                            a = Number.MAX_VALUE,
                            d = -Number.MAX_VALUE;
                        return (
                            e.forEach(function (t) {
                                t.isBubble &&
                                    !t.ignoreSeries &&
                                    (o = t.zData.filter(l)).length &&
                                    ((a = p(
                                        t.options.zMin,
                                        Math.min(
                                            a,
                                            Math.max(
                                                n(o),
                                                !1 === t.options.displayNegative
                                                    ? t.options.zThreshold
                                                    : -Number.MAX_VALUE
                                            )
                                        )
                                    )),
                                    (d = p(t.options.zMax, Math.max(d, r(o)))));
                            }),
                            (s =
                                a === d
                                    ? [{ value: d }]
                                    : [
                                          { value: a },
                                          { value: (a + d) / 2 },
                                          { value: d, autoRanges: !0 },
                                      ]),
                            i.length && i[0].radius && s.reverse(),
                            s.forEach(function (t, e) {
                                i && i[e] && (s[e] = h(i[e], t));
                            }),
                            s
                        );
                    }
                    predictBubbleSizes() {
                        let t = this.chart,
                            e = t.legend.options,
                            i = e.floating,
                            s = "horizontal" === e.layout,
                            o = s ? t.legend.lastLineHeight : 0,
                            a = t.plotSizeX,
                            r = t.plotSizeY,
                            n = t.series[this.options.seriesIndex],
                            l = n.getPxExtremes(),
                            h = Math.ceil(l.minPxSize),
                            p = Math.ceil(l.maxPxSize),
                            d,
                            c = n.options.maxSize;
                        return (
                            i || !/%$/.test(c)
                                ? (d = p)
                                : ((d =
                                      ((Math.min(r, a) + o) *
                                          (c = parseFloat(c))) /
                                      100 /
                                      (c / 100 + 1)),
                                  ((s && r - d >= a) || (!s && a - d >= r)) &&
                                      (d = p)),
                            [h, Math.ceil(d)]
                        );
                    }
                    updateRanges(t, e) {
                        let i = this.legend.options.bubbleLegend;
                        (i.minSize = t),
                            (i.maxSize = e),
                            (i.ranges = this.getRanges());
                    }
                    correctSizes() {
                        let t = this.legend,
                            e = this.chart,
                            i = e.series[this.options.seriesIndex],
                            s = i.getPxExtremes(),
                            o = s.maxPxSize,
                            a = this.options.maxSize;
                        Math.abs(Math.ceil(o) - a) > 1 &&
                            (this.updateRanges(
                                this.options.minSize,
                                s.maxPxSize
                            ),
                            t.render());
                    }
                };
            }
        ),
        i(
            e,
            "Series/Bubble/BubbleLegendComposition.js",
            [
                e["Series/Bubble/BubbleLegendDefaults.js"],
                e["Series/Bubble/BubbleLegendItem.js"],
                e["Core/Defaults.js"],
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, o) {
                let { setOptions: a } = i,
                    { composed: r } = s,
                    { addEvent: n, objectEach: l, pushUnique: h, wrap: p } = o;
                function d(t, e, i) {
                    let s, o, a;
                    let r = this.legend,
                        n = c(this) >= 0;
                    r &&
                    r.options.enabled &&
                    r.bubbleLegend &&
                    r.options.bubbleLegend.autoRanges &&
                    n
                        ? ((s = r.bubbleLegend.options),
                          (o = r.bubbleLegend.predictBubbleSizes()),
                          r.bubbleLegend.updateRanges(o[0], o[1]),
                          s.placed ||
                              ((r.group.placed = !1),
                              r.allItems.forEach((t) => {
                                  (a = t.legendItem || {}).group &&
                                      (a.group.translateY = void 0);
                              })),
                          r.render(),
                          this.getMargins(),
                          this.axes.forEach(function (t) {
                              t.visible && t.render(),
                                  s.placed ||
                                      (t.setScale(),
                                      t.updateNames(),
                                      l(t.ticks, function (t) {
                                          (t.isNew = !0), (t.isNewLabel = !0);
                                      }));
                          }),
                          (s.placed = !0),
                          this.getMargins(),
                          t.call(this, e, i),
                          r.bubbleLegend.correctSizes(),
                          b(r, u(r)))
                        : (t.call(this, e, i),
                          r &&
                              r.options.enabled &&
                              r.bubbleLegend &&
                              (r.render(), b(r, u(r))));
                }
                function c(t) {
                    let e = t.series,
                        i = 0;
                    for (; i < e.length; ) {
                        if (
                            e[i] &&
                            e[i].isBubble &&
                            e[i].visible &&
                            e[i].zData.length
                        )
                            return i;
                        i++;
                    }
                    return -1;
                }
                function u(t) {
                    let e = t.allItems,
                        i = [],
                        s = e.length,
                        o,
                        a,
                        r,
                        n = 0,
                        l = 0;
                    for (n = 0; n < s; n++)
                        if (
                            ((a = e[n].legendItem || {}),
                            (r = (e[n + 1] || {}).legendItem || {}),
                            a.labelHeight && (e[n].itemHeight = a.labelHeight),
                            e[n] === e[s - 1] || a.y !== r.y)
                        ) {
                            for (
                                i.push({ height: 0 }), o = i[i.length - 1];
                                l <= n;
                                l++
                            )
                                e[l].itemHeight > o.height &&
                                    (o.height = e[l].itemHeight);
                            o.step = n;
                        }
                    return i;
                }
                function g(t) {
                    let i = this.bubbleLegend,
                        s = this.options,
                        o = s.bubbleLegend,
                        a = c(this.chart);
                    i &&
                        i.ranges &&
                        i.ranges.length &&
                        (o.ranges.length &&
                            (o.autoRanges = !!o.ranges[0].autoRanges),
                        this.destroyItem(i)),
                        a >= 0 &&
                            s.enabled &&
                            o.enabled &&
                            ((o.seriesIndex = a),
                            (this.bubbleLegend = new e(o, this)),
                            this.bubbleLegend.addToLegend(t.allItems));
                }
                function f(t) {
                    let e;
                    if (t.defaultPrevented) return !1;
                    let i = this.chart,
                        s = this.visible,
                        o = this.chart.legend;
                    o &&
                        o.bubbleLegend &&
                        ((this.visible = !s),
                        (this.ignoreSeries = s),
                        (e = c(i) >= 0),
                        o.bubbleLegend.visible !== e &&
                            (o.update({ bubbleLegend: { enabled: e } }),
                            (o.bubbleLegend.visible = e)),
                        (this.visible = s));
                }
                function b(t, e) {
                    let i = t.allItems,
                        s = t.options.rtl,
                        o,
                        a,
                        r,
                        n,
                        l = 0;
                    i.forEach((t, i) => {
                        (n = t.legendItem || {}).group &&
                            ((o = n.group.translateX || 0),
                            (a = n.y || 0),
                            ((r = t.movementX) || (s && t.ranges)) &&
                                ((r = s ? o - t.options.maxSize / 2 : o + r),
                                n.group.attr({ translateX: r })),
                            i > e[l].step && l++,
                            n.group.attr({
                                translateY: Math.round(a + e[l].height / 2),
                            }),
                            (n.y = a + e[l].height / 2));
                    });
                }
                return {
                    compose: function e(i, s, o) {
                        h(r, e) &&
                            (a({ legend: { bubbleLegend: t } }),
                            p(i.prototype, "drawChartBox", d),
                            n(s, "afterGetAllItems", g),
                            n(o, "legendItemClick", f));
                    },
                };
            }
        ),
        i(
            e,
            "Series/Bubble/BubblePoint.js",
            [
                e["Core/Series/Point.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i) {
                let {
                        seriesTypes: {
                            scatter: {
                                prototype: { pointClass: s },
                            },
                        },
                    } = e,
                    { extend: o } = i;
                class a extends s {
                    haloPath(e) {
                        return t.prototype.haloPath.call(
                            this,
                            0 === e
                                ? 0
                                : ((this.marker && this.marker.radius) || 0) + e
                        );
                    }
                }
                return o(a.prototype, { ttBelow: !1 }), a;
            }
        ),
        i(
            e,
            "Series/Bubble/BubbleSeries.js",
            [
                e["Series/Bubble/BubbleLegendComposition.js"],
                e["Series/Bubble/BubblePoint.js"],
                e["Core/Color/Color.js"],
                e["Core/Globals.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, o, a) {
                let { parse: r } = i,
                    { composed: n, noop: l } = s,
                    {
                        series: h,
                        seriesTypes: {
                            column: { prototype: p },
                            scatter: d,
                        },
                    } = o,
                    {
                        addEvent: c,
                        arrayMax: u,
                        arrayMin: g,
                        clamp: f,
                        extend: b,
                        isNumber: m,
                        merge: y,
                        pick: x,
                        pushUnique: P,
                    } = a;
                function S() {
                    let t = this.len,
                        { coll: e, isXAxis: i, min: s } = this,
                        o = i ? "xData" : "yData",
                        a = (this.max || 0) - (s || 0),
                        r = 0,
                        n = t,
                        l = t / a,
                        h;
                    ("xAxis" === e || "yAxis" === e) &&
                        (this.series.forEach((t) => {
                            if (t.bubblePadding && t.reserveSpace()) {
                                (this.allowZoomOutside = !0), (h = !0);
                                let e = t[o];
                                if (
                                    (i &&
                                        ((t.onPoint || t).getRadii(0, 0, t),
                                        t.onPoint &&
                                            (t.radii = t.onPoint.radii)),
                                    a > 0)
                                ) {
                                    let i = e.length;
                                    for (; i--; )
                                        if (
                                            m(e[i]) &&
                                            this.dataMin <= e[i] &&
                                            e[i] <= this.max
                                        ) {
                                            let o =
                                                (t.radii && t.radii[i]) || 0;
                                            (r = Math.min(
                                                (e[i] - s) * l - o,
                                                r
                                            )),
                                                (n = Math.max(
                                                    (e[i] - s) * l + o,
                                                    n
                                                ));
                                        }
                                }
                            }
                        }),
                        h &&
                            a > 0 &&
                            !this.logarithmic &&
                            ((n -= t),
                            (l *= (t + Math.max(0, r) - Math.min(n, t)) / t),
                            [
                                ["min", "userMin", r],
                                ["max", "userMax", n],
                            ].forEach((t) => {
                                void 0 === x(this.options[t[0]], this[t[1]]) &&
                                    (this[t[0]] += t[2] / l);
                            })));
                }
                class M extends d {
                    static compose(e, i, s, o) {
                        t.compose(i, s, o),
                            P(n, this.compose) && c(e, "foundExtremes", S);
                    }
                    animate(t) {
                        !t &&
                            this.points.length < this.options.animationLimit &&
                            this.points.forEach(function (t) {
                                let { graphic: e } = t;
                                e &&
                                    e.width &&
                                    (this.hasRendered ||
                                        e.attr({
                                            x: t.plotX,
                                            y: t.plotY,
                                            width: 1,
                                            height: 1,
                                        }),
                                    e.animate(
                                        this.markerAttribs(t),
                                        this.options.animation
                                    ));
                            }, this);
                    }
                    getRadii() {
                        let t = this.zData,
                            e = this.yData,
                            i = [],
                            s,
                            o,
                            a,
                            r = this.chart.bubbleZExtremes,
                            { minPxSize: n, maxPxSize: l } =
                                this.getPxExtremes();
                        if (!r) {
                            let t,
                                e = Number.MAX_VALUE,
                                i = -Number.MAX_VALUE;
                            this.chart.series.forEach((s) => {
                                if (s.bubblePadding && s.reserveSpace()) {
                                    let o = (s.onPoint || s).getZExtremes();
                                    o &&
                                        ((e = Math.min(x(e, o.zMin), o.zMin)),
                                        (i = Math.max(x(i, o.zMax), o.zMax)),
                                        (t = !0));
                                }
                            }),
                                t
                                    ? ((r = { zMin: e, zMax: i }),
                                      (this.chart.bubbleZExtremes = r))
                                    : (r = { zMin: 0, zMax: 0 });
                        }
                        for (o = 0, s = t.length; o < s; o++)
                            (a = t[o]),
                                i.push(
                                    this.getRadius(
                                        r.zMin,
                                        r.zMax,
                                        n,
                                        l,
                                        a,
                                        e && e[o]
                                    )
                                );
                        this.radii = i;
                    }
                    getRadius(t, e, i, s, o, a) {
                        let r = this.options,
                            n = "width" !== r.sizeBy,
                            l = r.zThreshold,
                            h = e - t,
                            p = 0.5;
                        if (null === a || null === o) return null;
                        if (m(o)) {
                            if (
                                (r.sizeByAbsoluteValue &&
                                    ((o = Math.abs(o - l)),
                                    (e = h = Math.max(e - l, Math.abs(t - l))),
                                    (t = 0)),
                                o < t)
                            )
                                return i / 2 - 1;
                            h > 0 && (p = (o - t) / h);
                        }
                        return (
                            n && p >= 0 && (p = Math.sqrt(p)),
                            Math.ceil(i + p * (s - i)) / 2
                        );
                    }
                    hasData() {
                        return !!this.processedXData.length;
                    }
                    pointAttribs(t, e) {
                        let i = this.options.marker,
                            s = i.fillOpacity,
                            o = h.prototype.pointAttribs.call(this, t, e);
                        return (
                            1 !== s &&
                                (o.fill = r(o.fill).setOpacity(s).get("rgba")),
                            o
                        );
                    }
                    translate() {
                        super.translate.call(this),
                            this.getRadii(),
                            this.translateBubble();
                    }
                    translateBubble() {
                        let { data: t, options: e, radii: i } = this,
                            { minPxSize: s } = this.getPxExtremes(),
                            o = t.length;
                        for (; o--; ) {
                            let a = t[o],
                                r = i ? i[o] : 0;
                            "z" === this.zoneAxis &&
                                (a.negative = (a.z || 0) < (e.zThreshold || 0)),
                                m(r) && r >= s / 2
                                    ? ((a.marker = b(a.marker, {
                                          radius: r,
                                          width: 2 * r,
                                          height: 2 * r,
                                      })),
                                      (a.dlBox = {
                                          x: a.plotX - r,
                                          y: a.plotY - r,
                                          width: 2 * r,
                                          height: 2 * r,
                                      }))
                                    : ((a.shapeArgs =
                                          a.plotY =
                                          a.dlBox =
                                              void 0),
                                      (a.isInside = !1));
                        }
                    }
                    getPxExtremes() {
                        let t = Math.min(
                                this.chart.plotWidth,
                                this.chart.plotHeight
                            ),
                            e = (e) => {
                                let i;
                                return (
                                    "string" == typeof e &&
                                        ((i = /%$/.test(e)),
                                        (e = parseInt(e, 10))),
                                    i ? (t * e) / 100 : e
                                );
                            },
                            i = e(x(this.options.minSize, 8)),
                            s = Math.max(e(x(this.options.maxSize, "20%")), i);
                        return { minPxSize: i, maxPxSize: s };
                    }
                    getZExtremes() {
                        let t = this.options,
                            e = (this.zData || []).filter(m);
                        if (e.length) {
                            let i = x(
                                    t.zMin,
                                    f(
                                        g(e),
                                        !1 === t.displayNegative
                                            ? t.zThreshold || 0
                                            : -Number.MAX_VALUE,
                                        Number.MAX_VALUE
                                    )
                                ),
                                s = x(t.zMax, u(e));
                            if (m(i) && m(s)) return { zMin: i, zMax: s };
                        }
                    }
                }
                return (
                    (M.defaultOptions = y(d.defaultOptions, {
                        dataLabels: {
                            formatter: function () {
                                let { numberFormatter: t } = this.series.chart,
                                    { z: e } = this.point;
                                return m(e) ? t(e, -1) : "";
                            },
                            inside: !0,
                            verticalAlign: "middle",
                        },
                        animationLimit: 250,
                        marker: {
                            lineColor: null,
                            lineWidth: 1,
                            fillOpacity: 0.5,
                            radius: null,
                            states: { hover: { radiusPlus: 0 } },
                            symbol: "circle",
                        },
                        minSize: 8,
                        maxSize: "20%",
                        softThreshold: !1,
                        states: { hover: { halo: { size: 5 } } },
                        tooltip: {
                            pointFormat:
                                "({point.x}, {point.y}), Size: {point.z}",
                        },
                        turboThreshold: 0,
                        zThreshold: 0,
                        zoneAxis: "z",
                    })),
                    b(M.prototype, {
                        alignDataLabel: p.alignDataLabel,
                        applyZones: l,
                        bubblePadding: !0,
                        isBubble: !0,
                        pointArrayMap: ["y", "z"],
                        pointClass: e,
                        parallelArrays: ["x", "y", "z"],
                        trackerGroups: ["group", "dataLabelsGroup"],
                        specialGroup: "group",
                        zoneAxis: "z",
                    }),
                    c(M, "updatedData", (t) => {
                        delete t.target.chart.bubbleZExtremes;
                    }),
                    c(M, "remove", (t) => {
                        delete t.target.chart.bubbleZExtremes;
                    }),
                    o.registerSeriesType("bubble", M),
                    M
                );
            }
        ),
        i(
            e,
            "Series/ColumnRange/ColumnRangePoint.js",
            [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
            function (t, e) {
                let {
                        seriesTypes: {
                            column: {
                                prototype: {
                                    pointClass: { prototype: i },
                                },
                            },
                            arearange: {
                                prototype: { pointClass: s },
                            },
                        },
                    } = t,
                    { extend: o, isNumber: a } = e;
                class r extends s {
                    isValid() {
                        return a(this.low);
                    }
                }
                return o(r.prototype, { setState: i.setState }), r;
            }
        ),
        i(
            e,
            "Series/ColumnRange/ColumnRangeSeries.js",
            [
                e["Series/ColumnRange/ColumnRangePoint.js"],
                e["Core/Globals.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s) {
                let { noop: o } = e,
                    {
                        seriesTypes: {
                            arearange: a,
                            column: r,
                            column: { prototype: n },
                        },
                    } = i,
                    {
                        addEvent: l,
                        clamp: h,
                        extend: p,
                        isNumber: d,
                        merge: c,
                        pick: u,
                    } = s;
                class g extends a {
                    setOptions() {
                        return (
                            c(!0, arguments[0], { stacking: void 0 }),
                            a.prototype.setOptions.apply(this, arguments)
                        );
                    }
                    translate() {
                        return n.translate.apply(this);
                    }
                    pointAttribs() {
                        return n.pointAttribs.apply(this, arguments);
                    }
                    translate3dPoints() {
                        return n.translate3dPoints.apply(this, arguments);
                    }
                    translate3dShapes() {
                        return n.translate3dShapes.apply(this, arguments);
                    }
                    afterColumnTranslate() {
                        let t, e, i, s;
                        let o = this.yAxis,
                            a = this.xAxis,
                            r = a.startAngleRad,
                            n = this.chart,
                            l = this.xAxis.isRadial,
                            p = Math.max(n.chartWidth, n.chartHeight) + 999;
                        this.points.forEach((g) => {
                            let f = g.shapeArgs || {},
                                b = this.options.minPointLength,
                                m = g.plotY,
                                y = o.translate(g.high, 0, 1, 0, 1);
                            if (d(y) && d(m)) {
                                if (
                                    ((g.plotHigh = h(y, -p, p)),
                                    (g.plotLow = h(m, -p, p)),
                                    (s = g.plotHigh),
                                    Math.abs(
                                        (t =
                                            u(g.rectPlotY, g.plotY) -
                                            g.plotHigh)
                                    ) < b
                                        ? ((e = b - t), (t += e), (s -= e / 2))
                                        : t < 0 && ((t *= -1), (s -= t)),
                                    l && this.polar)
                                )
                                    (i = g.barX + r),
                                        (g.shapeType = "arc"),
                                        (g.shapeArgs = this.polar.arc(
                                            s + t,
                                            s,
                                            i,
                                            i + g.pointWidth
                                        ));
                                else {
                                    (f.height = t), (f.y = s);
                                    let { x: e = 0, width: i = 0 } = f;
                                    (g.shapeArgs = c(
                                        g.shapeArgs,
                                        this.crispCol(e, s, i, t)
                                    )),
                                        (g.tooltipPos = n.inverted
                                            ? [
                                                  o.len +
                                                      o.pos -
                                                      n.plotLeft -
                                                      s -
                                                      t / 2,
                                                  a.len +
                                                      a.pos -
                                                      n.plotTop -
                                                      e -
                                                      i / 2,
                                                  t,
                                              ]
                                            : [
                                                  a.left -
                                                      n.plotLeft +
                                                      e +
                                                      i / 2,
                                                  o.pos - n.plotTop + s + t / 2,
                                                  t,
                                              ]);
                                }
                            }
                        });
                    }
                }
                return (
                    (g.defaultOptions = c(r.defaultOptions, a.defaultOptions, {
                        borderRadius: { where: "all" },
                        pointRange: null,
                        marker: null,
                        states: { hover: { halo: !1 } },
                    })),
                    l(
                        g,
                        "afterColumnTranslate",
                        function () {
                            g.prototype.afterColumnTranslate.apply(this);
                        },
                        { order: 5 }
                    ),
                    p(g.prototype, {
                        directTouch: !0,
                        pointClass: t,
                        trackerGroups: ["group", "dataLabelsGroup"],
                        adjustForMissingColumns: n.adjustForMissingColumns,
                        animate: n.animate,
                        crispCol: n.crispCol,
                        drawGraph: o,
                        drawPoints: n.drawPoints,
                        getSymbol: o,
                        drawTracker: n.drawTracker,
                        getColumnMetrics: n.getColumnMetrics,
                    }),
                    i.registerSeriesType("columnrange", g),
                    g
                );
            }
        ),
        i(
            e,
            "Series/ColumnPyramid/ColumnPyramidSeriesDefaults.js",
            [],
            function () {
                return {};
            }
        ),
        i(
            e,
            "Series/ColumnPyramid/ColumnPyramidSeries.js",
            [
                e["Series/ColumnPyramid/ColumnPyramidSeriesDefaults.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i) {
                let { column: s } = e.seriesTypes,
                    { clamp: o, merge: a, pick: r } = i;
                class n extends s {
                    translate() {
                        let t = this.chart,
                            e = this.options,
                            i = (this.dense =
                                this.closestPointRange * this.xAxis.transA < 2),
                            s = (this.borderWidth = r(
                                e.borderWidth,
                                i ? 0 : 1
                            )),
                            a = this.yAxis,
                            n = e.threshold,
                            l = r(e.minPointLength, 5),
                            h = this.getColumnMetrics(),
                            p = h.width,
                            d = (this.pointXOffset = h.offset),
                            c = (this.translatedThreshold = a.getThreshold(n)),
                            u = (this.barW = Math.max(p, 1 + 2 * s));
                        for (let i of (t.inverted && (c -= 0.5),
                        e.pointPadding && (u = Math.ceil(u)),
                        super.translate(),
                        this.points)) {
                            let s = r(i.yBottom, c),
                                g = 999 + Math.abs(s),
                                f = o(i.plotY, -g, a.len + g),
                                b = u / 2,
                                m = Math.min(f, s),
                                y = Math.max(f, s) - m,
                                x = i.plotX + d,
                                P,
                                S,
                                M,
                                L,
                                k,
                                v,
                                C,
                                w,
                                A,
                                N,
                                T,
                                X;
                            e.centerInCategory &&
                                (x = this.adjustForMissingColumns(x, p, i, h)),
                                (i.barX = x),
                                (i.pointWidth = p),
                                (i.tooltipPos = t.inverted
                                    ? [
                                          a.len + a.pos - t.plotLeft - f,
                                          this.xAxis.len - x - b,
                                          y,
                                      ]
                                    : [x + b, f + a.pos - t.plotTop, y]),
                                (P = n + (i.total || i.y)),
                                "percent" === e.stacking &&
                                    (P = n + (i.y < 0) ? -100 : 100),
                                (M = a.toPixels(P, !0)),
                                (L = (S = t.plotHeight - M - (t.plotHeight - c))
                                    ? (b * (m - M)) / S
                                    : 0),
                                (k = S ? (b * (m + y - M)) / S : 0),
                                (C = x - L + b),
                                (w = x + L + b),
                                (A = x + k + b),
                                (N = x - k + b),
                                (T = m - l),
                                (X = m + y),
                                i.y < 0 && ((T = m), (X = m + y + l)),
                                t.inverted &&
                                    ((v = a.width - m),
                                    (S = M - (a.width - c)),
                                    (L = (b * (M - v)) / S),
                                    (k = (b * (M - (v - y))) / S),
                                    (w = (C = x + b + L) - 2 * L),
                                    (A = x - k + b),
                                    (N = x + k + b),
                                    (T = m),
                                    (X = m + y - l),
                                    i.y < 0 && (X = m + y + l)),
                                (i.shapeType = "path"),
                                (i.shapeArgs = {
                                    x: C,
                                    y: T,
                                    width: w - C,
                                    height: y,
                                    d: [
                                        ["M", C, T],
                                        ["L", w, T],
                                        ["L", A, X],
                                        ["L", N, X],
                                        ["Z"],
                                    ],
                                });
                        }
                    }
                }
                return (
                    (n.defaultOptions = a(s.defaultOptions, t)),
                    e.registerSeriesType("columnpyramid", n),
                    n
                );
            }
        ),
        i(e, "Series/ErrorBar/ErrorBarSeriesDefaults.js", [], function () {
            return {
                color: "#000000",
                grouping: !1,
                linkedTo: ":previous",
                tooltip: {
                    pointFormat:
                        '<span style="color:{point.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>',
                },
                whiskerWidth: null,
            };
        }),
        i(
            e,
            "Series/ErrorBar/ErrorBarSeries.js",
            [
                e["Series/BoxPlot/BoxPlotSeries.js"],
                e["Series/Column/ColumnSeries.js"],
                e["Series/ErrorBar/ErrorBarSeriesDefaults.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, o) {
                let { arearange: a } = s.seriesTypes,
                    { addEvent: r, merge: n, extend: l } = o;
                class h extends t {
                    getColumnMetrics() {
                        return (
                            (this.linkedParent &&
                                this.linkedParent.columnMetrics) ||
                            e.prototype.getColumnMetrics.call(this)
                        );
                    }
                    drawDataLabels() {
                        let t = this.pointValKey;
                        if (a)
                            for (let e of (a.prototype.drawDataLabels.call(
                                this
                            ),
                            this.points))
                                e.y = e[t];
                    }
                    toYData(t) {
                        return [t.low, t.high];
                    }
                }
                return (
                    (h.defaultOptions = n(t.defaultOptions, i)),
                    r(
                        h,
                        "afterTranslate",
                        function () {
                            for (let t of this.points) t.plotLow = t.plotY;
                        },
                        { order: 0 }
                    ),
                    l(h.prototype, {
                        pointArrayMap: ["low", "high"],
                        pointValKey: "high",
                        doQuartiles: !1,
                    }),
                    s.registerSeriesType("errorbar", h),
                    h
                );
            }
        ),
        i(
            e,
            "Series/Gauge/GaugePoint.js",
            [e["Core/Series/SeriesRegistry.js"]],
            function (t) {
                let {
                    series: {
                        prototype: { pointClass: e },
                    },
                } = t;
                return class extends e {
                    setState(t) {
                        this.state = t;
                    }
                };
            }
        ),
        i(
            e,
            "Series/Gauge/GaugeSeries.js",
            [
                e["Series/Gauge/GaugePoint.js"],
                e["Core/Globals.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s) {
                let { noop: o } = e,
                    {
                        series: a,
                        seriesTypes: { column: r },
                    } = i,
                    {
                        clamp: n,
                        isNumber: l,
                        extend: h,
                        merge: p,
                        pick: d,
                        pInt: c,
                        defined: u,
                    } = s;
                class g extends a {
                    translate() {
                        let t = this.yAxis,
                            e = this.options,
                            i = t.center;
                        this.generatePoints(),
                            this.points.forEach((s) => {
                                let o = p(e.dial, s.dial),
                                    a = (c(o.radius) * i[2]) / 200,
                                    r = (c(o.baseLength) * a) / 100,
                                    h = (c(o.rearLength) * a) / 100,
                                    d = o.baseWidth,
                                    g = o.topWidth,
                                    f = e.overshoot,
                                    b =
                                        t.startAngleRad +
                                        t.translate(
                                            s.y,
                                            void 0,
                                            void 0,
                                            void 0,
                                            !0
                                        );
                                (l(f) || !1 === e.wrap) &&
                                    ((f = l(f) ? (f / 180) * Math.PI : 0),
                                    (b = n(
                                        b,
                                        t.startAngleRad - f,
                                        t.endAngleRad + f
                                    ))),
                                    (b = (180 * b) / Math.PI),
                                    (s.shapeType = "path");
                                let m = o.path || [
                                    ["M", -h, -d / 2],
                                    ["L", r, -d / 2],
                                    ["L", a, -g / 2],
                                    ["L", a, g / 2],
                                    ["L", r, d / 2],
                                    ["L", -h, d / 2],
                                    ["Z"],
                                ];
                                (s.shapeArgs = {
                                    d: m,
                                    translateX: i[0],
                                    translateY: i[1],
                                    rotation: b,
                                }),
                                    (s.plotX = i[0]),
                                    (s.plotY = i[1]),
                                    u(s.y) &&
                                        t.max - t.min &&
                                        (s.percentage =
                                            ((s.y - t.min) / (t.max - t.min)) *
                                            100);
                            });
                    }
                    drawPoints() {
                        let t = this,
                            e = t.chart,
                            i = t.yAxis.center,
                            s = t.pivot,
                            o = t.options,
                            a = o.pivot,
                            r = e.renderer;
                        t.points.forEach((i) => {
                            let s = i.graphic,
                                a = i.shapeArgs,
                                n = a.d,
                                l = p(o.dial, i.dial);
                            s
                                ? (s.animate(a), (a.d = n))
                                : (i.graphic = r[i.shapeType](a)
                                      .addClass("highcharts-dial")
                                      .add(t.group)),
                                e.styledMode ||
                                    i.graphic[s ? "animate" : "attr"]({
                                        stroke: l.borderColor,
                                        "stroke-width": l.borderWidth,
                                        fill: l.backgroundColor,
                                    });
                        }),
                            s
                                ? s.animate({
                                      translateX: i[0],
                                      translateY: i[1],
                                  })
                                : a &&
                                  ((t.pivot = r
                                      .circle(0, 0, a.radius)
                                      .attr({ zIndex: 2 })
                                      .addClass("highcharts-pivot")
                                      .translate(i[0], i[1])
                                      .add(t.group)),
                                  e.styledMode ||
                                      t.pivot.attr({
                                          fill: a.backgroundColor,
                                          stroke: a.borderColor,
                                          "stroke-width": a.borderWidth,
                                      }));
                    }
                    animate(t) {
                        let e = this;
                        t ||
                            e.points.forEach((t) => {
                                let i = t.graphic;
                                i &&
                                    (i.attr({
                                        rotation:
                                            (180 * e.yAxis.startAngleRad) /
                                            Math.PI,
                                    }),
                                    i.animate(
                                        { rotation: t.shapeArgs.rotation },
                                        e.options.animation
                                    ));
                            });
                    }
                    render() {
                        (this.group = this.plotGroup(
                            "group",
                            "series",
                            this.visible ? "inherit" : "hidden",
                            this.options.zIndex,
                            this.chart.seriesGroup
                        )),
                            a.prototype.render.call(this),
                            this.group.clip(this.chart.clipRect);
                    }
                    setData(t, e) {
                        a.prototype.setData.call(this, t, !1),
                            this.processData(),
                            this.generatePoints(),
                            d(e, !0) && this.chart.redraw();
                    }
                    hasData() {
                        return !!this.points.length;
                    }
                }
                return (
                    (g.defaultOptions = p(a.defaultOptions, {
                        dataLabels: {
                            borderColor: "#cccccc",
                            borderRadius: 3,
                            borderWidth: 1,
                            crop: !1,
                            defer: !1,
                            enabled: !0,
                            verticalAlign: "top",
                            y: 15,
                            zIndex: 2,
                        },
                        dial: {
                            backgroundColor: "#000000",
                            baseLength: "70%",
                            baseWidth: 3,
                            borderColor: "#cccccc",
                            borderWidth: 0,
                            radius: "80%",
                            rearLength: "10%",
                            topWidth: 1,
                        },
                        pivot: {
                            radius: 5,
                            borderWidth: 0,
                            borderColor: "#cccccc",
                            backgroundColor: "#000000",
                        },
                        tooltip: { headerFormat: "" },
                        showInLegend: !1,
                    })),
                    h(g.prototype, {
                        angular: !0,
                        directTouch: !0,
                        drawGraph: o,
                        drawTracker: r.prototype.drawTracker,
                        fixedBox: !0,
                        forceDL: !0,
                        noSharedTooltip: !0,
                        pointClass: t,
                        trackerGroups: ["group", "dataLabelsGroup"],
                    }),
                    i.registerSeriesType("gauge", g),
                    g
                );
            }
        ),
        i(
            e,
            "Series/DragNodesComposition.js",
            [e["Core/Globals.js"], e["Core/Utilities.js"]],
            function (t, e) {
                let { composed: i } = t,
                    { addEvent: s, pushUnique: o } = e;
                function a() {
                    let t, e, i;
                    let o = this;
                    o.container &&
                        (t = s(o.container, "mousedown", (t) => {
                            let a = o.hoverPoint;
                            a &&
                                a.series &&
                                a.series.hasDraggableNodes &&
                                a.series.options.draggable &&
                                (a.series.onMouseDown(a, t),
                                (e = s(
                                    o.container,
                                    "mousemove",
                                    (t) =>
                                        a &&
                                        a.series &&
                                        a.series.onMouseMove(a, t)
                                )),
                                (i = s(
                                    o.container.ownerDocument,
                                    "mouseup",
                                    (t) => (
                                        e(),
                                        i(),
                                        a &&
                                            a.series &&
                                            a.series.onMouseUp(a, t)
                                    )
                                )));
                        })),
                        s(o, "destroy", function () {
                            t();
                        });
                }
                return {
                    compose: function t(e) {
                        o(i, t) && s(e, "load", a);
                    },
                    onMouseDown: function (t, e) {
                        let i = this.chart.pointer.normalize(e);
                        (t.fixedPosition = {
                            chartX: i.chartX,
                            chartY: i.chartY,
                            plotX: t.plotX,
                            plotY: t.plotY,
                        }),
                            (t.inDragMode = !0);
                    },
                    onMouseMove: function (t, e) {
                        if (t.fixedPosition && t.inDragMode) {
                            let i, s;
                            let o = this.chart,
                                a = o.pointer.normalize(e),
                                r = t.fixedPosition.chartX - a.chartX,
                                n = t.fixedPosition.chartY - a.chartY,
                                l = o.graphLayoutsLookup;
                            (Math.abs(r) > 5 || Math.abs(n) > 5) &&
                                ((i = t.fixedPosition.plotX - r),
                                (s = t.fixedPosition.plotY - n),
                                o.isInsidePlot(i, s) &&
                                    ((t.plotX = i),
                                    (t.plotY = s),
                                    (t.hasDragged = !0),
                                    this.redrawHalo(t),
                                    l.forEach((t) => {
                                        t.restartSimulation();
                                    })));
                        }
                    },
                    onMouseUp: function (t, e) {
                        t.fixedPosition &&
                            (t.hasDragged &&
                                (this.layout.enableSimulation
                                    ? this.layout.start()
                                    : this.chart.redraw()),
                            (t.inDragMode = t.hasDragged = !1),
                            this.options.fixedDraggable ||
                                delete t.fixedPosition);
                    },
                    redrawHalo: function (t) {
                        t &&
                            this.halo &&
                            this.halo.attr({
                                d: t.haloPath(
                                    this.options.states.hover.halo.size
                                ),
                            });
                    },
                };
            }
        ),
        i(
            e,
            "Series/GraphLayoutComposition.js",
            [
                e["Core/Animation/AnimationUtilities.js"],
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i) {
                let { setAnimation: s } = t,
                    { composed: o } = e,
                    { addEvent: a, pushUnique: r } = i;
                function n() {
                    this.graphLayoutsLookup &&
                        (this.graphLayoutsLookup.forEach((t) => {
                            t.updateSimulation();
                        }),
                        this.redraw());
                }
                function l() {
                    this.graphLayoutsLookup &&
                        (this.graphLayoutsLookup.forEach((t) => {
                            t.updateSimulation(!1);
                        }),
                        this.redraw());
                }
                function h() {
                    this.graphLayoutsLookup &&
                        this.graphLayoutsLookup.forEach((t) => {
                            t.stop();
                        });
                }
                function p() {
                    let t,
                        e = !1,
                        i = (i) => {
                            i.maxIterations-- &&
                                isFinite(i.temperature) &&
                                !i.isStable() &&
                                !i.enableSimulation &&
                                (i.beforeStep && i.beforeStep(),
                                i.step(),
                                (t = !1),
                                (e = !0));
                        };
                    if (this.graphLayoutsLookup) {
                        for (
                            s(!1, this),
                                this.graphLayoutsLookup.forEach((t) =>
                                    t.start()
                                );
                            !t;

                        )
                            (t = !0), this.graphLayoutsLookup.forEach(i);
                        e &&
                            this.series.forEach((t) => {
                                t && t.layout && t.render();
                            });
                    }
                }
                return {
                    compose: function t(e) {
                        r(o, t) &&
                            (a(e, "afterPrint", n),
                            a(e, "beforePrint", l),
                            a(e, "predraw", h),
                            a(e, "render", p));
                    },
                    integrations: {},
                    layouts: {},
                };
            }
        ),
        i(
            e,
            "Series/PackedBubble/PackedBubblePoint.js",
            [
                e["Core/Chart/Chart.js"],
                e["Core/Series/Point.js"],
                e["Core/Series/SeriesRegistry.js"],
            ],
            function (t, e, i) {
                let {
                    seriesTypes: {
                        bubble: {
                            prototype: { pointClass: s },
                        },
                    },
                } = i;
                return class extends s {
                    destroy() {
                        return (
                            this.series.layout &&
                                this.series.layout.removeElementFromCollection(
                                    this,
                                    this.series.layout.nodes
                                ),
                            e.prototype.destroy.apply(this, arguments)
                        );
                    }
                    firePointEvent() {
                        let t = this.series,
                            i = t.options;
                        if (this.isParentNode && i.parentNode) {
                            let t = i.allowPointSelect;
                            (i.allowPointSelect =
                                i.parentNode.allowPointSelect),
                                e.prototype.firePointEvent.apply(
                                    this,
                                    arguments
                                ),
                                (i.allowPointSelect = t);
                        } else
                            e.prototype.firePointEvent.apply(this, arguments);
                    }
                    select() {
                        let i = this.series,
                            s = i.chart;
                        this.isParentNode
                            ? ((s.getSelectedPoints = s.getSelectedParentNodes),
                              e.prototype.select.apply(this, arguments),
                              (s.getSelectedPoints =
                                  t.prototype.getSelectedPoints))
                            : e.prototype.select.apply(this, arguments);
                    }
                };
            }
        ),
        i(
            e,
            "Series/PackedBubble/PackedBubbleSeriesDefaults.js",
            [e["Core/Utilities.js"]],
            function (t) {
                let { isNumber: e } = t;
                return {
                    minSize: "10%",
                    maxSize: "50%",
                    sizeBy: "area",
                    zoneAxis: "y",
                    crisp: !1,
                    tooltip: { pointFormat: "Value: {point.value}" },
                    draggable: !0,
                    useSimulation: !0,
                    parentNode: { allowPointSelect: !1 },
                    dataLabels: {
                        formatter: function () {
                            let { numberFormatter: t } = this.series.chart,
                                { value: i } = this.point;
                            return e(i) ? t(i, -1) : "";
                        },
                        parentNodeFormatter: function () {
                            return this.name;
                        },
                        parentNodeTextPath: { enabled: !0 },
                        padding: 0,
                        style: { transition: "opacity 2000ms" },
                    },
                    layoutAlgorithm: {
                        initialPositions: "circle",
                        initialPositionRadius: 20,
                        bubblePadding: 5,
                        parentNodeLimit: !1,
                        seriesInteraction: !0,
                        dragBetweenSeries: !1,
                        parentNodeOptions: {
                            maxIterations: 400,
                            gravitationalConstant: 0.03,
                            maxSpeed: 50,
                            initialPositionRadius: 100,
                            seriesInteraction: !0,
                            marker: {
                                fillColor: null,
                                fillOpacity: 1,
                                lineWidth: null,
                                lineColor: null,
                                symbol: "circle",
                            },
                        },
                        enableSimulation: !0,
                        type: "packedbubble",
                        integration: "packedbubble",
                        maxIterations: 1e3,
                        splitSeries: !1,
                        maxSpeed: 5,
                        gravitationalConstant: 0.01,
                        friction: -0.981,
                    },
                };
            }
        ),
        i(e, "Series/Networkgraph/VerletIntegration.js", [], function () {
            return {
                attractive: function (t, e, i) {
                    let s = t.getMass(),
                        o = -i.x * e * this.diffTemperature,
                        a = -i.y * e * this.diffTemperature;
                    t.fromNode.fixedPosition ||
                        ((t.fromNode.plotX -=
                            (o * s.fromNode) / t.fromNode.degree),
                        (t.fromNode.plotY -=
                            (a * s.fromNode) / t.fromNode.degree)),
                        t.toNode.fixedPosition ||
                            ((t.toNode.plotX +=
                                (o * s.toNode) / t.toNode.degree),
                            (t.toNode.plotY +=
                                (a * s.toNode) / t.toNode.degree));
                },
                attractiveForceFunction: function (t, e) {
                    return (e - t) / t;
                },
                barycenter: function () {
                    let t = this.options.gravitationalConstant,
                        e = this.barycenter.xFactor,
                        i = this.barycenter.yFactor;
                    (e = (e - (this.box.left + this.box.width) / 2) * t),
                        (i = (i - (this.box.top + this.box.height) / 2) * t),
                        this.nodes.forEach(function (t) {
                            t.fixedPosition ||
                                ((t.plotX -= e / t.mass / t.degree),
                                (t.plotY -= i / t.mass / t.degree));
                        });
                },
                getK: function (t) {
                    return Math.pow(
                        (t.box.width * t.box.height) / t.nodes.length,
                        0.5
                    );
                },
                integrate: function (t, e) {
                    let i = -t.options.friction,
                        s = t.options.maxSpeed,
                        o = e.prevX,
                        a = e.prevY,
                        r = (e.plotX + e.dispX - o) * i,
                        n = (e.plotY + e.dispY - a) * i,
                        l = Math.abs,
                        h = l(r) / (r || 1),
                        p = l(n) / (n || 1);
                    (r = h * Math.min(s, Math.abs(r))),
                        (n = p * Math.min(s, Math.abs(n))),
                        (e.prevX = e.plotX + e.dispX),
                        (e.prevY = e.plotY + e.dispY),
                        (e.plotX += r),
                        (e.plotY += n),
                        (e.temperature = t.vectorLength({ x: r, y: n }));
                },
                repulsive: function (t, e, i) {
                    let s = (e * this.diffTemperature) / t.mass / t.degree;
                    t.fixedPosition ||
                        ((t.plotX += i.x * s), (t.plotY += i.y * s));
                },
                repulsiveForceFunction: function (t, e) {
                    return ((e - t) / t) * (e > t ? 1 : 0);
                },
            };
        }),
        i(
            e,
            "Series/PackedBubble/PackedBubbleIntegration.js",
            [
                e["Core/Globals.js"],
                e["Series/Networkgraph/VerletIntegration.js"],
            ],
            function (t, e) {
                let { noop: i } = t,
                    s = {
                        barycenter: function () {
                            let t, e;
                            let i = this.options.gravitationalConstant,
                                s = this.box,
                                o = this.nodes;
                            for (let a of o)
                                this.options.splitSeries && !a.isParentNode
                                    ? ((t = a.series.parentNode.plotX),
                                      (e = a.series.parentNode.plotY))
                                    : ((t = s.width / 2), (e = s.height / 2)),
                                    a.fixedPosition ||
                                        ((a.plotX -=
                                            ((a.plotX - t) * i) /
                                            (a.mass * Math.sqrt(o.length))),
                                        (a.plotY -=
                                            ((a.plotY - e) * i) /
                                            (a.mass * Math.sqrt(o.length))));
                        },
                        getK: i,
                        integrate: e.integrate,
                        repulsive: function (t, e, i, s) {
                            let o =
                                    (e * this.diffTemperature) /
                                    t.mass /
                                    t.degree,
                                a = i.x * o,
                                r = i.y * o;
                            t.fixedPosition || ((t.plotX += a), (t.plotY += r)),
                                s.fixedPosition ||
                                    ((s.plotX -= a), (s.plotY -= r));
                        },
                        repulsiveForceFunction: function (t, e, i, s) {
                            return Math.min(
                                t,
                                (i.marker.radius + s.marker.radius) / 2
                            );
                        },
                    };
                return s;
            }
        ),
        i(e, "Series/Networkgraph/EulerIntegration.js", [], function () {
            return {
                attractive: function (t, e, i, s) {
                    let o = t.getMass(),
                        a = (i.x / s) * e,
                        r = (i.y / s) * e;
                    t.fromNode.fixedPosition ||
                        ((t.fromNode.dispX -=
                            (a * o.fromNode) / t.fromNode.degree),
                        (t.fromNode.dispY -=
                            (r * o.fromNode) / t.fromNode.degree)),
                        t.toNode.fixedPosition ||
                            ((t.toNode.dispX +=
                                (a * o.toNode) / t.toNode.degree),
                            (t.toNode.dispY +=
                                (r * o.toNode) / t.toNode.degree));
                },
                attractiveForceFunction: function (t, e) {
                    return (t * t) / e;
                },
                barycenter: function () {
                    let t = this.options.gravitationalConstant,
                        e = this.barycenter.xFactor,
                        i = this.barycenter.yFactor;
                    this.nodes.forEach(function (s) {
                        if (!s.fixedPosition) {
                            let o = s.getDegree(),
                                a = o * (1 + o / 2);
                            (s.dispX += ((e - s.plotX) * t * a) / s.degree),
                                (s.dispY += ((i - s.plotY) * t * a) / s.degree);
                        }
                    });
                },
                getK: function (t) {
                    return Math.pow(
                        (t.box.width * t.box.height) / t.nodes.length,
                        0.3
                    );
                },
                integrate: function (t, e) {
                    let i;
                    (e.dispX += e.dispX * t.options.friction),
                        (e.dispY += e.dispY * t.options.friction),
                        0 !==
                            (i = e.temperature =
                                t.vectorLength({ x: e.dispX, y: e.dispY })) &&
                            ((e.plotX +=
                                (e.dispX / i) *
                                Math.min(Math.abs(e.dispX), t.temperature)),
                            (e.plotY +=
                                (e.dispY / i) *
                                Math.min(Math.abs(e.dispY), t.temperature)));
                },
                repulsive: function (t, e, i, s) {
                    (t.dispX += ((i.x / s) * e) / t.degree),
                        (t.dispY += ((i.y / s) * e) / t.degree);
                },
                repulsiveForceFunction: function (t, e) {
                    return (e * e) / t;
                },
            };
        }),
        i(e, "Series/Networkgraph/QuadTreeNode.js", [], function () {
            class t {
                constructor(t) {
                    (this.body = !1),
                        (this.isEmpty = !1),
                        (this.isInternal = !1),
                        (this.nodes = []),
                        (this.box = t),
                        (this.boxSize = Math.min(t.width, t.height));
                }
                divideBox() {
                    let e = this.box.width / 2,
                        i = this.box.height / 2;
                    (this.nodes[0] = new t({
                        left: this.box.left,
                        top: this.box.top,
                        width: e,
                        height: i,
                    })),
                        (this.nodes[1] = new t({
                            left: this.box.left + e,
                            top: this.box.top,
                            width: e,
                            height: i,
                        })),
                        (this.nodes[2] = new t({
                            left: this.box.left + e,
                            top: this.box.top + i,
                            width: e,
                            height: i,
                        })),
                        (this.nodes[3] = new t({
                            left: this.box.left,
                            top: this.box.top + i,
                            width: e,
                            height: i,
                        }));
                }
                getBoxPosition(t) {
                    let e = t.plotX < this.box.left + this.box.width / 2,
                        i = t.plotY < this.box.top + this.box.height / 2;
                    return e ? (i ? 0 : 3) : i ? 1 : 2;
                }
                insert(e, i) {
                    let s;
                    this.isInternal
                        ? this.nodes[this.getBoxPosition(e)].insert(e, i - 1)
                        : ((this.isEmpty = !1),
                          this.body
                              ? i
                                  ? ((this.isInternal = !0),
                                    this.divideBox(),
                                    !0 !== this.body &&
                                        (this.nodes[
                                            this.getBoxPosition(this.body)
                                        ].insert(this.body, i - 1),
                                        (this.body = !0)),
                                    this.nodes[this.getBoxPosition(e)].insert(
                                        e,
                                        i - 1
                                    ))
                                  : (((s = new t({
                                        top: e.plotX || NaN,
                                        left: e.plotY || NaN,
                                        width: 0.1,
                                        height: 0.1,
                                    })).body = e),
                                    (s.isInternal = !1),
                                    this.nodes.push(s))
                              : ((this.isInternal = !1), (this.body = e)));
                }
                updateMassAndCenter() {
                    let t = 0,
                        e = 0,
                        i = 0;
                    if (this.isInternal) {
                        for (let s of this.nodes)
                            s.isEmpty ||
                                ((t += s.mass),
                                (e += s.plotX * s.mass),
                                (i += s.plotY * s.mass));
                        (e /= t), (i /= t);
                    } else this.body && ((t = this.body.mass), (e = this.body.plotX), (i = this.body.plotY));
                    (this.mass = t), (this.plotX = e), (this.plotY = i);
                }
            }
            return t;
        }),
        i(
            e,
            "Series/Networkgraph/QuadTree.js",
            [e["Series/Networkgraph/QuadTreeNode.js"]],
            function (t) {
                return class {
                    constructor(e, i, s, o) {
                        (this.box = { left: e, top: i, width: s, height: o }),
                            (this.maxDepth = 25),
                            (this.root = new t(this.box)),
                            (this.root.isInternal = !0),
                            (this.root.isRoot = !0),
                            this.root.divideBox();
                    }
                    calculateMassAndCenter() {
                        this.visitNodeRecursive(null, null, function (t) {
                            t.updateMassAndCenter();
                        });
                    }
                    insertNodes(t) {
                        for (let e of t) this.root.insert(e, this.maxDepth);
                    }
                    visitNodeRecursive(t, e, i) {
                        let s;
                        if (
                            (t || (t = this.root),
                            t === this.root && e && (s = e(t)),
                            !1 !== s)
                        ) {
                            for (let o of t.nodes) {
                                if (o.isInternal) {
                                    if ((e && (s = e(o)), !1 === s)) continue;
                                    this.visitNodeRecursive(o, e, i);
                                } else o.body && e && e(o.body);
                                i && i(o);
                            }
                            t === this.root && i && i(t);
                        }
                    }
                };
            }
        ),
        i(
            e,
            "Series/Networkgraph/ReingoldFruchtermanLayout.js",
            [
                e["Series/Networkgraph/EulerIntegration.js"],
                e["Core/Globals.js"],
                e["Series/GraphLayoutComposition.js"],
                e["Series/Networkgraph/QuadTree.js"],
                e["Core/Utilities.js"],
                e["Series/Networkgraph/VerletIntegration.js"],
            ],
            function (t, e, i, s, o, a) {
                let { win: r } = e,
                    {
                        clamp: n,
                        defined: l,
                        isFunction: h,
                        fireEvent: p,
                        pick: d,
                    } = o;
                class c {
                    constructor() {
                        (this.box = {}),
                            (this.currentStep = 0),
                            (this.initialRendering = !0),
                            (this.links = []),
                            (this.nodes = []),
                            (this.series = []),
                            (this.simulation = !1);
                    }
                    static compose(e) {
                        i.compose(e),
                            (i.integrations.euler = t),
                            (i.integrations.verlet = a),
                            (i.layouts["reingold-fruchterman"] = c);
                    }
                    init(t) {
                        (this.options = t),
                            (this.nodes = []),
                            (this.links = []),
                            (this.series = []),
                            (this.box = { x: 0, y: 0, width: 0, height: 0 }),
                            this.setInitialRendering(!0),
                            (this.integration = i.integrations[t.integration]),
                            (this.enableSimulation = t.enableSimulation),
                            (this.attractiveForce = d(
                                t.attractiveForce,
                                this.integration.attractiveForceFunction
                            )),
                            (this.repulsiveForce = d(
                                t.repulsiveForce,
                                this.integration.repulsiveForceFunction
                            )),
                            (this.approximation = t.approximation);
                    }
                    updateSimulation(t) {
                        this.enableSimulation = d(
                            t,
                            this.options.enableSimulation
                        );
                    }
                    start() {
                        let t = this.series,
                            e = this.options;
                        (this.currentStep = 0),
                            (this.forces = (t[0] && t[0].forces) || []),
                            (this.chart = t[0] && t[0].chart),
                            this.initialRendering &&
                                (this.initPositions(),
                                t.forEach(function (t) {
                                    (t.finishedAnimating = !0), t.render();
                                })),
                            this.setK(),
                            this.resetSimulation(e),
                            this.enableSimulation && this.step();
                    }
                    step() {
                        let t = this.series;
                        for (let t of (this.currentStep++,
                        "barnes-hut" === this.approximation &&
                            (this.createQuadTree(),
                            this.quadTree.calculateMassAndCenter()),
                        this.forces || []))
                            this[t + "Forces"](this.temperature);
                        if (
                            (this.applyLimits(),
                            (this.temperature = this.coolDown(
                                this.startTemperature,
                                this.diffTemperature,
                                this.currentStep
                            )),
                            (this.prevSystemTemperature =
                                this.systemTemperature),
                            (this.systemTemperature =
                                this.getSystemTemperature()),
                            this.enableSimulation)
                        ) {
                            for (let e of t) e.chart && e.render();
                            this.maxIterations-- &&
                            isFinite(this.temperature) &&
                            !this.isStable()
                                ? (this.simulation &&
                                      r.cancelAnimationFrame(this.simulation),
                                  (this.simulation = r.requestAnimationFrame(
                                      () => this.step()
                                  )))
                                : ((this.simulation = !1),
                                  this.series.forEach((t) => {
                                      p(t, "afterSimulation");
                                  }));
                        }
                    }
                    stop() {
                        this.simulation &&
                            r.cancelAnimationFrame(this.simulation);
                    }
                    setArea(t, e, i, s) {
                        this.box = { left: t, top: e, width: i, height: s };
                    }
                    setK() {
                        this.k =
                            this.options.linkLength ||
                            this.integration.getK(this);
                    }
                    addElementsToCollection(t, e) {
                        for (let i of t) -1 === e.indexOf(i) && e.push(i);
                    }
                    removeElementFromCollection(t, e) {
                        let i = e.indexOf(t);
                        -1 !== i && e.splice(i, 1);
                    }
                    clear() {
                        (this.nodes.length = 0),
                            (this.links.length = 0),
                            (this.series.length = 0),
                            this.resetSimulation();
                    }
                    resetSimulation() {
                        (this.forcedStop = !1),
                            (this.systemTemperature = 0),
                            this.setMaxIterations(),
                            this.setTemperature(),
                            this.setDiffTemperature();
                    }
                    restartSimulation() {
                        this.simulation
                            ? this.resetSimulation()
                            : (this.setInitialRendering(!1),
                              this.enableSimulation
                                  ? this.start()
                                  : this.setMaxIterations(1),
                              this.chart && this.chart.redraw(),
                              this.setInitialRendering(!0));
                    }
                    setMaxIterations(t) {
                        this.maxIterations = d(t, this.options.maxIterations);
                    }
                    setTemperature() {
                        this.temperature = this.startTemperature = Math.sqrt(
                            this.nodes.length
                        );
                    }
                    setDiffTemperature() {
                        this.diffTemperature =
                            this.startTemperature /
                            (this.options.maxIterations + 1);
                    }
                    setInitialRendering(t) {
                        this.initialRendering = t;
                    }
                    createQuadTree() {
                        (this.quadTree = new s(
                            this.box.left,
                            this.box.top,
                            this.box.width,
                            this.box.height
                        )),
                            this.quadTree.insertNodes(this.nodes);
                    }
                    initPositions() {
                        let t = this.options.initialPositions;
                        if (h(t))
                            for (let e of (t.call(this), this.nodes))
                                l(e.prevX) || (e.prevX = e.plotX),
                                    l(e.prevY) || (e.prevY = e.plotY),
                                    (e.dispX = 0),
                                    (e.dispY = 0);
                        else
                            "circle" === t
                                ? this.setCircularPositions()
                                : this.setRandomPositions();
                    }
                    setCircularPositions() {
                        let t;
                        let e = this.box,
                            i = this.nodes,
                            s = i.length + 1,
                            o = (2 * Math.PI) / s,
                            a = i.filter(function (t) {
                                return 0 === t.linksTo.length;
                            }),
                            r = {},
                            n = this.options.initialPositionRadius,
                            l = (t) => {
                                for (let e of t.linksFrom || [])
                                    r[e.toNode.id] ||
                                        ((r[e.toNode.id] = !0),
                                        h.push(e.toNode),
                                        l(e.toNode));
                            },
                            h = [];
                        for (let t of a) h.push(t), l(t);
                        if (h.length)
                            for (let t of i) -1 === h.indexOf(t) && h.push(t);
                        else h = i;
                        for (let i = 0, s = h.length; i < s; ++i)
                            ((t = h[i]).plotX = t.prevX =
                                d(t.plotX, e.width / 2 + n * Math.cos(i * o))),
                                (t.plotY = t.prevY =
                                    d(
                                        t.plotY,
                                        e.height / 2 + n * Math.sin(i * o)
                                    )),
                                (t.dispX = 0),
                                (t.dispY = 0);
                    }
                    setRandomPositions() {
                        let t;
                        let e = this.box,
                            i = this.nodes,
                            s = i.length + 1,
                            o = (t) => {
                                let e = (t * t) / Math.PI;
                                return e - Math.floor(e);
                            };
                        for (let a = 0, r = i.length; a < r; ++a)
                            ((t = i[a]).plotX = t.prevX =
                                d(t.plotX, e.width * o(a))),
                                (t.plotY = t.prevY =
                                    d(t.plotY, e.height * o(s + a))),
                                (t.dispX = 0),
                                (t.dispY = 0);
                    }
                    force(t, ...e) {
                        this.integration[t].apply(this, e);
                    }
                    barycenterForces() {
                        this.getBarycenter(), this.force("barycenter");
                    }
                    getBarycenter() {
                        let t = 0,
                            e = 0,
                            i = 0;
                        for (let s of this.nodes)
                            (e += s.plotX * s.mass),
                                (i += s.plotY * s.mass),
                                (t += s.mass);
                        return (
                            (this.barycenter = {
                                x: e,
                                y: i,
                                xFactor: e / t,
                                yFactor: i / t,
                            }),
                            this.barycenter
                        );
                    }
                    barnesHutApproximation(t, e) {
                        let i, s;
                        let o = this.getDistXY(t, e),
                            a = this.vectorLength(o);
                        return (
                            t !== e &&
                                0 !== a &&
                                (e.isInternal
                                    ? e.boxSize / a < this.options.theta &&
                                      0 !== a
                                        ? ((s = this.repulsiveForce(a, this.k)),
                                          this.force(
                                              "repulsive",
                                              t,
                                              s * e.mass,
                                              o,
                                              a
                                          ),
                                          (i = !1))
                                        : (i = !0)
                                    : ((s = this.repulsiveForce(a, this.k)),
                                      this.force(
                                          "repulsive",
                                          t,
                                          s * e.mass,
                                          o,
                                          a
                                      ))),
                            i
                        );
                    }
                    repulsiveForces() {
                        if ("barnes-hut" === this.approximation)
                            for (let t of this.nodes)
                                this.quadTree.visitNodeRecursive(null, (e) =>
                                    this.barnesHutApproximation(t, e)
                                );
                        else {
                            let t, e, i;
                            for (let s of this.nodes)
                                for (let o of this.nodes)
                                    s === o ||
                                        s.fixedPosition ||
                                        ((i = this.getDistXY(s, o)),
                                        0 !== (e = this.vectorLength(i)) &&
                                            ((t = this.repulsiveForce(
                                                e,
                                                this.k
                                            )),
                                            this.force(
                                                "repulsive",
                                                s,
                                                t * o.mass,
                                                i,
                                                e
                                            )));
                        }
                    }
                    attractiveForces() {
                        let t, e, i;
                        for (let s of this.links)
                            s.fromNode &&
                                s.toNode &&
                                ((t = this.getDistXY(s.fromNode, s.toNode)),
                                0 !== (e = this.vectorLength(t)) &&
                                    ((i = this.attractiveForce(e, this.k)),
                                    this.force("attractive", s, i, t, e)));
                    }
                    applyLimits() {
                        let t = this.nodes;
                        for (let e of t) {
                            if (e.fixedPosition) return;
                            this.integration.integrate(this, e),
                                this.applyLimitBox(e, this.box),
                                (e.dispX = 0),
                                (e.dispY = 0);
                        }
                    }
                    applyLimitBox(t, e) {
                        let i = t.radius;
                        (t.plotX = n(t.plotX, e.left + i, e.width - i)),
                            (t.plotY = n(t.plotY, e.top + i, e.height - i));
                    }
                    coolDown(t, e, i) {
                        return t - e * i;
                    }
                    isStable() {
                        return (
                            1e-5 >
                                Math.abs(
                                    this.systemTemperature -
                                        this.prevSystemTemperature
                                ) || this.temperature <= 0
                        );
                    }
                    getSystemTemperature() {
                        let t = 0;
                        for (let e of this.nodes) t += e.temperature;
                        return t;
                    }
                    vectorLength(t) {
                        return Math.sqrt(t.x * t.x + t.y * t.y);
                    }
                    getDistR(t, e) {
                        let i = this.getDistXY(t, e);
                        return this.vectorLength(i);
                    }
                    getDistXY(t, e) {
                        let i = t.plotX - e.plotX,
                            s = t.plotY - e.plotY;
                        return {
                            x: i,
                            y: s,
                            absX: Math.abs(i),
                            absY: Math.abs(s),
                        };
                    }
                }
                return c;
            }
        ),
        i(
            e,
            "Series/PackedBubble/PackedBubbleLayout.js",
            [
                e["Series/GraphLayoutComposition.js"],
                e["Core/Globals.js"],
                e["Series/PackedBubble/PackedBubbleIntegration.js"],
                e["Series/Networkgraph/ReingoldFruchtermanLayout.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, o) {
                let { composed: a } = e,
                    { addEvent: r, pick: n, pushUnique: l } = o;
                function h() {
                    let t = this.series,
                        e = [];
                    return (
                        t.forEach((t) => {
                            t.parentNode &&
                                t.parentNode.selected &&
                                e.push(t.parentNode);
                        }),
                        e
                    );
                }
                function p() {
                    this.allDataPoints && delete this.allDataPoints;
                }
                class d extends s {
                    constructor() {
                        super(...arguments),
                            (this.index = NaN),
                            (this.nodes = []),
                            (this.series = []);
                    }
                    static compose(e) {
                        if (
                            (s.compose(e),
                            (t.integrations.packedbubble = i),
                            (t.layouts.packedbubble = d),
                            l(a, this.compose))
                        ) {
                            r(e, "beforeRedraw", p);
                            let t = e.prototype;
                            t.getSelectedParentNodes = h;
                        }
                    }
                    beforeStep() {
                        this.options.marker &&
                            this.series.forEach((t) => {
                                t && t.calculateParentRadius();
                            });
                    }
                    isStable() {
                        let t = Math.abs(
                                this.prevSystemTemperature -
                                    this.systemTemperature
                            ),
                            e =
                                (10 * this.systemTemperature) /
                                Math.sqrt(this.nodes.length);
                        return (
                            (1 > Math.abs(e) && t < 1e-5) ||
                            this.temperature <= 0
                        );
                    }
                    setCircularPositions() {
                        let t = this.box,
                            e = this.nodes,
                            i = e.length + 1,
                            s = (2 * Math.PI) / i,
                            o = this.options.initialPositionRadius,
                            a,
                            r,
                            l = 0;
                        for (let i of e)
                            this.options.splitSeries && !i.isParentNode
                                ? ((a = i.series.parentNode.plotX),
                                  (r = i.series.parentNode.plotY))
                                : ((a = t.width / 2), (r = t.height / 2)),
                                (i.plotX = i.prevX =
                                    n(
                                        i.plotX,
                                        a + o * Math.cos(i.index || l * s)
                                    )),
                                (i.plotY = i.prevY =
                                    n(
                                        i.plotY,
                                        r + o * Math.sin(i.index || l * s)
                                    )),
                                (i.dispX = 0),
                                (i.dispY = 0),
                                l++;
                    }
                    repulsiveForces() {
                        let t, e, i;
                        let s = this,
                            o = s.options.bubblePadding;
                        s.nodes.forEach((a) => {
                            (a.degree = a.mass),
                                (a.neighbours = 0),
                                s.nodes.forEach((r) => {
                                    (t = 0),
                                        a !== r &&
                                            !a.fixedPosition &&
                                            (s.options.seriesInteraction ||
                                                a.series === r.series) &&
                                            ((i = s.getDistXY(a, r)),
                                            (e =
                                                s.vectorLength(i) -
                                                (a.marker.radius +
                                                    r.marker.radius +
                                                    o)) < 0 &&
                                                ((a.degree += 0.01),
                                                a.neighbours++,
                                                (t = s.repulsiveForce(
                                                    -e /
                                                        Math.sqrt(a.neighbours),
                                                    s.k,
                                                    a,
                                                    r
                                                ))),
                                            s.force(
                                                "repulsive",
                                                a,
                                                t * r.mass,
                                                i,
                                                r,
                                                e
                                            ));
                                });
                        });
                    }
                    applyLimitBox(t, e) {
                        let i, s;
                        this.options.splitSeries &&
                            !t.isParentNode &&
                            this.options.parentNodeLimit &&
                            ((i = this.getDistXY(t, t.series.parentNode)),
                            (s =
                                t.series.parentNodeRadius -
                                t.marker.radius -
                                this.vectorLength(i)) < 0 &&
                                s > -2 * t.marker.radius &&
                                ((t.plotX -= 0.01 * i.x),
                                (t.plotY -= 0.01 * i.y))),
                            super.applyLimitBox(t, e);
                    }
                }
                return (t.layouts.packedbubble = d), d;
            }
        ),
        i(
            e,
            "Series/SimulationSeriesUtilities.js",
            [e["Core/Utilities.js"], e["Core/Animation/AnimationUtilities.js"]],
            function (t, e) {
                let { merge: i, syncTimeout: s } = t,
                    { animObject: o } = e;
                return {
                    initDataLabels: function () {
                        let t = this.options.dataLabels;
                        if (!this.dataLabelsGroup) {
                            let e = this.initDataLabelsGroup();
                            return (
                                !this.chart.styledMode &&
                                    t?.style &&
                                    e.css(t.style),
                                e.attr({ opacity: 0 }),
                                this.visible && e.show(),
                                e
                            );
                        }
                        return (
                            this.dataLabelsGroup.attr(
                                i(
                                    { opacity: 1 },
                                    this.getPlotBox("data-labels")
                                )
                            ),
                            this.dataLabelsGroup
                        );
                    },
                    initDataLabelsDefer: function () {
                        let t = this.options.dataLabels;
                        t?.defer &&
                        this.options.layoutAlgorithm?.enableSimulation
                            ? s(
                                  () => {
                                      this.deferDataLabels = !1;
                                  },
                                  t ? o(t.animation).defer : 0
                              )
                            : (this.deferDataLabels = !1);
                    },
                };
            }
        ),
        i(
            e,
            "Series/PackedBubble/PackedBubbleSeries.js",
            [
                e["Core/Color/Color.js"],
                e["Series/DragNodesComposition.js"],
                e["Series/GraphLayoutComposition.js"],
                e["Core/Globals.js"],
                e["Series/PackedBubble/PackedBubblePoint.js"],
                e["Series/PackedBubble/PackedBubbleSeriesDefaults.js"],
                e["Series/PackedBubble/PackedBubbleLayout.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Series/SimulationSeriesUtilities.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, o, a, r, n, l, h) {
                let { parse: p } = t,
                    { noop: d } = s,
                    {
                        series: { prototype: c },
                        seriesTypes: { bubble: u },
                    } = n,
                    { initDataLabels: g, initDataLabelsDefer: f } = l,
                    {
                        addEvent: b,
                        clamp: m,
                        defined: y,
                        extend: x,
                        fireEvent: P,
                        isArray: S,
                        isNumber: M,
                        merge: L,
                        pick: k,
                    } = h;
                class v extends u {
                    constructor() {
                        super(...arguments),
                            (this.parentNodeMass = 0),
                            (this.deferDataLabels = !0);
                    }
                    static compose(t, i, s, o) {
                        u.compose(t, i, s, o), e.compose(i), r.compose(i);
                    }
                    accumulateAllPoints() {
                        let t;
                        let e = this.chart,
                            i = [];
                        for (let s of e.series)
                            if (s.is("packedbubble") && s.reserveSpace()) {
                                t = s.yData || [];
                                for (let e = 0; e < t.length; e++)
                                    i.push([
                                        null,
                                        null,
                                        t[e],
                                        s.index,
                                        e,
                                        { id: e, marker: { radius: 0 } },
                                    ]);
                            }
                        return i;
                    }
                    addLayout() {
                        let t = (this.options.layoutAlgorithm =
                                this.options.layoutAlgorithm || {}),
                            e = t.type || "packedbubble",
                            s = this.chart.options.chart,
                            o = this.chart.graphLayoutsStorage,
                            a = this.chart.graphLayoutsLookup,
                            r;
                        o ||
                            ((this.chart.graphLayoutsStorage = o = {}),
                            (this.chart.graphLayoutsLookup = a = [])),
                            (r = o[e]) ||
                                ((t.enableSimulation = y(s.forExport)
                                    ? !s.forExport
                                    : t.enableSimulation),
                                (o[e] = r = new i.layouts[e]()),
                                r.init(t),
                                a.splice(r.index, 0, r)),
                            (this.layout = r),
                            this.points.forEach((t) => {
                                (t.mass = 2),
                                    (t.degree = 1),
                                    (t.collisionNmb = 1);
                            }),
                            r.setArea(
                                0,
                                0,
                                this.chart.plotWidth,
                                this.chart.plotHeight
                            ),
                            r.addElementsToCollection([this], r.series),
                            r.addElementsToCollection(this.points, r.nodes);
                    }
                    addSeriesLayout() {
                        let t = (this.options.layoutAlgorithm =
                                this.options.layoutAlgorithm || {}),
                            e = t.type || "packedbubble",
                            s = this.chart.graphLayoutsStorage,
                            o = this.chart.graphLayoutsLookup,
                            a = L(t, t.parentNodeOptions, {
                                enableSimulation:
                                    this.layout.options.enableSimulation,
                            }),
                            r = s[e + "-series"];
                        r ||
                            ((s[e + "-series"] = r = new i.layouts[e]()),
                            r.init(a),
                            o.splice(r.index, 0, r)),
                            (this.parentNodeLayout = r),
                            this.createParentNodes();
                    }
                    calculateParentRadius() {
                        let t = this.seriesBox();
                        (this.parentNodeRadius = m(
                            Math.sqrt((2 * this.parentNodeMass) / Math.PI) + 20,
                            20,
                            t
                                ? Math.max(
                                      Math.sqrt(
                                          Math.pow(t.width, 2) +
                                              Math.pow(t.height, 2)
                                      ) /
                                          2 +
                                          20,
                                      20
                                  )
                                : Math.sqrt(
                                      (2 * this.parentNodeMass) / Math.PI
                                  ) + 20
                        )),
                            this.parentNode &&
                                (this.parentNode.marker.radius =
                                    this.parentNode.radius =
                                        this.parentNodeRadius);
                    }
                    calculateZExtremes() {
                        let t = this.chart,
                            e = t.series,
                            i = this.options.zMin,
                            s = this.options.zMax,
                            o = 1 / 0,
                            a = -1 / 0;
                        return i && s
                            ? [i, s]
                            : (e.forEach((t) => {
                                  t.yData.forEach((t) => {
                                      y(t) &&
                                          (t > a && (a = t), t < o && (o = t));
                                  });
                              }),
                              [(i = k(i, o)), (s = k(s, a))]);
                    }
                    checkOverlap(t, e) {
                        let i = t[0] - e[0],
                            s = t[1] - e[1],
                            o = t[2] + e[2];
                        return Math.sqrt(i * i + s * s) - Math.abs(o) < -0.001;
                    }
                    createParentNodes() {
                        let t = this.pointClass,
                            e = this.chart,
                            i = this.parentNodeLayout,
                            s = this.layout.options,
                            o,
                            a = this.parentNode,
                            r = {
                                radius: this.parentNodeRadius,
                                lineColor: this.color,
                                fillColor: p(this.color).brighten(0.4).get(),
                            };
                        s.parentNodeOptions &&
                            (r = L(s.parentNodeOptions.marker || {}, r)),
                            (this.parentNodeMass = 0),
                            this.points.forEach((t) => {
                                this.parentNodeMass +=
                                    Math.PI * Math.pow(t.marker.radius, 2);
                            }),
                            this.calculateParentRadius(),
                            i.nodes.forEach((t) => {
                                t.seriesIndex === this.index && (o = !0);
                            }),
                            i.setArea(0, 0, e.plotWidth, e.plotHeight),
                            o ||
                                (a ||
                                    (a = new t(this, {
                                        mass: this.parentNodeRadius / 2,
                                        marker: r,
                                        dataLabels: { inside: !1 },
                                        states: {
                                            normal: { marker: r },
                                            hover: { marker: r },
                                        },
                                        dataLabelOnNull: !0,
                                        degree: this.parentNodeRadius,
                                        isParentNode: !0,
                                        seriesIndex: this.index,
                                    })),
                                this.parentNode &&
                                    ((a.plotX = this.parentNode.plotX),
                                    (a.plotY = this.parentNode.plotY)),
                                (this.parentNode = a),
                                i.addElementsToCollection([this], i.series),
                                i.addElementsToCollection([a], i.nodes));
                    }
                    deferLayout() {
                        let t = this.options.layoutAlgorithm;
                        this.visible &&
                            (this.addLayout(),
                            t.splitSeries && this.addSeriesLayout());
                    }
                    destroy() {
                        this.chart.graphLayoutsLookup &&
                            this.chart.graphLayoutsLookup.forEach((t) => {
                                t.removeElementFromCollection(this, t.series);
                            }, this),
                            this.parentNode &&
                                this.parentNodeLayout &&
                                (this.parentNodeLayout.removeElementFromCollection(
                                    this.parentNode,
                                    this.parentNodeLayout.nodes
                                ),
                                this.parentNode.dataLabel &&
                                    (this.parentNode.dataLabel =
                                        this.parentNode.dataLabel.destroy())),
                            c.destroy.apply(this, arguments);
                    }
                    drawDataLabels() {
                        !this.deferDataLabels &&
                            (c.drawDataLabels.call(this, this.points),
                            this.parentNode &&
                                ((this.parentNode.formatPrefix = "parentNode"),
                                c.drawDataLabels.call(this, [
                                    this.parentNode,
                                ])));
                    }
                    drawGraph() {
                        if (!this.layout || !this.layout.options.splitSeries)
                            return;
                        let t = this.chart,
                            e = this.layout.options.parentNodeOptions.marker,
                            i = {
                                fill:
                                    e.fillColor ||
                                    p(this.color).brighten(0.4).get(),
                                opacity: e.fillOpacity,
                                stroke: e.lineColor || this.color,
                                "stroke-width": k(
                                    e.lineWidth,
                                    this.options.lineWidth
                                ),
                            },
                            s = {};
                        (this.parentNodesGroup = this.plotGroup(
                            "parentNodesGroup",
                            "parentNode",
                            this.visible ? "inherit" : "hidden",
                            0.1,
                            t.seriesGroup
                        )),
                            this.group?.attr({ zIndex: 2 }),
                            this.calculateParentRadius(),
                            this.parentNode &&
                                y(this.parentNode.plotX) &&
                                y(this.parentNode.plotY) &&
                                y(this.parentNodeRadius) &&
                                ((s = L(
                                    {
                                        x:
                                            this.parentNode.plotX -
                                            this.parentNodeRadius,
                                        y:
                                            this.parentNode.plotY -
                                            this.parentNodeRadius,
                                        width: 2 * this.parentNodeRadius,
                                        height: 2 * this.parentNodeRadius,
                                    },
                                    i
                                )),
                                this.parentNode.graphic ||
                                    (this.graph = this.parentNode.graphic =
                                        t.renderer
                                            .symbol(i.symbol)
                                            .add(this.parentNodesGroup)),
                                this.parentNode.graphic.attr(s));
                    }
                    drawTracker() {
                        let t;
                        let e = this.parentNode;
                        super.drawTracker(),
                            e &&
                                ((t = S(e.dataLabels)
                                    ? e.dataLabels
                                    : e.dataLabel
                                    ? [e.dataLabel]
                                    : []),
                                e.graphic && (e.graphic.element.point = e),
                                t.forEach((t) => {
                                    t.div
                                        ? (t.div.point = e)
                                        : (t.element.point = e);
                                }));
                    }
                    getPointRadius() {
                        let t, e, i, s;
                        let o = this.chart,
                            a = o.plotWidth,
                            r = o.plotHeight,
                            n = this.options,
                            l = n.useSimulation,
                            h = Math.min(a, r),
                            p = {},
                            d = [],
                            c = o.allDataPoints || [],
                            u = c.length;
                        ["minSize", "maxSize"].forEach((t) => {
                            let e = parseInt(n[t], 10),
                                i = /%$/.test(n[t]);
                            p[t] = i ? (h * e) / 100 : e * Math.sqrt(u);
                        }),
                            (o.minRadius = t = p.minSize / Math.sqrt(u)),
                            (o.maxRadius = e = p.maxSize / Math.sqrt(u));
                        let g = l ? this.calculateZExtremes() : [t, e];
                        c.forEach((o, a) => {
                            (i = l ? m(o[2], g[0], g[1]) : o[2]),
                                0 ===
                                    (s = this.getRadius(g[0], g[1], t, e, i)) &&
                                    (s = null),
                                (c[a][2] = s),
                                d.push(s);
                        }),
                            (this.radii = d);
                    }
                    init() {
                        return (
                            c.init.apply(this, arguments),
                            f.call(this),
                            this.eventsToUnbind.push(
                                b(this, "updatedData", function () {
                                    this.chart.series.forEach((t) => {
                                        t.type === this.type &&
                                            (t.isDirty = !0);
                                    }, this);
                                })
                            ),
                            this
                        );
                    }
                    onMouseUp(t) {
                        if (t.fixedPosition && !t.removed) {
                            let i;
                            let s = this.layout,
                                o = this.parentNodeLayout;
                            o &&
                                s.options.dragBetweenSeries &&
                                o.nodes.forEach((e) => {
                                    t &&
                                        t.marker &&
                                        e !== t.series.parentNode &&
                                        ((i = s.getDistXY(t, e)),
                                        s.vectorLength(i) -
                                            e.marker.radius -
                                            t.marker.radius <
                                            0 &&
                                            (e.series.addPoint(
                                                L(t.options, {
                                                    plotX: t.plotX,
                                                    plotY: t.plotY,
                                                }),
                                                !1
                                            ),
                                            s.removeElementFromCollection(
                                                t,
                                                s.nodes
                                            ),
                                            t.remove()));
                                }),
                                e.onMouseUp.apply(this, arguments);
                        }
                    }
                    placeBubbles(t) {
                        let e = this.checkOverlap,
                            i = this.positionBubble,
                            s = [],
                            o = 1,
                            a = 0,
                            r = 0,
                            n,
                            l = [],
                            h,
                            p = t.sort((t, e) => e[2] - t[2]);
                        if (p.length) {
                            if (
                                (s.push([[0, 0, p[0][2], p[0][3], p[0][4]]]),
                                p.length > 1)
                            )
                                for (
                                    s.push([
                                        [
                                            0,
                                            0 - p[1][2] - p[0][2],
                                            p[1][2],
                                            p[1][3],
                                            p[1][4],
                                        ],
                                    ]),
                                        h = 2;
                                    h < p.length;
                                    h++
                                )
                                    (p[h][2] = p[h][2] || 1),
                                        e(
                                            (n = i(s[o][a], s[o - 1][r], p[h])),
                                            s[o][0]
                                        )
                                            ? (s.push([]),
                                              (r = 0),
                                              s[o + 1].push(
                                                  i(s[o][a], s[o][0], p[h])
                                              ),
                                              o++,
                                              (a = 0))
                                            : o > 1 &&
                                              s[o - 1][r + 1] &&
                                              e(n, s[o - 1][r + 1])
                                            ? (r++,
                                              s[o].push(
                                                  i(s[o][a], s[o - 1][r], p[h])
                                              ),
                                              a++)
                                            : (a++, s[o].push(n));
                            (this.chart.stages = s),
                                (this.chart.rawPositions = [].concat.apply(
                                    [],
                                    s
                                )),
                                this.resizeRadius(),
                                (l = this.chart.rawPositions);
                        }
                        return l;
                    }
                    pointAttribs(t, e) {
                        let i = this.options,
                            s = t && t.isParentNode,
                            o = i.marker;
                        s &&
                            i.layoutAlgorithm &&
                            i.layoutAlgorithm.parentNodeOptions &&
                            (o = i.layoutAlgorithm.parentNodeOptions.marker);
                        let a = o.fillOpacity,
                            r = c.pointAttribs.call(this, t, e);
                        return 1 !== a && (r["fill-opacity"] = a), r;
                    }
                    positionBubble(t, e, i) {
                        let s = Math.pow,
                            o = (0, Math.sqrt)(
                                s(t[0] - e[0], 2) + s(t[1] - e[1], 2)
                            ),
                            a = (0, Math.acos)(
                                (s(o, 2) +
                                    s(i[2] + e[2], 2) -
                                    s(i[2] + t[2], 2)) /
                                    (2 * (i[2] + e[2]) * o)
                            ),
                            r = (0, Math.asin)((0, Math.abs)(t[0] - e[0]) / o),
                            n = t[1] - e[1] < 0 ? 0 : Math.PI,
                            l = (t[0] - e[0]) * (t[1] - e[1]) < 0 ? 1 : -1,
                            h = n + a + r * l,
                            p = e[0] + (e[2] + i[2]) * Math.sin(h),
                            d = e[1] - (e[2] + i[2]) * Math.cos(h);
                        return [p, d, i[2], i[3], i[4]];
                    }
                    render() {
                        let t = [];
                        c.render.apply(this, arguments),
                            !this.options.dataLabels.allowOverlap &&
                                (this.data.forEach((e) => {
                                    S(e.dataLabels) &&
                                        e.dataLabels.forEach((e) => {
                                            t.push(e);
                                        });
                                }),
                                this.options.useSimulation &&
                                    this.chart.hideOverlappingLabels(t));
                    }
                    resizeRadius() {
                        let t, e, i, s, o;
                        let a = this.chart,
                            r = a.rawPositions,
                            n = Math.min,
                            l = Math.max,
                            h = a.plotLeft,
                            p = a.plotTop,
                            d = a.plotHeight,
                            c = a.plotWidth;
                        for (let a of ((t = i = Number.POSITIVE_INFINITY),
                        (e = s = Number.NEGATIVE_INFINITY),
                        r))
                            (o = a[2]),
                                (t = n(t, a[0] - o)),
                                (e = l(e, a[0] + o)),
                                (i = n(i, a[1] - o)),
                                (s = l(s, a[1] + o));
                        let u = [e - t, s - i],
                            g = [(c - h) / u[0], (d - p) / u[1]],
                            f = n.apply([], g);
                        if (Math.abs(f - 1) > 1e-10) {
                            for (let t of r) t[2] *= f;
                            this.placeBubbles(r);
                        } else
                            (a.diffY = d / 2 + p - i - (s - i) / 2),
                                (a.diffX = c / 2 + h - t - (e - t) / 2);
                    }
                    seriesBox() {
                        let t;
                        let e = this.chart,
                            i = this.data,
                            s = Math.max,
                            o = Math.min,
                            a = [
                                e.plotLeft,
                                e.plotLeft + e.plotWidth,
                                e.plotTop,
                                e.plotTop + e.plotHeight,
                            ];
                        return (
                            i.forEach((e) => {
                                y(e.plotX) &&
                                    y(e.plotY) &&
                                    e.marker.radius &&
                                    ((t = e.marker.radius),
                                    (a[0] = o(a[0], e.plotX - t)),
                                    (a[1] = s(a[1], e.plotX + t)),
                                    (a[2] = o(a[2], e.plotY - t)),
                                    (a[3] = s(a[3], e.plotY + t)));
                            }),
                            M(a.width / a.height) ? a : null
                        );
                    }
                    setVisible() {
                        let t = this;
                        c.setVisible.apply(t, arguments),
                            t.parentNodeLayout && t.graph
                                ? t.visible
                                    ? (t.graph.show(),
                                      t.parentNode.dataLabel &&
                                          t.parentNode.dataLabel.show())
                                    : (t.graph.hide(),
                                      t.parentNodeLayout.removeElementFromCollection(
                                          t.parentNode,
                                          t.parentNodeLayout.nodes
                                      ),
                                      t.parentNode.dataLabel &&
                                          t.parentNode.dataLabel.hide())
                                : t.layout &&
                                  (t.visible
                                      ? t.layout.addElementsToCollection(
                                            t.points,
                                            t.layout.nodes
                                        )
                                      : t.points.forEach((e) => {
                                            t.layout.removeElementFromCollection(
                                                e,
                                                t.layout.nodes
                                            );
                                        }));
                    }
                    translate() {
                        let t, e, i;
                        let s = this.chart,
                            o = this.data,
                            a = this.index,
                            r = this.options.useSimulation;
                        for (let n of ((this.processedXData = this.xData),
                        this.generatePoints(),
                        y(s.allDataPoints) ||
                            ((s.allDataPoints = this.accumulateAllPoints()),
                            this.getPointRadius()),
                        r
                            ? (i = s.allDataPoints)
                            : ((i = this.placeBubbles(s.allDataPoints)),
                              (this.options.draggable = !1)),
                        i))
                            n[3] === a &&
                                ((t = o[n[4]]),
                                (e = k(n[2], void 0)),
                                r ||
                                    ((t.plotX = n[0] - s.plotLeft + s.diffX),
                                    (t.plotY = n[1] - s.plotTop + s.diffY)),
                                M(e) &&
                                    ((t.marker = x(t.marker, {
                                        radius: e,
                                        width: 2 * e,
                                        height: 2 * e,
                                    })),
                                    (t.radius = e)));
                        r && this.deferLayout(), P(this, "afterTranslate");
                    }
                }
                return (
                    (v.defaultOptions = L(u.defaultOptions, a)),
                    x(v.prototype, {
                        pointClass: o,
                        axisTypes: [],
                        directTouch: !0,
                        forces: ["barycenter", "repulsive"],
                        hasDraggableNodes: !0,
                        isCartesian: !1,
                        noSharedTooltip: !0,
                        pointArrayMap: ["value"],
                        pointValKey: "value",
                        requireSorting: !1,
                        trackerGroups: [
                            "group",
                            "dataLabelsGroup",
                            "parentNodesGroup",
                        ],
                        initDataLabels: g,
                        alignDataLabel: c.alignDataLabel,
                        indexateNodes: d,
                        onMouseDown: e.onMouseDown,
                        onMouseMove: e.onMouseMove,
                        redrawHalo: e.redrawHalo,
                        searchPoint: d,
                    }),
                    n.registerSeriesType("packedbubble", v),
                    v
                );
            }
        ),
        i(e, "Series/Polygon/PolygonSeriesDefaults.js", [], function () {
            return {
                marker: { enabled: !1, states: { hover: { enabled: !1 } } },
                stickyTracking: !1,
                tooltip: { followPointer: !0, pointFormat: "" },
                trackByArea: !0,
                legendSymbol: "rectangle",
            };
        }),
        i(
            e,
            "Series/Polygon/PolygonSeries.js",
            [
                e["Core/Globals.js"],
                e["Series/Polygon/PolygonSeriesDefaults.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s) {
                let { noop: o } = t,
                    { area: a, line: r, scatter: n } = i.seriesTypes,
                    { extend: l, merge: h } = s;
                class p extends n {
                    getGraphPath() {
                        let t = r.prototype.getGraphPath.call(this),
                            e = t.length + 1;
                        for (; e--; )
                            (e === t.length || "M" === t[e][0]) &&
                                e > 0 &&
                                t.splice(e, 0, ["Z"]);
                        return (this.areaPath = t), t;
                    }
                    drawGraph() {
                        (this.options.fillColor = this.color),
                            a.prototype.drawGraph.call(this);
                    }
                }
                return (
                    (p.defaultOptions = h(n.defaultOptions, e)),
                    l(p.prototype, {
                        type: "polygon",
                        drawTracker: r.prototype.drawTracker,
                        setStackedPoints: o,
                    }),
                    i.registerSeriesType("polygon", p),
                    p
                );
            }
        ),
        i(
            e,
            "Core/Axis/RadialAxis.js",
            [
                e["Core/Defaults.js"],
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i) {
                var s;
                let { defaultOptions: o } = t,
                    { composed: a, noop: r } = e,
                    {
                        addEvent: n,
                        correctFloat: l,
                        defined: h,
                        extend: p,
                        fireEvent: d,
                        isObject: c,
                        merge: u,
                        pick: g,
                        pushUnique: f,
                        relativeLength: b,
                        wrap: m,
                    } = i;
                return (
                    (function (t) {
                        let e = {
                                gridLineWidth: 1,
                                labels: {
                                    align: void 0,
                                    x: 0,
                                    y: void 0,
                                    style: { textOverflow: "none" },
                                },
                                maxPadding: 0,
                                minPadding: 0,
                                showLastLabel: !1,
                                tickLength: 0,
                            },
                            i = {
                                endOnTick: !1,
                                gridLineWidth: 0,
                                labels: {
                                    align: "center",
                                    distance: -25,
                                    x: 0,
                                    y: void 0,
                                },
                                lineWidth: 1,
                                minorGridLineWidth: 0,
                                minorTickInterval: "auto",
                                minorTickLength: 10,
                                minorTickPosition: "inside",
                                minorTickWidth: 1,
                                startOnTick: !1,
                                tickLength: 10,
                                tickPixelInterval: 100,
                                tickPosition: "inside",
                                tickWidth: 2,
                                title: { rotation: 0, text: "" },
                                zIndex: 2,
                            },
                            s = {
                                gridLineInterpolation: "circle",
                                gridLineWidth: 1,
                                labels: { align: "right", x: -3, y: -2 },
                                showLastLabel: !1,
                                title: { x: 4, text: null, rotation: 90 },
                            };
                        function y() {
                            (this.autoConnect =
                                this.isCircular &&
                                void 0 === g(this.userMax, this.options.max) &&
                                l(this.endAngleRad - this.startAngleRad) ===
                                    l(2 * Math.PI)),
                                !this.isCircular &&
                                    this.chart.inverted &&
                                    this.max++,
                                this.autoConnect &&
                                    (this.max +=
                                        (this.categories && 1) ||
                                        this.pointRange ||
                                        this.closestPointRange ||
                                        0);
                        }
                        function x() {
                            return () => {
                                if (
                                    this.isRadial &&
                                    this.tickPositions &&
                                    this.options.labels &&
                                    !0 !== this.options.labels.allowOverlap
                                )
                                    return this.tickPositions
                                        .map(
                                            (t) =>
                                                this.ticks[t] &&
                                                this.ticks[t].label
                                        )
                                        .filter((t) => !!t);
                            };
                        }
                        function P() {
                            return r;
                        }
                        function S(t, e, i) {
                            let s = this.pane.center,
                                o = t.value,
                                a,
                                r,
                                n;
                            return (
                                this.isCircular
                                    ? (h(o)
                                          ? t.point &&
                                            (t.point.shapeArgs || {}).start &&
                                            (o = this.chart.inverted
                                                ? this.translate(
                                                      t.point.rectPlotY,
                                                      !0
                                                  )
                                                : t.point.x)
                                          : ((r = t.chartX || 0),
                                            (n = t.chartY || 0),
                                            (o = this.translate(
                                                Math.atan2(n - i, r - e) -
                                                    this.startAngleRad,
                                                !0
                                            ))),
                                      (r = (a = this.getPosition(o)).x),
                                      (n = a.y))
                                    : (h(o) || ((r = t.chartX), (n = t.chartY)),
                                      h(r) &&
                                          h(n) &&
                                          ((i = s[1] + this.chart.plotTop),
                                          (o = this.translate(
                                              Math.min(
                                                  Math.sqrt(
                                                      Math.pow(r - e, 2) +
                                                          Math.pow(n - i, 2)
                                                  ),
                                                  s[2] / 2
                                              ) -
                                                  s[3] / 2,
                                              !0
                                          )))),
                                [o, r || 0, n || 0]
                            );
                        }
                        function M(t, e, i) {
                            let s = this.pane.center,
                                o = this.chart,
                                a = this.left || 0,
                                r = this.top || 0,
                                n,
                                l = g(e, s[2] / 2 - this.offset),
                                h;
                            return (
                                void 0 === i &&
                                    (i = this.horiz
                                        ? 0
                                        : this.center && -this.center[3] / 2),
                                i && (l += i),
                                this.isCircular || void 0 !== e
                                    ? (((h = this.chart.renderer.symbols.arc(
                                          a + s[0],
                                          r + s[1],
                                          l,
                                          l,
                                          {
                                              start: this.startAngleRad,
                                              end: this.endAngleRad,
                                              open: !0,
                                              innerR: 0,
                                          }
                                      )).xBounds = [a + s[0]]),
                                      (h.yBounds = [r + s[1] - l]))
                                    : ((n = this.postTranslate(
                                          this.angleRad,
                                          l
                                      )),
                                      (h = [
                                          [
                                              "M",
                                              this.center[0] + o.plotLeft,
                                              this.center[1] + o.plotTop,
                                          ],
                                          ["L", n.x, n.y],
                                      ])),
                                h
                            );
                        }
                        function L() {
                            let t = this.constructor.prototype;
                            t.getOffset.call(this),
                                (this.chart.axisOffset[this.side] = 0);
                        }
                        function k(t, e, i) {
                            let s = this.chart,
                                o = (t) => {
                                    if ("string" == typeof t) {
                                        let e = parseInt(t, 10);
                                        return (
                                            d.test(t) && (e = (e * n) / 100), e
                                        );
                                    }
                                    return t;
                                },
                                a = this.center,
                                r = this.startAngleRad,
                                n = a[2] / 2,
                                l = Math.min(this.offset, 0),
                                h = this.left || 0,
                                p = this.top || 0,
                                d = /%$/,
                                c = this.isCircular,
                                u,
                                f,
                                b,
                                m,
                                y,
                                x,
                                P = g(o(i.outerRadius), n),
                                S = o(i.innerRadius),
                                M = g(o(i.thickness), 10);
                            if (
                                "polygon" === this.options.gridLineInterpolation
                            )
                                x = this.getPlotLinePath({ value: t }).concat(
                                    this.getPlotLinePath({
                                        value: e,
                                        reverse: !0,
                                    })
                                );
                            else {
                                (t = Math.max(t, this.min)),
                                    (e = Math.min(e, this.max));
                                let o = this.translate(t),
                                    n = this.translate(e);
                                c || ((P = o || 0), (S = n || 0)),
                                    "circle" !== i.shape && c
                                        ? ((u = r + (o || 0)),
                                          (f = r + (n || 0)))
                                        : ((u = -Math.PI / 2),
                                          (f = 1.5 * Math.PI),
                                          (y = !0)),
                                    (P -= l),
                                    (M -= l),
                                    (x = s.renderer.symbols.arc(
                                        h + a[0],
                                        p + a[1],
                                        P,
                                        P,
                                        {
                                            start: Math.min(u, f),
                                            end: Math.max(u, f),
                                            innerR: g(S, P - M),
                                            open: y,
                                        }
                                    )),
                                    c &&
                                        ((b = (f + u) / 2),
                                        (m =
                                            h +
                                            a[0] +
                                            (a[2] / 2) * Math.cos(b)),
                                        (x.xBounds =
                                            b > -Math.PI / 2 && b < Math.PI / 2
                                                ? [m, s.plotWidth]
                                                : [0, m]),
                                        (x.yBounds = [
                                            p + a[1] + (a[2] / 2) * Math.sin(b),
                                        ]),
                                        (x.yBounds[0] +=
                                            (b > -Math.PI && b < 0) ||
                                            b > Math.PI
                                                ? -10
                                                : 10));
                            }
                            return x;
                        }
                        function v(t) {
                            let e = this.pane.center,
                                i = this.chart,
                                s = i.inverted,
                                o = t.reverse,
                                a = this.pane.options.background
                                    ? this.pane.options.background[0] ||
                                      this.pane.options.background
                                    : {},
                                r = a.innerRadius || "0%",
                                n = a.outerRadius || "100%",
                                l = e[0] + i.plotLeft,
                                h = e[1] + i.plotTop,
                                p = this.height,
                                d = t.isCrosshair,
                                c = e[3] / 2,
                                u = t.value,
                                g,
                                f,
                                m,
                                y,
                                x,
                                P,
                                S,
                                M,
                                L,
                                k = this.getPosition(u),
                                v = k.x,
                                C = k.y;
                            if (
                                (d &&
                                    ((u = (M = this.getCrosshairPosition(
                                        t,
                                        l,
                                        h
                                    ))[0]),
                                    (v = M[1]),
                                    (C = M[2])),
                                this.isCircular)
                            )
                                (f = Math.sqrt(
                                    Math.pow(v - l, 2) + Math.pow(C - h, 2)
                                )),
                                    (m =
                                        "string" == typeof r ? b(r, 1) : r / f),
                                    (y =
                                        "string" == typeof n ? b(n, 1) : n / f),
                                    e &&
                                        c &&
                                        (m < (g = c / f) && (m = g),
                                        y < g && (y = g)),
                                    (L = [
                                        ["M", l + m * (v - l), h - m * (h - C)],
                                        [
                                            "L",
                                            v - (1 - y) * (v - l),
                                            C + (1 - y) * (h - C),
                                        ],
                                    ]);
                            else if (
                                ((u = this.translate(u)) &&
                                    (u < 0 || u > p) &&
                                    (u = 0),
                                "circle" === this.options.gridLineInterpolation)
                            )
                                L = this.getLinePath(0, u, c);
                            else if (
                                ((L = []),
                                i[s ? "yAxis" : "xAxis"].forEach((t) => {
                                    t.pane === this.pane && (x = t);
                                }),
                                x)
                            ) {
                                (S = x.tickPositions),
                                    x.autoConnect && (S = S.concat([S[0]])),
                                    o && (S = S.slice().reverse()),
                                    u && (u += c);
                                for (let t = 0; t < S.length; t++)
                                    (P = x.getPosition(S[t], u)),
                                        L.push(
                                            t
                                                ? ["L", P.x, P.y]
                                                : ["M", P.x, P.y]
                                        );
                            }
                            return L;
                        }
                        function C(t, e) {
                            let i = this.translate(t);
                            return this.postTranslate(
                                this.isCircular ? i : this.angleRad,
                                g(
                                    this.isCircular ? e : i < 0 ? 0 : i,
                                    this.center[2] / 2
                                ) - this.offset
                            );
                        }
                        function w() {
                            let t = this.center,
                                e = this.chart,
                                i = this.options.title;
                            return {
                                x: e.plotLeft + t[0] + (i.x || 0),
                                y:
                                    e.plotTop +
                                    t[1] -
                                    { high: 0.5, middle: 0.25, low: 0 }[
                                        i.align
                                    ] *
                                        t[2] +
                                    (i.y || 0),
                            };
                        }
                        function A(t) {
                            (t.beforeSetTickPositions = y),
                                (t.createLabelCollector = x),
                                (t.getCrosshairPosition = S),
                                (t.getLinePath = M),
                                (t.getOffset = L),
                                (t.getPlotBandPath = k),
                                (t.getPlotLinePath = v),
                                (t.getPosition = C),
                                (t.getTitlePosition = w),
                                (t.postTranslate = D),
                                (t.setAxisSize = B),
                                (t.setAxisTranslation = z),
                                (t.setOptions = O);
                        }
                        function N() {
                            let t = this.chart,
                                e = this.options,
                                i = t.angular && this.isXAxis,
                                s = this.pane,
                                o = s && s.options;
                            if (!i && s && (t.angular || t.polar)) {
                                let t = 2 * Math.PI,
                                    i =
                                        ((g(o.startAngle, 0) - 90) * Math.PI) /
                                        180,
                                    s =
                                        ((g(
                                            o.endAngle,
                                            g(o.startAngle, 0) + 360
                                        ) -
                                            90) *
                                            Math.PI) /
                                        180;
                                (this.angleRad =
                                    ((e.angle || 0) * Math.PI) / 180),
                                    (this.startAngleRad = i),
                                    (this.endAngleRad = s),
                                    (this.offset = e.offset || 0);
                                let a = ((i % t) + t) % t,
                                    r = ((s % t) + t) % t;
                                a > Math.PI && (a -= t),
                                    r > Math.PI && (r -= t),
                                    (this.normalizedStartAngleRad = a),
                                    (this.normalizedEndAngleRad = r);
                            }
                        }
                        function T(t) {
                            this.isRadial &&
                                ((t.align = void 0), t.preventDefault());
                        }
                        function X() {
                            if (this.chart && this.chart.labelCollectors) {
                                let t = this.labelCollector
                                    ? this.chart.labelCollectors.indexOf(
                                          this.labelCollector
                                      )
                                    : -1;
                                t >= 0 &&
                                    this.chart.labelCollectors.splice(t, 1);
                            }
                        }
                        function Y(t) {
                            let e;
                            let i = this.chart,
                                s = (i.inverted, i.angular),
                                o = i.polar,
                                a = this.isXAxis,
                                n = this.coll,
                                l = t.userOptions.pane || 0,
                                h = (this.pane = i.pane && i.pane[l]);
                            if ("colorAxis" === n) {
                                this.isRadial = !1;
                                return;
                            }
                            s
                                ? (s && a
                                      ? ((this.isHidden = !0),
                                        (this.createLabelCollector = P),
                                        (this.getOffset = r),
                                        (this.redraw = E),
                                        (this.render = E),
                                        (this.setScale = r),
                                        (this.setCategories = r),
                                        (this.setTitle = r))
                                      : A(this),
                                  (e = !a))
                                : o && (A(this), (e = this.horiz)),
                                s || o
                                    ? ((this.isRadial = !0),
                                      this.labelCollector ||
                                          (this.labelCollector =
                                              this.createLabelCollector()),
                                      this.labelCollector &&
                                          i.labelCollectors.push(
                                              this.labelCollector
                                          ))
                                    : (this.isRadial = !1),
                                h && e && (h.axis = this),
                                (this.isCircular = e);
                        }
                        function R() {
                            this.isRadial && this.beforeSetTickPositions();
                        }
                        function I(t) {
                            let e = this.label;
                            if (!e) return;
                            let i = this.axis,
                                s = e.getBBox(),
                                o = i.options.labels,
                                a =
                                    (((i.translate(this.pos) +
                                        i.startAngleRad +
                                        Math.PI / 2) /
                                        Math.PI) *
                                        180) %
                                    360,
                                r = Math.round(a),
                                n = h(o.y) ? 0 : -(0.3 * s.height),
                                l = o.y,
                                p,
                                d = 20,
                                c = o.align,
                                u = "end",
                                f = r < 0 ? r + 360 : r,
                                m = f,
                                y = 0,
                                x = 0;
                            i.isRadial &&
                                ((p = i.getPosition(
                                    this.pos,
                                    i.center[2] / 2 +
                                        b(
                                            g(o.distance, -25),
                                            i.center[2] / 2,
                                            -i.center[2] / 2
                                        )
                                )),
                                "auto" === o.rotation
                                    ? e.attr({ rotation: a })
                                    : h(l) ||
                                      (l =
                                          i.chart.renderer.fontMetrics(e).b -
                                          s.height / 2),
                                h(c) ||
                                    (i.isCircular
                                        ? (s.width >
                                              (i.len * i.tickInterval) /
                                                  (i.max - i.min) && (d = 0),
                                          (c =
                                              a > d && a < 180 - d
                                                  ? "left"
                                                  : a > 180 + d && a < 360 - d
                                                  ? "right"
                                                  : "center"))
                                        : (c = "center"),
                                    e.attr({ align: c })),
                                "auto" === c &&
                                    2 === i.tickPositions.length &&
                                    i.isCircular &&
                                    (f > 90 && f < 180
                                        ? (f = 180 - f)
                                        : f > 270 && f <= 360 && (f = 540 - f),
                                    m > 180 && m <= 360 && (m = 360 - m),
                                    (i.pane.options.startAngle === r ||
                                        i.pane.options.startAngle === r + 360 ||
                                        i.pane.options.startAngle ===
                                            r - 360) &&
                                        (u = "start"),
                                    (c =
                                        (r >= -90 && r <= 90) ||
                                        (r >= -360 && r <= -270) ||
                                        (r >= 270 && r <= 360)
                                            ? "start" === u
                                                ? "right"
                                                : "left"
                                            : "start" === u
                                            ? "left"
                                            : "right"),
                                    m > 70 && m < 110 && (c = "center"),
                                    f < 15 || (f >= 180 && f < 195)
                                        ? (y = 0.3 * s.height)
                                        : f >= 15 && f <= 35
                                        ? (y =
                                              "start" === u
                                                  ? 0
                                                  : 0.75 * s.height)
                                        : f >= 195 && f <= 215
                                        ? (y =
                                              "start" === u
                                                  ? 0.75 * s.height
                                                  : 0)
                                        : f > 35 && f <= 90
                                        ? (y =
                                              "start" === u
                                                  ? -(0.25 * s.height)
                                                  : s.height)
                                        : f > 215 &&
                                          f <= 270 &&
                                          (y =
                                              "start" === u
                                                  ? s.height
                                                  : -(0.25 * s.height)),
                                    m < 15
                                        ? (x =
                                              "start" === u
                                                  ? -(0.15 * s.height)
                                                  : 0.15 * s.height)
                                        : m > 165 &&
                                          m <= 180 &&
                                          (x =
                                              "start" === u
                                                  ? 0.15 * s.height
                                                  : -(0.15 * s.height)),
                                    e.attr({ align: c }),
                                    e.translate(x, y + n)),
                                (t.pos.x = p.x + (o.x || 0)),
                                (t.pos.y = p.y + (l || 0)));
                        }
                        function j(t) {
                            this.axis.getPosition &&
                                p(t.pos, this.axis.getPosition(this.pos));
                        }
                        function D(t, e) {
                            let i = this.chart,
                                s = this.center;
                            return (
                                (t = this.startAngleRad + t),
                                {
                                    x: i.plotLeft + s[0] + Math.cos(t) * e,
                                    y: i.plotTop + s[1] + Math.sin(t) * e,
                                }
                            );
                        }
                        function E() {
                            this.isDirty = !1;
                        }
                        function B() {
                            let t, e;
                            let i = this.constructor.prototype;
                            i.setAxisSize.call(this),
                                this.isRadial &&
                                    (this.pane.updateCenter(this),
                                    (t = this.center =
                                        this.pane.center.slice()),
                                    this.isCircular
                                        ? (this.sector =
                                              this.endAngleRad -
                                              this.startAngleRad)
                                        : ((e = this.postTranslate(
                                              this.angleRad,
                                              t[3] / 2
                                          )),
                                          (t[0] = e.x - this.chart.plotLeft),
                                          (t[1] = e.y - this.chart.plotTop)),
                                    (this.len =
                                        this.width =
                                        this.height =
                                            ((t[2] - t[3]) *
                                                g(this.sector, 1)) /
                                            2));
                        }
                        function z() {
                            let t = this.constructor.prototype;
                            t.setAxisTranslation.call(this),
                                this.center &&
                                    (this.isCircular
                                        ? (this.transA =
                                              (this.endAngleRad -
                                                  this.startAngleRad) /
                                              (this.max - this.min || 1))
                                        : (this.transA =
                                              (this.center[2] -
                                                  this.center[3]) /
                                              2 /
                                              (this.max - this.min || 1)),
                                    this.isXAxis
                                        ? (this.minPixelPadding =
                                              this.transA * this.minPointOffset)
                                        : (this.minPixelPadding = 0));
                        }
                        function O(t) {
                            let { coll: a } = this,
                                {
                                    angular: r,
                                    inverted: n,
                                    polar: l,
                                } = this.chart,
                                h = {};
                            r
                                ? this.isXAxis || (h = u(o.yAxis, i))
                                : l &&
                                  (h = this.horiz
                                      ? u(o.xAxis, e)
                                      : u(
                                            "xAxis" === a ? o.xAxis : o.yAxis,
                                            s
                                        )),
                                n &&
                                    "yAxis" === a &&
                                    ((h.stackLabels = c(o.yAxis, !0)
                                        ? o.yAxis.stackLabels
                                        : {}),
                                    (h.reversedStacks = !0));
                            let p = (this.options = u(h, t));
                            p.plotBands || (p.plotBands = []),
                                d(this, "afterSetOptions");
                        }
                        function W(t, e, i, s, o, a, r) {
                            let n;
                            let l = this.axis;
                            return l.isRadial
                                ? [
                                      "M",
                                      e,
                                      i,
                                      "L",
                                      (n = l.getPosition(
                                          this.pos,
                                          l.center[2] / 2 + s
                                      )).x,
                                      n.y,
                                  ]
                                : t.call(this, e, i, s, o, a, r);
                        }
                        t.compose = function t(e, i) {
                            return (
                                f(a, t) &&
                                    (n(e, "afterInit", N),
                                    n(e, "autoLabelAlign", T),
                                    n(e, "destroy", X),
                                    n(e, "init", Y),
                                    n(e, "initialAxisTranslation", R),
                                    n(i, "afterGetLabelPosition", I),
                                    n(i, "afterGetPosition", j),
                                    m(i.prototype, "getMarkPath", W)),
                                e
                            );
                        };
                    })(s || (s = {})),
                    s
                );
            }
        ),
        i(
            e,
            "Series/PolarComposition.js",
            [
                e["Core/Animation/AnimationUtilities.js"],
                e["Core/Globals.js"],
                e["Core/Series/Series.js"],
                e["Extensions/Pane/Pane.js"],
                e["Core/Axis/RadialAxis.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, o, a) {
                let { animObject: r } = t,
                    { composed: n } = e,
                    {
                        addEvent: l,
                        defined: h,
                        find: p,
                        isNumber: d,
                        merge: c,
                        pick: u,
                        pushUnique: g,
                        relativeLength: f,
                        splat: b,
                        uniqueKey: m,
                        wrap: y,
                    } = a;
                function x() {
                    (this.pane || []).forEach((t) => {
                        t.render();
                    });
                }
                function P(t) {
                    let e = t.args[0].xAxis,
                        i = t.args[0].yAxis,
                        s = t.args[0].chart;
                    e &&
                        i &&
                        ("polygon" === i.gridLineInterpolation
                            ? ((e.startOnTick = !0), (e.endOnTick = !0))
                            : "polygon" === e.gridLineInterpolation &&
                              s.inverted &&
                              ((i.startOnTick = !0), (i.endOnTick = !0)));
                }
                function S() {
                    this.pane || (this.pane = []),
                        (this.options.pane = b(this.options.pane)),
                        this.options.pane.forEach((t) => {
                            new s(t, this);
                        }, this);
                }
                function M(t) {
                    let e = t.args.marker,
                        i = this.chart.xAxis[0],
                        s = this.chart.yAxis[0],
                        o = this.chart.inverted,
                        a = o ? s : i,
                        r = o ? i : s;
                    if (this.chart.polar) {
                        t.preventDefault();
                        let i =
                                (e.attr ? e.attr("start") : e.start) -
                                a.startAngleRad,
                            s = e.attr ? e.attr("r") : e.r,
                            o =
                                (e.attr ? e.attr("end") : e.end) -
                                a.startAngleRad,
                            n = e.attr ? e.attr("innerR") : e.innerR;
                        (t.result.x = i + a.pos),
                            (t.result.width = o - i),
                            (t.result.y = r.len + r.pos - n),
                            (t.result.height = n - s);
                    }
                }
                function L(t) {
                    let e = this.chart;
                    if (e.polar && e.hoverPane && e.hoverPane.axis) {
                        t.preventDefault();
                        let i = e.hoverPane.center,
                            s = this.mouseDownX || 0,
                            o = this.mouseDownY || 0,
                            a = t.args.chartY,
                            r = t.args.chartX,
                            n = 2 * Math.PI,
                            l = e.hoverPane.axis.startAngleRad,
                            h = e.hoverPane.axis.endAngleRad,
                            p = e.inverted ? e.xAxis[0] : e.yAxis[0],
                            d = {},
                            c = "arc";
                        if (
                            ((d.x = i[0] + e.plotLeft),
                            (d.y = i[1] + e.plotTop),
                            this.zoomHor)
                        ) {
                            let t = l > 0 ? h - l : Math.abs(l) + Math.abs(h),
                                u =
                                    Math.atan2(
                                        o - e.plotTop - i[1],
                                        s - e.plotLeft - i[0]
                                    ) - l,
                                g =
                                    Math.atan2(
                                        a - e.plotTop - i[1],
                                        r - e.plotLeft - i[0]
                                    ) - l;
                            if (
                                ((d.r = i[2] / 2),
                                (d.innerR = i[3] / 2),
                                u <= 0 && (u += n),
                                g <= 0 && (g += n),
                                g < u && (g = [u, (u = g)][0]),
                                t < n)
                            ) {
                                let e = h + (n - t) / 2;
                                l + g > e && ((g = u), (u = l <= 0 ? l : 0));
                            }
                            let f = (d.start = Math.max(u + l, l)),
                                b = (d.end = Math.min(g + l, h));
                            if ("polygon" === p.options.gridLineInterpolation) {
                                let t = e.hoverPane.axis,
                                    s =
                                        (t.tickInterval,
                                        f - t.startAngleRad + t.pos),
                                    o = p.getPlotLinePath({ value: p.max }),
                                    a = t.toValue(s),
                                    r = t.toValue(s + (b - f));
                                if (a < t.getExtremes().min) {
                                    let { min: e, max: i } = t.getExtremes();
                                    a = i - (e - a);
                                }
                                if (r < t.getExtremes().min) {
                                    let { min: e, max: i } = t.getExtremes();
                                    r = i - (e - r);
                                }
                                r < a && (r = [a, (a = r)][0]),
                                    (o = w(o, a, r, t)).push([
                                        "L",
                                        i[0] + e.plotLeft,
                                        e.plotTop + i[1],
                                    ]),
                                    (d.d = o),
                                    (c = "path");
                            }
                        }
                        if (this.zoomVert) {
                            let t = e.inverted ? e.xAxis[0] : e.yAxis[0],
                                n = Math.sqrt(
                                    Math.pow(s - e.plotLeft - i[0], 2) +
                                        Math.pow(o - e.plotTop - i[1], 2)
                                ),
                                p = Math.sqrt(
                                    Math.pow(r - e.plotLeft - i[0], 2) +
                                        Math.pow(a - e.plotTop - i[1], 2)
                                );
                            if (
                                (p < n && (n = [p, (p = n)][0]),
                                p > i[2] / 2 && (p = i[2] / 2),
                                n < i[3] / 2 && (n = i[3] / 2),
                                this.zoomHor || ((d.start = l), (d.end = h)),
                                (d.r = p),
                                (d.innerR = n),
                                "polygon" === t.options.gridLineInterpolation)
                            ) {
                                let e = t.toValue(t.len + t.pos - n),
                                    i = t.toValue(t.len + t.pos - p),
                                    s = t
                                        .getPlotLinePath({ value: i })
                                        .concat(
                                            t.getPlotLinePath({
                                                value: e,
                                                reverse: !0,
                                            })
                                        );
                                (d.d = s), (c = "path");
                            }
                        }
                        if (
                            this.zoomHor &&
                            this.zoomVert &&
                            "polygon" === p.options.gridLineInterpolation
                        ) {
                            let t = e.hoverPane.axis,
                                i = d.start || 0,
                                s = d.end || 0,
                                o = i - t.startAngleRad + t.pos,
                                a = t.toValue(o),
                                r = t.toValue(o + (s - i));
                            if (d.d instanceof Array) {
                                let t = d.d.slice(0, d.d.length / 2),
                                    i = d.d.slice(d.d.length / 2, d.d.length);
                                i = [...i].reverse();
                                let s = e.hoverPane.axis;
                                (t = w(t, a, r, s)),
                                    (i = w(i, a, r, s)) && (i[0][0] = "L"),
                                    (i = [...i].reverse()),
                                    (d.d = t.concat(i)),
                                    (c = "path");
                            }
                        }
                        (t.attrs = d), (t.shapeType = c);
                    }
                }
                function k() {
                    let t = this.chart;
                    t.polar &&
                        ((this.polar = new E(this)),
                        t.inverted &&
                            ((this.isRadialSeries = !0),
                            this.is("column") && (this.isRadialBar = !0)));
                }
                function v() {
                    if (this.chart.polar && this.xAxis) {
                        let { xAxis: t, yAxis: i } = this,
                            s = this.chart;
                        (this.kdByAngle = s.tooltip && s.tooltip.shared),
                            this.kdByAngle || s.inverted
                                ? (this.searchPoint = C)
                                : (this.options.findNearestPointBy = "xy");
                        let o = this.points,
                            a = o.length;
                        for (; a--; )
                            this.is("column") ||
                                this.is("columnrange") ||
                                this.polar.toXY(o[a]),
                                s.hasParallelCoordinates ||
                                    this.yAxis.reversed ||
                                    (u(o[a].y, Number.MIN_VALUE) < i.min ||
                                    o[a].x < t.min ||
                                    o[a].x > t.max
                                        ? ((o[a].isNull = !0),
                                          (o[a].plotY = NaN))
                                        : (o[a].isNull =
                                              o[a].isValid && !o[a].isValid()));
                        this.hasClipCircleSetter ||
                            (this.hasClipCircleSetter =
                                !!this.eventsToUnbind.push(
                                    l(this, "afterRender", function () {
                                        let t;
                                        s.polar &&
                                            !1 !== this.options.clip &&
                                            ((t = this.yAxis.pane.center),
                                            this.clipCircle
                                                ? this.clipCircle.animate({
                                                      x: t[0],
                                                      y: t[1],
                                                      r: t[2] / 2,
                                                      innerR: t[3] / 2,
                                                  })
                                                : (this.clipCircle = (function (
                                                      t,
                                                      e,
                                                      i,
                                                      s,
                                                      o
                                                  ) {
                                                      let a = m(),
                                                          r = t
                                                              .createElement(
                                                                  "clipPath"
                                                              )
                                                              .attr({ id: a })
                                                              .add(t.defs),
                                                          n = o
                                                              ? t
                                                                    .arc(
                                                                        e,
                                                                        i,
                                                                        s,
                                                                        o,
                                                                        0,
                                                                        2 *
                                                                            Math.PI
                                                                    )
                                                                    .add(r)
                                                              : t
                                                                    .circle(
                                                                        e,
                                                                        i,
                                                                        s
                                                                    )
                                                                    .add(r);
                                                      return (
                                                          (n.id = a),
                                                          (n.clipPath = r),
                                                          n
                                                      );
                                                  })(
                                                      s.renderer,
                                                      t[0],
                                                      t[1],
                                                      t[2] / 2,
                                                      t[3] / 2
                                                  )),
                                            this.group.clip(this.clipCircle),
                                            (this.setClip = e.noop));
                                    })
                                ));
                    }
                }
                function C(t) {
                    let e = this.chart,
                        i = this.xAxis,
                        s = this.yAxis,
                        o = i.pane && i.pane.center,
                        a = t.chartX - ((o && o[0]) || 0) - e.plotLeft,
                        r = t.chartY - ((o && o[1]) || 0) - e.plotTop,
                        n = e.inverted
                            ? {
                                  clientX: t.chartX - s.pos,
                                  plotY: t.chartY - i.pos,
                              }
                            : {
                                  clientX:
                                      180 + Math.atan2(a, r) * (-180 / Math.PI),
                              };
                    return this.searchKDTree(n);
                }
                function w(t, e, i, s) {
                    let o = s.tickInterval,
                        a = s.tickPositions,
                        r = p(a, (t) => t >= i),
                        n = p([...a].reverse(), (t) => t <= e);
                    return (
                        h(r) || (r = a[a.length - 1]),
                        h(n) ||
                            ((n = a[0]),
                            (r += o),
                            (t[0][0] = "L"),
                            t.unshift(t[t.length - 3])),
                        ((t = t.slice(a.indexOf(n), a.indexOf(r) + 1))[0][0] =
                            "M"),
                        t
                    );
                }
                function A(t, e) {
                    return (
                        p(this.pane || [], (t) => t.options.id === e) ||
                        t.call(this, e)
                    );
                }
                function N(t, e, s, o, a, r) {
                    let n, l, h;
                    let p = this.chart,
                        d = u(o.inside, !!this.options.stacking);
                    if (p.polar) {
                        if (((n = (e.rectPlotX / Math.PI) * 180), p.inverted))
                            (this.forceDL = p.isInsidePlot(e.plotX, e.plotY)),
                                d && e.shapeArgs
                                    ? ((l = e.shapeArgs),
                                      (a = c(a, {
                                          x:
                                              (h = this.yAxis.postTranslate(
                                                  ((l.start || 0) +
                                                      (l.end || 0)) /
                                                      2 -
                                                      this.xAxis.startAngleRad,
                                                  e.barX + e.pointWidth / 2
                                              )).x - p.plotLeft,
                                          y: h.y - p.plotTop,
                                      })))
                                    : e.tooltipPos &&
                                      (a = c(a, {
                                          x: e.tooltipPos[0],
                                          y: e.tooltipPos[1],
                                      })),
                                (o.align = u(o.align, "center")),
                                (o.verticalAlign = u(
                                    o.verticalAlign,
                                    "middle"
                                ));
                        else {
                            var g;
                            null === (g = o).align &&
                                (g.align =
                                    n > 20 && n < 160
                                        ? "left"
                                        : n > 200 && n < 340
                                        ? "right"
                                        : "center"),
                                null === g.verticalAlign &&
                                    (g.verticalAlign =
                                        n < 45 || n > 315
                                            ? "bottom"
                                            : n > 135 && n < 225
                                            ? "top"
                                            : "middle"),
                                (o = g);
                        }
                        i.prototype.alignDataLabel.call(this, e, s, o, a, r),
                            this.isRadialBar &&
                            e.shapeArgs &&
                            e.shapeArgs.start === e.shapeArgs.end
                                ? s.hide()
                                : s.show();
                    } else t.call(this, e, s, o, a, r);
                }
                function T() {
                    let t = this.options,
                        e = t.stacking,
                        i = this.chart,
                        s = this.xAxis,
                        o = this.yAxis,
                        r = o.reversed,
                        n = o.center,
                        l = s.startAngleRad,
                        p = s.endAngleRad,
                        c = p - l,
                        u = t.threshold,
                        g = 0,
                        b,
                        m,
                        y,
                        x,
                        P,
                        S = 0,
                        M = 0,
                        L,
                        k,
                        v,
                        C,
                        w,
                        A,
                        N,
                        T;
                    if (s.isRadial)
                        for (
                            y = (b = this.points).length,
                                x = o.translate(o.min),
                                P = o.translate(o.max),
                                u = t.threshold || 0,
                                i.inverted &&
                                    d(u) &&
                                    h((g = o.translate(u))) &&
                                    (g < 0 ? (g = 0) : g > c && (g = c),
                                    (this.translatedThreshold = g + l));
                            y--;

                        ) {
                            if (
                                ((A = (m = b[y]).barX),
                                (k = m.x),
                                (v = m.y),
                                (m.shapeType = "arc"),
                                i.inverted)
                            ) {
                                (m.plotY = o.translate(v)),
                                    e && o.stacking
                                        ? ((w =
                                              o.stacking.stacks[
                                                  (v < 0 ? "-" : "") +
                                                      this.stackKey
                                              ]),
                                          this.visible &&
                                              w &&
                                              w[k] &&
                                              !m.isNull &&
                                              ((C =
                                                  w[k].points[
                                                      this.getStackIndicator(
                                                          void 0,
                                                          k,
                                                          this.index
                                                      ).key
                                                  ]),
                                              (S = o.translate(C[0])),
                                              (M = o.translate(C[1])),
                                              h(S) && (S = a.clamp(S, 0, c))))
                                        : ((S = g), (M = m.plotY)),
                                    S > M && (M = [S, (S = M)][0]),
                                    r
                                        ? M > x
                                            ? (M = x)
                                            : S < P
                                            ? (S = P)
                                            : (S > x || M < P) && (S = M = c)
                                        : S < x
                                        ? (S = x)
                                        : M > P
                                        ? (M = P)
                                        : (M < x || S > P) && (S = M = 0),
                                    o.min > o.max && (S = M = r ? c : 0),
                                    (S += l),
                                    (M += l),
                                    n && (m.barX = A += n[3] / 2),
                                    (N = Math.max(A, 0)),
                                    (T = Math.max(A + m.pointWidth, 0));
                                let i = t.borderRadius,
                                    s = "object" == typeof i ? i.radius : i,
                                    p = f(s || 0, T - N);
                                (m.shapeArgs = {
                                    x: n[0],
                                    y: n[1],
                                    r: T,
                                    innerR: N,
                                    start: S,
                                    end: M,
                                    borderRadius: p,
                                }),
                                    (m.opacity = S === M ? 0 : void 0),
                                    (m.plotY =
                                        (h(this.translatedThreshold) &&
                                            (S < this.translatedThreshold
                                                ? S
                                                : M)) - l);
                            } else
                                (S = A + l),
                                    (m.shapeArgs = this.polar.arc(
                                        m.yBottom,
                                        m.plotY,
                                        S,
                                        S + m.pointWidth
                                    )),
                                    (m.shapeArgs.borderRadius = 0);
                            this.polar.toXY(m),
                                i.inverted
                                    ? ((L = o.postTranslate(
                                          m.rectPlotY,
                                          A + m.pointWidth / 2
                                      )),
                                      (m.tooltipPos = [
                                          L.x - i.plotLeft,
                                          L.y - i.plotTop,
                                      ]))
                                    : (m.tooltipPos = [m.plotX, m.plotY]),
                                n && (m.ttBelow = m.plotY > n[1]);
                        }
                }
                function X(t, e) {
                    let i, s;
                    let o = this;
                    if (this.chart.polar) {
                        e = e || this.points;
                        for (let t = 0; t < e.length; t++)
                            if (!e[t].isNull) {
                                i = t;
                                break;
                            }
                        !1 !== this.options.connectEnds &&
                            void 0 !== i &&
                            ((this.connectEnds = !0),
                            e.splice(e.length, 0, e[i]),
                            (s = !0)),
                            e.forEach((t) => {
                                void 0 === t.polarPlotY && o.polar.toXY(t);
                            });
                    }
                    let a = t.apply(this, [].slice.call(arguments, 1));
                    return s && e.pop(), a;
                }
                function Y(t, e) {
                    let i = this.chart,
                        s = { xAxis: [], yAxis: [] };
                    return (
                        i.polar
                            ? i.axes.forEach((t) => {
                                  if ("colorAxis" === t.coll) return;
                                  let o = t.isXAxis,
                                      a = t.center,
                                      r = e.chartX - a[0] - i.plotLeft,
                                      n = e.chartY - a[1] - i.plotTop;
                                  s[o ? "xAxis" : "yAxis"].push({
                                      axis: t,
                                      value: t.translate(
                                          o
                                              ? Math.PI - Math.atan2(r, n)
                                              : Math.sqrt(
                                                    Math.pow(r, 2) +
                                                        Math.pow(n, 2)
                                                ),
                                          !0
                                      ),
                                  });
                              })
                            : (s = t.call(this, e)),
                        s
                    );
                }
                function R(t, e) {
                    this.chart.polar || t.call(this, e);
                }
                function I(t, i) {
                    let s = this,
                        o = this.chart,
                        a = this.group,
                        n = this.markerGroup,
                        l = this.xAxis && this.xAxis.center,
                        h = o.plotLeft,
                        p = o.plotTop,
                        d = this.options.animation,
                        c,
                        g,
                        f,
                        b,
                        m,
                        y;
                    o.polar
                        ? s.isRadialBar
                            ? i ||
                              ((s.startAngleRad = u(
                                  s.translatedThreshold,
                                  s.xAxis.startAngleRad
                              )),
                              e.seriesTypes.pie.prototype.animate.call(s, i))
                            : ((d = r(d)),
                              s.is("column")
                                  ? i ||
                                    ((g = l[3] / 2),
                                    s.points.forEach((t) => {
                                        (f = t.graphic),
                                            (m = (b = t.shapeArgs) && b.r),
                                            (y = b && b.innerR),
                                            f &&
                                                b &&
                                                (f.attr({ r: g, innerR: g }),
                                                f.animate(
                                                    { r: m, innerR: y },
                                                    s.options.animation
                                                ));
                                    }))
                                  : i
                                  ? ((c = {
                                        translateX: l[0] + h,
                                        translateY: l[1] + p,
                                        scaleX: 0.001,
                                        scaleY: 0.001,
                                    }),
                                    a.attr(c),
                                    n && n.attr(c))
                                  : ((c = {
                                        translateX: h,
                                        translateY: p,
                                        scaleX: 1,
                                        scaleY: 1,
                                    }),
                                    a.animate(c, d),
                                    n && n.animate(c, d)))
                        : t.call(this, i);
                }
                function j(t, e, i, s) {
                    let o, a;
                    if (this.chart.polar) {
                        if (s) {
                            a = (function t(e, i, s, o) {
                                let a, r, n, l, h, p;
                                let d = o ? 1 : 0;
                                a =
                                    i >= 0 && i <= e.length - 1
                                        ? i
                                        : i < 0
                                        ? e.length - 1 + i
                                        : 0;
                                let c = a - 1 < 0 ? e.length - (1 + d) : a - 1,
                                    u = a + 1 > e.length - 1 ? d : a + 1,
                                    g = e[c],
                                    f = e[u],
                                    b = g.plotX,
                                    m = g.plotY,
                                    y = f.plotX,
                                    x = f.plotY,
                                    P = e[a].plotX,
                                    S = e[a].plotY;
                                (r = (1.5 * P + b) / 2.5),
                                    (n = (1.5 * S + m) / 2.5),
                                    (l = (1.5 * P + y) / 2.5),
                                    (h = (1.5 * S + x) / 2.5);
                                let M = Math.sqrt(
                                        Math.pow(r - P, 2) + Math.pow(n - S, 2)
                                    ),
                                    L = Math.sqrt(
                                        Math.pow(l - P, 2) + Math.pow(h - S, 2)
                                    ),
                                    k = Math.atan2(n - S, r - P),
                                    v = Math.atan2(h - S, l - P);
                                (p = Math.PI / 2 + (k + v) / 2),
                                    Math.abs(k - p) > Math.PI / 2 &&
                                        (p -= Math.PI),
                                    (r = P + Math.cos(p) * M),
                                    (n = S + Math.sin(p) * M),
                                    (l = P + Math.cos(Math.PI + p) * L),
                                    (h = S + Math.sin(Math.PI + p) * L);
                                let C = {
                                    rightContX: l,
                                    rightContY: h,
                                    leftContX: r,
                                    leftContY: n,
                                    plotX: P,
                                    plotY: S,
                                };
                                return (
                                    s && (C.prevPointCont = t(e, c, !1, o)), C
                                );
                            })(e, s, !0, this.connectEnds);
                            let t =
                                    a.prevPointCont &&
                                    a.prevPointCont.rightContX,
                                i =
                                    a.prevPointCont &&
                                    a.prevPointCont.rightContY;
                            o = [
                                "C",
                                d(t) ? t : a.plotX,
                                d(i) ? i : a.plotY,
                                d(a.leftContX) ? a.leftContX : a.plotX,
                                d(a.leftContY) ? a.leftContY : a.plotY,
                                a.plotX,
                                a.plotY,
                            ];
                        } else o = ["M", i.plotX, i.plotY];
                    } else o = t.call(this, e, i, s);
                    return o;
                }
                function D(t, e, i = this.plotY) {
                    let { plotX: s, series: o } = this,
                        { chart: a } = o;
                    return a.polar && !this.destroyed && d(s) && d(i)
                        ? [s + (e ? a.plotLeft : 0), i + (e ? a.plotTop : 0)]
                        : t.call(this, e, i);
                }
                class E {
                    static compose(t, e, i, a, r, h, p, d, c, u) {
                        if (
                            (s.compose(e, i),
                            o.compose(t, r),
                            g(n, this.compose))
                        ) {
                            let t = e.prototype,
                                s = h.prototype,
                                o = i.prototype,
                                r = a.prototype;
                            if (
                                (l(e, "afterDrawChartBox", x),
                                l(e, "getAxes", S),
                                l(e, "init", P),
                                y(t, "get", A),
                                y(o, "getCoordinates", Y),
                                y(o, "pinch", R),
                                l(i, "getSelectionMarkerAttrs", L),
                                l(i, "getSelectionBox", M),
                                l(a, "afterInit", k),
                                l(a, "afterTranslate", v, { order: 2 }),
                                l(a, "afterColumnTranslate", T, { order: 4 }),
                                y(r, "animate", I),
                                y(s, "pos", D),
                                d)
                            ) {
                                let t = d.prototype;
                                y(t, "alignDataLabel", N), y(t, "animate", I);
                            }
                            if (c) {
                                let t = c.prototype;
                                y(t, "getGraphPath", X);
                            }
                            if (u) {
                                let t = u.prototype;
                                if ((y(t, "getPointSpline", j), p)) {
                                    let e = p.prototype;
                                    e.getPointSpline = t.getPointSpline;
                                }
                            }
                        }
                    }
                    constructor(t) {
                        this.series = t;
                    }
                    arc(t, e, i, s) {
                        let o = this.series,
                            a = o.xAxis.center,
                            r = o.yAxis.len,
                            n = a[3] / 2,
                            l = r - e + n,
                            h = r - u(t, r) + n;
                        return (
                            o.yAxis.reversed &&
                                (l < 0 && (l = n), h < 0 && (h = n)),
                            {
                                x: a[0],
                                y: a[1],
                                r: l,
                                innerR: h,
                                start: i,
                                end: s,
                            }
                        );
                    }
                    toXY(t) {
                        let e = this.series,
                            i = e.chart,
                            s = e.xAxis,
                            o = e.yAxis,
                            a = t.plotX,
                            r = i.inverted,
                            n = t.y,
                            l = t.plotY,
                            h = r ? a : o.len - l,
                            p;
                        if (
                            (r &&
                                e &&
                                !e.isRadialBar &&
                                (t.plotY = l = d(n) ? o.translate(n) : 0),
                            (t.rectPlotX = a),
                            (t.rectPlotY = l),
                            o.center && (h += o.center[3] / 2),
                            d(l))
                        ) {
                            let e = r
                                ? o.postTranslate(l, h)
                                : s.postTranslate(a, h);
                            (t.plotX = t.polarPlotX = e.x - i.plotLeft),
                                (t.plotY = t.polarPlotY = e.y - i.plotTop);
                        }
                        e.kdByAngle
                            ? ((p =
                                  ((a / Math.PI) * 180 +
                                      s.pane.options.startAngle) %
                                  360) < 0 && (p += 360),
                              (t.clientX = p))
                            : (t.clientX = t.plotX);
                    }
                }
                return E;
            }
        ),
        i(
            e,
            "Core/Axis/WaterfallAxis.js",
            [
                e["Core/Globals.js"],
                e["Core/Axis/Stacking/StackItem.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i) {
                var s;
                let { composed: o } = t,
                    { addEvent: a, objectEach: r, pushUnique: n } = i;
                return (
                    (function (t) {
                        function i() {
                            let t = this.waterfall.stacks;
                            t && ((t.changed = !1), delete t.alreadyChanged);
                        }
                        function s() {
                            let t = this.options.stackLabels;
                            t &&
                                t.enabled &&
                                this.waterfall.stacks &&
                                this.waterfall.renderStackTotals();
                        }
                        function l() {
                            this.waterfall || (this.waterfall = new p(this));
                        }
                        function h() {
                            let t = this.axes,
                                e = this.series;
                            for (let i of e)
                                if (i.options.stacking) {
                                    for (let e of t)
                                        e.isXAxis ||
                                            (e.waterfall.stacks.changed = !0);
                                    break;
                                }
                        }
                        t.compose = function t(e, r) {
                            n(o, t) &&
                                (a(e, "init", l),
                                a(e, "afterBuildStacks", i),
                                a(e, "afterRender", s),
                                a(r, "beforeRedraw", h));
                        };
                        class p {
                            constructor(t) {
                                (this.axis = t),
                                    (this.stacks = { changed: !1 });
                            }
                            renderStackTotals() {
                                let t = this.axis,
                                    i = t.waterfall.stacks,
                                    s =
                                        t.stacking &&
                                        t.stacking.stackTotalGroup,
                                    o = new e(
                                        t,
                                        t.options.stackLabels || {},
                                        !1,
                                        0,
                                        void 0
                                    );
                                (this.dummyStackItem = o),
                                    s &&
                                        r(i, (t) => {
                                            r(t, (t, i) => {
                                                (o.total = t.stackTotal),
                                                    (o.x = +i),
                                                    t.label &&
                                                        (o.label = t.label),
                                                    e.prototype.render.call(
                                                        o,
                                                        s
                                                    ),
                                                    (t.label = o.label),
                                                    delete o.label;
                                            });
                                        }),
                                    (o.total = null);
                            }
                        }
                        t.Composition = p;
                    })(s || (s = {})),
                    s
                );
            }
        ),
        i(
            e,
            "Series/Waterfall/WaterfallPoint.js",
            [
                e["Series/Column/ColumnSeries.js"],
                e["Core/Series/Point.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i) {
                let { isNumber: s } = i;
                class o extends t.prototype.pointClass {
                    getClassName() {
                        let t = e.prototype.getClassName.call(this);
                        return (
                            this.isSum
                                ? (t += " highcharts-sum")
                                : this.isIntermediateSum &&
                                  (t += " highcharts-intermediate-sum"),
                            t
                        );
                    }
                    isValid() {
                        return (
                            s(this.y) || this.isSum || !!this.isIntermediateSum
                        );
                    }
                }
                return o;
            }
        ),
        i(e, "Series/Waterfall/WaterfallSeriesDefaults.js", [], function () {
            return {
                dataLabels: { inside: !0 },
                lineWidth: 1,
                lineColor: "#333333",
                dashStyle: "Dot",
                borderColor: "#333333",
                states: { hover: { lineWidthPlus: 0 } },
            };
        }),
        i(
            e,
            "Series/Waterfall/WaterfallSeries.js",
            [
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Utilities.js"],
                e["Core/Axis/WaterfallAxis.js"],
                e["Series/Waterfall/WaterfallPoint.js"],
                e["Series/Waterfall/WaterfallSeriesDefaults.js"],
            ],
            function (t, e, i, s, o) {
                let { column: a, line: r } = t.seriesTypes,
                    {
                        addEvent: n,
                        arrayMax: l,
                        arrayMin: h,
                        correctFloat: p,
                        extend: d,
                        isNumber: c,
                        merge: u,
                        objectEach: g,
                        pick: f,
                    } = e;
                function b(t, e) {
                    return Object.hasOwnProperty.call(t, e);
                }
                class m extends a {
                    generatePoints() {
                        a.prototype.generatePoints.apply(this);
                        for (let t = 0, e = this.points.length; t < e; t++) {
                            let e = this.points[t],
                                i = this.processedYData[t];
                            c(i) &&
                                (e.isIntermediateSum || e.isSum) &&
                                (e.y = p(i));
                        }
                    }
                    processData(t) {
                        let e, i, s, o, a, r;
                        let n = this.options,
                            l = this.yData,
                            h = n.data,
                            d = l.length,
                            c = n.threshold || 0;
                        s = i = o = a = 0;
                        for (let t = 0; t < d; t++)
                            (r = l[t]),
                                (e = h && h[t] ? h[t] : {}),
                                "sum" === r || e.isSum
                                    ? (l[t] = p(s))
                                    : "intermediateSum" === r ||
                                      e.isIntermediateSum
                                    ? ((l[t] = p(i)), (i = 0))
                                    : ((s += r), (i += r)),
                                (o = Math.min(s, o)),
                                (a = Math.max(s, a));
                        super.processData.call(this, t),
                            n.stacking ||
                                ((this.dataMin = o + c), (this.dataMax = a));
                    }
                    toYData(t) {
                        return t.isSum
                            ? "sum"
                            : t.isIntermediateSum
                            ? "intermediateSum"
                            : t.y;
                    }
                    updateParallelArrays(t, e) {
                        super.updateParallelArrays.call(this, t, e),
                            ("sum" === this.yData[0] ||
                                "intermediateSum" === this.yData[0]) &&
                                (this.yData[0] = null);
                    }
                    pointAttribs(t, e) {
                        let i = this.options.upColor;
                        i &&
                            !t.options.color &&
                            c(t.y) &&
                            (t.color = t.y > 0 ? i : void 0);
                        let s = a.prototype.pointAttribs.call(this, t, e);
                        return delete s.dashstyle, s;
                    }
                    getGraphPath() {
                        return [["M", 0, 0]];
                    }
                    getCrispPath() {
                        let t = this.data.filter((t) => c(t.y)),
                            e = this.yAxis,
                            i = t.length,
                            s = (Math.round(this.graph.strokeWidth()) % 2) / 2,
                            o = (Math.round(this.borderWidth) % 2) / 2,
                            a = this.xAxis.reversed,
                            r = this.yAxis.reversed,
                            n = this.options.stacking,
                            l = [];
                        for (let h = 1; h < i; h++) {
                            if (
                                !(
                                    this.options.connectNulls ||
                                    c(this.data[t[h].index - 1].y)
                                )
                            )
                                continue;
                            let i = t[h].box,
                                p = t[h - 1],
                                d = p.y || 0,
                                u = t[h - 1].box;
                            if (!i || !u) continue;
                            let g = e.waterfall.stacks[this.stackKey],
                                f = d > 0 ? -u.height : 0;
                            if (g && u && i) {
                                let t;
                                let d = g[h - 1];
                                if (n) {
                                    let i = d.connectorThreshold;
                                    t =
                                        Math.round(
                                            e.translate(i, !1, !0, !1, !0) +
                                                (r ? f : 0)
                                        ) - s;
                                } else t = u.y + p.minPointLengthOffset + o - s;
                                l.push(
                                    [
                                        "M",
                                        (u.x || 0) + (a ? 0 : u.width || 0),
                                        t,
                                    ],
                                    ["L", (i.x || 0) + ((a && i.width) || 0), t]
                                );
                            }
                            if (
                                u &&
                                l.length &&
                                ((!n && d < 0 && !r) || (d > 0 && r))
                            ) {
                                let t = l[l.length - 2];
                                t &&
                                    "number" == typeof t[2] &&
                                    (t[2] += u.height || 0);
                                let e = l[l.length - 1];
                                e &&
                                    "number" == typeof e[2] &&
                                    (e[2] += u.height || 0);
                            }
                        }
                        return l;
                    }
                    drawGraph() {
                        r.prototype.drawGraph.call(this),
                            this.graph &&
                                this.graph.attr({ d: this.getCrispPath() });
                    }
                    setStackedPoints(t) {
                        let e = this.options,
                            i = t.waterfall?.stacks,
                            s = e.threshold || 0,
                            o = this.stackKey,
                            a = this.xData,
                            r = a.length,
                            n = s,
                            l = n,
                            h,
                            p = 0,
                            d = 0,
                            c = 0,
                            u,
                            g,
                            f,
                            b,
                            m,
                            y,
                            x,
                            P,
                            S = (t, e, i, s) => {
                                if (h) {
                                    if (u)
                                        for (; i < u; i++) h.stackState[i] += s;
                                    else
                                        (h.stackState[0] = t),
                                            (u = h.stackState.length);
                                    h.stackState.push(h.stackState[u - 1] + e);
                                }
                            };
                        if (t.stacking && i && this.reserveSpace()) {
                            (P = i.changed),
                                (x = i.alreadyChanged) &&
                                    0 > x.indexOf(o) &&
                                    (P = !0),
                                i[o] || (i[o] = {});
                            let t = i[o];
                            if (t)
                                for (let i = 0; i < r; i++)
                                    (!t[(y = a[i])] || P) &&
                                        (t[y] = {
                                            negTotal: 0,
                                            posTotal: 0,
                                            stackTotal: 0,
                                            threshold: 0,
                                            stateIndex: 0,
                                            stackState: [],
                                            label:
                                                P && t[y] ? t[y].label : void 0,
                                        }),
                                        (h = t[y]),
                                        (m = this.yData[i]) >= 0
                                            ? (h.posTotal += m)
                                            : (h.negTotal += m),
                                        (b = e.data[i]),
                                        (g = h.absolutePos = h.posTotal),
                                        (f = h.absoluteNeg = h.negTotal),
                                        (h.stackTotal = g + f),
                                        (u = h.stackState.length),
                                        b && b.isIntermediateSum
                                            ? (S(c, d, 0, c),
                                              (c = d),
                                              (d = s),
                                              (n ^= l),
                                              (l ^= n),
                                              (n ^= l))
                                            : b && b.isSum
                                            ? (S(s, p, u, 0), (n = s))
                                            : (S(n, m, 0, p),
                                              b && ((p += m), (d += m))),
                                        h.stateIndex++,
                                        (h.threshold = n),
                                        (n += h.stackTotal);
                            (i.changed = !1),
                                i.alreadyChanged || (i.alreadyChanged = []),
                                i.alreadyChanged.push(o);
                        }
                    }
                    getExtremes() {
                        let t, e, i;
                        let s = this.options.stacking;
                        return s
                            ? ((t = this.yAxis.waterfall.stacks),
                              (e = this.stackedYNeg = []),
                              (i = this.stackedYPos = []),
                              "overlap" === s
                                  ? g(t[this.stackKey], function (t) {
                                        e.push(h(t.stackState)),
                                            i.push(l(t.stackState));
                                    })
                                  : g(t[this.stackKey], function (t) {
                                        e.push(t.negTotal + t.threshold),
                                            i.push(t.posTotal + t.threshold);
                                    }),
                              { dataMin: h(e), dataMax: l(i) })
                            : { dataMin: this.dataMin, dataMax: this.dataMax };
                    }
                }
                return (
                    (m.defaultOptions = u(a.defaultOptions, o)),
                    (m.compose = i.compose),
                    d(m.prototype, {
                        pointValKey: "y",
                        showLine: !0,
                        pointClass: s,
                    }),
                    n(
                        m,
                        "afterColumnTranslate",
                        function () {
                            let { options: t, points: e, yAxis: i } = this,
                                s = f(t.minPointLength, 5),
                                o = s / 2,
                                a = t.threshold || 0,
                                r = t.stacking,
                                n = i.waterfall.stacks[this.stackKey],
                                l = a,
                                h = a,
                                p,
                                g,
                                m,
                                y;
                            for (let t = 0; t < e.length; t++) {
                                let f = e[t],
                                    x = this.processedYData[t],
                                    P = f.shapeArgs,
                                    S = d(
                                        { x: 0, y: 0, width: 0, height: 0 },
                                        P || {}
                                    );
                                f.box = S;
                                let M = [0, x],
                                    L = f.y || 0;
                                if (r) {
                                    if (n) {
                                        let e = n[t];
                                        "overlap" === r
                                            ? ((g =
                                                  e.stackState[e.stateIndex--]),
                                              (p = L >= 0 ? g : g - L),
                                              b(e, "absolutePos") &&
                                                  delete e.absolutePos,
                                              b(e, "absoluteNeg") &&
                                                  delete e.absoluteNeg)
                                            : (L >= 0
                                                  ? ((g =
                                                        e.threshold +
                                                        e.posTotal),
                                                    (e.posTotal -= L),
                                                    (p = g))
                                                  : ((g =
                                                        e.threshold +
                                                        e.negTotal),
                                                    (e.negTotal -= L),
                                                    (p = g - L)),
                                              !e.posTotal &&
                                                  c(e.absolutePos) &&
                                                  b(e, "absolutePos") &&
                                                  ((e.posTotal = e.absolutePos),
                                                  delete e.absolutePos),
                                              !e.negTotal &&
                                                  c(e.absoluteNeg) &&
                                                  b(e, "absoluteNeg") &&
                                                  ((e.negTotal = e.absoluteNeg),
                                                  delete e.absoluteNeg)),
                                            f.isSum ||
                                                (e.connectorThreshold =
                                                    e.threshold + e.stackTotal),
                                            i.reversed
                                                ? ((m = L >= 0 ? p - L : p + L),
                                                  (y = p))
                                                : ((m = p), (y = p - L)),
                                            (f.below = m <= a),
                                            (S.y = i.translate(
                                                m,
                                                !1,
                                                !0,
                                                !1,
                                                !0
                                            )),
                                            (S.height = Math.abs(
                                                S.y -
                                                    i.translate(
                                                        y,
                                                        !1,
                                                        !0,
                                                        !1,
                                                        !0
                                                    )
                                            ));
                                        let s = i.waterfall.dummyStackItem;
                                        s &&
                                            ((s.x = t),
                                            (s.label = n[t].label),
                                            s.setOffset(
                                                this.pointXOffset || 0,
                                                this.barW || 0,
                                                this.stackedYNeg[t],
                                                this.stackedYPos[t],
                                                void 0,
                                                this.xAxis
                                            ));
                                    }
                                } else
                                    (p = Math.max(h, h + L) + M[0]),
                                        (S.y = i.translate(p, !1, !0, !1, !0)),
                                        f.isSum
                                            ? ((S.y = i.translate(
                                                  M[1],
                                                  !1,
                                                  !0,
                                                  !1,
                                                  !0
                                              )),
                                              (S.height =
                                                  Math.min(
                                                      i.translate(
                                                          M[0],
                                                          !1,
                                                          !0,
                                                          !1,
                                                          !0
                                                      ),
                                                      i.len
                                                  ) - S.y),
                                              (f.below = M[1] <= a))
                                            : f.isIntermediateSum
                                            ? (L >= 0
                                                  ? ((m = M[1] + l), (y = l))
                                                  : ((m = l), (y = M[1] + l)),
                                              i.reversed &&
                                                  ((m ^= y),
                                                  (y ^= m),
                                                  (m ^= y)),
                                              (S.y = i.translate(
                                                  m,
                                                  !1,
                                                  !0,
                                                  !1,
                                                  !0
                                              )),
                                              (S.height = Math.abs(
                                                  S.y -
                                                      Math.min(
                                                          i.translate(
                                                              y,
                                                              !1,
                                                              !0,
                                                              !1,
                                                              !0
                                                          ),
                                                          i.len
                                                      )
                                              )),
                                              (l += M[1]),
                                              (f.below = m <= a))
                                            : ((S.height =
                                                  x > 0
                                                      ? i.translate(
                                                            h,
                                                            !1,
                                                            !0,
                                                            !1,
                                                            !0
                                                        ) - S.y
                                                      : i.translate(
                                                            h,
                                                            !1,
                                                            !0,
                                                            !1,
                                                            !0
                                                        ) -
                                                        i.translate(
                                                            h - x,
                                                            !1,
                                                            !0,
                                                            !1,
                                                            !0
                                                        )),
                                              (h += x),
                                              (f.below = h < a)),
                                        S.height < 0 &&
                                            ((S.y += S.height),
                                            (S.height *= -1));
                                (f.plotY = S.y =
                                    Math.round(S.y || 0) -
                                    (this.borderWidth % 2) / 2),
                                    (S.height = Math.max(
                                        Math.round(S.height || 0),
                                        0.001
                                    )),
                                    (f.yBottom = S.y + S.height),
                                    S.height <= s && !f.isNull
                                        ? ((S.height = s),
                                          (S.y -= o),
                                          (f.plotY = S.y),
                                          L < 0
                                              ? (f.minPointLengthOffset = -o)
                                              : (f.minPointLengthOffset = o))
                                        : (f.isNull && (S.width = 0),
                                          (f.minPointLengthOffset = 0));
                                let k = f.plotY + (f.negative ? S.height : 0);
                                f.below && (f.plotY += S.height),
                                    f.tooltipPos &&
                                        (this.chart.inverted
                                            ? (f.tooltipPos[0] = i.len - k)
                                            : (f.tooltipPos[1] = k)),
                                    (f.isInside = this.isPointInside(f)),
                                    u(!0, f.shapeArgs, S);
                            }
                        },
                        { order: 2 }
                    ),
                    t.registerSeriesType("waterfall", m),
                    m
                );
            }
        ),
        i(
            e,
            "masters/highcharts-more.src.js",
            [
                e["Core/Globals.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Extensions/Pane/Pane.js"],
                e["Series/Bubble/BubbleSeries.js"],
                e["Series/PackedBubble/PackedBubbleSeries.js"],
                e["Series/PolarComposition.js"],
                e["Series/Waterfall/WaterfallSeries.js"],
            ],
            function (t, e, i, s, o, a, r) {
                s.compose(t.Axis, t.Chart, t.Legend, t.Series),
                    o.compose(t.Axis, t.Chart, t.Legend, t.Series),
                    i.compose(t.Chart, t.Pointer),
                    a.compose(
                        t.Axis,
                        t.Chart,
                        t.Pointer,
                        t.Series,
                        t.Tick,
                        t.Point,
                        e.seriesTypes.areasplinerange,
                        e.seriesTypes.column,
                        e.seriesTypes.line,
                        e.seriesTypes.spline
                    ),
                    r.compose(t.Axis, t.Chart);
            }
        );
});
