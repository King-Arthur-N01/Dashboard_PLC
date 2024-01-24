/**
 * Highcharts JS v11.3.0 (2024-01-10)
 *
 * Accessibility module
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Oystein Moseng
 *
 * License: www.highcharts.com/license
 */ !(function (t) {
    "object" == typeof module && module.exports
        ? ((t.default = t), (module.exports = t))
        : "function" == typeof define && define.amd
        ? define(
              "highcharts/modules/accessibility",
              ["highcharts"],
              function (e) {
                  return t(e), (t.Highcharts = e), t;
              }
          )
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
        "Accessibility/Utils/HTMLUtilities.js",
        [e["Core/Globals.js"], e["Core/Utilities.js"]],
        function (t, e) {
            let { doc: i, win: s } = t,
                { css: n } = e,
                o = (s.EventTarget && new s.EventTarget()) || "none";
            function r(t) {
                if ("function" == typeof s.MouseEvent)
                    return new s.MouseEvent(t.type, t);
                if (i.createEvent) {
                    let e = i.createEvent("MouseEvent");
                    if (e.initMouseEvent)
                        return (
                            e.initMouseEvent(
                                t.type,
                                t.bubbles,
                                t.cancelable,
                                t.view || s,
                                t.detail,
                                t.screenX,
                                t.screenY,
                                t.clientX,
                                t.clientY,
                                t.ctrlKey,
                                t.altKey,
                                t.shiftKey,
                                t.metaKey,
                                t.button,
                                t.relatedTarget
                            ),
                            e
                        );
                }
                return a(t.type);
            }
            function a(t, e, n) {
                let r = e || { x: 0, y: 0 };
                if ("function" == typeof s.MouseEvent)
                    return new s.MouseEvent(t, {
                        bubbles: !0,
                        cancelable: !0,
                        composed: !0,
                        button: 0,
                        buttons: 1,
                        relatedTarget: n || o,
                        view: s,
                        detail: "click" === t ? 1 : 0,
                        screenX: r.x,
                        screenY: r.y,
                        clientX: r.x,
                        clientY: r.y,
                    });
                if (i.createEvent) {
                    let e = i.createEvent("MouseEvent");
                    if (e.initMouseEvent)
                        return (
                            e.initMouseEvent(
                                t,
                                !0,
                                !0,
                                s,
                                "click" === t ? 1 : 0,
                                r.x,
                                r.y,
                                r.x,
                                r.y,
                                !1,
                                !1,
                                !1,
                                !1,
                                0,
                                null
                            ),
                            e
                        );
                }
                return { type: t };
            }
            return {
                addClass: function (t, e) {
                    t.classList
                        ? t.classList.add(e)
                        : 0 > t.className.indexOf(e) &&
                          (t.className += " " + e);
                },
                cloneMouseEvent: r,
                cloneTouchEvent: function (t) {
                    let e = (t) => {
                        let e = [];
                        for (let i = 0; i < t.length; ++i) {
                            let s = t.item(i);
                            s && e.push(s);
                        }
                        return e;
                    };
                    if ("function" == typeof s.TouchEvent) {
                        let i = new s.TouchEvent(t.type, {
                            touches: e(t.touches),
                            targetTouches: e(t.targetTouches),
                            changedTouches: e(t.changedTouches),
                            ctrlKey: t.ctrlKey,
                            shiftKey: t.shiftKey,
                            altKey: t.altKey,
                            metaKey: t.metaKey,
                            bubbles: t.bubbles,
                            cancelable: t.cancelable,
                            composed: t.composed,
                            detail: t.detail,
                            view: t.view,
                        });
                        return t.defaultPrevented && i.preventDefault(), i;
                    }
                    let i = r(t);
                    return (
                        (i.touches = t.touches),
                        (i.changedTouches = t.changedTouches),
                        (i.targetTouches = t.targetTouches),
                        i
                    );
                },
                escapeStringForHTML: function (t) {
                    return t
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#x27;")
                        .replace(/\//g, "&#x2F;");
                },
                getElement: function (t) {
                    return i.getElementById(t);
                },
                getFakeMouseEvent: a,
                getHeadingTagNameForElement: function (t) {
                    let e = (t) => {
                            let e = parseInt(t.slice(1), 10);
                            return "h" + Math.min(6, e + 1);
                        },
                        i = (t) => /H[1-6]/.test(t),
                        s = (t) => {
                            let e = t;
                            for (; (e = e.previousSibling); ) {
                                let t = e.tagName || "";
                                if (i(t)) return t;
                            }
                            return "";
                        },
                        n = (t) => {
                            let o = s(t);
                            if (o) return e(o);
                            let r = t.parentElement;
                            if (!r) return "p";
                            let a = r.tagName;
                            return i(a) ? e(a) : n(r);
                        };
                    return n(t);
                },
                removeChildNodes: function (t) {
                    for (; t.lastChild; ) t.removeChild(t.lastChild);
                },
                removeClass: function (t, e) {
                    t.classList
                        ? t.classList.remove(e)
                        : (t.className = t.className.replace(
                              RegExp(e, "g"),
                              ""
                          ));
                },
                removeElement: function (t) {
                    t && t.parentNode && t.parentNode.removeChild(t);
                },
                reverseChildNodes: function (t) {
                    let e = t.childNodes.length;
                    for (; e--; ) t.appendChild(t.childNodes[e]);
                },
                simulatedEventTarget: o,
                stripHTMLTagsFromString: function (t, e = !1) {
                    return "string" == typeof t
                        ? e
                            ? t.replace(/<\/?[^>]+(>|$)/g, "")
                            : t.replace(/<\/?(?!\s)[^>]+(>|$)/g, "")
                        : t;
                },
                visuallyHideElement: function (t) {
                    n(t, {
                        position: "absolute",
                        width: "1px",
                        height: "1px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        clip: "rect(1px, 1px, 1px, 1px)",
                        marginTop: "-3px",
                        "-ms-filter":
                            "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)",
                        filter: "alpha(opacity=1)",
                        opacity: 0.01,
                    });
                },
            };
        }
    ),
        i(
            e,
            "Accessibility/A11yI18n.js",
            [
                e["Core/Templating.js"],
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i) {
                var s;
                let { format: n } = t,
                    { composed: o } = e,
                    { getNestedProperty: r, pick: a, pushUnique: l } = i;
                return (
                    (function (t) {
                        function e(t, e, i) {
                            let s = (t, e) => {
                                    let i = t.slice(e || 0),
                                        s = i.indexOf("{"),
                                        n = i.indexOf("}");
                                    if (s > -1 && n > s)
                                        return {
                                            statement: i.substring(s + 1, n),
                                            begin: e + s + 1,
                                            end: e + n,
                                        };
                                },
                                o = [],
                                l,
                                h,
                                c = 0;
                            do
                                (l = s(t, c)),
                                    (h = t.substring(c, l && l.begin - 1))
                                        .length &&
                                        o.push({ value: h, type: "constant" }),
                                    l &&
                                        o.push({
                                            value: l.statement,
                                            type: "statement",
                                        }),
                                    (c = l ? l.end + 1 : c + 1);
                            while (l);
                            return (
                                o.forEach((t) => {
                                    "statement" === t.type &&
                                        (t.value = (function (t, e) {
                                            let i, s;
                                            let n = t.indexOf("#each("),
                                                o = t.indexOf("#plural("),
                                                l = t.indexOf("["),
                                                h = t.indexOf("]");
                                            if (n > -1) {
                                                let o =
                                                        t
                                                            .slice(n)
                                                            .indexOf(")") + n,
                                                    a = t.substring(0, n),
                                                    l = t.substring(o + 1),
                                                    h = t.substring(n + 6, o),
                                                    c = h.split(","),
                                                    d = Number(c[1]),
                                                    u;
                                                if (
                                                    ((s = ""), (i = r(c[0], e)))
                                                ) {
                                                    u =
                                                        (d = isNaN(d)
                                                            ? i.length
                                                            : d) < 0
                                                            ? i.length + d
                                                            : Math.min(
                                                                  d,
                                                                  i.length
                                                              );
                                                    for (let t = 0; t < u; ++t)
                                                        s += a + i[t] + l;
                                                }
                                                return s.length ? s : "";
                                            }
                                            if (o > -1) {
                                                var c;
                                                let i =
                                                        t
                                                            .slice(o)
                                                            .indexOf(")") + o,
                                                    n = t.substring(o + 8, i),
                                                    l = n.split(","),
                                                    h = Number(r(l[0], e));
                                                switch (h) {
                                                    case 0:
                                                        s = a(l[4], l[1]);
                                                        break;
                                                    case 1:
                                                        s = a(l[2], l[1]);
                                                        break;
                                                    case 2:
                                                        s = a(l[3], l[1]);
                                                        break;
                                                    default:
                                                        s = l[1];
                                                }
                                                return s
                                                    ? ((c = s).trim &&
                                                          c.trim()) ||
                                                          c.replace(
                                                              /^\s+|\s+$/g,
                                                              ""
                                                          )
                                                    : "";
                                            }
                                            if (l > -1) {
                                                let s;
                                                let n = t.substring(0, l),
                                                    o = Number(
                                                        t.substring(l + 1, h)
                                                    );
                                                return (
                                                    (i = r(n, e)),
                                                    !isNaN(o) &&
                                                        i &&
                                                        (o < 0
                                                            ? void 0 ===
                                                                  (s =
                                                                      i[
                                                                          i.length +
                                                                              o
                                                                      ]) &&
                                                              (s = i[0])
                                                            : void 0 ===
                                                                  (s = i[o]) &&
                                                              (s =
                                                                  i[
                                                                      i.length -
                                                                          1
                                                                  ])),
                                                    void 0 !== s ? s : ""
                                                );
                                            }
                                            return "{" + t + "}";
                                        })(t.value, e));
                                }),
                                n(
                                    o.reduce((t, e) => t + e.value, ""),
                                    e,
                                    i
                                )
                            );
                        }
                        function i(t, i) {
                            let s = t.split("."),
                                n = this.options.lang,
                                o = 0;
                            for (; o < s.length; ++o) n = n && n[s[o]];
                            return "string" == typeof n ? e(n, i, this) : "";
                        }
                        (t.compose = function t(e) {
                            if (l(o, t)) {
                                let t = e.prototype;
                                t.langFormat = i;
                            }
                        }),
                            (t.i18nFormat = e);
                    })(s || (s = {})),
                    s
                );
            }
        ),
        i(
            e,
            "Accessibility/Utils/ChartUtilities.js",
            [
                e["Core/Globals.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i) {
                let { doc: s } = t,
                    { stripHTMLTagsFromString: n } = e,
                    { defined: o, find: r, fireEvent: a } = i;
                function l(t) {
                    if (t.points && t.points.length) {
                        let e = r(t.points, (t) => !!t.graphic);
                        return e && e.graphic && e.graphic.element;
                    }
                }
                function h(t) {
                    let e = l(t);
                    return (
                        (e && e.parentNode) ||
                        (t.graph && t.graph.element) ||
                        (t.group && t.group.element)
                    );
                }
                return {
                    fireEventOnWrappedOrUnwrappedElement: function t(e, i) {
                        let n = i.type,
                            o = e.hcEvents;
                        s.createEvent && (e.dispatchEvent || e.fireEvent)
                            ? e.dispatchEvent
                                ? e.dispatchEvent(i)
                                : e.fireEvent(n, i)
                            : o && o[n]
                            ? a(e, n, i)
                            : e.element && t(e.element, i);
                    },
                    getChartTitle: function (t) {
                        return n(
                            t.options.title.text ||
                                t.langFormat(
                                    "accessibility.defaultChartTitle",
                                    { chart: t }
                                ),
                            t.renderer.forExport
                        );
                    },
                    getAxisDescription: function (t) {
                        return (
                            t &&
                            (t.options.accessibility?.description ||
                                t.axisTitle?.textStr ||
                                t.options.id ||
                                (t.categories && "categories") ||
                                (t.dateTime && "Time") ||
                                "values")
                        );
                    },
                    getAxisRangeDescription: function (t) {
                        let e = t.options || {};
                        return e.accessibility &&
                            void 0 !== e.accessibility.rangeDescription
                            ? e.accessibility.rangeDescription
                            : t.categories
                            ? (function (t) {
                                  let e = t.chart;
                                  return t.dataMax && t.dataMin
                                      ? e.langFormat(
                                            "accessibility.axis.rangeCategories",
                                            {
                                                chart: e,
                                                axis: t,
                                                numCategories:
                                                    t.dataMax - t.dataMin + 1,
                                            }
                                        )
                                      : "";
                              })(t)
                            : t.dateTime && (0 === t.min || 0 === t.dataMin)
                            ? (function (t) {
                                  let e = t.chart,
                                      i = {},
                                      s = t.dataMin || t.min || 0,
                                      n = t.dataMax || t.max || 0,
                                      o = "Seconds";
                                  (i.Seconds = (n - s) / 1e3),
                                      (i.Minutes = i.Seconds / 60),
                                      (i.Hours = i.Minutes / 60),
                                      (i.Days = i.Hours / 24),
                                      ["Minutes", "Hours", "Days"].forEach(
                                          function (t) {
                                              i[t] > 2 && (o = t);
                                          }
                                      );
                                  let r = i[o].toFixed(
                                      "Seconds" !== o && "Minutes" !== o ? 1 : 0
                                  );
                                  return e.langFormat(
                                      "accessibility.axis.timeRange" + o,
                                      {
                                          chart: e,
                                          axis: t,
                                          range: r.replace(".0", ""),
                                      }
                                  );
                              })(t)
                            : (function (t) {
                                  let e = t.chart,
                                      i = e.options,
                                      s =
                                          (i &&
                                              i.accessibility &&
                                              i.accessibility
                                                  .screenReaderSection
                                                  .axisRangeDateFormat) ||
                                          "",
                                      n = {
                                          min: t.dataMin || t.min || 0,
                                          max: t.dataMax || t.max || 0,
                                      },
                                      o = function (i) {
                                          return t.dateTime
                                              ? e.time.dateFormat(s, n[i])
                                              : n[i].toString();
                                      };
                                  return e.langFormat(
                                      "accessibility.axis.rangeFromTo",
                                      {
                                          chart: e,
                                          axis: t,
                                          rangeFrom: o("min"),
                                          rangeTo: o("max"),
                                      }
                                  );
                              })(t);
                    },
                    getPointFromXY: function (t, e, i) {
                        let s = t.length,
                            n;
                        for (; s--; )
                            if (
                                (n = r(t[s].points || [], function (t) {
                                    return t.x === e && t.y === i;
                                }))
                            )
                                return n;
                    },
                    getSeriesFirstPointElement: l,
                    getSeriesFromName: function (t, e) {
                        return e
                            ? (t.series || []).filter(function (t) {
                                  return t.name === e;
                              })
                            : t.series;
                    },
                    getSeriesA11yElement: h,
                    unhideChartElementFromAT: function t(e, i) {
                        i.setAttribute("aria-hidden", !1),
                            i !== e.renderTo &&
                                i.parentNode &&
                                i.parentNode !== s.body &&
                                (Array.prototype.forEach.call(
                                    i.parentNode.childNodes,
                                    function (t) {
                                        t.hasAttribute("aria-hidden") ||
                                            t.setAttribute("aria-hidden", !0);
                                    }
                                ),
                                t(e, i.parentNode));
                    },
                    hideSeriesFromAT: function (t) {
                        let e = h(t);
                        e && e.setAttribute("aria-hidden", !0);
                    },
                    scrollAxisToPoint: function (t) {
                        let e = t.series.xAxis,
                            i = t.series.yAxis,
                            s = e && e.scrollbar ? e : i,
                            n = s && s.scrollbar;
                        if (n && o(n.to) && o(n.from)) {
                            let e = n.to - n.from,
                                i = (function (t, e) {
                                    if (!o(t.dataMin) || !o(t.dataMax))
                                        return 0;
                                    let i = t.toPixels(t.dataMin),
                                        s = t.toPixels(t.dataMax),
                                        n = "xAxis" === t.coll ? "x" : "y",
                                        r = t.toPixels(e[n] || 0);
                                    return (r - i) / (s - i);
                                })(s, t);
                            n.updatePosition(i - e / 2, i + e / 2),
                                a(n, "changed", {
                                    from: n.from,
                                    to: n.to,
                                    trigger: "scrollbar",
                                    DOMEvent: null,
                                });
                        }
                    },
                };
            }
        ),
        i(
            e,
            "Accessibility/Utils/DOMElementProvider.js",
            [e["Core/Globals.js"], e["Accessibility/Utils/HTMLUtilities.js"]],
            function (t, e) {
                let { doc: i } = t,
                    { removeElement: s } = e;
                return class {
                    constructor() {
                        this.elements = [];
                    }
                    createElement() {
                        let t = i.createElement.apply(i, arguments);
                        return this.elements.push(t), t;
                    }
                    destroyCreatedElements() {
                        this.elements.forEach(function (t) {
                            s(t);
                        }),
                            (this.elements = []);
                    }
                };
            }
        ),
        i(
            e,
            "Accessibility/Utils/EventProvider.js",
            [e["Core/Globals.js"], e["Core/Utilities.js"]],
            function (t, e) {
                let { addEvent: i } = e;
                return class {
                    constructor() {
                        this.eventRemovers = [];
                    }
                    addEvent() {
                        let e = i.apply(t, arguments);
                        return this.eventRemovers.push(e), e;
                    }
                    removeAddedEvents() {
                        this.eventRemovers.forEach((t) => t()),
                            (this.eventRemovers = []);
                    }
                };
            }
        ),
        i(
            e,
            "Accessibility/AccessibilityComponent.js",
            [
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Accessibility/Utils/DOMElementProvider.js"],
                e["Accessibility/Utils/EventProvider.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, n) {
                let { fireEventOnWrappedOrUnwrappedElement: o } = t,
                    { getFakeMouseEvent: r } = s,
                    { extend: a } = n;
                class l {
                    initBase(t, s) {
                        (this.chart = t),
                            (this.eventProvider = new i()),
                            (this.domElementProvider = new e()),
                            (this.proxyProvider = s),
                            (this.keyCodes = {
                                left: 37,
                                right: 39,
                                up: 38,
                                down: 40,
                                enter: 13,
                                space: 32,
                                esc: 27,
                                tab: 9,
                                pageUp: 33,
                                pageDown: 34,
                                end: 35,
                                home: 36,
                            });
                    }
                    addEvent(t, e, i, s) {
                        return this.eventProvider.addEvent(t, e, i, s);
                    }
                    createElement(t, e) {
                        return this.domElementProvider.createElement(t, e);
                    }
                    fakeClickEvent(t) {
                        let e = r("click");
                        o(t, e);
                    }
                    destroyBase() {
                        this.domElementProvider.destroyCreatedElements(),
                            this.eventProvider.removeAddedEvents();
                    }
                }
                return (
                    a(l.prototype, {
                        init() {},
                        getKeyboardNavigation: function () {},
                        onChartUpdate() {},
                        onChartRender() {},
                        destroy() {},
                    }),
                    l
                );
            }
        ),
        i(
            e,
            "Accessibility/KeyboardNavigationHandler.js",
            [e["Core/Utilities.js"]],
            function (t) {
                let { find: e } = t;
                return class {
                    constructor(t, e) {
                        (this.chart = t),
                            (this.keyCodeMap = e.keyCodeMap || []),
                            (this.validate = e.validate),
                            (this.init = e.init),
                            (this.terminate = e.terminate),
                            (this.response = {
                                success: 1,
                                prev: 2,
                                next: 3,
                                noHandler: 4,
                                fail: 5,
                            });
                    }
                    run(t) {
                        let i = t.which || t.keyCode,
                            s = this.response.noHandler,
                            n = e(this.keyCodeMap, function (t) {
                                return t[0].indexOf(i) > -1;
                            });
                        return (
                            n
                                ? (s = n[1].call(this, i, t))
                                : 9 === i &&
                                  (s =
                                      this.response[
                                          t.shiftKey ? "prev" : "next"
                                      ]),
                            s
                        );
                    }
                };
            }
        ),
        i(
            e,
            "Accessibility/Components/ContainerComponent.js",
            [
                e["Accessibility/AccessibilityComponent.js"],
                e["Accessibility/KeyboardNavigationHandler.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Core/Globals.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
            ],
            function (t, e, i, s, n) {
                let { unhideChartElementFromAT: o, getChartTitle: r } = i,
                    { doc: a } = s,
                    { stripHTMLTagsFromString: l } = n;
                return class extends t {
                    onChartUpdate() {
                        this.handleSVGTitleElement(),
                            this.setSVGContainerLabel(),
                            this.setGraphicContainerAttrs(),
                            this.setRenderToAttrs(),
                            this.makeCreditsAccessible();
                    }
                    handleSVGTitleElement() {
                        let t = this.chart,
                            e = "highcharts-title-" + t.index,
                            i = l(
                                t.langFormat(
                                    "accessibility.svgContainerTitle",
                                    { chartTitle: r(t) }
                                )
                            );
                        if (i.length) {
                            let s = (this.svgTitleElement =
                                this.svgTitleElement ||
                                a.createElementNS(
                                    "http://www.w3.org/2000/svg",
                                    "title"
                                ));
                            (s.textContent = i),
                                (s.id = e),
                                t.renderTo.insertBefore(
                                    s,
                                    t.renderTo.firstChild
                                );
                        }
                    }
                    setSVGContainerLabel() {
                        let t = this.chart,
                            e = t.langFormat(
                                "accessibility.svgContainerLabel",
                                { chartTitle: r(t) }
                            );
                        t.renderer.box &&
                            e.length &&
                            t.renderer.box.setAttribute("aria-label", e);
                    }
                    setGraphicContainerAttrs() {
                        let t = this.chart,
                            e = t.langFormat(
                                "accessibility.graphicContainerLabel",
                                { chartTitle: r(t) }
                            );
                        e.length && t.container.setAttribute("aria-label", e);
                    }
                    setRenderToAttrs() {
                        let t = this.chart,
                            e =
                                "disabled" !==
                                t.options.accessibility.landmarkVerbosity,
                            i = t.langFormat(
                                "accessibility.chartContainerLabel",
                                { title: r(t), chart: t }
                            );
                        i &&
                            (t.renderTo.setAttribute(
                                "role",
                                e ? "region" : "group"
                            ),
                            t.renderTo.setAttribute("aria-label", i));
                    }
                    makeCreditsAccessible() {
                        let t = this.chart,
                            e = t.credits;
                        e &&
                            (e.textStr &&
                                e.element.setAttribute(
                                    "aria-label",
                                    t.langFormat("accessibility.credits", {
                                        creditsStr: l(
                                            e.textStr,
                                            t.renderer.forExport
                                        ),
                                    })
                                ),
                            o(t, e.element));
                    }
                    getKeyboardNavigation() {
                        let t = this.chart;
                        return new e(t, {
                            keyCodeMap: [],
                            validate: function () {
                                return !0;
                            },
                            init: function () {
                                let e = t.accessibility;
                                e &&
                                    e.keyboardNavigation.tabindexContainer.focus();
                            },
                        });
                    }
                    destroy() {
                        this.chart.renderTo.setAttribute("aria-hidden", !0);
                    }
                };
            }
        ),
        i(
            e,
            "Accessibility/FocusBorder.js",
            [e["Core/Globals.js"], e["Core/Utilities.js"]],
            function (t, e) {
                var i;
                let { composed: s } = t,
                    { addEvent: n, pick: o, pushUnique: r } = e;
                return (
                    (function (t) {
                        let e = [
                            "x",
                            "y",
                            "transform",
                            "width",
                            "height",
                            "r",
                            "d",
                            "stroke-width",
                        ];
                        function i() {
                            let t = this.focusElement,
                                e =
                                    this.options.accessibility
                                        .keyboardNavigation.focusBorder;
                            t &&
                                (t.removeFocusBorder(),
                                e.enabled &&
                                    t.addFocusBorder(e.margin, {
                                        stroke: e.style.color,
                                        strokeWidth: e.style.lineWidth,
                                        r: e.style.borderRadius,
                                    }));
                        }
                        function a(t, e) {
                            let i =
                                    this.options.accessibility
                                        .keyboardNavigation.focusBorder,
                                s = e || t.element;
                            s &&
                                s.focus &&
                                ((s.hcEvents && s.hcEvents.focusin) ||
                                    n(s, "focusin", function () {}),
                                s.focus(),
                                i.hideBrowserFocusOutline &&
                                    (s.style.outline = "none")),
                                this.focusElement &&
                                    this.focusElement.removeFocusBorder(),
                                (this.focusElement = t),
                                this.renderFocusBorder();
                        }
                        function l(t, i) {
                            this.focusBorder && this.removeFocusBorder();
                            let s = this.getBBox(),
                                n = o(t, 3),
                                r = this.parentGroup,
                                a = this.scaleX || (r && r.scaleX),
                                l = this.scaleY || (r && r.scaleY),
                                h = a ? !l : l,
                                c = h
                                    ? Math.abs(a || l || 1)
                                    : (Math.abs(a || 1) + Math.abs(l || 1)) / 2;
                            (s.x += this.translateX ? this.translateX : 0),
                                (s.y += this.translateY ? this.translateY : 0);
                            let d = s.x - n,
                                u = s.y - n,
                                p = s.width + 2 * n,
                                g = s.height + 2 * n,
                                m = !!this.text;
                            if ("text" === this.element.nodeName || m) {
                                let t, e;
                                let i = !!this.rotation,
                                    o = m
                                        ? { x: i ? 1 : 0, y: 0 }
                                        : ((t = 0),
                                          (e = 0),
                                          "middle" === this.attr("text-anchor")
                                              ? (t = e = 0.5)
                                              : this.rotation
                                              ? (t = 0.25)
                                              : (e = 0.75),
                                          { x: t, y: e }),
                                    r = +this.attr("x"),
                                    a = +this.attr("y");
                                if (
                                    (isNaN(r) || (d = r - s.width * o.x - n),
                                    isNaN(a) || (u = a - s.height * o.y - n),
                                    m && i)
                                ) {
                                    let t = p;
                                    (p = g),
                                        (g = t),
                                        isNaN(r) ||
                                            (d = r - s.height * o.x - n),
                                        isNaN(a) || (u = a - s.width * o.y - n);
                                }
                            }
                            (this.focusBorder = this.renderer
                                .rect(
                                    d,
                                    u,
                                    p,
                                    g,
                                    parseInt(((i && i.r) || 0).toString(), 10) /
                                        c
                                )
                                .addClass("highcharts-focus-border")
                                .attr({ zIndex: 99 })
                                .add(r)),
                                this.renderer.styledMode ||
                                    this.focusBorder.attr({
                                        stroke: i && i.stroke,
                                        "stroke-width":
                                            ((i && i.strokeWidth) || 0) / c,
                                    }),
                                (function (t, ...i) {
                                    t.focusBorderUpdateHooks ||
                                        ((t.focusBorderUpdateHooks = {}),
                                        e.forEach((e) => {
                                            let s = e + "Setter",
                                                n = t[s] || t._defaultSetter;
                                            (t.focusBorderUpdateHooks[s] = n),
                                                (t[s] = function () {
                                                    let e = n.apply(
                                                        t,
                                                        arguments
                                                    );
                                                    return (
                                                        t.addFocusBorder.apply(
                                                            t,
                                                            i
                                                        ),
                                                        e
                                                    );
                                                });
                                        }));
                                })(this, t, i),
                                (function (t) {
                                    if (t.focusBorderDestroyHook) return;
                                    let e = t.destroy;
                                    (t.destroy = function () {
                                        return (
                                            t.focusBorder &&
                                                t.focusBorder.destroy &&
                                                t.focusBorder.destroy(),
                                            e.apply(t, arguments)
                                        );
                                    }),
                                        (t.focusBorderDestroyHook = e);
                                })(this);
                        }
                        function h() {
                            var t;
                            (t = this),
                                t.focusBorderUpdateHooks &&
                                    (Object.keys(
                                        t.focusBorderUpdateHooks
                                    ).forEach((e) => {
                                        let i = t.focusBorderUpdateHooks[e];
                                        i === t._defaultSetter
                                            ? delete t[e]
                                            : (t[e] = i);
                                    }),
                                    delete t.focusBorderUpdateHooks),
                                this.focusBorderDestroyHook &&
                                    ((this.destroy =
                                        this.focusBorderDestroyHook),
                                    delete this.focusBorderDestroyHook),
                                this.focusBorder &&
                                    (this.focusBorder.destroy(),
                                    delete this.focusBorder);
                        }
                        t.compose = function t(e, n) {
                            if (r(s, t)) {
                                let t = e.prototype,
                                    s = n.prototype;
                                (t.renderFocusBorder = i),
                                    (t.setFocusToElement = a),
                                    (s.addFocusBorder = l),
                                    (s.removeFocusBorder = h);
                            }
                        };
                    })(i || (i = {})),
                    i
                );
            }
        ),
        i(
            e,
            "Accessibility/Utils/Announcer.js",
            [
                e["Core/Renderer/HTML/AST.js"],
                e["Accessibility/Utils/DOMElementProvider.js"],
                e["Core/Globals.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, n) {
                let { doc: o } = i,
                    { addClass: r, visuallyHideElement: a } = s,
                    { attr: l } = n;
                return class {
                    constructor(t, i) {
                        (this.chart = t),
                            (this.domElementProvider = new e()),
                            (this.announceRegion = this.addAnnounceRegion(i));
                    }
                    destroy() {
                        this.domElementProvider.destroyCreatedElements();
                    }
                    announce(e) {
                        t.setElementHTML(this.announceRegion, e),
                            this.clearAnnouncementRegionTimer &&
                                clearTimeout(this.clearAnnouncementRegionTimer),
                            (this.clearAnnouncementRegionTimer = setTimeout(
                                () => {
                                    (this.announceRegion.innerHTML =
                                        t.emptyHTML),
                                        delete this
                                            .clearAnnouncementRegionTimer;
                                },
                                3e3
                            ));
                    }
                    addAnnounceRegion(t) {
                        let e =
                                this.chart.announcerContainer ||
                                this.createAnnouncerContainer(),
                            i = this.domElementProvider.createElement("div");
                        return (
                            l(i, {
                                "aria-hidden": !1,
                                "aria-live": t,
                                "aria-atomic": !0,
                            }),
                            this.chart.styledMode
                                ? r(i, "highcharts-visually-hidden")
                                : a(i),
                            e.appendChild(i),
                            i
                        );
                    }
                    createAnnouncerContainer() {
                        let t = this.chart,
                            e = o.createElement("div");
                        return (
                            l(e, {
                                "aria-hidden": !1,
                                class: "highcharts-announcer-container",
                            }),
                            (e.style.position = "relative"),
                            t.renderTo.insertBefore(e, t.renderTo.firstChild),
                            (t.announcerContainer = e),
                            e
                        );
                    }
                };
            }
        ),
        i(
            e,
            "Accessibility/Components/AnnotationsA11y.js",
            [e["Accessibility/Utils/HTMLUtilities.js"]],
            function (t) {
                let { escapeStringForHTML: e, stripHTMLTagsFromString: i } = t;
                function s(t) {
                    let e = t.annotations || [];
                    return e.reduce(
                        (t, e) => (
                            e.options &&
                                !1 !== e.options.visible &&
                                (t = t.concat(e.labels)),
                            t
                        ),
                        []
                    );
                }
                function n(t) {
                    return (
                        (t.options &&
                            t.options.accessibility &&
                            t.options.accessibility.description) ||
                        (t.graphic &&
                            t.graphic.text &&
                            t.graphic.text.textStr) ||
                        ""
                    );
                }
                function o(t) {
                    let e =
                        t.options &&
                        t.options.accessibility &&
                        t.options.accessibility.description;
                    if (e) return e;
                    let i = t.chart,
                        s = n(t),
                        o = t.points,
                        r = (t) =>
                            (t.graphic &&
                                t.graphic.element &&
                                t.graphic.element.getAttribute("aria-label")) ||
                            "",
                        a = o
                            .filter((t) => !!t.graphic)
                            .map((t) => {
                                let e =
                                        (t.accessibility &&
                                            t.accessibility.valueDescription) ||
                                        r(t),
                                    i = (t && t.series.name) || "";
                                return (i ? i + ", " : "") + "data point " + e;
                            })
                            .filter((t) => !!t),
                        l = a.length,
                        h =
                            l > 1
                                ? "MultiplePoints"
                                : l
                                ? "SinglePoint"
                                : "NoPoints",
                        c = {
                            annotationText: s,
                            annotation: t,
                            numPoints: l,
                            annotationPoint: a[0],
                            additionalAnnotationPoints: a.slice(1),
                        };
                    return i.langFormat(
                        "accessibility.screenReaderSection.annotations.description" +
                            h,
                        c
                    );
                }
                function r(t) {
                    let n = s(t);
                    return n.map((s) => {
                        let n = e(i(o(s), t.renderer.forExport));
                        return n ? `<li>${n}</li>` : "";
                    });
                }
                return {
                    getAnnotationsInfoHTML: function (t) {
                        let e = t.annotations;
                        if (!(e && e.length)) return "";
                        let i = r(t);
                        return `<ul style="list-style-type: none">${i.join(
                            " "
                        )}</ul>`;
                    },
                    getAnnotationLabelDescription: o,
                    getAnnotationListItems: r,
                    getPointAnnotationTexts: function (t) {
                        let e = s(t.series.chart),
                            i = e.filter((e) => e.points.indexOf(t) > -1);
                        return i.length ? i.map((t) => `${n(t)}`) : [];
                    },
                };
            }
        ),
        i(
            e,
            "Accessibility/Components/InfoRegionsComponent.js",
            [
                e["Accessibility/A11yI18n.js"],
                e["Accessibility/AccessibilityComponent.js"],
                e["Accessibility/Utils/Announcer.js"],
                e["Accessibility/Components/AnnotationsA11y.js"],
                e["Core/Renderer/HTML/AST.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Core/Templating.js"],
                e["Core/Globals.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, n, o, r, a, l, h) {
                let { getAnnotationsInfoHTML: c } = s,
                    {
                        getAxisDescription: d,
                        getAxisRangeDescription: u,
                        getChartTitle: p,
                        unhideChartElementFromAT: g,
                    } = o,
                    { format: m } = r,
                    { doc: b } = a,
                    {
                        addClass: f,
                        getElement: x,
                        getHeadingTagNameForElement: y,
                        stripHTMLTagsFromString: v,
                        visuallyHideElement: A,
                    } = l,
                    { attr: w, pick: C } = h;
                function E(t) {
                    return t.replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "");
                }
                return class extends e {
                    constructor() {
                        super(...arguments), (this.screenReaderSections = {});
                    }
                    init() {
                        let t = this.chart,
                            e = this;
                        this.initRegionsDefinitions(),
                            this.addEvent(t, "aftergetTableAST", function (t) {
                                e.onDataTableCreated(t);
                            }),
                            this.addEvent(t, "afterViewData", function (t) {
                                t.wasHidden &&
                                    ((e.dataTableDiv = t.element),
                                    setTimeout(function () {
                                        e.focusDataTable();
                                    }, 300));
                            }),
                            this.addEvent(t, "afterHideData", function () {
                                e.viewDataTableButton &&
                                    e.viewDataTableButton.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );
                            }),
                            (this.announcer = new i(t, "assertive"));
                    }
                    initRegionsDefinitions() {
                        let t = this,
                            e = this.chart.options.accessibility;
                        this.screenReaderSections = {
                            before: {
                                element: null,
                                buildContent: function (i) {
                                    let s =
                                        e.screenReaderSection
                                            .beforeChartFormatter;
                                    return s
                                        ? s(i)
                                        : t.defaultBeforeChartFormatter(i);
                                },
                                insertIntoDOM: function (t, e) {
                                    e.renderTo.insertBefore(
                                        t,
                                        e.renderTo.firstChild
                                    );
                                },
                                afterInserted: function () {
                                    void 0 !== t.sonifyButtonId &&
                                        t.initSonifyButton(t.sonifyButtonId),
                                        void 0 !== t.dataTableButtonId &&
                                            t.initDataTableButton(
                                                t.dataTableButtonId
                                            );
                                },
                            },
                            after: {
                                element: null,
                                buildContent: function (i) {
                                    let s =
                                        e.screenReaderSection
                                            .afterChartFormatter;
                                    return s
                                        ? s(i)
                                        : t.defaultAfterChartFormatter();
                                },
                                insertIntoDOM: function (t, e) {
                                    e.renderTo.insertBefore(
                                        t,
                                        e.container.nextSibling
                                    );
                                },
                                afterInserted: function () {
                                    t.chart.accessibility &&
                                        e.keyboardNavigation.enabled &&
                                        t.chart.accessibility.keyboardNavigation.updateExitAnchor();
                                },
                            },
                        };
                    }
                    onChartRender() {
                        let t = this;
                        (this.linkedDescriptionElement =
                            this.getLinkedDescriptionElement()),
                            this.setLinkedDescriptionAttrs(),
                            Object.keys(this.screenReaderSections).forEach(
                                function (e) {
                                    t.updateScreenReaderSection(e);
                                }
                            );
                    }
                    getLinkedDescriptionElement() {
                        let t = this.chart.options,
                            e = t.accessibility.linkedDescription;
                        if (!e) return;
                        if ("string" != typeof e) return e;
                        let i = m(e, this.chart),
                            s = b.querySelectorAll(i);
                        if (1 === s.length) return s[0];
                    }
                    setLinkedDescriptionAttrs() {
                        let t = this.linkedDescriptionElement;
                        t &&
                            (t.setAttribute("aria-hidden", "true"),
                            f(t, "highcharts-linked-description"));
                    }
                    updateScreenReaderSection(t) {
                        let e = this.chart,
                            i = this.screenReaderSections[t],
                            s = i.buildContent(e),
                            o = (i.element =
                                i.element || this.createElement("div")),
                            r = o.firstChild || this.createElement("div");
                        s
                            ? (this.setScreenReaderSectionAttribs(o, t),
                              n.setElementHTML(r, s),
                              o.appendChild(r),
                              i.insertIntoDOM(o, e),
                              e.styledMode
                                  ? f(r, "highcharts-visually-hidden")
                                  : A(r),
                              g(e, r),
                              i.afterInserted && i.afterInserted())
                            : (o.parentNode && o.parentNode.removeChild(o),
                              (i.element = null));
                    }
                    setScreenReaderSectionAttribs(t, e) {
                        let i = this.chart,
                            s = i.langFormat(
                                "accessibility.screenReaderSection." +
                                    e +
                                    "RegionLabel",
                                { chart: i, chartTitle: p(i) }
                            ),
                            n = `highcharts-screen-reader-region-${e}-${i.index}`;
                        w(t, { id: n, "aria-label": s || void 0 }),
                            (t.style.position = "relative"),
                            s &&
                                t.setAttribute(
                                    "role",
                                    "all" ===
                                        i.options.accessibility
                                            .landmarkVerbosity
                                        ? "region"
                                        : "group"
                                );
                    }
                    defaultBeforeChartFormatter() {
                        let e = this.chart,
                            i =
                                e.options.accessibility.screenReaderSection
                                    .beforeChartFormat;
                        if (!i) return "";
                        let s = this.getAxesDescription(),
                            n =
                                e.sonify &&
                                e.options.sonification &&
                                e.options.sonification.enabled,
                            o = "highcharts-a11y-sonify-data-btn-" + e.index,
                            r = "hc-linkto-highcharts-data-table-" + e.index,
                            a = c(e),
                            l = e.langFormat(
                                "accessibility.screenReaderSection.annotations.heading",
                                { chart: e }
                            ),
                            h = {
                                headingTagName: y(e.renderTo),
                                chartTitle: p(e),
                                typeDescription: this.getTypeDescriptionText(),
                                chartSubtitle: this.getSubtitleText(),
                                chartLongdesc: this.getLongdescText(),
                                xAxisDescription: s.xAxis,
                                yAxisDescription: s.yAxis,
                                playAsSoundButton: n
                                    ? this.getSonifyButtonText(o)
                                    : "",
                                viewTableButton: e.getCSV
                                    ? this.getDataTableButtonText(r)
                                    : "",
                                annotationsTitle: a ? l : "",
                                annotationsList: a,
                            },
                            d = t.i18nFormat(i, h, e);
                        return (
                            (this.dataTableButtonId = r),
                            (this.sonifyButtonId = o),
                            E(d)
                        );
                    }
                    defaultAfterChartFormatter() {
                        let e = this.chart,
                            i =
                                e.options.accessibility.screenReaderSection
                                    .afterChartFormat;
                        if (!i) return "";
                        let s = {
                                endOfChartMarker:
                                    this.getEndOfChartMarkerText(),
                            },
                            n = t.i18nFormat(i, s, e);
                        return E(n);
                    }
                    getLinkedDescription() {
                        let t = this.linkedDescriptionElement,
                            e = (t && t.innerHTML) || "";
                        return v(e, this.chart.renderer.forExport);
                    }
                    getLongdescText() {
                        let t = this.chart.options,
                            e = t.caption,
                            i = e && e.text,
                            s = this.getLinkedDescription();
                        return t.accessibility.description || s || i || "";
                    }
                    getTypeDescriptionText() {
                        let t = this.chart;
                        return t.types
                            ? t.options.accessibility.typeDescription ||
                                  (function (t, e) {
                                      let i = e[0],
                                          s = (t.series && t.series[0]) || {},
                                          n =
                                              t.mapView &&
                                              t.mapView.geoMap &&
                                              t.mapView.geoMap.title,
                                          o = {
                                              numSeries: t.series.length,
                                              numPoints:
                                                  s.points && s.points.length,
                                              chart: t,
                                              mapTitle: n,
                                          };
                                      return i
                                          ? "map" === i || "tiledwebmap" === i
                                              ? o.mapTitle
                                                  ? t.langFormat(
                                                        "accessibility.chartTypes.mapTypeDescription",
                                                        o
                                                    )
                                                  : t.langFormat(
                                                        "accessibility.chartTypes.unknownMap",
                                                        o
                                                    )
                                              : t.types.length > 1
                                              ? t.langFormat(
                                                    "accessibility.chartTypes.combinationChart",
                                                    o
                                                )
                                              : (function (t, e, i) {
                                                    let s = e[0],
                                                        n = t.langFormat(
                                                            "accessibility.seriesTypeDescriptions." +
                                                                s,
                                                            i
                                                        ),
                                                        o =
                                                            t.series &&
                                                            t.series.length < 2
                                                                ? "Single"
                                                                : "Multiple";
                                                    return (
                                                        (t.langFormat(
                                                            "accessibility.chartTypes." +
                                                                s +
                                                                o,
                                                            i
                                                        ) ||
                                                            t.langFormat(
                                                                "accessibility.chartTypes.default" +
                                                                    o,
                                                                i
                                                            )) +
                                                        (n ? " " + n : "")
                                                    );
                                                })(t, e, o)
                                          : t.langFormat(
                                                "accessibility.chartTypes.emptyChart",
                                                o
                                            );
                                  })(t, t.types)
                            : "";
                    }
                    getDataTableButtonText(t) {
                        let e = this.chart,
                            i = e.langFormat(
                                "accessibility.table.viewAsDataTableButtonText",
                                { chart: e, chartTitle: p(e) }
                            );
                        return '<button id="' + t + '">' + i + "</button>";
                    }
                    getSonifyButtonText(t) {
                        let e = this.chart;
                        if (
                            e.options.sonification &&
                            !1 === e.options.sonification.enabled
                        )
                            return "";
                        let i = e.langFormat(
                            "accessibility.sonification.playAsSoundButtonText",
                            { chart: e, chartTitle: p(e) }
                        );
                        return '<button id="' + t + '">' + i + "</button>";
                    }
                    getSubtitleText() {
                        let t = this.chart.options.subtitle;
                        return v(
                            (t && t.text) || "",
                            this.chart.renderer.forExport
                        );
                    }
                    getEndOfChartMarkerText() {
                        let t = this.chart,
                            e = t.langFormat(
                                "accessibility.screenReaderSection.endOfChartMarker",
                                { chart: t }
                            ),
                            i = "highcharts-end-of-chart-marker-" + t.index;
                        return '<div id="' + i + '">' + e + "</div>";
                    }
                    onDataTableCreated(t) {
                        let e = this.chart;
                        if (e.options.accessibility.enabled) {
                            this.viewDataTableButton &&
                                this.viewDataTableButton.setAttribute(
                                    "aria-expanded",
                                    "true"
                                );
                            let i = t.tree.attributes || {};
                            (i.tabindex = -1),
                                (i.summary = e.langFormat(
                                    "accessibility.table.tableSummary",
                                    { chart: e }
                                )),
                                (t.tree.attributes = i);
                        }
                    }
                    focusDataTable() {
                        let t = this.dataTableDiv,
                            e = t && t.getElementsByTagName("table")[0];
                        e && e.focus && e.focus();
                    }
                    initSonifyButton(t) {
                        let e = (this.sonifyButton = x(t)),
                            i = this.chart,
                            s = (t) => {
                                e &&
                                    (e.setAttribute("aria-hidden", "true"),
                                    e.setAttribute("aria-label", "")),
                                    t.preventDefault(),
                                    t.stopPropagation();
                                let s = i.langFormat(
                                    "accessibility.sonification.playAsSoundClickAnnouncement",
                                    { chart: i }
                                );
                                this.announcer.announce(s),
                                    setTimeout(() => {
                                        e &&
                                            (e.removeAttribute("aria-hidden"),
                                            e.removeAttribute("aria-label")),
                                            i.sonify && i.sonify();
                                    }, 1e3);
                            };
                        e &&
                            i &&
                            (e.setAttribute("tabindex", -1),
                            (e.onclick = function (t) {
                                let e =
                                    i.options.accessibility &&
                                    i.options.accessibility.screenReaderSection
                                        .onPlayAsSoundClick;
                                (e || s).call(this, t, i);
                            }));
                    }
                    initDataTableButton(t) {
                        let e = (this.viewDataTableButton = x(t)),
                            i = this.chart,
                            s = t.replace("hc-linkto-", "");
                        e &&
                            (w(e, { tabindex: -1, "aria-expanded": !!x(s) }),
                            (e.onclick =
                                i.options.accessibility.screenReaderSection
                                    .onViewDataTableClick ||
                                function () {
                                    i.viewData();
                                }));
                    }
                    getAxesDescription() {
                        let t = this.chart,
                            e = function (e, i) {
                                let s = t[e];
                                return (
                                    s.length > 1 ||
                                    (s[0] &&
                                        C(
                                            s[0].options.accessibility &&
                                                s[0].options.accessibility
                                                    .enabled,
                                            i
                                        ))
                                );
                            },
                            i =
                                !!t.types &&
                                0 > t.types.indexOf("map") &&
                                0 > t.types.indexOf("treemap") &&
                                0 > t.types.indexOf("tilemap"),
                            s = !!t.hasCartesianSeries,
                            n = e("xAxis", !t.angular && s && i),
                            o = e("yAxis", s && i),
                            r = {};
                        return (
                            n &&
                                (r.xAxis =
                                    this.getAxisDescriptionText("xAxis")),
                            o &&
                                (r.yAxis =
                                    this.getAxisDescriptionText("yAxis")),
                            r
                        );
                    }
                    getAxisDescriptionText(t) {
                        let e = this.chart,
                            i = e[t];
                        return e.langFormat(
                            "accessibility.axis." +
                                t +
                                "Description" +
                                (i.length > 1 ? "Plural" : "Singular"),
                            {
                                chart: e,
                                names: i.map(function (t) {
                                    return d(t);
                                }),
                                ranges: i.map(function (t) {
                                    return u(t);
                                }),
                                numAxes: i.length,
                            }
                        );
                    }
                    destroy() {
                        this.announcer && this.announcer.destroy();
                    }
                };
            }
        ),
        i(
            e,
            "Accessibility/Components/MenuComponent.js",
            [
                e["Core/Chart/Chart.js"],
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
                e["Accessibility/AccessibilityComponent.js"],
                e["Accessibility/KeyboardNavigationHandler.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
            ],
            function (t, e, i, s, n, o, r) {
                let { composed: a } = e,
                    { attr: l, pushUnique: h } = i,
                    { getChartTitle: c, unhideChartElementFromAT: d } = o,
                    { getFakeMouseEvent: u } = r;
                function p(t) {
                    return t.exportSVGElements && t.exportSVGElements[0];
                }
                class g extends s {
                    init() {
                        let t = this.chart,
                            e = this;
                        this.addEvent(t, "exportMenuShown", function () {
                            e.onMenuShown();
                        }),
                            this.addEvent(t, "exportMenuHidden", function () {
                                e.onMenuHidden();
                            }),
                            this.createProxyGroup();
                    }
                    onMenuHidden() {
                        let t = this.chart.exportContextMenu;
                        t && t.setAttribute("aria-hidden", "true"),
                            this.setExportButtonExpandedState("false");
                    }
                    onMenuShown() {
                        let t = this.chart,
                            e = t.exportContextMenu;
                        e && (this.addAccessibleContextMenuAttribs(), d(t, e)),
                            this.setExportButtonExpandedState("true");
                    }
                    setExportButtonExpandedState(t) {
                        this.exportButtonProxy &&
                            this.exportButtonProxy.innerElement.setAttribute(
                                "aria-expanded",
                                t
                            );
                    }
                    onChartRender() {
                        let t = this.chart,
                            e = t.focusElement,
                            i = t.accessibility;
                        this.proxyProvider.clearGroup("chartMenu"),
                            this.proxyMenuButton(),
                            this.exportButtonProxy &&
                                e &&
                                e === t.exportingGroup &&
                                (e.focusBorder
                                    ? t.setFocusToElement(
                                          e,
                                          this.exportButtonProxy.innerElement
                                      )
                                    : i &&
                                      i.keyboardNavigation.tabindexContainer.focus());
                    }
                    proxyMenuButton() {
                        let t = this.chart,
                            e = this.proxyProvider,
                            i = p(t);
                        (function (t) {
                            let e = t.options.exporting,
                                i = p(t);
                            return !!(
                                e &&
                                !1 !== e.enabled &&
                                e.accessibility &&
                                e.accessibility.enabled &&
                                i &&
                                i.element
                            );
                        })(t) &&
                            i &&
                            (this.exportButtonProxy = e.addProxyElement(
                                "chartMenu",
                                { click: i },
                                "button",
                                {
                                    "aria-label": t.langFormat(
                                        "accessibility.exporting.menuButtonLabel",
                                        { chart: t, chartTitle: c(t) }
                                    ),
                                    "aria-expanded": !1,
                                    title:
                                        t.options.lang.contextButtonTitle ||
                                        null,
                                }
                            ));
                    }
                    createProxyGroup() {
                        let t = this.chart;
                        t &&
                            this.proxyProvider &&
                            this.proxyProvider.addGroup("chartMenu");
                    }
                    addAccessibleContextMenuAttribs() {
                        let t = this.chart,
                            e = t.exportDivElements;
                        if (e && e.length) {
                            e.forEach((t) => {
                                t &&
                                    ("LI" !== t.tagName ||
                                    (t.children && t.children.length)
                                        ? t.setAttribute("aria-hidden", "true")
                                        : t.setAttribute("tabindex", -1));
                            });
                            let i = e[0] && e[0].parentNode;
                            i &&
                                l(i, {
                                    "aria-hidden": void 0,
                                    "aria-label": t.langFormat(
                                        "accessibility.exporting.chartMenuLabel",
                                        { chart: t }
                                    ),
                                    role: "list",
                                });
                        }
                    }
                    getKeyboardNavigation() {
                        let t = this.keyCodes,
                            e = this.chart,
                            i = this;
                        return new n(e, {
                            keyCodeMap: [
                                [
                                    [t.left, t.up],
                                    function () {
                                        return i.onKbdPrevious(this);
                                    },
                                ],
                                [
                                    [t.right, t.down],
                                    function () {
                                        return i.onKbdNext(this);
                                    },
                                ],
                                [
                                    [t.enter, t.space],
                                    function () {
                                        return i.onKbdClick(this);
                                    },
                                ],
                            ],
                            validate: function () {
                                return (
                                    !!e.exporting &&
                                    !1 !== e.options.exporting.enabled &&
                                    !1 !==
                                        e.options.exporting.accessibility
                                            .enabled
                                );
                            },
                            init: function () {
                                let t = i.exportButtonProxy,
                                    s = i.chart.exportingGroup;
                                t &&
                                    s &&
                                    e.setFocusToElement(s, t.innerElement);
                            },
                            terminate: function () {
                                e.hideExportMenu();
                            },
                        });
                    }
                    onKbdPrevious(t) {
                        let e = this.chart,
                            i = e.options.accessibility,
                            s = t.response,
                            n = e.highlightedExportItemIx || 0;
                        for (; n--; )
                            if (e.highlightExportItem(n)) return s.success;
                        return i.keyboardNavigation.wrapAround
                            ? (e.highlightLastExportItem(), s.success)
                            : s.prev;
                    }
                    onKbdNext(t) {
                        let e = this.chart,
                            i = e.options.accessibility,
                            s = t.response;
                        for (
                            let t = (e.highlightedExportItemIx || 0) + 1;
                            t < e.exportDivElements.length;
                            ++t
                        )
                            if (e.highlightExportItem(t)) return s.success;
                        return i.keyboardNavigation.wrapAround
                            ? (e.highlightExportItem(0), s.success)
                            : s.next;
                    }
                    onKbdClick(t) {
                        let e = this.chart,
                            i = e.exportDivElements[e.highlightedExportItemIx],
                            s = p(e).element;
                        return (
                            e.openMenu
                                ? this.fakeClickEvent(i)
                                : (this.fakeClickEvent(s),
                                  e.highlightExportItem(0)),
                            t.response.success
                        );
                    }
                }
                return (
                    (function (e) {
                        function i() {
                            let t = p(this);
                            if (t) {
                                let e = t.element;
                                e.onclick && e.onclick(u("click"));
                            }
                        }
                        function s() {
                            let t = this.exportDivElements;
                            t &&
                                this.exportContextMenu &&
                                this.openMenu &&
                                (t.forEach((t) => {
                                    t &&
                                        "highcharts-menu-item" ===
                                            t.className &&
                                        t.onmouseout &&
                                        t.onmouseout(u("mouseout"));
                                }),
                                (this.highlightedExportItemIx = 0),
                                this.exportContextMenu.hideMenu(),
                                this.container.focus());
                        }
                        function n(t) {
                            let e =
                                    this.exportDivElements &&
                                    this.exportDivElements[t],
                                i =
                                    this.exportDivElements &&
                                    this.exportDivElements[
                                        this.highlightedExportItemIx
                                    ];
                            if (
                                e &&
                                "LI" === e.tagName &&
                                !(e.children && e.children.length)
                            ) {
                                let s = !!(
                                    this.renderTo.getElementsByTagName(
                                        "g"
                                    )[0] || {}
                                ).focus;
                                return (
                                    e.focus && s && e.focus(),
                                    i &&
                                        i.onmouseout &&
                                        i.onmouseout(u("mouseout")),
                                    e.onmouseover &&
                                        e.onmouseover(u("mouseover")),
                                    (this.highlightedExportItemIx = t),
                                    !0
                                );
                            }
                            return !1;
                        }
                        function o() {
                            if (this.exportDivElements) {
                                let t = this.exportDivElements.length;
                                for (; t--; )
                                    if (this.highlightExportItem(t)) return !0;
                            }
                            return !1;
                        }
                        e.compose = function e(r) {
                            if (h(a, e)) {
                                let e = t.prototype;
                                (e.hideExportMenu = s),
                                    (e.highlightExportItem = n),
                                    (e.highlightLastExportItem = o),
                                    (e.showExportMenu = i);
                            }
                        };
                    })(g || (g = {})),
                    g
                );
            }
        ),
        i(
            e,
            "Accessibility/KeyboardNavigation.js",
            [
                e["Core/Globals.js"],
                e["Accessibility/Components/MenuComponent.js"],
                e["Core/Utilities.js"],
                e["Accessibility/Utils/EventProvider.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
            ],
            function (t, e, i, s, n) {
                let { composed: o, doc: r, win: a } = t,
                    { addEvent: l, fireEvent: h, pushUnique: c } = i,
                    { getElement: d, simulatedEventTarget: u } = n;
                class p {
                    constructor(t, e) {
                        (this.currentModuleIx = NaN),
                            (this.modules = []),
                            this.init(t, e);
                    }
                    init(t, e) {
                        let i = (this.eventProvider = new s());
                        (this.chart = t),
                            (this.components = e),
                            (this.modules = []),
                            (this.currentModuleIx = 0),
                            this.update(),
                            i.addEvent(this.tabindexContainer, "keydown", (t) =>
                                this.onKeydown(t)
                            ),
                            i.addEvent(this.tabindexContainer, "focus", (t) =>
                                this.onFocus(t)
                            ),
                            ["mouseup", "touchend"].forEach((t) =>
                                i.addEvent(r, t, (t) => this.onMouseUp(t))
                            ),
                            ["mousedown", "touchstart"].forEach((e) =>
                                i.addEvent(t.renderTo, e, () => {
                                    this.isClickingChart = !0;
                                })
                            );
                    }
                    update(t) {
                        let e = this.chart.options.accessibility,
                            i = e && e.keyboardNavigation,
                            s = this.components;
                        this.updateContainerTabindex(),
                            i && i.enabled && t && t.length
                                ? ((this.modules = t.reduce(function (t, e) {
                                      let i = s[e].getKeyboardNavigation();
                                      return t.concat(i);
                                  }, [])),
                                  this.updateExitAnchor())
                                : ((this.modules = []),
                                  (this.currentModuleIx = 0),
                                  this.removeExitAnchor());
                    }
                    updateExitAnchor() {
                        let t = `highcharts-end-of-chart-marker-${this.chart.index}`,
                            e = d(t);
                        this.removeExitAnchor(),
                            e
                                ? (this.makeElementAnExitAnchor(e),
                                  (this.exitAnchor = e))
                                : this.createExitAnchor();
                    }
                    move(t) {
                        let e =
                            this.modules && this.modules[this.currentModuleIx];
                        e && e.terminate && e.terminate(t),
                            this.chart.focusElement &&
                                this.chart.focusElement.removeFocusBorder(),
                            (this.currentModuleIx += t);
                        let i =
                            this.modules && this.modules[this.currentModuleIx];
                        if (i) {
                            if (i.validate && !i.validate())
                                return this.move(t);
                            if (i.init) return i.init(t), !0;
                        }
                        return (
                            (this.currentModuleIx = 0),
                            (this.exiting = !0),
                            t > 0
                                ? this.exitAnchor && this.exitAnchor.focus()
                                : this.tabindexContainer.focus(),
                            !1
                        );
                    }
                    onFocus(t) {
                        let e = this.chart,
                            i =
                                t.relatedTarget &&
                                e.container.contains(t.relatedTarget),
                            s = e.options.accessibility,
                            n = s && s.keyboardNavigation,
                            o = n && n.enabled;
                        if (
                            o &&
                            !this.exiting &&
                            !this.tabbingInBackwards &&
                            !this.isClickingChart &&
                            !i
                        ) {
                            let t = this.getFirstValidModuleIx();
                            null !== t &&
                                ((this.currentModuleIx = t),
                                this.modules[t].init(1));
                        }
                        (this.keyboardReset = !1), (this.exiting = !1);
                    }
                    onMouseUp(t) {
                        if (
                            (delete this.isClickingChart,
                            !this.keyboardReset && t.relatedTarget !== u)
                        ) {
                            let e = this.chart;
                            if (!t.target || !e.container.contains(t.target)) {
                                let t =
                                    this.modules &&
                                    this.modules[this.currentModuleIx || 0];
                                t && t.terminate && t.terminate(),
                                    (this.currentModuleIx = 0);
                            }
                            e.focusElement &&
                                (e.focusElement.removeFocusBorder(),
                                delete e.focusElement),
                                (this.keyboardReset = !0);
                        }
                    }
                    onKeydown(t) {
                        let e;
                        let i = t || a.event,
                            s =
                                this.modules &&
                                this.modules.length &&
                                this.modules[this.currentModuleIx],
                            n = i.target;
                        if (
                            (!n ||
                                "INPUT" !== n.nodeName ||
                                n.classList.contains(
                                    "highcharts-a11y-proxy-element"
                                )) &&
                            ((this.keyboardReset = !1), (this.exiting = !1), s)
                        ) {
                            let t = s.run(i);
                            t === s.response.success
                                ? (e = !0)
                                : t === s.response.prev
                                ? (e = this.move(-1))
                                : t === s.response.next && (e = this.move(1)),
                                e && (i.preventDefault(), i.stopPropagation());
                        }
                    }
                    updateContainerTabindex() {
                        let t;
                        let e = this.chart.options.accessibility,
                            i = e && e.keyboardNavigation,
                            s = !(i && !1 === i.enabled),
                            n = this.chart,
                            o = n.container;
                        n.renderTo.hasAttribute("tabindex")
                            ? (o.removeAttribute("tabindex"), (t = n.renderTo))
                            : (t = o),
                            (this.tabindexContainer = t);
                        let r = t.getAttribute("tabindex");
                        s && !r
                            ? t.setAttribute("tabindex", "0")
                            : s || n.container.removeAttribute("tabindex");
                    }
                    createExitAnchor() {
                        let t = this.chart,
                            e = (this.exitAnchor = r.createElement("div"));
                        t.renderTo.appendChild(e),
                            this.makeElementAnExitAnchor(e);
                    }
                    makeElementAnExitAnchor(t) {
                        let e =
                            this.tabindexContainer.getAttribute("tabindex") ||
                            0;
                        t.setAttribute("class", "highcharts-exit-anchor"),
                            t.setAttribute("tabindex", e),
                            t.setAttribute("aria-hidden", !1),
                            this.addExitAnchorEventsToEl(t);
                    }
                    removeExitAnchor() {
                        this.exitAnchor &&
                            this.exitAnchor.parentNode &&
                            (this.exitAnchor.parentNode.removeChild(
                                this.exitAnchor
                            ),
                            delete this.exitAnchor);
                    }
                    addExitAnchorEventsToEl(t) {
                        let e = this.chart,
                            i = this;
                        this.eventProvider.addEvent(t, "focus", function (t) {
                            let s = t || a.event,
                                n =
                                    s.relatedTarget &&
                                    e.container.contains(s.relatedTarget),
                                o = !(n || i.exiting);
                            if ((e.focusElement && delete e.focusElement, o)) {
                                if (
                                    ((i.tabbingInBackwards = !0),
                                    i.tabindexContainer.focus(),
                                    delete i.tabbingInBackwards,
                                    s.preventDefault(),
                                    i.modules && i.modules.length)
                                ) {
                                    i.currentModuleIx = i.modules.length - 1;
                                    let t = i.modules[i.currentModuleIx];
                                    t && t.validate && !t.validate()
                                        ? i.move(-1)
                                        : t && t.init(-1);
                                }
                            } else i.exiting = !1;
                        });
                    }
                    getFirstValidModuleIx() {
                        let t = this.modules.length;
                        for (let e = 0; e < t; ++e) {
                            let t = this.modules[e];
                            if (!t.validate || t.validate()) return e;
                        }
                        return null;
                    }
                    destroy() {
                        this.removeExitAnchor(),
                            this.eventProvider.removeAddedEvents(),
                            this.chart.container.removeAttribute("tabindex");
                    }
                }
                return (
                    (function (i) {
                        function s() {
                            let t = this;
                            h(this, "dismissPopupContent", {}, function () {
                                t.tooltip && t.tooltip.hide(0),
                                    t.hideExportMenu();
                            });
                        }
                        function n(e) {
                            let i = e.which || e.keyCode;
                            27 === i &&
                                t.charts &&
                                t.charts.forEach((t) => {
                                    t &&
                                        t.dismissPopupContent &&
                                        t.dismissPopupContent();
                                });
                        }
                        i.compose = function t(i) {
                            if ((e.compose(i), c(o, t))) {
                                let t = i.prototype;
                                (t.dismissPopupContent = s), l(r, "keydown", n);
                            }
                            return i;
                        };
                    })(p || (p = {})),
                    p
                );
            }
        ),
        i(
            e,
            "Accessibility/Components/LegendComponent.js",
            [
                e["Core/Animation/AnimationUtilities.js"],
                e["Core/Globals.js"],
                e["Core/Legend/Legend.js"],
                e["Core/Utilities.js"],
                e["Accessibility/AccessibilityComponent.js"],
                e["Accessibility/KeyboardNavigationHandler.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
            ],
            function (t, e, i, s, n, o, r, a) {
                let { animObject: l } = t,
                    { composed: h, doc: c } = e,
                    {
                        addEvent: d,
                        fireEvent: u,
                        isNumber: p,
                        pick: g,
                        pushUnique: m,
                        syncTimeout: b,
                    } = s,
                    { getChartTitle: f } = r,
                    {
                        stripHTMLTagsFromString: x,
                        addClass: y,
                        removeClass: v,
                    } = a;
                function A(t) {
                    let e = t.legend && t.legend.allItems,
                        i = t.options.legend.accessibility || {},
                        s =
                            t.colorAxis &&
                            t.colorAxis.some(
                                (t) => !t.dataClasses || !t.dataClasses.length
                            );
                    return !!(e && e.length && !s && !1 !== i.enabled);
                }
                function w(t, e) {
                    let i = e.legendItem || {};
                    for (let s of (e.setState(t ? "hover" : "", !0),
                    ["group", "label", "symbol"])) {
                        let e = i[s],
                            n = (e && e.element) || e;
                        n && u(n, t ? "mouseover" : "mouseout");
                    }
                }
                class C extends n {
                    constructor() {
                        super(...arguments),
                            (this.highlightedLegendItemIx = NaN),
                            (this.proxyGroup = null);
                    }
                    init() {
                        let t = this;
                        this.recreateProxies(),
                            this.addEvent(i, "afterScroll", function () {
                                this.chart === t.chart &&
                                    (t.proxyProvider.updateGroupProxyElementPositions(
                                        "legend"
                                    ),
                                    t.updateLegendItemProxyVisibility(),
                                    t.highlightedLegendItemIx > -1 &&
                                        this.chart.highlightLegendItem(
                                            t.highlightedLegendItemIx
                                        ));
                            }),
                            this.addEvent(i, "afterPositionItem", function (e) {
                                this.chart === t.chart &&
                                    this.chart.renderer &&
                                    t.updateProxyPositionForItem(e.item);
                            }),
                            this.addEvent(i, "afterRender", function () {
                                this.chart === t.chart &&
                                    this.chart.renderer &&
                                    t.recreateProxies() &&
                                    b(
                                        () =>
                                            t.proxyProvider.updateGroupProxyElementPositions(
                                                "legend"
                                            ),
                                        l(
                                            g(
                                                this.chart.renderer
                                                    .globalAnimation,
                                                !0
                                            )
                                        ).duration
                                    );
                            });
                    }
                    updateLegendItemProxyVisibility() {
                        let t;
                        let e = this.chart,
                            i = e.legend,
                            s = i.allItems || [],
                            n = i.currentPage || 1,
                            o = i.clipHeight || 0;
                        s.forEach((s) => {
                            if (s.a11yProxyElement) {
                                let r = i.pages && i.pages.length,
                                    a = s.a11yProxyElement.element,
                                    l = !1;
                                if (((t = s.legendItem || {}), r)) {
                                    let e = t.pageIx || 0,
                                        s = t.y || 0,
                                        r = t.label
                                            ? Math.round(
                                                  t.label.getBBox().height
                                              )
                                            : 0;
                                    l = s + r - i.pages[e] > o || e !== n - 1;
                                }
                                l
                                    ? e.styledMode
                                        ? y(a, "highcharts-a11y-invisible")
                                        : (a.style.visibility = "hidden")
                                    : (v(a, "highcharts-a11y-invisible"),
                                      (a.style.visibility = ""));
                            }
                        });
                    }
                    onChartRender() {
                        A(this.chart) || this.removeProxies();
                    }
                    highlightAdjacentLegendPage(t) {
                        let e = this.chart,
                            i = e.legend,
                            s = i.currentPage || 1,
                            n = s + t,
                            o = i.pages || [];
                        if (n > 0 && n <= o.length) {
                            let t = 0;
                            for (let s of i.allItems)
                                ((s.legendItem || {}).pageIx || 0) + 1 === n &&
                                    e.highlightLegendItem(t) &&
                                    (this.highlightedLegendItemIx = t),
                                    ++t;
                        }
                    }
                    updateProxyPositionForItem(t) {
                        t.a11yProxyElement &&
                            t.a11yProxyElement.refreshPosition();
                    }
                    recreateProxies() {
                        let t = c.activeElement,
                            e = this.proxyGroup,
                            i = t && e && e.contains(t);
                        return (
                            this.removeProxies(),
                            !!A(this.chart) &&
                                (this.addLegendProxyGroup(),
                                this.proxyLegendItems(),
                                this.updateLegendItemProxyVisibility(),
                                this.updateLegendTitle(),
                                i &&
                                    this.chart.highlightLegendItem(
                                        this.highlightedLegendItemIx
                                    ),
                                !0)
                        );
                    }
                    removeProxies() {
                        this.proxyProvider.removeGroup("legend");
                    }
                    updateLegendTitle() {
                        let t = this.chart,
                            e = x(
                                (
                                    (t.legend &&
                                        t.legend.options.title &&
                                        t.legend.options.title.text) ||
                                    ""
                                ).replace(/<br ?\/?>/g, " "),
                                t.renderer.forExport
                            ),
                            i = t.langFormat(
                                "accessibility.legend.legendLabel" +
                                    (e ? "" : "NoTitle"),
                                { chart: t, legendTitle: e, chartTitle: f(t) }
                            );
                        this.proxyProvider.updateGroupAttrs("legend", {
                            "aria-label": i,
                        });
                    }
                    addLegendProxyGroup() {
                        let t = this.chart.options.accessibility,
                            e = "all" === t.landmarkVerbosity ? "region" : null;
                        this.proxyGroup = this.proxyProvider.addGroup(
                            "legend",
                            "ul",
                            { "aria-label": "_placeholder_", role: e }
                        );
                    }
                    proxyLegendItems() {
                        let t;
                        let e = this,
                            i = (this.chart.legend || {}).allItems || [];
                        i.forEach((i) => {
                            (t = i.legendItem || {}).label &&
                                t.label.element &&
                                e.proxyLegendItem(i);
                        });
                    }
                    proxyLegendItem(t) {
                        let e = t.legendItem || {};
                        if (!e.label || !e.group) return;
                        let i = this.chart.langFormat(
                                "accessibility.legend.legendItem",
                                {
                                    chart: this.chart,
                                    itemName: x(
                                        t.name,
                                        this.chart.renderer.forExport
                                    ),
                                    item: t,
                                }
                            ),
                            s = {
                                tabindex: -1,
                                "aria-pressed": t.visible,
                                "aria-label": i,
                            },
                            n = e.group.div ? e.label : e.group;
                        t.a11yProxyElement = this.proxyProvider.addProxyElement(
                            "legend",
                            { click: e.label, visual: n.element },
                            "button",
                            s
                        );
                    }
                    getKeyboardNavigation() {
                        let t = this.keyCodes,
                            e = this,
                            i = this.chart;
                        return new o(i, {
                            keyCodeMap: [
                                [
                                    [t.left, t.right, t.up, t.down],
                                    function (t) {
                                        return e.onKbdArrowKey(this, t);
                                    },
                                ],
                                [
                                    [t.enter, t.space],
                                    function () {
                                        return e.onKbdClick(this);
                                    },
                                ],
                                [
                                    [t.pageDown, t.pageUp],
                                    function (i) {
                                        let s = i === t.pageDown ? 1 : -1;
                                        return (
                                            e.highlightAdjacentLegendPage(s),
                                            this.response.success
                                        );
                                    },
                                ],
                            ],
                            validate: function () {
                                return e.shouldHaveLegendNavigation();
                            },
                            init: function () {
                                i.highlightLegendItem(0),
                                    (e.highlightedLegendItemIx = 0);
                            },
                            terminate: function () {
                                (e.highlightedLegendItemIx = -1),
                                    i.legend.allItems.forEach((t) => w(!1, t));
                            },
                        });
                    }
                    onKbdArrowKey(t, e) {
                        let {
                                keyCodes: { left: i, up: s },
                                highlightedLegendItemIx: n,
                                chart: o,
                            } = this,
                            r = o.legend.allItems.length,
                            a =
                                o.options.accessibility.keyboardNavigation
                                    .wrapAround,
                            l = e === i || e === s ? -1 : 1,
                            h = o.highlightLegendItem(n + l);
                        return (
                            h
                                ? (this.highlightedLegendItemIx += l)
                                : a &&
                                  r > 1 &&
                                  ((this.highlightedLegendItemIx =
                                      l > 0 ? 0 : r - 1),
                                  o.highlightLegendItem(
                                      this.highlightedLegendItemIx
                                  )),
                            t.response.success
                        );
                    }
                    onKbdClick(t) {
                        let e =
                            this.chart.legend.allItems[
                                this.highlightedLegendItemIx
                            ];
                        return (
                            e &&
                                e.a11yProxyElement &&
                                e.a11yProxyElement.click(),
                            t.response.success
                        );
                    }
                    shouldHaveLegendNavigation() {
                        if (!A(this.chart)) return !1;
                        let t = this.chart,
                            e = t.options.legend || {},
                            i = e.accessibility || {};
                        return !!(
                            t.legend.display &&
                            i.keyboardNavigation &&
                            i.keyboardNavigation.enabled
                        );
                    }
                    destroy() {
                        this.removeProxies();
                    }
                }
                return (
                    (function (t) {
                        function e(t) {
                            let e = this.legend.allItems,
                                i =
                                    this.accessibility &&
                                    this.accessibility.components.legend
                                        .highlightedLegendItemIx,
                                s = e[t],
                                n = s?.legendItem || {};
                            if (s) {
                                p(i) && e[i] && w(!1, e[i]),
                                    (function (t, e) {
                                        let i = (t.allItems[e].legendItem || {})
                                                .pageIx,
                                            s = t.currentPage;
                                        void 0 !== i &&
                                            i + 1 !== s &&
                                            t.scroll(1 + i - s);
                                    })(this.legend, t);
                                let o = n.label,
                                    r =
                                        s.a11yProxyElement &&
                                        s.a11yProxyElement.element;
                                return (
                                    o &&
                                        o.element &&
                                        r &&
                                        this.setFocusToElement(o, r),
                                    w(!0, s),
                                    !0
                                );
                            }
                            return !1;
                        }
                        function i(t) {
                            let e = this.chart,
                                i = e.options.accessibility,
                                s = t.item;
                            i.enabled &&
                                s &&
                                s.a11yProxyElement &&
                                s.a11yProxyElement.innerElement.setAttribute(
                                    "aria-pressed",
                                    t.visible ? "true" : "false"
                                );
                        }
                        t.compose = function t(s, n) {
                            if (m(h, t)) {
                                let t = s.prototype;
                                (t.highlightLegendItem = e),
                                    d(n, "afterColorizeItem", i);
                            }
                        };
                    })(C || (C = {})),
                    C
                );
            }
        ),
        i(
            e,
            "Core/Axis/NavigatorAxisComposition.js",
            [e["Core/Globals.js"], e["Core/Utilities.js"]],
            function (t, e) {
                let { composed: i, isTouchDevice: s } = t,
                    {
                        addEvent: n,
                        correctFloat: o,
                        defined: r,
                        isNumber: a,
                        pick: l,
                        pushUnique: h,
                    } = e;
                function c() {
                    this.navigatorAxis || (this.navigatorAxis = new u(this));
                }
                function d(t) {
                    let e = this.chart,
                        i = e.options,
                        n = i.navigator,
                        o = this.navigatorAxis,
                        a = e.zooming.pinchType,
                        l = i.rangeSelector,
                        h = e.zooming.type;
                    if (
                        this.isXAxis &&
                        ((n && n.enabled) || (l && l.enabled))
                    ) {
                        if ("y" === h) t.zoomed = !1;
                        else if (
                            ((!s && "xy" === h) || (s && "xy" === a)) &&
                            this.options.range
                        ) {
                            let e = o.previousZoom;
                            r(t.newMin)
                                ? (o.previousZoom = [this.min, this.max])
                                : e &&
                                  ((t.newMin = e[0]),
                                  (t.newMax = e[1]),
                                  (o.previousZoom = void 0));
                        }
                    }
                    void 0 !== t.zoomed && t.preventDefault();
                }
                class u {
                    static compose(t) {
                        h(i, this.compose) &&
                            (t.keepProps.push("navigatorAxis"),
                            n(t, "init", c),
                            n(t, "zoom", d));
                    }
                    constructor(t) {
                        this.axis = t;
                    }
                    destroy() {
                        this.axis = void 0;
                    }
                    toFixedRange(t, e, i, s) {
                        let n = this.axis,
                            h = n.chart,
                            c = l(i, n.translate(t, !0, !n.horiz)),
                            d = l(s, n.translate(e, !0, !n.horiz)),
                            u = h && h.fixedRange,
                            p = (n.pointRange || 0) / 2;
                        return (
                            r(i) || (c = o(c + p)),
                            r(s) || (d = o(d - p)),
                            u &&
                                n.dataMin &&
                                n.dataMax &&
                                (d >= n.dataMax && (c = o(n.dataMax - u)),
                                c <= n.dataMin && (d = o(n.dataMin + u))),
                            (a(c) && a(d)) || (c = d = void 0),
                            { min: c, max: d }
                        );
                    }
                }
                return u;
            }
        ),
        i(
            e,
            "Stock/Navigator/NavigatorDefaults.js",
            [e["Core/Color/Color.js"], e["Core/Series/SeriesRegistry.js"]],
            function (t, e) {
                let { parse: i } = t,
                    { seriesTypes: s } = e,
                    n = {
                        height: 40,
                        margin: 25,
                        maskInside: !0,
                        handles: {
                            width: 7,
                            height: 15,
                            symbols: ["navigator-handle", "navigator-handle"],
                            enabled: !0,
                            lineWidth: 1,
                            backgroundColor: "#f2f2f2",
                            borderColor: "#999999",
                        },
                        maskFill: i("#667aff").setOpacity(0.3).get(),
                        outlineColor: "#999999",
                        outlineWidth: 1,
                        series: {
                            type:
                                void 0 === s.areaspline ? "line" : "areaspline",
                            fillOpacity: 0.05,
                            lineWidth: 1,
                            compare: null,
                            sonification: { enabled: !1 },
                            dataGrouping: {
                                approximation: "average",
                                enabled: !0,
                                groupPixelWidth: 2,
                                firstAnchor: "firstPoint",
                                anchor: "middle",
                                lastAnchor: "lastPoint",
                                units: [
                                    [
                                        "millisecond",
                                        [
                                            1, 2, 5, 10, 20, 25, 50, 100, 200,
                                            500,
                                        ],
                                    ],
                                    ["second", [1, 2, 5, 10, 15, 30]],
                                    ["minute", [1, 2, 5, 10, 15, 30]],
                                    ["hour", [1, 2, 3, 4, 6, 8, 12]],
                                    ["day", [1, 2, 3, 4]],
                                    ["week", [1, 2, 3]],
                                    ["month", [1, 3, 6]],
                                    ["year", null],
                                ],
                            },
                            dataLabels: { enabled: !1, zIndex: 2 },
                            id: "highcharts-navigator-series",
                            className: "highcharts-navigator-series",
                            lineColor: null,
                            marker: { enabled: !1 },
                            threshold: null,
                        },
                        xAxis: {
                            overscroll: 0,
                            className: "highcharts-navigator-xaxis",
                            tickLength: 0,
                            lineWidth: 0,
                            gridLineColor: "#e6e6e6",
                            gridLineWidth: 1,
                            tickPixelInterval: 200,
                            labels: {
                                align: "left",
                                style: {
                                    color: "#000000",
                                    fontSize: "0.7em",
                                    opacity: 0.6,
                                    textOutline: "2px contrast",
                                },
                                x: 3,
                                y: -4,
                            },
                            crosshair: !1,
                        },
                        yAxis: {
                            className: "highcharts-navigator-yaxis",
                            gridLineWidth: 0,
                            startOnTick: !1,
                            endOnTick: !1,
                            minPadding: 0.1,
                            maxPadding: 0.1,
                            labels: { enabled: !1 },
                            crosshair: !1,
                            title: { text: null },
                            tickLength: 0,
                            tickWidth: 0,
                        },
                    };
                return n;
            }
        ),
        i(e, "Stock/Navigator/NavigatorSymbols.js", [], function () {
            return {
                "navigator-handle": function (t, e, i, s, n = {}) {
                    let o = n.width ? n.width / 2 : i,
                        r = Math.round(o / 3) + 0.5;
                    return [
                        ["M", -o - 1, 0.5],
                        ["L", o, 0.5],
                        ["L", o, (s = n.height || s) + 0.5],
                        ["L", -o - 1, s + 0.5],
                        ["L", -o - 1, 0.5],
                        ["M", -r, 4],
                        ["L", -r, s - 3],
                        ["M", r - 1, 4],
                        ["L", r - 1, s - 3],
                    ];
                },
            };
        }),
        i(
            e,
            "Stock/Navigator/NavigatorComposition.js",
            [
                e["Core/Defaults.js"],
                e["Core/Globals.js"],
                e["Core/Axis/NavigatorAxisComposition.js"],
                e["Stock/Navigator/NavigatorDefaults.js"],
                e["Stock/Navigator/NavigatorSymbols.js"],
                e["Core/Renderer/RendererRegistry.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, n, o, r) {
                let a;
                let { defaultOptions: l, setOptions: h } = t,
                    { composed: c, isTouchDevice: d } = e,
                    { getRendererType: u } = o,
                    {
                        addEvent: p,
                        extend: g,
                        merge: m,
                        pick: b,
                        pushUnique: f,
                    } = r;
                function x() {
                    this.navigator && this.navigator.setBaseSeries(null, !1);
                }
                function y() {
                    let t, e, i;
                    let s = this.legend,
                        n = this.navigator;
                    if (n) {
                        (t = s && s.options), (e = n.xAxis), (i = n.yAxis);
                        let { scrollbarHeight: o, scrollButtonSize: r } = n;
                        this.inverted
                            ? ((n.left = n.opposite
                                  ? this.chartWidth - o - n.height
                                  : this.spacing[3] + o),
                              (n.top = this.plotTop + r))
                            : ((n.left = b(e.left, this.plotLeft + r)),
                              (n.top =
                                  n.navigatorOptions.top ||
                                  this.chartHeight -
                                      n.height -
                                      o -
                                      (this.scrollbar?.options.margin || 0) -
                                      this.spacing[2] -
                                      (this.rangeSelector &&
                                      this.extraBottomMargin
                                          ? this.rangeSelector.getHeight()
                                          : 0) -
                                      (t &&
                                      "bottom" === t.verticalAlign &&
                                      "proximate" !== t.layout &&
                                      t.enabled &&
                                      !t.floating
                                          ? s.legendHeight + b(t.margin, 10)
                                          : 0) -
                                      (this.titleOffset
                                          ? this.titleOffset[2]
                                          : 0))),
                            e &&
                                i &&
                                (this.inverted
                                    ? (e.options.left = i.options.left = n.left)
                                    : (e.options.top = i.options.top = n.top),
                                e.setAxisSize(),
                                i.setAxisSize());
                    }
                }
                function v(t) {
                    !this.navigator &&
                        !this.scroller &&
                        (this.options.navigator.enabled ||
                            this.options.scrollbar.enabled) &&
                        ((this.scroller = this.navigator = new a(this)),
                        b(t.redraw, !0) && this.redraw(t.animation));
                }
                function A() {
                    let t = this.options;
                    (t.navigator.enabled || t.scrollbar.enabled) &&
                        (this.scroller = this.navigator = new a(this));
                }
                function w() {
                    let t = this.options,
                        e = t.navigator,
                        i = t.rangeSelector;
                    if (
                        ((e && e.enabled) || (i && i.enabled)) &&
                        ((!d && "x" === this.zooming.type) ||
                            (d && "x" === this.zooming.pinchType))
                    )
                        return !1;
                }
                function C(t) {
                    let e = t.navigator;
                    if (e && t.xAxis[0]) {
                        let i = t.xAxis[0].getExtremes();
                        e.render(i.min, i.max);
                    }
                }
                function E(t) {
                    let e = t.options.navigator || {},
                        i = t.options.scrollbar || {};
                    !this.navigator &&
                        !this.scroller &&
                        (e.enabled || i.enabled) &&
                        (m(!0, this.options.navigator, e),
                        m(!0, this.options.scrollbar, i),
                        delete t.options.navigator,
                        delete t.options.scrollbar);
                }
                function T() {
                    this.chart.navigator &&
                        !this.options.isInternal &&
                        this.chart.navigator.setBaseSeries(null, !1);
                }
                return {
                    compose: function t(e, o, r, h) {
                        if ((i.compose(e), (a = r), f(c, t))) {
                            let t = o.prototype;
                            t.callbacks.push(C),
                                p(o, "afterAddSeries", x),
                                p(o, "afterSetChartSize", y),
                                p(o, "afterUpdate", v),
                                p(o, "beforeRender", A),
                                p(o, "beforeShowResetZoom", w),
                                p(o, "update", E),
                                p(h, "afterUpdate", T),
                                g(u().prototype.symbols, n),
                                g(l, { navigator: s });
                        }
                    },
                };
            }
        ),
        i(
            e,
            "Core/Axis/ScrollbarAxis.js",
            [e["Core/Globals.js"], e["Core/Utilities.js"]],
            function (t, e) {
                var i;
                let { composed: s } = t,
                    { addEvent: n, defined: o, pick: r, pushUnique: a } = e;
                return (
                    (function (t) {
                        let e;
                        function i(t) {
                            let e = r(t.options && t.options.min, t.min),
                                i = r(t.options && t.options.max, t.max);
                            return {
                                axisMin: e,
                                axisMax: i,
                                scrollMin: o(t.dataMin)
                                    ? Math.min(
                                          e,
                                          t.min,
                                          t.dataMin,
                                          r(t.threshold, 1 / 0)
                                      )
                                    : e,
                                scrollMax: o(t.dataMax)
                                    ? Math.max(
                                          i,
                                          t.max,
                                          t.dataMax,
                                          r(t.threshold, -1 / 0)
                                      )
                                    : i,
                            };
                        }
                        function l() {
                            let t = this.scrollbar,
                                e = t && !t.options.opposite,
                                i = this.horiz ? 2 : e ? 3 : 1;
                            t &&
                                ((this.chart.scrollbarsOffsets = [0, 0]),
                                (this.chart.axisOffset[i] +=
                                    t.size + (t.options.margin || 0)));
                        }
                        function h() {
                            let t = this;
                            t.options &&
                                t.options.scrollbar &&
                                t.options.scrollbar.enabled &&
                                ((t.options.scrollbar.vertical = !t.horiz),
                                (t.options.startOnTick = t.options.endOnTick =
                                    !1),
                                (t.scrollbar = new e(
                                    t.chart.renderer,
                                    t.options.scrollbar,
                                    t.chart
                                )),
                                n(t.scrollbar, "changed", function (e) {
                                    let s, n;
                                    let {
                                            axisMin: r,
                                            axisMax: a,
                                            scrollMin: l,
                                            scrollMax: h,
                                        } = i(t),
                                        c = h - l;
                                    if (o(r) && o(a)) {
                                        if (
                                            ((t.horiz && !t.reversed) ||
                                            (!t.horiz && t.reversed)
                                                ? ((s = l + c * this.to),
                                                  (n = l + c * this.from))
                                                : ((s =
                                                      l + c * (1 - this.from)),
                                                  (n = l + c * (1 - this.to))),
                                            this.shouldUpdateExtremes(
                                                e.DOMType
                                            ))
                                        ) {
                                            let i =
                                                "mousemove" !== e.DOMType &&
                                                "touchmove" !== e.DOMType &&
                                                void 0;
                                            t.setExtremes(n, s, !0, i, e);
                                        } else
                                            this.setRange(this.from, this.to);
                                    }
                                }));
                        }
                        function c() {
                            let t, e, s;
                            let { scrollMin: n, scrollMax: r } = i(this),
                                a = this.scrollbar,
                                l =
                                    this.axisTitleMargin +
                                    (this.titleOffset || 0),
                                h = this.chart.scrollbarsOffsets,
                                c = this.options.margin || 0;
                            if (a && h) {
                                if (this.horiz)
                                    this.opposite || (h[1] += l),
                                        a.position(
                                            this.left,
                                            this.top +
                                                this.height +
                                                2 +
                                                h[1] -
                                                (this.opposite ? c : 0),
                                            this.width,
                                            this.height
                                        ),
                                        this.opposite || (h[1] += c),
                                        (t = 1);
                                else {
                                    let e;
                                    this.opposite && (h[0] += l),
                                        (e = a.options.opposite
                                            ? this.left +
                                              this.width +
                                              2 +
                                              h[0] -
                                              (this.opposite ? 0 : c)
                                            : this.opposite
                                            ? 0
                                            : c),
                                        a.position(
                                            e,
                                            this.top,
                                            this.width,
                                            this.height
                                        ),
                                        this.opposite && (h[0] += c),
                                        (t = 0);
                                }
                                (h[t] += a.size + (a.options.margin || 0)),
                                    isNaN(n) ||
                                    isNaN(r) ||
                                    !o(this.min) ||
                                    !o(this.max) ||
                                    this.min === this.max
                                        ? a.setRange(0, 1)
                                        : ((e = (this.min - n) / (r - n)),
                                          (s = (this.max - n) / (r - n)),
                                          (this.horiz && !this.reversed) ||
                                          (!this.horiz && this.reversed)
                                              ? a.setRange(e, s)
                                              : a.setRange(1 - s, 1 - e));
                            }
                        }
                        t.compose = function t(i, o) {
                            a(s, t) &&
                                ((e = o),
                                n(i, "afterGetOffset", l),
                                n(i, "afterInit", h),
                                n(i, "afterRender", c));
                        };
                    })(i || (i = {})),
                    i
                );
            }
        ),
        i(
            e,
            "Stock/Scrollbar/ScrollbarDefaults.js",
            [e["Core/Globals.js"]],
            function (t) {
                let { isTouchDevice: e } = t;
                return {
                    height: 10,
                    barBorderRadius: 5,
                    buttonBorderRadius: 0,
                    buttonsEnabled: !1,
                    liveRedraw: void 0,
                    margin: void 0,
                    minWidth: 6,
                    opposite: !0,
                    step: 0.2,
                    zIndex: 3,
                    barBackgroundColor: "#cccccc",
                    barBorderWidth: 0,
                    barBorderColor: "#cccccc",
                    buttonArrowColor: "#333333",
                    buttonBackgroundColor: "#e6e6e6",
                    buttonBorderColor: "#cccccc",
                    buttonBorderWidth: 1,
                    rifleColor: "none",
                    trackBackgroundColor: "rgba(255, 255, 255, 0.001)",
                    trackBorderColor: "#cccccc",
                    trackBorderRadius: 5,
                    trackBorderWidth: 1,
                };
            }
        ),
        i(
            e,
            "Stock/Scrollbar/Scrollbar.js",
            [
                e["Core/Defaults.js"],
                e["Core/Globals.js"],
                e["Core/Axis/ScrollbarAxis.js"],
                e["Stock/Scrollbar/ScrollbarDefaults.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, n) {
                let { defaultOptions: o } = t,
                    {
                        addEvent: r,
                        correctFloat: a,
                        defined: l,
                        destroyObjectProperties: h,
                        fireEvent: c,
                        merge: d,
                        pick: u,
                        removeEvent: p,
                    } = n;
                class g {
                    static compose(t) {
                        i.compose(t, g);
                    }
                    static swapXY(t, e) {
                        return (
                            e &&
                                t.forEach((t) => {
                                    let e;
                                    let i = t.length;
                                    for (let s = 0; s < i; s += 2)
                                        "number" == typeof (e = t[s + 1]) &&
                                            ((t[s + 1] = t[s + 2]),
                                            (t[s + 2] = e));
                                }),
                            t
                        );
                    }
                    constructor(t, e, i) {
                        (this._events = []),
                            (this.chartX = 0),
                            (this.chartY = 0),
                            (this.from = 0),
                            (this.scrollbarButtons = []),
                            (this.scrollbarLeft = 0),
                            (this.scrollbarStrokeWidth = 1),
                            (this.scrollbarTop = 0),
                            (this.size = 0),
                            (this.to = 0),
                            (this.trackBorderWidth = 1),
                            (this.x = 0),
                            (this.y = 0),
                            this.init(t, e, i);
                    }
                    addEvents() {
                        let t = this.options.inverted ? [1, 0] : [0, 1],
                            i = this.scrollbarButtons,
                            s = this.scrollbarGroup.element,
                            n = this.track.element,
                            o = this.mouseDownHandler.bind(this),
                            a = this.mouseMoveHandler.bind(this),
                            l = this.mouseUpHandler.bind(this),
                            h = [
                                [
                                    i[t[0]].element,
                                    "click",
                                    this.buttonToMinClick.bind(this),
                                ],
                                [
                                    i[t[1]].element,
                                    "click",
                                    this.buttonToMaxClick.bind(this),
                                ],
                                [n, "click", this.trackClick.bind(this)],
                                [s, "mousedown", o],
                                [s.ownerDocument, "mousemove", a],
                                [s.ownerDocument, "mouseup", l],
                            ];
                        e.hasTouch &&
                            h.push(
                                [s, "touchstart", o],
                                [s.ownerDocument, "touchmove", a],
                                [s.ownerDocument, "touchend", l]
                            ),
                            h.forEach(function (t) {
                                r.apply(null, t);
                            }),
                            (this._events = h);
                    }
                    buttonToMaxClick(t) {
                        let e =
                            (this.to - this.from) * u(this.options.step, 0.2);
                        this.updatePosition(this.from + e, this.to + e),
                            c(this, "changed", {
                                from: this.from,
                                to: this.to,
                                trigger: "scrollbar",
                                DOMEvent: t,
                            });
                    }
                    buttonToMinClick(t) {
                        let e =
                            a(this.to - this.from) * u(this.options.step, 0.2);
                        this.updatePosition(a(this.from - e), a(this.to - e)),
                            c(this, "changed", {
                                from: this.from,
                                to: this.to,
                                trigger: "scrollbar",
                                DOMEvent: t,
                            });
                    }
                    cursorToScrollbarPosition(t) {
                        let e = this.options,
                            i =
                                e.minWidth > this.calculatedWidth
                                    ? e.minWidth
                                    : 0;
                        return {
                            chartX:
                                (t.chartX - this.x - this.xOffset) /
                                (this.barWidth - i),
                            chartY:
                                (t.chartY - this.y - this.yOffset) /
                                (this.barWidth - i),
                        };
                    }
                    destroy() {
                        let t = this,
                            e = t.chart.scroller;
                        t.removeEvents(),
                            [
                                "track",
                                "scrollbarRifles",
                                "scrollbar",
                                "scrollbarGroup",
                                "group",
                            ].forEach(function (e) {
                                t[e] && t[e].destroy && (t[e] = t[e].destroy());
                            }),
                            e &&
                                t === e.scrollbar &&
                                ((e.scrollbar = null), h(e.scrollbarButtons));
                    }
                    drawScrollbarButton(t) {
                        let e = this.renderer,
                            i = this.scrollbarButtons,
                            s = this.options,
                            n = this.size,
                            o = e.g().add(this.group);
                        if ((i.push(o), s.buttonsEnabled)) {
                            let r = e
                                .rect()
                                .addClass("highcharts-scrollbar-button")
                                .add(o);
                            this.chart.styledMode ||
                                r.attr({
                                    stroke: s.buttonBorderColor,
                                    "stroke-width": s.buttonBorderWidth,
                                    fill: s.buttonBackgroundColor,
                                }),
                                r.attr(
                                    r.crisp(
                                        {
                                            x: -0.5,
                                            y: -0.5,
                                            width: n + 1,
                                            height: n + 1,
                                            r: s.buttonBorderRadius,
                                        },
                                        r.strokeWidth()
                                    )
                                );
                            let a = e
                                .path(
                                    g.swapXY(
                                        [
                                            [
                                                "M",
                                                n / 2 + (t ? -1 : 1),
                                                n / 2 - 3,
                                            ],
                                            [
                                                "L",
                                                n / 2 + (t ? -1 : 1),
                                                n / 2 + 3,
                                            ],
                                            ["L", n / 2 + (t ? 2 : -2), n / 2],
                                        ],
                                        s.vertical
                                    )
                                )
                                .addClass("highcharts-scrollbar-arrow")
                                .add(i[t]);
                            this.chart.styledMode ||
                                a.attr({ fill: s.buttonArrowColor });
                        }
                    }
                    init(t, e, i) {
                        (this.scrollbarButtons = []),
                            (this.renderer = t),
                            (this.userOptions = e),
                            (this.options = d(s, o.scrollbar, e)),
                            (this.options.margin = u(this.options.margin, 10)),
                            (this.chart = i),
                            (this.size = u(
                                this.options.size,
                                this.options.height
                            )),
                            e.enabled && (this.render(), this.addEvents());
                    }
                    mouseDownHandler(t) {
                        let e = this.chart.pointer.normalize(t),
                            i = this.cursorToScrollbarPosition(e);
                        (this.chartX = i.chartX),
                            (this.chartY = i.chartY),
                            (this.initPositions = [this.from, this.to]),
                            (this.grabbedCenter = !0);
                    }
                    mouseMoveHandler(t) {
                        let e;
                        let i = this.chart.pointer.normalize(t),
                            s = this.options,
                            n = s.vertical ? "chartY" : "chartX",
                            o = this.initPositions || [];
                        this.grabbedCenter &&
                            (!t.touches || 0 !== t.touches[0][n]) &&
                            ((e =
                                this.cursorToScrollbarPosition(i)[n] - this[n]),
                            (this.hasDragged = !0),
                            this.updatePosition(o[0] + e, o[1] + e),
                            this.hasDragged &&
                                c(this, "changed", {
                                    from: this.from,
                                    to: this.to,
                                    trigger: "scrollbar",
                                    DOMType: t.type,
                                    DOMEvent: t,
                                }));
                    }
                    mouseUpHandler(t) {
                        this.hasDragged &&
                            c(this, "changed", {
                                from: this.from,
                                to: this.to,
                                trigger: "scrollbar",
                                DOMType: t.type,
                                DOMEvent: t,
                            }),
                            (this.grabbedCenter =
                                this.hasDragged =
                                this.chartX =
                                this.chartY =
                                    null);
                    }
                    position(t, e, i, s) {
                        let n = this.options,
                            {
                                buttonsEnabled: o,
                                margin: r = 0,
                                vertical: a,
                            } = n,
                            l = this.rendered ? "animate" : "attr",
                            h = s,
                            c = 0;
                        this.group.show(),
                            (this.x = t),
                            (this.y = e + this.trackBorderWidth),
                            (this.width = i),
                            (this.height = s),
                            (this.xOffset = h),
                            (this.yOffset = c),
                            a
                                ? ((this.width =
                                      this.yOffset =
                                      i =
                                      c =
                                          this.size),
                                  (this.xOffset = h = 0),
                                  (this.yOffset = c = o ? this.size : 0),
                                  (this.barWidth = s - (o ? 2 * i : 0)),
                                  (this.x = t += r))
                                : ((this.height = s = this.size),
                                  (this.xOffset = h = o ? this.size : 0),
                                  (this.barWidth = i - (o ? 2 * s : 0)),
                                  (this.y = this.y + r)),
                            this.group[l]({
                                translateX: t,
                                translateY: this.y,
                            }),
                            this.track[l]({ width: i, height: s }),
                            this.scrollbarButtons[1][l]({
                                translateX: a ? 0 : i - h,
                                translateY: a ? s - c : 0,
                            });
                    }
                    removeEvents() {
                        this._events.forEach(function (t) {
                            p.apply(null, t);
                        }),
                            (this._events.length = 0);
                    }
                    render() {
                        let t = this.renderer,
                            e = this.options,
                            i = this.size,
                            s = this.chart.styledMode,
                            n = t
                                .g("scrollbar")
                                .attr({ zIndex: e.zIndex })
                                .hide()
                                .add();
                        (this.group = n),
                            (this.track = t
                                .rect()
                                .addClass("highcharts-scrollbar-track")
                                .attr({
                                    r: e.trackBorderRadius || 0,
                                    height: i,
                                    width: i,
                                })
                                .add(n)),
                            s ||
                                this.track.attr({
                                    fill: e.trackBackgroundColor,
                                    stroke: e.trackBorderColor,
                                    "stroke-width": e.trackBorderWidth,
                                });
                        let o = (this.trackBorderWidth =
                            this.track.strokeWidth());
                        this.track.attr({ x: (-o % 2) / 2, y: (-o % 2) / 2 }),
                            (this.scrollbarGroup = t.g().add(n)),
                            (this.scrollbar = t
                                .rect()
                                .addClass("highcharts-scrollbar-thumb")
                                .attr({
                                    height: i - o,
                                    width: i - o,
                                    r: e.barBorderRadius || 0,
                                })
                                .add(this.scrollbarGroup)),
                            (this.scrollbarRifles = t
                                .path(
                                    g.swapXY(
                                        [
                                            ["M", -3, i / 4],
                                            ["L", -3, (2 * i) / 3],
                                            ["M", 0, i / 4],
                                            ["L", 0, (2 * i) / 3],
                                            ["M", 3, i / 4],
                                            ["L", 3, (2 * i) / 3],
                                        ],
                                        e.vertical
                                    )
                                )
                                .addClass("highcharts-scrollbar-rifles")
                                .add(this.scrollbarGroup)),
                            s ||
                                (this.scrollbar.attr({
                                    fill: e.barBackgroundColor,
                                    stroke: e.barBorderColor,
                                    "stroke-width": e.barBorderWidth,
                                }),
                                this.scrollbarRifles.attr({
                                    stroke: e.rifleColor,
                                    "stroke-width": 1,
                                })),
                            (this.scrollbarStrokeWidth =
                                this.scrollbar.strokeWidth()),
                            this.scrollbarGroup.translate(
                                (-this.scrollbarStrokeWidth % 2) / 2,
                                (-this.scrollbarStrokeWidth % 2) / 2
                            ),
                            this.drawScrollbarButton(0),
                            this.drawScrollbarButton(1);
                    }
                    setRange(t, e) {
                        let i, s;
                        let n = this.options,
                            o = n.vertical,
                            r = n.minWidth,
                            h = this.barWidth,
                            c =
                                !this.rendered ||
                                this.hasDragged ||
                                (this.chart.navigator &&
                                    this.chart.navigator.hasDragged)
                                    ? "attr"
                                    : "animate";
                        if (!l(h)) return;
                        let d = h * Math.min(e, 1);
                        (i = Math.ceil(h * (t = Math.max(t, 0)))),
                            (this.calculatedWidth = s = a(d - i)),
                            s < r && ((i = (h - r + s) * t), (s = r));
                        let u = Math.floor(i + this.xOffset + this.yOffset),
                            p = s / 2 - 0.5;
                        (this.from = t),
                            (this.to = e),
                            o
                                ? (this.scrollbarGroup[c]({ translateY: u }),
                                  this.scrollbar[c]({ height: s }),
                                  this.scrollbarRifles[c]({ translateY: p }),
                                  (this.scrollbarTop = u),
                                  (this.scrollbarLeft = 0))
                                : (this.scrollbarGroup[c]({ translateX: u }),
                                  this.scrollbar[c]({ width: s }),
                                  this.scrollbarRifles[c]({ translateX: p }),
                                  (this.scrollbarLeft = u),
                                  (this.scrollbarTop = 0)),
                            s <= 12
                                ? this.scrollbarRifles.hide()
                                : this.scrollbarRifles.show(),
                            !1 === n.showFull &&
                                (t <= 0 && e >= 1
                                    ? this.group.hide()
                                    : this.group.show()),
                            (this.rendered = !0);
                    }
                    shouldUpdateExtremes(t) {
                        return (
                            u(
                                this.options.liveRedraw,
                                e.svg && !e.isTouchDevice && !this.chart.boosted
                            ) ||
                            "mouseup" === t ||
                            "touchend" === t ||
                            !l(t)
                        );
                    }
                    trackClick(t) {
                        let e = this.chart.pointer.normalize(t),
                            i = this.to - this.from,
                            s = this.y + this.scrollbarTop,
                            n = this.x + this.scrollbarLeft;
                        (this.options.vertical && e.chartY > s) ||
                        (!this.options.vertical && e.chartX > n)
                            ? this.updatePosition(this.from + i, this.to + i)
                            : this.updatePosition(this.from - i, this.to - i),
                            c(this, "changed", {
                                from: this.from,
                                to: this.to,
                                trigger: "scrollbar",
                                DOMEvent: t,
                            });
                    }
                    update(t) {
                        this.destroy(),
                            this.init(
                                this.chart.renderer,
                                d(!0, this.options, t),
                                this.chart
                            );
                    }
                    updatePosition(t, e) {
                        e > 1 && ((t = a(1 - a(e - t))), (e = 1)),
                            t < 0 && ((e = a(e - t)), (t = 0)),
                            (this.from = t),
                            (this.to = e);
                    }
                }
                return (
                    (g.defaultOptions = s),
                    (o.scrollbar = d(!0, g.defaultOptions, o.scrollbar)),
                    g
                );
            }
        ),
        i(
            e,
            "Stock/Navigator/Navigator.js",
            [
                e["Core/Axis/Axis.js"],
                e["Core/Defaults.js"],
                e["Core/Globals.js"],
                e["Core/Axis/NavigatorAxisComposition.js"],
                e["Stock/Navigator/NavigatorComposition.js"],
                e["Stock/Scrollbar/Scrollbar.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, n, o, r) {
                let { defaultOptions: a } = e,
                    { hasTouch: l, isTouchDevice: h } = i,
                    {
                        addEvent: c,
                        clamp: d,
                        correctFloat: u,
                        defined: p,
                        destroyObjectProperties: g,
                        erase: m,
                        extend: b,
                        find: f,
                        fireEvent: x,
                        isArray: y,
                        isNumber: v,
                        merge: A,
                        pick: w,
                        removeEvent: C,
                        splat: E,
                    } = r;
                function T(t, ...e) {
                    let i = [].filter.call(e, v);
                    if (i.length) return Math[t].apply(0, i);
                }
                class M {
                    static compose(t, e, i) {
                        n.compose(t, e, M, i);
                    }
                    constructor(t) {
                        (this.scrollbarHeight = 0), this.init(t);
                    }
                    drawHandle(t, e, i, s) {
                        let n = this.navigatorOptions.handles.height;
                        this.handles[e][s](
                            i
                                ? {
                                      translateX: Math.round(
                                          this.left + this.height / 2
                                      ),
                                      translateY: Math.round(
                                          this.top + parseInt(t, 10) + 0.5 - n
                                      ),
                                  }
                                : {
                                      translateX: Math.round(
                                          this.left + parseInt(t, 10)
                                      ),
                                      translateY: Math.round(
                                          this.top + this.height / 2 - n / 2 - 1
                                      ),
                                  }
                        );
                    }
                    drawOutline(t, e, i, s) {
                        let n = this.navigatorOptions.maskInside,
                            o = this.outline.strokeWidth(),
                            r = o / 2,
                            a = (o % 2) / 2,
                            l = this.scrollButtonSize,
                            h = this.size,
                            c = this.top,
                            d = this.height,
                            u = c - r,
                            p = c + d,
                            g = this.left,
                            m,
                            b;
                        i
                            ? ((m = c + e + a),
                              (e = c + t + a),
                              (b = [
                                  ["M", g + d, c - l - a],
                                  ["L", g + d, m],
                                  ["L", g, m],
                                  ["M", g, e],
                                  ["L", g + d, e],
                                  ["L", g + d, c + h + l],
                              ]),
                              n &&
                                  b.push(
                                      ["M", g + d, m - r],
                                      ["L", g + d, e + r]
                                  ))
                            : ((g -= l),
                              (t += g + l - a),
                              (e += g + l - a),
                              (b = [
                                  ["M", g, u],
                                  ["L", t, u],
                                  ["L", t, p],
                                  ["M", e, p],
                                  ["L", e, u],
                                  ["L", g + h + 2 * l, c + r],
                              ]),
                              n && b.push(["M", t - r, u], ["L", e + r, u])),
                            this.outline[s]({ d: b });
                    }
                    drawMasks(t, e, i, s) {
                        let n, o, r, a;
                        let l = this.left,
                            h = this.top,
                            c = this.height;
                        i
                            ? ((r = [l, l, l]),
                              (a = [h, h + t, h + e]),
                              (o = [c, c, c]),
                              (n = [t, e - t, this.size - e]))
                            : ((r = [l, l + t, l + e]),
                              (a = [h, h, h]),
                              (o = [t, e - t, this.size - e]),
                              (n = [c, c, c])),
                            this.shades.forEach((t, e) => {
                                t[s]({
                                    x: r[e],
                                    y: a[e],
                                    width: o[e],
                                    height: n[e],
                                });
                            });
                    }
                    renderElements() {
                        let t = this,
                            e = t.navigatorOptions,
                            i = e.maskInside,
                            s = t.chart,
                            n = s.inverted,
                            o = s.renderer,
                            r = { cursor: n ? "ns-resize" : "ew-resize" },
                            a = (t.navigatorGroup = o
                                .g("navigator")
                                .attr({ zIndex: 8, visibility: "hidden" })
                                .add());
                        if (
                            ([!i, i, !i].forEach((i, n) => {
                                let l = o
                                    .rect()
                                    .addClass(
                                        "highcharts-navigator-mask" +
                                            (1 === n ? "-inside" : "-outside")
                                    )
                                    .add(a);
                                s.styledMode ||
                                    (l.attr({
                                        fill: i ? e.maskFill : "rgba(0,0,0,0)",
                                    }),
                                    1 === n && l.css(r)),
                                    (t.shades[n] = l);
                            }),
                            (t.outline = o
                                .path()
                                .addClass("highcharts-navigator-outline")
                                .add(a)),
                            s.styledMode ||
                                t.outline.attr({
                                    "stroke-width": e.outlineWidth,
                                    stroke: e.outlineColor,
                                }),
                            e.handles && e.handles.enabled)
                        ) {
                            let i = e.handles,
                                { height: n, width: l } = i;
                            [0, 1].forEach((e) => {
                                (t.handles[e] = o.symbol(
                                    i.symbols[e],
                                    -l / 2 - 1,
                                    0,
                                    l,
                                    n,
                                    i
                                )),
                                    s.inverted &&
                                        t.handles[e].attr({
                                            rotation: 90,
                                            rotationOriginX: Math.floor(-l / 2),
                                            rotationOriginY: (n + l) / 2,
                                        }),
                                    t.handles[e]
                                        .attr({ zIndex: 7 - e })
                                        .addClass(
                                            "highcharts-navigator-handle highcharts-navigator-handle-" +
                                                ["left", "right"][e]
                                        )
                                        .add(a),
                                    s.styledMode ||
                                        t.handles[e]
                                            .attr({
                                                fill: i.backgroundColor,
                                                stroke: i.borderColor,
                                                "stroke-width": i.lineWidth,
                                            })
                                            .css(r);
                            });
                        }
                    }
                    update(t) {
                        (this.series || []).forEach((t) => {
                            t.baseSeries && delete t.baseSeries.navigatorSeries;
                        }),
                            this.destroy();
                        let e = this.chart.options;
                        A(!0, e.navigator, t), this.init(this.chart);
                    }
                    render(t, e, i, s) {
                        let n = this.chart,
                            o = this.xAxis,
                            r = o.pointRange || 0,
                            a = o.navigatorAxis.fake ? n.xAxis[0] : o,
                            l = this.navigatorEnabled,
                            h = this.rendered,
                            c = n.inverted,
                            g = n.xAxis[0].minRange,
                            m = n.xAxis[0].options.maxRange,
                            b = this.scrollButtonSize,
                            f,
                            y,
                            A,
                            C = this.scrollbarHeight,
                            E,
                            T;
                        if (this.hasDragged && !p(i)) return;
                        if (
                            ((t = u(t - r / 2)),
                            (e = u(e + r / 2)),
                            !v(t) || !v(e))
                        ) {
                            if (!h) return;
                            (i = 0), (s = w(o.width, a.width));
                        }
                        this.left = w(
                            o.left,
                            n.plotLeft + b + (c ? n.plotWidth : 0)
                        );
                        let M =
                            (this.size =
                            E =
                                w(
                                    o.len,
                                    (c ? n.plotHeight : n.plotWidth) - 2 * b
                                ));
                        (f = c ? C : E + 2 * b),
                            (i = w(i, o.toPixels(t, !0))),
                            (s = w(s, o.toPixels(e, !0))),
                            (v(i) && Math.abs(i) !== 1 / 0) ||
                                ((i = 0), (s = f));
                        let S = o.toValue(i, !0),
                            k = o.toValue(s, !0),
                            P = Math.abs(u(k - S));
                        P < g
                            ? this.grabbedLeft
                                ? (i = o.toPixels(k - g - r, !0))
                                : this.grabbedRight &&
                                  (s = o.toPixels(S + g + r, !0))
                            : p(m) &&
                              u(P - r) > m &&
                              (this.grabbedLeft
                                  ? (i = o.toPixels(k - m - r, !0))
                                  : this.grabbedRight &&
                                    (s = o.toPixels(S + m + r, !0))),
                            (this.zoomedMax = d(Math.max(i, s), 0, M)),
                            (this.zoomedMin = d(
                                this.fixedWidth
                                    ? this.zoomedMax - this.fixedWidth
                                    : Math.min(i, s),
                                0,
                                M
                            )),
                            (this.range = this.zoomedMax - this.zoomedMin),
                            (M = Math.round(this.zoomedMax));
                        let B = Math.round(this.zoomedMin);
                        l &&
                            (this.navigatorGroup.attr({
                                visibility: "inherit",
                            }),
                            (T = h && !this.hasDragged ? "animate" : "attr"),
                            this.drawMasks(B, M, c, T),
                            this.drawOutline(B, M, c, T),
                            this.navigatorOptions.handles.enabled &&
                                (this.drawHandle(B, 0, c, T),
                                this.drawHandle(M, 1, c, T))),
                            this.scrollbar &&
                                (c
                                    ? ((A = this.top - b),
                                      (y =
                                          this.left -
                                          C +
                                          (l || !a.opposite
                                              ? 0
                                              : (a.titleOffset || 0) +
                                                a.axisTitleMargin)),
                                      (C = E + 2 * b))
                                    : ((A = this.top + (l ? this.height : -C)),
                                      (y = this.left - b)),
                                this.scrollbar.position(y, A, f, C),
                                this.scrollbar.setRange(
                                    this.zoomedMin / (E || 1),
                                    this.zoomedMax / (E || 1)
                                )),
                            (this.rendered = !0),
                            x(this, "afterRender");
                    }
                    addMouseEvents() {
                        let t = this,
                            e = t.chart,
                            i = e.container,
                            s = [],
                            n,
                            o;
                        (t.mouseMoveHandler = n =
                            function (e) {
                                t.onMouseMove(e);
                            }),
                            (t.mouseUpHandler = o =
                                function (e) {
                                    t.onMouseUp(e);
                                }),
                            (s = t.getPartsEvents("mousedown")).push(
                                c(e.renderTo, "mousemove", n),
                                c(i.ownerDocument, "mouseup", o)
                            ),
                            l &&
                                (s.push(
                                    c(e.renderTo, "touchmove", n),
                                    c(i.ownerDocument, "touchend", o)
                                ),
                                s.concat(t.getPartsEvents("touchstart"))),
                            (t.eventsToUnbind = s),
                            t.series &&
                                t.series[0] &&
                                s.push(
                                    c(
                                        t.series[0].xAxis,
                                        "foundExtremes",
                                        function () {
                                            e.navigator.modifyNavigatorAxisExtremes();
                                        }
                                    )
                                );
                    }
                    getPartsEvents(t) {
                        let e = this,
                            i = [];
                        return (
                            ["shades", "handles"].forEach(function (s) {
                                e[s].forEach(function (n, o) {
                                    i.push(
                                        c(n.element, t, function (t) {
                                            e[s + "Mousedown"](t, o);
                                        })
                                    );
                                });
                            }),
                            i
                        );
                    }
                    shadesMousedown(t, e) {
                        t = this.chart.pointer.normalize(t);
                        let i = this.chart,
                            s = this.xAxis,
                            n = this.zoomedMin,
                            o = this.size,
                            r = this.range,
                            a = this.left,
                            l = t.chartX,
                            h,
                            c,
                            d,
                            u;
                        i.inverted && ((l = t.chartY), (a = this.top)),
                            1 === e
                                ? ((this.grabbedCenter = l),
                                  (this.fixedWidth = r),
                                  (this.dragOffset = l - n))
                                : ((u = l - a - r / 2),
                                  0 === e
                                      ? (u = Math.max(0, u))
                                      : 2 === e &&
                                        u + r >= o &&
                                        ((u = o - r),
                                        this.reversedExtremes
                                            ? ((u -= r),
                                              (c =
                                                  this.getUnionExtremes()
                                                      .dataMin))
                                            : (h =
                                                  this.getUnionExtremes()
                                                      .dataMax)),
                                  u !== n &&
                                      ((this.fixedWidth = r),
                                      p(
                                          (d = s.navigatorAxis.toFixedRange(
                                              u,
                                              u + r,
                                              c,
                                              h
                                          )).min
                                      ) &&
                                          i.xAxis[0].setExtremes(
                                              Math.min(d.min, d.max),
                                              Math.max(d.min, d.max),
                                              !0,
                                              null,
                                              { trigger: "navigator" }
                                          )));
                    }
                    handlesMousedown(t, e) {
                        t = this.chart.pointer.normalize(t);
                        let i = this.chart,
                            s = i.xAxis[0],
                            n = this.reversedExtremes;
                        0 === e
                            ? ((this.grabbedLeft = !0),
                              (this.otherHandlePos = this.zoomedMax),
                              (this.fixedExtreme = n ? s.min : s.max))
                            : ((this.grabbedRight = !0),
                              (this.otherHandlePos = this.zoomedMin),
                              (this.fixedExtreme = n ? s.max : s.min)),
                            (i.fixedRange = null);
                    }
                    onMouseMove(t) {
                        let e = this,
                            i = e.chart,
                            s = e.navigatorSize,
                            n = e.range,
                            o = e.dragOffset,
                            r = i.inverted,
                            a = e.left,
                            l;
                        (!t.touches || 0 !== t.touches[0].pageX) &&
                            ((l = (t = i.pointer.normalize(t)).chartX),
                            r && ((a = e.top), (l = t.chartY)),
                            e.grabbedLeft
                                ? ((e.hasDragged = !0),
                                  e.render(0, 0, l - a, e.otherHandlePos))
                                : e.grabbedRight
                                ? ((e.hasDragged = !0),
                                  e.render(0, 0, e.otherHandlePos, l - a))
                                : e.grabbedCenter &&
                                  ((e.hasDragged = !0),
                                  l < o
                                      ? (l = o)
                                      : l > s + o - n && (l = s + o - n),
                                  e.render(0, 0, l - o, l - o + n)),
                            e.hasDragged &&
                                e.scrollbar &&
                                w(
                                    e.scrollbar.options.liveRedraw,
                                    !h && !this.chart.boosted
                                ) &&
                                ((t.DOMType = t.type),
                                setTimeout(function () {
                                    e.onMouseUp(t);
                                }, 0)));
                    }
                    onMouseUp(t) {
                        let e, i, s, n, o, r;
                        let a = this.chart,
                            l = this.xAxis,
                            h = this.scrollbar,
                            c = t.DOMEvent || t,
                            d = a.inverted,
                            u =
                                this.rendered && !this.hasDragged
                                    ? "animate"
                                    : "attr";
                        ((this.hasDragged && (!h || !h.hasDragged)) ||
                            "scrollbar" === t.trigger) &&
                            ((s = this.getUnionExtremes()),
                            this.zoomedMin === this.otherHandlePos
                                ? (n = this.fixedExtreme)
                                : this.zoomedMax === this.otherHandlePos &&
                                  (o = this.fixedExtreme),
                            this.zoomedMax === this.size &&
                                (o = this.reversedExtremes
                                    ? s.dataMin
                                    : s.dataMax),
                            0 === this.zoomedMin &&
                                (n = this.reversedExtremes
                                    ? s.dataMax
                                    : s.dataMin),
                            p(
                                (r = l.navigatorAxis.toFixedRange(
                                    this.zoomedMin,
                                    this.zoomedMax,
                                    n,
                                    o
                                )).min
                            ) &&
                                a.xAxis[0].setExtremes(
                                    Math.min(r.min, r.max),
                                    Math.max(r.min, r.max),
                                    !0,
                                    !this.hasDragged && null,
                                    {
                                        trigger: "navigator",
                                        triggerOp: "navigator-drag",
                                        DOMEvent: c,
                                    }
                                )),
                            "mousemove" !== t.DOMType &&
                                "touchmove" !== t.DOMType &&
                                (this.grabbedLeft =
                                    this.grabbedRight =
                                    this.grabbedCenter =
                                    this.fixedWidth =
                                    this.fixedExtreme =
                                    this.otherHandlePos =
                                    this.hasDragged =
                                    this.dragOffset =
                                        null),
                            this.navigatorEnabled &&
                                v(this.zoomedMin) &&
                                v(this.zoomedMax) &&
                                ((i = Math.round(this.zoomedMin)),
                                (e = Math.round(this.zoomedMax)),
                                this.shades && this.drawMasks(i, e, d, u),
                                this.outline && this.drawOutline(i, e, d, u),
                                this.navigatorOptions.handles.enabled &&
                                    Object.keys(this.handles).length ===
                                        this.handles.length &&
                                    (this.drawHandle(i, 0, d, u),
                                    this.drawHandle(e, 1, d, u)));
                    }
                    removeEvents() {
                        this.eventsToUnbind &&
                            (this.eventsToUnbind.forEach(function (t) {
                                t();
                            }),
                            (this.eventsToUnbind = void 0)),
                            this.removeBaseSeriesEvents();
                    }
                    removeBaseSeriesEvents() {
                        let t = this.baseSeries || [];
                        this.navigatorEnabled &&
                            t[0] &&
                            (!1 !== this.navigatorOptions.adaptToUpdatedData &&
                                t.forEach(function (t) {
                                    C(
                                        t,
                                        "updatedData",
                                        this.updatedDataHandler
                                    );
                                }, this),
                            t[0].xAxis &&
                                C(
                                    t[0].xAxis,
                                    "foundExtremes",
                                    this.modifyBaseAxisExtremes
                                ));
                    }
                    init(e) {
                        let i = e.options,
                            n = i.navigator || {},
                            r = n.enabled,
                            a = i.scrollbar || {},
                            l = a.enabled,
                            h = (r && n.height) || 0,
                            d = (l && a.height) || 0,
                            u = (a.buttonsEnabled && d) || 0;
                        (this.handles = []),
                            (this.shades = []),
                            (this.chart = e),
                            this.setBaseSeries(),
                            (this.height = h),
                            (this.scrollbarHeight = d),
                            (this.scrollButtonSize = u),
                            (this.scrollbarEnabled = l),
                            (this.navigatorEnabled = r),
                            (this.navigatorOptions = n),
                            (this.scrollbarOptions = a),
                            (this.opposite = w(
                                n.opposite,
                                !!(!r && e.inverted)
                            ));
                        let p = this,
                            g = p.baseSeries,
                            m = e.xAxis.length,
                            b = e.yAxis.length,
                            f = (g && g[0] && g[0].xAxis) ||
                                e.xAxis[0] || { options: {} };
                        if (
                            ((e.isDirtyBox = !0),
                            p.navigatorEnabled
                                ? ((p.xAxis = new t(
                                      e,
                                      A(
                                          {
                                              breaks: f.options.breaks,
                                              ordinal: f.options.ordinal,
                                          },
                                          n.xAxis,
                                          {
                                              id: "navigator-x-axis",
                                              yAxis: "navigator-y-axis",
                                              type: "datetime",
                                              index: m,
                                              isInternal: !0,
                                              offset: 0,
                                              keepOrdinalPadding: !0,
                                              startOnTick: !1,
                                              endOnTick: !1,
                                              minPadding: 0,
                                              maxPadding: 0,
                                              zoomEnabled: !1,
                                          },
                                          e.inverted
                                              ? {
                                                    offsets: [u, 0, -u, 0],
                                                    width: h,
                                                }
                                              : {
                                                    offsets: [0, -u, 0, u],
                                                    height: h,
                                                }
                                      ),
                                      "xAxis"
                                  )),
                                  (p.yAxis = new t(
                                      e,
                                      A(
                                          n.yAxis,
                                          {
                                              id: "navigator-y-axis",
                                              alignTicks: !1,
                                              offset: 0,
                                              index: b,
                                              isInternal: !0,
                                              reversed: w(
                                                  n.yAxis && n.yAxis.reversed,
                                                  e.yAxis[0] &&
                                                      e.yAxis[0].reversed,
                                                  !1
                                              ),
                                              zoomEnabled: !1,
                                          },
                                          e.inverted
                                              ? { width: h }
                                              : { height: h }
                                      ),
                                      "yAxis"
                                  )),
                                  g || n.series.data
                                      ? p.updateNavigatorSeries(!1)
                                      : 0 === e.series.length &&
                                        (p.unbindRedraw = c(
                                            e,
                                            "beforeRedraw",
                                            function () {
                                                e.series.length > 0 &&
                                                    !p.series &&
                                                    (p.setBaseSeries(),
                                                    p.unbindRedraw());
                                            }
                                        )),
                                  (p.reversedExtremes =
                                      (e.inverted && !p.xAxis.reversed) ||
                                      (!e.inverted && p.xAxis.reversed)),
                                  p.renderElements(),
                                  p.addMouseEvents())
                                : ((p.xAxis = {
                                      chart: e,
                                      navigatorAxis: { fake: !0 },
                                      translate: function (t, i) {
                                          let s = e.xAxis[0],
                                              n = s.getExtremes(),
                                              o = s.len - 2 * u,
                                              r = T(
                                                  "min",
                                                  s.options.min,
                                                  n.dataMin
                                              ),
                                              a =
                                                  T(
                                                      "max",
                                                      s.options.max,
                                                      n.dataMax
                                                  ) - r;
                                          return i
                                              ? (t * a) / o + r
                                              : (o * (t - r)) / a;
                                      },
                                      toPixels: function (t) {
                                          return this.translate(t);
                                      },
                                      toValue: function (t) {
                                          return this.translate(t, !0);
                                      },
                                  }),
                                  (p.xAxis.navigatorAxis.axis = p.xAxis),
                                  (p.xAxis.navigatorAxis.toFixedRange =
                                      s.prototype.toFixedRange.bind(
                                          p.xAxis.navigatorAxis
                                      ))),
                            e.options.scrollbar.enabled)
                        ) {
                            let t = A(e.options.scrollbar, {
                                vertical: e.inverted,
                            });
                            !v(t.margin) &&
                                p.navigatorEnabled &&
                                (t.margin = e.inverted ? -3 : 3),
                                (e.scrollbar = p.scrollbar =
                                    new o(e.renderer, t, e)),
                                c(p.scrollbar, "changed", function (t) {
                                    let e = p.size,
                                        i = e * this.to,
                                        s = e * this.from;
                                    (p.hasDragged = p.scrollbar.hasDragged),
                                        p.render(0, 0, s, i),
                                        this.shouldUpdateExtremes(t.DOMType) &&
                                            setTimeout(function () {
                                                p.onMouseUp(t);
                                            });
                                });
                        }
                        p.addBaseSeriesEvents(), p.addChartEvents();
                    }
                    getUnionExtremes(t) {
                        let e;
                        let i = this.chart.xAxis[0],
                            s = this.xAxis,
                            n = s.options,
                            o = i.options;
                        return (
                            (t && null === i.dataMin) ||
                                (e = {
                                    dataMin: w(
                                        n && n.min,
                                        T(
                                            "min",
                                            o.min,
                                            i.dataMin,
                                            s.dataMin,
                                            s.min
                                        )
                                    ),
                                    dataMax: w(
                                        n && n.max,
                                        T(
                                            "max",
                                            o.max,
                                            i.dataMax,
                                            s.dataMax,
                                            s.max
                                        )
                                    ),
                                }),
                            e
                        );
                    }
                    setBaseSeries(t, e) {
                        let i = this.chart,
                            s = (this.baseSeries = []);
                        (t =
                            t ||
                            (i.options && i.options.navigator.baseSeries) ||
                            (i.series.length
                                ? f(i.series, (t) => !t.options.isInternal)
                                      .index
                                : 0)),
                            (i.series || []).forEach((e, i) => {
                                !e.options.isInternal &&
                                    (e.options.showInNavigator ||
                                        ((i === t || e.options.id === t) &&
                                            !1 !==
                                                e.options.showInNavigator)) &&
                                    s.push(e);
                            }),
                            this.xAxis &&
                                !this.xAxis.navigatorAxis.fake &&
                                this.updateNavigatorSeries(!0, e);
                    }
                    updateNavigatorSeries(t, e) {
                        let i = this,
                            s = i.chart,
                            n = i.baseSeries,
                            o = {
                                enableMouseTracking: !1,
                                index: null,
                                linkedTo: null,
                                group: "nav",
                                padXAxis: !1,
                                xAxis: "navigator-x-axis",
                                yAxis: "navigator-y-axis",
                                showInLegend: !1,
                                stacking: void 0,
                                isInternal: !0,
                                states: { inactive: { opacity: 1 } },
                            },
                            r = (i.series = (i.series || []).filter((t) => {
                                let e = t.baseSeries;
                                return (
                                    !(0 > n.indexOf(e)) ||
                                    (e &&
                                        (C(
                                            e,
                                            "updatedData",
                                            i.updatedDataHandler
                                        ),
                                        delete e.navigatorSeries),
                                    t.chart && t.destroy(),
                                    !1)
                                );
                            })),
                            l,
                            h,
                            c = i.navigatorOptions.series,
                            d;
                        n &&
                            n.length &&
                            n.forEach((t) => {
                                let u = t.navigatorSeries,
                                    p = b(
                                        { color: t.color, visible: t.visible },
                                        y(c) ? a.navigator.series : c
                                    );
                                if (
                                    u &&
                                    !1 === i.navigatorOptions.adaptToUpdatedData
                                )
                                    return;
                                (o.name = "Navigator " + n.length),
                                    (d =
                                        (l = t.options || {})
                                            .navigatorOptions || {}),
                                    (p.dataLabels = E(p.dataLabels)),
                                    ((h = A(l, o, p, d)).pointRange = w(
                                        p.pointRange,
                                        d.pointRange,
                                        a.plotOptions[h.type || "line"]
                                            .pointRange
                                    ));
                                let g = d.data || p.data;
                                (i.hasNavigatorData =
                                    i.hasNavigatorData || !!g),
                                    (h.data = g || (l.data && l.data.slice(0))),
                                    u && u.options
                                        ? u.update(h, e)
                                        : ((t.navigatorSeries =
                                              s.initSeries(h)),
                                          (t.navigatorSeries.baseSeries = t),
                                          r.push(t.navigatorSeries));
                            }),
                            ((c.data && !(n && n.length)) || y(c)) &&
                                ((i.hasNavigatorData = !1),
                                (c = E(c)).forEach((t, e) => {
                                    (o.name = "Navigator " + (r.length + 1)),
                                        ((h = A(
                                            a.navigator.series,
                                            {
                                                color:
                                                    (s.series[e] &&
                                                        !s.series[e].options
                                                            .isInternal &&
                                                        s.series[e].color) ||
                                                    s.options.colors[e] ||
                                                    s.options.colors[0],
                                            },
                                            o,
                                            t
                                        )).data = t.data),
                                        h.data &&
                                            ((i.hasNavigatorData = !0),
                                            r.push(s.initSeries(h)));
                                })),
                            t && this.addBaseSeriesEvents();
                    }
                    addBaseSeriesEvents() {
                        let t = this,
                            e = t.baseSeries || [];
                        e[0] &&
                            e[0].xAxis &&
                            e[0].eventsToUnbind.push(
                                c(
                                    e[0].xAxis,
                                    "foundExtremes",
                                    this.modifyBaseAxisExtremes
                                )
                            ),
                            e.forEach((e) => {
                                e.eventsToUnbind.push(
                                    c(e, "show", function () {
                                        this.navigatorSeries &&
                                            this.navigatorSeries.setVisible(
                                                !0,
                                                !1
                                            );
                                    })
                                ),
                                    e.eventsToUnbind.push(
                                        c(e, "hide", function () {
                                            this.navigatorSeries &&
                                                this.navigatorSeries.setVisible(
                                                    !1,
                                                    !1
                                                );
                                        })
                                    ),
                                    !1 !==
                                        this.navigatorOptions
                                            .adaptToUpdatedData &&
                                        e.xAxis &&
                                        e.eventsToUnbind.push(
                                            c(
                                                e,
                                                "updatedData",
                                                this.updatedDataHandler
                                            )
                                        ),
                                    e.eventsToUnbind.push(
                                        c(e, "remove", function () {
                                            this.navigatorSeries &&
                                                (m(
                                                    t.series,
                                                    this.navigatorSeries
                                                ),
                                                p(
                                                    this.navigatorSeries.options
                                                ) &&
                                                    this.navigatorSeries.remove(
                                                        !1
                                                    ),
                                                delete this.navigatorSeries);
                                        })
                                    );
                            });
                    }
                    getBaseSeriesMin(t) {
                        return this.baseSeries.reduce(function (t, e) {
                            return Math.min(
                                t,
                                e.xData && e.xData.length ? e.xData[0] : t
                            );
                        }, t);
                    }
                    modifyNavigatorAxisExtremes() {
                        let t = this.xAxis;
                        if (void 0 !== t.getExtremes) {
                            let e = this.getUnionExtremes(!0);
                            e &&
                                (e.dataMin !== t.min || e.dataMax !== t.max) &&
                                ((t.min = e.dataMin), (t.max = e.dataMax));
                        }
                    }
                    modifyBaseAxisExtremes() {
                        let t, e;
                        let i = this.chart.navigator,
                            s = this.getExtremes(),
                            n = s.min,
                            o = s.max,
                            r = s.dataMin,
                            a = s.dataMax,
                            l = o - n,
                            h = i.stickToMin,
                            c = i.stickToMax,
                            d = w(this.options.overscroll, 0),
                            u = i.series && i.series[0],
                            p = !!this.setExtremes,
                            g =
                                this.eventArgs &&
                                "rangeSelectorButton" ===
                                    this.eventArgs.trigger;
                        !g &&
                            (h && (t = (e = r) + l),
                            c &&
                                ((t = a + d),
                                h ||
                                    (e = Math.max(
                                        r,
                                        t - l,
                                        i.getBaseSeriesMin(
                                            u && u.xData
                                                ? u.xData[0]
                                                : -Number.MAX_VALUE
                                        )
                                    ))),
                            p &&
                                (h || c) &&
                                v(e) &&
                                ((this.min = this.userMin = e),
                                (this.max = this.userMax = t))),
                            (i.stickToMin = i.stickToMax = null);
                    }
                    updatedDataHandler() {
                        let t = this.chart.navigator,
                            e = this.navigatorSeries,
                            i = t.reversedExtremes
                                ? 0 === Math.round(t.zoomedMin)
                                : Math.round(t.zoomedMax) >= Math.round(t.size);
                        (t.stickToMax = w(
                            this.chart.options.navigator &&
                                this.chart.options.navigator.stickToMax,
                            i
                        )),
                            (t.stickToMin = t.shouldStickToMin(this, t)),
                            e &&
                                !t.hasNavigatorData &&
                                ((e.options.pointStart = this.xData[0]),
                                e.setData(this.options.data, !1, null, !1));
                    }
                    shouldStickToMin(t, e) {
                        let i = e.getBaseSeriesMin(t.xData[0]),
                            s = t.xAxis,
                            n = s.max,
                            o = s.min,
                            r = s.options.range;
                        return (
                            !!(v(n) && v(o)) &&
                            (r && n - i > 0 ? n - i < r : o <= i)
                        );
                    }
                    addChartEvents() {
                        this.eventsToUnbind || (this.eventsToUnbind = []),
                            this.eventsToUnbind.push(
                                c(this.chart, "redraw", function () {
                                    let t = this.navigator,
                                        e =
                                            t &&
                                            ((t.baseSeries &&
                                                t.baseSeries[0] &&
                                                t.baseSeries[0].xAxis) ||
                                                this.xAxis[0]);
                                    e && t.render(e.min, e.max);
                                }),
                                c(this.chart, "getMargins", function () {
                                    let t = this.navigator,
                                        e = t.opposite
                                            ? "plotTop"
                                            : "marginBottom";
                                    this.inverted &&
                                        (e = t.opposite
                                            ? "marginRight"
                                            : "plotLeft"),
                                        (this[e] =
                                            (this[e] || 0) +
                                            (t.navigatorEnabled ||
                                            !this.inverted
                                                ? t.height + t.scrollbarHeight
                                                : 0) +
                                            t.navigatorOptions.margin);
                                })
                            );
                    }
                    destroy() {
                        this.removeEvents(),
                            this.xAxis &&
                                (m(this.chart.xAxis, this.xAxis),
                                m(this.chart.axes, this.xAxis)),
                            this.yAxis &&
                                (m(this.chart.yAxis, this.yAxis),
                                m(this.chart.axes, this.yAxis)),
                            (this.series || []).forEach((t) => {
                                t.destroy && t.destroy();
                            }),
                            [
                                "series",
                                "xAxis",
                                "yAxis",
                                "shades",
                                "outline",
                                "scrollbarTrack",
                                "scrollbarRifles",
                                "scrollbarGroup",
                                "scrollbar",
                                "navigatorGroup",
                                "rendered",
                            ].forEach((t) => {
                                this[t] && this[t].destroy && this[t].destroy(),
                                    (this[t] = null);
                            }),
                            [this.handles].forEach((t) => {
                                g(t);
                            });
                    }
                }
                return M;
            }
        ),
        i(
            e,
            "Accessibility/Components/NavigatorComponent.js",
            [
                e["Accessibility/AccessibilityComponent.js"],
                e["Accessibility/Utils/Announcer.js"],
                e["Accessibility/KeyboardNavigationHandler.js"],
                e["Stock/Navigator/Navigator.js"],
                e["Core/Animation/AnimationUtilities.js"],
                e["Core/Templating.js"],
                e["Core/Utilities.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
            ],
            function (t, e, i, s, n, o, r, a, l) {
                let { animObject: h } = n,
                    { format: c } = o,
                    { clamp: d, pick: u, syncTimeout: p } = r,
                    { getFakeMouseEvent: g } = a,
                    {
                        getAxisRangeDescription: m,
                        fireEventOnWrappedOrUnwrappedElement: b,
                    } = l;
                return class extends t {
                    init() {
                        let t = this.chart,
                            i = this;
                        (this.announcer = new e(t, "polite")),
                            this.addEvent(s, "afterRender", function () {
                                this.chart === i.chart &&
                                    this.chart.renderer &&
                                    p(() => {
                                        i.proxyProvider.updateGroupProxyElementPositions(
                                            "navigator"
                                        ),
                                            i.updateHandleValues();
                                    }, h(u(this.chart.renderer.globalAnimation, !0)).duration);
                            });
                    }
                    onChartUpdate() {
                        let t = this.chart,
                            e = t.options;
                        if (e.navigator.accessibility?.enabled) {
                            let i = e.accessibility.landmarkVerbosity,
                                s = e.lang.accessibility?.navigator.groupLabel;
                            this.proxyProvider.removeGroup("navigator"),
                                this.proxyProvider.addGroup(
                                    "navigator",
                                    "div",
                                    {
                                        role: "all" === i ? "region" : "group",
                                        "aria-label": c(s, { chart: t }, t),
                                    }
                                );
                            let n = e.lang.accessibility?.navigator.handleLabel;
                            [0, 1].forEach((e) => {
                                let i = this.getHandleByIx(e);
                                if (i) {
                                    let s = this.proxyProvider.addProxyElement(
                                        "navigator",
                                        { click: i },
                                        "input",
                                        {
                                            type: "range",
                                            "aria-label": c(
                                                n,
                                                { handleIx: e, chart: t },
                                                t
                                            ),
                                        }
                                    );
                                    (this[
                                        e ? "maxHandleProxy" : "minHandleProxy"
                                    ] = s.innerElement),
                                        (s.innerElement.style.pointerEvents =
                                            "none"),
                                        (s.innerElement.oninput = () =>
                                            this.updateNavigator());
                                }
                            }),
                                this.updateHandleValues();
                        } else this.proxyProvider.removeGroup("navigator");
                    }
                    getNavigatorHandleNavigation(t) {
                        let e = this,
                            s = this.chart,
                            n = t ? this.maxHandleProxy : this.minHandleProxy,
                            o = this.keyCodes;
                        return new i(s, {
                            keyCodeMap: [
                                [
                                    [o.left, o.right, o.up, o.down],
                                    function (i) {
                                        if (n) {
                                            let r =
                                                i === o.left || i === o.up
                                                    ? -1
                                                    : 1;
                                            (n.value =
                                                "" +
                                                d(
                                                    parseFloat(n.value) + r,
                                                    0,
                                                    100
                                                )),
                                                e.updateNavigator(() => {
                                                    let i = e.getHandleByIx(t);
                                                    i &&
                                                        s.setFocusToElement(
                                                            i,
                                                            n
                                                        );
                                                });
                                        }
                                        return this.response.success;
                                    },
                                ],
                            ],
                            init: () => {
                                s.setFocusToElement(this.getHandleByIx(t), n);
                            },
                            validate: () =>
                                !!(
                                    this.getHandleByIx(t) &&
                                    n &&
                                    s.options.navigator.accessibility?.enabled
                                ),
                        });
                    }
                    getKeyboardNavigation() {
                        return [
                            this.getNavigatorHandleNavigation(0),
                            this.getNavigatorHandleNavigation(1),
                        ];
                    }
                    destroy() {
                        this.updateNavigatorThrottleTimer &&
                            clearTimeout(this.updateNavigatorThrottleTimer),
                            this.proxyProvider.removeGroup("navigator"),
                            this.announcer && this.announcer.destroy();
                    }
                    updateHandleValues() {
                        let t = this.chart.navigator;
                        if (t && this.minHandleProxy && this.maxHandleProxy) {
                            let e = t.size;
                            (this.minHandleProxy.value =
                                "" + Math.round((t.zoomedMin / e) * 100)),
                                (this.maxHandleProxy.value =
                                    "" + Math.round((t.zoomedMax / e) * 100));
                        }
                    }
                    getHandleByIx(t) {
                        let e = this.chart.navigator;
                        return e && e.handles && e.handles[t];
                    }
                    updateNavigator(t) {
                        this.updateNavigatorThrottleTimer &&
                            clearTimeout(this.updateNavigatorThrottleTimer),
                            (this.updateNavigatorThrottleTimer = setTimeout(
                                ((t) => {
                                    let e = this.chart,
                                        i = e.navigator;
                                    if (
                                        i &&
                                        this.minHandleProxy &&
                                        this.maxHandleProxy
                                    ) {
                                        let s = e.pointer.getChartPosition(),
                                            n =
                                                (parseFloat(
                                                    this.minHandleProxy.value
                                                ) /
                                                    100) *
                                                i.size,
                                            o =
                                                (parseFloat(
                                                    this.maxHandleProxy.value
                                                ) /
                                                    100) *
                                                i.size;
                                        [
                                            [0, "mousedown", i.zoomedMin],
                                            [0, "mousemove", n],
                                            [0, "mouseup", n],
                                            [1, "mousedown", i.zoomedMax],
                                            [1, "mousemove", o],
                                            [1, "mouseup", o],
                                        ].forEach(([t, e, n]) => {
                                            let o =
                                                this.getHandleByIx(t)?.element;
                                            o &&
                                                b(
                                                    o,
                                                    g(
                                                        e,
                                                        {
                                                            x:
                                                                s.left +
                                                                i.left +
                                                                n,
                                                            y: s.top + i.top,
                                                        },
                                                        o
                                                    )
                                                );
                                        }),
                                            t && t();
                                        let r =
                                                e.options.lang.accessibility
                                                    ?.navigator
                                                    .changeAnnouncement,
                                            a = m(e.xAxis[0]);
                                        this.announcer.announce(
                                            c(
                                                r,
                                                {
                                                    axisRangeDescription: a,
                                                    chart: e,
                                                },
                                                e
                                            )
                                        );
                                    }
                                }).bind(this, t),
                                20
                            ));
                    }
                };
            }
        ),
        i(
            e,
            "Accessibility/Components/SeriesComponent/SeriesDescriber.js",
            [
                e["Accessibility/Components/AnnotationsA11y.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Core/Templating.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, n) {
                let { getPointAnnotationTexts: o } = t,
                    {
                        getAxisDescription: r,
                        getSeriesFirstPointElement: a,
                        getSeriesA11yElement: l,
                        unhideChartElementFromAT: h,
                    } = e,
                    { format: c, numberFormat: d } = i,
                    { reverseChildNodes: u, stripHTMLTagsFromString: p } = s,
                    {
                        find: g,
                        isNumber: m,
                        isString: b,
                        pick: f,
                        defined: x,
                    } = n;
                function y(t) {
                    let e = t.chart.options.accessibility,
                        i = e.series.pointDescriptionEnabledThreshold;
                    return !!(!1 !== i && t.points && t.points.length >= +i);
                }
                function v(t, e) {
                    let i = t.series,
                        s = i.chart,
                        n = s.options.accessibility.point || {},
                        o =
                            (i.options.accessibility &&
                                i.options.accessibility.point) ||
                            {},
                        r = i.tooltipOptions || {},
                        a = s.options.lang;
                    return m(e)
                        ? d(
                              e,
                              o.valueDecimals ||
                                  n.valueDecimals ||
                                  r.valueDecimals ||
                                  -1,
                              a.decimalPoint,
                              a.accessibility.thousandsSep || a.thousandsSep
                          )
                        : e;
                }
                function A(t, e) {
                    let i = t[e];
                    return t.chart.langFormat(
                        "accessibility.series." + e + "Description",
                        { name: r(i), series: t }
                    );
                }
                function w(t) {
                    let e = t.series,
                        i = e.chart.series.length > 1 || e.options.name,
                        s = (function (t) {
                            let e = t.series,
                                i = e.chart,
                                s = e.options.accessibility,
                                n =
                                    s &&
                                    s.point &&
                                    s.point.valueDescriptionFormat,
                                o =
                                    n ||
                                    i.options.accessibility.point
                                        .valueDescriptionFormat,
                                r = f(
                                    e.xAxis &&
                                        e.xAxis.options.accessibility &&
                                        e.xAxis.options.accessibility.enabled,
                                    !i.angular && "flowmap" !== e.type
                                ),
                                a = r
                                    ? (function (t) {
                                          let e = (function (t) {
                                                  let e = t.series,
                                                      i = e.chart,
                                                      s =
                                                          (e.options
                                                              .accessibility &&
                                                              e.options
                                                                  .accessibility
                                                                  .point) ||
                                                          {},
                                                      n =
                                                          i.options
                                                              .accessibility
                                                              .point || {},
                                                      o =
                                                          e.xAxis &&
                                                          e.xAxis.dateTime;
                                                  if (o) {
                                                      let e = o.getXDateFormat(
                                                              t.x || 0,
                                                              i.options.tooltip
                                                                  .dateTimeLabelFormats
                                                          ),
                                                          r =
                                                              (s.dateFormatter &&
                                                                  s.dateFormatter(
                                                                      t
                                                                  )) ||
                                                              (n.dateFormatter &&
                                                                  n.dateFormatter(
                                                                      t
                                                                  )) ||
                                                              s.dateFormat ||
                                                              n.dateFormat ||
                                                              e;
                                                      return i.time.dateFormat(
                                                          r,
                                                          t.x || 0,
                                                          void 0
                                                      );
                                                  }
                                              })(t),
                                              i = t.series.xAxis || {},
                                              s =
                                                  i.categories &&
                                                  x(t.category) &&
                                                  ("" + t.category).replace(
                                                      "<br/>",
                                                      " "
                                                  ),
                                              n =
                                                  x(t.id) &&
                                                  0 >
                                                      ("" + t.id).indexOf(
                                                          "highcharts-"
                                                      ),
                                              o = "x, " + t.x;
                                          return (
                                              t.name || e || s || (n ? t.id : o)
                                          );
                                      })(t)
                                    : "",
                                l = {
                                    point: t,
                                    index: x(t.index) ? t.index + 1 : "",
                                    xDescription: a,
                                    value: (function (t) {
                                        let e = t.series,
                                            i =
                                                e.chart.options.accessibility
                                                    .point || {},
                                            s =
                                                (e.chart.options
                                                    .accessibility &&
                                                    e.chart.options
                                                        .accessibility.point) ||
                                                {},
                                            n = e.tooltipOptions || {},
                                            o =
                                                s.valuePrefix ||
                                                i.valuePrefix ||
                                                n.valuePrefix ||
                                                "",
                                            r =
                                                s.valueSuffix ||
                                                i.valueSuffix ||
                                                n.valueSuffix ||
                                                "",
                                            a =
                                                void 0 !== t.value
                                                    ? "value"
                                                    : "y",
                                            l = v(t, t[a]);
                                        return t.isNull
                                            ? e.chart.langFormat(
                                                  "accessibility.series.nullPointValue",
                                                  { point: t }
                                              )
                                            : e.pointArrayMap
                                            ? (function (t, e, i) {
                                                  let s = e || "",
                                                      n = i || "",
                                                      o = function (e) {
                                                          let i = v(
                                                              t,
                                                              f(
                                                                  t[e],
                                                                  t.options[e]
                                                              )
                                                          );
                                                          return void 0 !== i
                                                              ? e +
                                                                    ": " +
                                                                    s +
                                                                    i +
                                                                    n
                                                              : i;
                                                      },
                                                      r =
                                                          t.series
                                                              .pointArrayMap;
                                                  return r.reduce(function (
                                                      t,
                                                      e
                                                  ) {
                                                      let i = o(e);
                                                      return i
                                                          ? t +
                                                                (t.length
                                                                    ? ", "
                                                                    : "") +
                                                                i
                                                          : t;
                                                  },
                                                  "");
                                              })(t, o, r)
                                            : o + l + r;
                                    })(t),
                                    separator: r ? ", " : "",
                                };
                            return c(o, l, i);
                        })(t),
                        n =
                            t.options &&
                            t.options.accessibility &&
                            t.options.accessibility.description,
                        r = i ? " " + e.name + "." : "",
                        a = (function (t) {
                            let e = t.series.chart,
                                i = o(t);
                            return i.length
                                ? e.langFormat(
                                      "accessibility.series.pointAnnotationsDescription",
                                      { point: t, annotations: i }
                                  )
                                : "";
                        })(t);
                    return (
                        (t.accessibility = t.accessibility || {}),
                        (t.accessibility.valueDescription = s),
                        s + (n ? " " + n : "") + r + (a ? " " + a : "")
                    );
                }
                function C(t) {
                    let e = t.chart,
                        i = e.types || [],
                        s = (function (t) {
                            let e = t.options.accessibility || {},
                                i = e.description;
                            return (
                                (i &&
                                    t.chart.langFormat(
                                        "accessibility.series.description",
                                        { description: i, series: t }
                                    )) ||
                                ""
                            );
                        })(t),
                        n = function (i) {
                            return e[i] && e[i].length > 1 && t[i];
                        },
                        o = t.index + 1,
                        r = A(t, "xAxis"),
                        a = A(t, "yAxis"),
                        l = { seriesNumber: o, series: t, chart: e },
                        h = i.length > 1 ? "Combination" : "",
                        d =
                            e.langFormat(
                                "accessibility.series.summary." + t.type + h,
                                l
                            ) ||
                            e.langFormat(
                                "accessibility.series.summary.default" + h,
                                l
                            ),
                        u =
                            (n("yAxis") ? " " + a + "." : "") +
                            (n("xAxis") ? " " + r + "." : ""),
                        p = f(
                            t.options.accessibility &&
                                t.options.accessibility.descriptionFormat,
                            e.options.accessibility.series.descriptionFormat,
                            ""
                        );
                    return c(
                        p,
                        {
                            seriesDescription: d,
                            authorDescription: s ? " " + s : "",
                            axisDescription: u,
                            series: t,
                            chart: e,
                            seriesNumber: o,
                        },
                        void 0
                    );
                }
                return {
                    defaultPointDescriptionFormatter: w,
                    defaultSeriesDescriptionFormatter: C,
                    describeSeries: function (t) {
                        let e = t.chart,
                            i = a(t),
                            s = l(t),
                            n = e.is3d && e.is3d();
                        s &&
                            (s.lastChild !== i || n || u(s),
                            (function (t) {
                                let e = (function (t) {
                                        let e = t.options.accessibility || {};
                                        return !y(t) && !e.exposeAsGroupOnly;
                                    })(t),
                                    i = (function (t) {
                                        let e = t.chart.options.accessibility,
                                            i =
                                                e.keyboardNavigation
                                                    .seriesNavigation;
                                        return !!(
                                            t.points &&
                                            (t.points.length <
                                                +i.pointNavigationEnabledThreshold ||
                                                !1 ===
                                                    i.pointNavigationEnabledThreshold)
                                        );
                                    })(t),
                                    s =
                                        t.chart.options.accessibility.point
                                            .describeNull;
                                (e || i) &&
                                    t.points.forEach((i) => {
                                        let n =
                                                (i.graphic &&
                                                    i.graphic.element) ||
                                                ((function (t) {
                                                    let e = t.series,
                                                        i = e && e.chart,
                                                        s =
                                                            e &&
                                                            e.is("sunburst"),
                                                        n = t.isNull,
                                                        o =
                                                            i &&
                                                            i.options
                                                                .accessibility
                                                                .point
                                                                .describeNull;
                                                    return n && !s && o;
                                                })(i) &&
                                                    (function (t) {
                                                        let e = t.series,
                                                            i = (function (t) {
                                                                let e = t.index;
                                                                return (
                                                                    (t.series &&
                                                                        t.series
                                                                            .data &&
                                                                        x(e) &&
                                                                        g(
                                                                            t
                                                                                .series
                                                                                .data,
                                                                            function (
                                                                                t
                                                                            ) {
                                                                                return !!(
                                                                                    t &&
                                                                                    void 0 !==
                                                                                        t.index &&
                                                                                    t.index >
                                                                                        e &&
                                                                                    t.graphic &&
                                                                                    t
                                                                                        .graphic
                                                                                        .element
                                                                                );
                                                                            }
                                                                        )) ||
                                                                    null
                                                                );
                                                            })(t),
                                                            s = i && i.graphic,
                                                            n = s
                                                                ? s.parentGroup
                                                                : e.graph ||
                                                                  e.group,
                                                            o = i
                                                                ? {
                                                                      x: f(
                                                                          t.plotX,
                                                                          i.plotX,
                                                                          0
                                                                      ),
                                                                      y: f(
                                                                          t.plotY,
                                                                          i.plotY,
                                                                          0
                                                                      ),
                                                                  }
                                                                : {
                                                                      x: f(
                                                                          t.plotX,
                                                                          0
                                                                      ),
                                                                      y: f(
                                                                          t.plotY,
                                                                          0
                                                                      ),
                                                                  },
                                                            r = (function (
                                                                t,
                                                                e
                                                            ) {
                                                                let i =
                                                                        t.series
                                                                            .chart
                                                                            .renderer,
                                                                    s = i.rect(
                                                                        e.x,
                                                                        e.y,
                                                                        1,
                                                                        1
                                                                    );
                                                                return (
                                                                    s.attr({
                                                                        class: "highcharts-a11y-mock-point",
                                                                        fill: "none",
                                                                        opacity: 0,
                                                                        "fill-opacity": 0,
                                                                        "stroke-opacity": 0,
                                                                    }),
                                                                    s
                                                                );
                                                            })(t, o);
                                                        if (n && n.element)
                                                            return (
                                                                (t.graphic = r),
                                                                (t.hasMockGraphic =
                                                                    !0),
                                                                r.add(n),
                                                                n.element.insertBefore(
                                                                    r.element,
                                                                    s
                                                                        ? s.element
                                                                        : null
                                                                ),
                                                                r.element
                                                            );
                                                    })(i)),
                                            o =
                                                i.options &&
                                                i.options.accessibility &&
                                                !1 ===
                                                    i.options.accessibility
                                                        .enabled;
                                        if (n) {
                                            if (i.isNull && !s) {
                                                n.setAttribute(
                                                    "aria-hidden",
                                                    !0
                                                );
                                                return;
                                            }
                                            n.setAttribute("tabindex", "-1"),
                                                t.chart.styledMode ||
                                                    (n.style.outline = "none"),
                                                e && !o
                                                    ? (function (t, e) {
                                                          let i = t.series,
                                                              s =
                                                                  i.options
                                                                      .accessibility
                                                                      ?.point ||
                                                                  {},
                                                              n =
                                                                  i.chart
                                                                      .options
                                                                      .accessibility
                                                                      .point ||
                                                                  {},
                                                              o = p(
                                                                  (b(
                                                                      s.descriptionFormat
                                                                  ) &&
                                                                      c(
                                                                          s.descriptionFormat,
                                                                          t,
                                                                          i.chart
                                                                      )) ||
                                                                      s.descriptionFormatter?.(
                                                                          t
                                                                      ) ||
                                                                      (b(
                                                                          n.descriptionFormat
                                                                      ) &&
                                                                          c(
                                                                              n.descriptionFormat,
                                                                              t,
                                                                              i.chart
                                                                          )) ||
                                                                      n.descriptionFormatter?.(
                                                                          t
                                                                      ) ||
                                                                      w(t),
                                                                  i.chart
                                                                      .renderer
                                                                      .forExport
                                                              );
                                                          e.setAttribute(
                                                              "role",
                                                              "img"
                                                          ),
                                                              e.setAttribute(
                                                                  "aria-label",
                                                                  o
                                                              );
                                                      })(i, n)
                                                    : n.setAttribute(
                                                          "aria-hidden",
                                                          !0
                                                      );
                                        }
                                    });
                            })(t),
                            h(e, s),
                            (function (t) {
                                let e = t.chart,
                                    i = e.options.chart,
                                    s = i.options3d && i.options3d.enabled,
                                    n = e.series.length > 1,
                                    o =
                                        e.options.accessibility.series
                                            .describeSingleSeries,
                                    r = (t.options.accessibility || {})
                                        .exposeAsGroupOnly;
                                return !(s && n) && (n || o || r || y(t));
                            })(t)
                                ? (function (t, e) {
                                      let i = t.options.accessibility || {},
                                          s = t.chart.options.accessibility,
                                          n = s.landmarkVerbosity;
                                      i.exposeAsGroupOnly
                                          ? e.setAttribute("role", "img")
                                          : "all" === n
                                          ? e.setAttribute("role", "region")
                                          : e.setAttribute("role", "group"),
                                          e.setAttribute("tabindex", "-1"),
                                          t.chart.styledMode ||
                                              (e.style.outline = "none"),
                                          e.setAttribute(
                                              "aria-label",
                                              p(
                                                  (s.series
                                                      .descriptionFormatter &&
                                                      s.series.descriptionFormatter(
                                                          t
                                                      )) ||
                                                      C(t),
                                                  t.chart.renderer.forExport
                                              )
                                          );
                                  })(t, s)
                                : s.removeAttribute("aria-label"));
                    },
                };
            }
        ),
        i(
            e,
            "Accessibility/Components/SeriesComponent/NewDataAnnouncer.js",
            [
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
                e["Accessibility/Utils/Announcer.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Accessibility/Utils/EventProvider.js"],
                e[
                    "Accessibility/Components/SeriesComponent/SeriesDescriber.js"
                ],
            ],
            function (t, e, i, s, n, o) {
                let { composed: r } = t,
                    { addEvent: a, defined: l, pushUnique: h } = e,
                    { getChartTitle: c } = s,
                    {
                        defaultPointDescriptionFormatter: d,
                        defaultSeriesDescriptionFormatter: u,
                    } = o;
                function p(t) {
                    return !!t.options.accessibility.announceNewData.enabled;
                }
                class g {
                    constructor(t) {
                        (this.dirty = { allSeries: {} }),
                            (this.lastAnnouncementTime = 0),
                            (this.chart = t);
                    }
                    init() {
                        let t = this.chart,
                            e = t.options.accessibility.announceNewData,
                            s = e.interruptUser ? "assertive" : "polite";
                        (this.lastAnnouncementTime = 0),
                            (this.dirty = { allSeries: {} }),
                            (this.eventProvider = new n()),
                            (this.announcer = new i(t, s)),
                            this.addEventListeners();
                    }
                    destroy() {
                        this.eventProvider.removeAddedEvents(),
                            this.announcer.destroy();
                    }
                    addEventListeners() {
                        let t = this,
                            e = this.chart,
                            i = this.eventProvider;
                        i.addEvent(e, "afterApplyDrilldown", function () {
                            t.lastAnnouncementTime = 0;
                        }),
                            i.addEvent(e, "afterAddSeries", function (e) {
                                t.onSeriesAdded(e.series);
                            }),
                            i.addEvent(e, "redraw", function () {
                                t.announceDirtyData();
                            });
                    }
                    onSeriesAdded(t) {
                        p(this.chart) &&
                            ((this.dirty.hasDirty = !0),
                            (this.dirty.allSeries[t.name + t.index] = t),
                            (this.dirty.newSeries = l(this.dirty.newSeries)
                                ? void 0
                                : t));
                    }
                    announceDirtyData() {
                        let t = this.chart,
                            e = this;
                        if (
                            t.options.accessibility.announceNewData &&
                            this.dirty.hasDirty
                        ) {
                            let t = this.dirty.newPoint;
                            t &&
                                (t = (function (t) {
                                    let e = t.series.data.filter(
                                        (e) => t.x === e.x && t.y === e.y
                                    );
                                    return 1 === e.length ? e[0] : t;
                                })(t)),
                                this.queueAnnouncement(
                                    Object.keys(this.dirty.allSeries).map(
                                        (t) => e.dirty.allSeries[t]
                                    ),
                                    this.dirty.newSeries,
                                    t
                                ),
                                (this.dirty = { allSeries: {} });
                        }
                    }
                    queueAnnouncement(t, e, i) {
                        let s = this.chart,
                            n = s.options.accessibility.announceNewData;
                        if (n.enabled) {
                            let s = +new Date(),
                                o = s - this.lastAnnouncementTime,
                                r = Math.max(0, n.minAnnounceInterval - o),
                                a = (function (t, e) {
                                    let i = (t || [])
                                        .concat(e || [])
                                        .reduce(
                                            (t, e) => (
                                                (t[e.name + e.index] = e), t
                                            ),
                                            {}
                                        );
                                    return Object.keys(i).map((t) => i[t]);
                                })(
                                    this.queuedAnnouncement &&
                                        this.queuedAnnouncement.series,
                                    t
                                ),
                                l = this.buildAnnouncementMessage(a, e, i);
                            l &&
                                (this.queuedAnnouncement &&
                                    clearTimeout(this.queuedAnnouncementTimer),
                                (this.queuedAnnouncement = {
                                    time: s,
                                    message: l,
                                    series: a,
                                }),
                                (this.queuedAnnouncementTimer = setTimeout(
                                    () => {
                                        this &&
                                            this.announcer &&
                                            ((this.lastAnnouncementTime =
                                                +new Date()),
                                            this.announcer.announce(
                                                this.queuedAnnouncement.message
                                            ),
                                            delete this.queuedAnnouncement,
                                            delete this
                                                .queuedAnnouncementTimer);
                                    },
                                    r
                                )));
                        }
                    }
                    buildAnnouncementMessage(e, i, s) {
                        let n = this.chart,
                            o = n.options.accessibility.announceNewData;
                        if (o.announcementFormatter) {
                            let t = o.announcementFormatter(e, i, s);
                            if (!1 !== t) return t.length ? t : null;
                        }
                        let r =
                                t.charts && t.charts.length > 1
                                    ? "Multiple"
                                    : "Single",
                            a = i
                                ? "newSeriesAnnounce" + r
                                : s
                                ? "newPointAnnounce" + r
                                : "newDataAnnounce",
                            l = c(n);
                        return n.langFormat(
                            "accessibility.announceNewData." + a,
                            {
                                chartTitle: l,
                                seriesDesc: i ? u(i) : null,
                                pointDesc: s ? d(s) : null,
                                point: s,
                                series: i,
                            }
                        );
                    }
                }
                return (
                    (function (t) {
                        function e(t) {
                            let e = this.chart,
                                i = this.newDataAnnouncer;
                            i &&
                                i.chart === e &&
                                p(e) &&
                                (i.dirty.newPoint = l(i.dirty.newPoint)
                                    ? void 0
                                    : t.point);
                        }
                        function i() {
                            let t = this.chart,
                                e = this.newDataAnnouncer;
                            e &&
                                e.chart === t &&
                                p(t) &&
                                ((e.dirty.hasDirty = !0),
                                (e.dirty.allSeries[this.name + this.index] =
                                    this));
                        }
                        t.compose = function t(s) {
                            h(r, t) &&
                                (a(s, "addPoint", e), a(s, "updatedData", i));
                        };
                    })(g || (g = {})),
                    g
                );
            }
        ),
        i(
            e,
            "Accessibility/ProxyElement.js",
            [
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
                e["Accessibility/Utils/EventProvider.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
            ],
            function (t, e, i, s, n) {
                let { doc: o } = t,
                    { attr: r, css: a, merge: l } = e,
                    { fireEventOnWrappedOrUnwrappedElement: h } = s,
                    {
                        cloneMouseEvent: c,
                        cloneTouchEvent: d,
                        getFakeMouseEvent: u,
                        removeElement: p,
                    } = n;
                return class {
                    constructor(t, e, s = "button", n, r) {
                        (this.chart = t),
                            (this.target = e),
                            (this.eventProvider = new i());
                        let a = (this.innerElement = o.createElement(s)),
                            l = (this.element = n ? o.createElement(n) : a);
                        t.styledMode || this.hideElementVisually(a),
                            n &&
                                ("li" !== n ||
                                    t.styledMode ||
                                    (l.style.listStyle = "none"),
                                l.appendChild(a),
                                (this.element = l)),
                            this.updateTarget(e, r);
                    }
                    click() {
                        let t = this.getTargetPosition();
                        (t.x += t.width / 2), (t.y += t.height / 2);
                        let e = u("click", t);
                        h(this.target.click, e);
                    }
                    updateTarget(t, e) {
                        (this.target = t), this.updateCSSClassName();
                        let i = e || {};
                        Object.keys(i).forEach((t) => {
                            null === i[t] && delete i[t];
                        });
                        let s = this.getTargetAttr(t.click, "aria-label");
                        r(
                            this.innerElement,
                            l(s ? { "aria-label": s } : {}, i)
                        ),
                            this.eventProvider.removeAddedEvents(),
                            this.addProxyEventsToElement(
                                this.innerElement,
                                t.click
                            ),
                            this.refreshPosition();
                    }
                    refreshPosition() {
                        let t = this.getTargetPosition();
                        a(this.innerElement, {
                            width: (t.width || 1) + "px",
                            height: (t.height || 1) + "px",
                            left: (Math.round(t.x) || 0) + "px",
                            top: (Math.round(t.y) || 0) + "px",
                        });
                    }
                    remove() {
                        this.eventProvider.removeAddedEvents(), p(this.element);
                    }
                    updateCSSClassName() {
                        let t = (t) => t.indexOf("highcharts-no-tooltip") > -1,
                            e = this.chart.legend,
                            i = e.group && e.group.div,
                            s = t((i && i.className) || ""),
                            n =
                                this.getTargetAttr(
                                    this.target.click,
                                    "class"
                                ) || "",
                            o = t(n);
                        this.innerElement.className =
                            s || o
                                ? "highcharts-a11y-proxy-element highcharts-no-tooltip"
                                : "highcharts-a11y-proxy-element";
                    }
                    addProxyEventsToElement(t, e) {
                        [
                            "click",
                            "touchstart",
                            "touchend",
                            "touchcancel",
                            "touchmove",
                            "mouseover",
                            "mouseenter",
                            "mouseleave",
                            "mouseout",
                        ].forEach((i) => {
                            let s = 0 === i.indexOf("touch");
                            this.eventProvider.addEvent(
                                t,
                                i,
                                (t) => {
                                    let i = s ? d(t) : c(t);
                                    e && h(e, i),
                                        t.stopPropagation(),
                                        s || t.preventDefault();
                                },
                                { passive: !1 }
                            );
                        });
                    }
                    hideElementVisually(t) {
                        a(t, {
                            borderWidth: 0,
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            outline: "none",
                            opacity: 0.001,
                            filter: "alpha(opacity=1)",
                            zIndex: 999,
                            overflow: "hidden",
                            padding: 0,
                            margin: 0,
                            display: "block",
                            position: "absolute",
                            "-ms-filter":
                                "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)",
                        });
                    }
                    getTargetPosition() {
                        let t = this.target.click,
                            e = t.element ? t.element : t,
                            i = this.target.visual || e,
                            s = this.chart.renderTo;
                        if (s && i && i.getBoundingClientRect) {
                            let t = i.getBoundingClientRect(),
                                e = this.chart.pointer.getChartPosition();
                            return {
                                x: (t.left - e.left) / e.scaleX,
                                y: (t.top - e.top) / e.scaleY,
                                width: t.right / e.scaleX - t.left / e.scaleX,
                                height: t.bottom / e.scaleY - t.top / e.scaleY,
                            };
                        }
                        return { x: 0, y: 0, width: 1, height: 1 };
                    }
                    getTargetAttr(t, e) {
                        return t.element
                            ? t.element.getAttribute(e)
                            : t.getAttribute(e);
                    }
                };
            }
        ),
        i(
            e,
            "Accessibility/ProxyProvider.js",
            [
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Accessibility/Utils/DOMElementProvider.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
                e["Accessibility/ProxyElement.js"],
            ],
            function (t, e, i, s, n, o) {
                let { doc: r } = t,
                    { attr: a, css: l } = e,
                    { unhideChartElementFromAT: h } = i,
                    { removeElement: c, removeChildNodes: d } = n;
                return class {
                    constructor(t) {
                        (this.chart = t),
                            (this.domElementProvider = new s()),
                            (this.groups = {}),
                            (this.groupOrder = []),
                            (this.beforeChartProxyPosContainer =
                                this.createProxyPosContainer("before")),
                            (this.afterChartProxyPosContainer =
                                this.createProxyPosContainer("after")),
                            this.update();
                    }
                    addProxyElement(t, e, i = "button", s) {
                        let n = this.groups[t];
                        if (!n)
                            throw Error(
                                "ProxyProvider.addProxyElement: Invalid group key " +
                                    t
                            );
                        let r =
                                "ul" === n.type || "ol" === n.type
                                    ? "li"
                                    : void 0,
                            a = new o(this.chart, e, i, r, s);
                        return (
                            n.proxyContainerElement.appendChild(a.element),
                            n.proxyElements.push(a),
                            a
                        );
                    }
                    addGroup(t, e = "div", i) {
                        let s;
                        let n = this.groups[t];
                        if (n) return n.groupElement;
                        let o = this.domElementProvider.createElement(e);
                        return (
                            i && i.role && "div" !== e
                                ? (s =
                                      this.domElementProvider.createElement(
                                          "div"
                                      )).appendChild(o)
                                : (s = o),
                            (s.className =
                                "highcharts-a11y-proxy-group highcharts-a11y-proxy-group-" +
                                t.replace(/\W/g, "-")),
                            (this.groups[t] = {
                                proxyContainerElement: o,
                                groupElement: s,
                                type: e,
                                proxyElements: [],
                            }),
                            a(s, i || {}),
                            "ul" === e && o.setAttribute("role", "list"),
                            this.afterChartProxyPosContainer.appendChild(s),
                            this.updateGroupOrder(this.groupOrder),
                            s
                        );
                    }
                    updateGroupAttrs(t, e) {
                        let i = this.groups[t];
                        if (!i)
                            throw Error(
                                "ProxyProvider.updateGroupAttrs: Invalid group key " +
                                    t
                            );
                        a(i.groupElement, e);
                    }
                    updateGroupOrder(t) {
                        if (
                            ((this.groupOrder = t.slice()),
                            this.isDOMOrderGroupOrder())
                        )
                            return;
                        let e = t.indexOf("series"),
                            i = e > -1 ? t.slice(0, e) : t,
                            s = e > -1 ? t.slice(e + 1) : [],
                            n = r.activeElement;
                        ["before", "after"].forEach((t) => {
                            let e =
                                this[
                                    "before" === t
                                        ? "beforeChartProxyPosContainer"
                                        : "afterChartProxyPosContainer"
                                ];
                            d(e),
                                ("before" === t ? i : s).forEach((t) => {
                                    let i = this.groups[t];
                                    i && e.appendChild(i.groupElement);
                                });
                        }),
                            (this.beforeChartProxyPosContainer.contains(n) ||
                                this.afterChartProxyPosContainer.contains(n)) &&
                                n &&
                                n.focus &&
                                n.focus();
                    }
                    clearGroup(t) {
                        let e = this.groups[t];
                        if (!e)
                            throw Error(
                                "ProxyProvider.clearGroup: Invalid group key " +
                                    t
                            );
                        d(e.proxyContainerElement);
                    }
                    removeGroup(t) {
                        let e = this.groups[t];
                        e && (c(e.groupElement), delete this.groups[t]);
                    }
                    update() {
                        this.updatePosContainerPositions(),
                            this.updateGroupOrder(this.groupOrder),
                            this.updateProxyElementPositions();
                    }
                    updateProxyElementPositions() {
                        Object.keys(this.groups).forEach(
                            this.updateGroupProxyElementPositions.bind(this)
                        );
                    }
                    updateGroupProxyElementPositions(t) {
                        let e = this.groups[t];
                        e &&
                            e.proxyElements.forEach((t) => t.refreshPosition());
                    }
                    destroy() {
                        this.domElementProvider.destroyCreatedElements();
                    }
                    createProxyPosContainer(t) {
                        let e = this.domElementProvider.createElement("div");
                        return (
                            e.setAttribute("aria-hidden", "false"),
                            (e.className =
                                "highcharts-a11y-proxy-container" +
                                (t ? "-" + t : "")),
                            l(e, { top: "0", left: "0" }),
                            this.chart.styledMode ||
                                ((e.style.whiteSpace = "nowrap"),
                                (e.style.position = "absolute")),
                            e
                        );
                    }
                    getCurrentGroupOrderInDOM() {
                        let t = (t) => {
                                let e = Object.keys(this.groups),
                                    i = e.length;
                                for (; i--; ) {
                                    let s = e[i],
                                        n = this.groups[s];
                                    if (n && t === n.groupElement) return s;
                                }
                            },
                            e = (e) => {
                                let i = [],
                                    s = e.children;
                                for (let e = 0; e < s.length; ++e) {
                                    let n = t(s[e]);
                                    n && i.push(n);
                                }
                                return i;
                            },
                            i = e(this.beforeChartProxyPosContainer),
                            s = e(this.afterChartProxyPosContainer);
                        return i.push("series"), i.concat(s);
                    }
                    isDOMOrderGroupOrder() {
                        let t = this.getCurrentGroupOrderInDOM(),
                            e = this.groupOrder.filter(
                                (t) => "series" === t || !!this.groups[t]
                            ),
                            i = t.length;
                        if (i !== e.length) return !1;
                        for (; i--; ) if (t[i] !== e[i]) return !1;
                        return !0;
                    }
                    updatePosContainerPositions() {
                        let t = this.chart;
                        if (t.renderer.forExport) return;
                        let e = t.renderer.box;
                        t.container.insertBefore(
                            this.afterChartProxyPosContainer,
                            e.nextSibling
                        ),
                            t.container.insertBefore(
                                this.beforeChartProxyPosContainer,
                                e
                            ),
                            h(this.chart, this.afterChartProxyPosContainer),
                            h(this.chart, this.beforeChartProxyPosContainer);
                    }
                };
            }
        ),
        i(e, "Stock/RangeSelector/RangeSelectorDefaults.js", [], function () {
            return {
                lang: {
                    rangeSelectorZoom: "Zoom",
                    rangeSelectorFrom: "",
                    rangeSelectorTo: "→",
                },
                rangeSelector: {
                    allButtonsEnabled: !1,
                    buttons: void 0,
                    buttonSpacing: 5,
                    dropdown: "responsive",
                    enabled: void 0,
                    verticalAlign: "top",
                    buttonTheme: {
                        width: 28,
                        height: 18,
                        padding: 2,
                        zIndex: 7,
                    },
                    floating: !1,
                    x: 0,
                    y: 0,
                    height: void 0,
                    inputBoxBorderColor: "none",
                    inputBoxHeight: 17,
                    inputBoxWidth: void 0,
                    inputDateFormat: "%e %b %Y",
                    inputDateParser: void 0,
                    inputEditDateFormat: "%Y-%m-%d",
                    inputEnabled: !0,
                    inputPosition: { align: "right", x: 0, y: 0 },
                    inputSpacing: 5,
                    selected: void 0,
                    buttonPosition: { align: "left", x: 0, y: 0 },
                    inputStyle: {
                        color: "#334eff",
                        cursor: "pointer",
                        fontSize: "0.8em",
                    },
                    labelStyle: { color: "#666666", fontSize: "0.8em" },
                },
            };
        }),
        i(
            e,
            "Stock/RangeSelector/RangeSelectorComposition.js",
            [
                e["Core/Defaults.js"],
                e["Core/Globals.js"],
                e["Stock/RangeSelector/RangeSelectorDefaults.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s) {
                let n;
                let { defaultOptions: o } = t,
                    { composed: r } = e,
                    {
                        addEvent: a,
                        defined: l,
                        extend: h,
                        find: c,
                        isNumber: d,
                        merge: u,
                        pick: p,
                        pushUnique: g,
                    } = s,
                    m = [];
                function b() {
                    let t, e;
                    let i = this.range,
                        s = i.type,
                        n = this.max,
                        o = this.chart.time,
                        r = function (t, e) {
                            let i = "year" === s ? "FullYear" : "Month",
                                n = new o.Date(t),
                                r = o.get(i, n);
                            return (
                                o.set(i, n, r + e),
                                r === o.get(i, n) && o.set("Date", n, 0),
                                n.getTime() - t
                            );
                        };
                    d(i)
                        ? ((t = n - i), (e = i))
                        : i &&
                          ((t = n + r(n, -(i.count || 1))),
                          this.chart && (this.chart.fixedRange = n - t));
                    let a = p(this.dataMin, Number.MIN_VALUE);
                    return (
                        d(t) || (t = a),
                        t <= a &&
                            ((t = a),
                            void 0 === e && (e = r(t, i.count)),
                            (this.newMax = Math.min(
                                t + e,
                                p(this.dataMax, Number.MAX_VALUE)
                            ))),
                        d(n)
                            ? !d(i) && i && i._offsetMin && (t += i._offsetMin)
                            : (t = void 0),
                        t
                    );
                }
                function f() {
                    this.options.rangeSelector &&
                        this.options.rangeSelector.enabled &&
                        (this.rangeSelector = new n(this));
                }
                function x() {
                    let t = this.axes,
                        e = this.rangeSelector;
                    if (e) {
                        d(e.deferredYTDClick) &&
                            (e.clickButton(e.deferredYTDClick),
                            delete e.deferredYTDClick),
                            t.forEach((t) => {
                                t.updateNames(), t.setScale();
                            }),
                            this.getAxisMargins(),
                            e.render();
                        let i = e.options.verticalAlign;
                        e.options.floating ||
                            ("bottom" === i
                                ? (this.extraBottomMargin = !0)
                                : "middle" === i || (this.extraTopMargin = !0));
                    }
                }
                function y(t) {
                    let e, i, s, n;
                    let o = t.rangeSelector,
                        r = () => {
                            o &&
                                ((e = t.xAxis[0].getExtremes()),
                                (i = t.legend),
                                (n = o && o.options.verticalAlign),
                                d(e.min) && o.render(e.min, e.max),
                                i.display &&
                                    "top" === n &&
                                    n === i.options.verticalAlign &&
                                    ((s = u(t.spacingBox)),
                                    "vertical" === i.options.layout
                                        ? (s.y = t.plotTop)
                                        : (s.y += o.getHeight()),
                                    (i.group.placed = !1),
                                    i.align(s)));
                        };
                    if (o) {
                        let e = c(m, (e) => e[0] === t);
                        e ||
                            m.push([
                                t,
                                [
                                    a(
                                        t.xAxis[0],
                                        "afterSetExtremes",
                                        function (t) {
                                            o && o.render(t.min, t.max);
                                        }
                                    ),
                                    a(t, "redraw", r),
                                ],
                            ]),
                            r();
                    }
                }
                function v() {
                    for (let t = 0, e = m.length; t < e; ++t) {
                        let e = m[t];
                        if (e[0] === this) {
                            e[1].forEach((t) => t()), m.splice(t, 1);
                            return;
                        }
                    }
                }
                function A() {
                    let t = this.rangeSelector;
                    if (t) {
                        let e = t.getHeight();
                        this.extraTopMargin && (this.plotTop += e),
                            this.extraBottomMargin && (this.marginBottom += e);
                    }
                }
                function w() {
                    let t = this.rangeSelector;
                    if (t && !t.options.floating) {
                        t.render();
                        let e = t.options.verticalAlign;
                        "bottom" === e
                            ? (this.extraBottomMargin = !0)
                            : "middle" !== e && (this.extraTopMargin = !0);
                    }
                }
                function C(t) {
                    let e = t.options,
                        i = e.rangeSelector,
                        s = this.extraBottomMargin,
                        o = this.extraTopMargin,
                        r = this.rangeSelector;
                    if (
                        (i &&
                            i.enabled &&
                            !l(r) &&
                            this.options.rangeSelector &&
                            ((this.options.rangeSelector.enabled = !0),
                            (this.rangeSelector = r = new n(this))),
                        (this.extraBottomMargin = !1),
                        (this.extraTopMargin = !1),
                        r)
                    ) {
                        y(this);
                        let t =
                            (i && i.verticalAlign) ||
                            (r.options && r.options.verticalAlign);
                        r.options.floating ||
                            ("bottom" === t
                                ? (this.extraBottomMargin = !0)
                                : "middle" === t || (this.extraTopMargin = !0)),
                            (this.extraBottomMargin !== s ||
                                this.extraTopMargin !== o) &&
                                (this.isDirtyBox = !0);
                    }
                }
                return {
                    compose: function t(e, s, l) {
                        if (((n = l), g(r, t))) {
                            let t = s.prototype;
                            (e.prototype.minFromRange = b),
                                a(s, "afterGetContainer", f),
                                a(s, "beforeRender", x),
                                a(s, "destroy", v),
                                a(s, "getMargins", A),
                                a(s, "render", w),
                                a(s, "update", C),
                                t.callbacks.push(y),
                                h(o, { rangeSelector: i.rangeSelector }),
                                h(o.lang, i.lang);
                        }
                    },
                };
            }
        ),
        i(
            e,
            "Stock/RangeSelector/RangeSelector.js",
            [
                e["Core/Axis/Axis.js"],
                e["Core/Defaults.js"],
                e["Core/Globals.js"],
                e["Stock/RangeSelector/RangeSelectorComposition.js"],
                e["Core/Renderer/SVG/SVGElement.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, n, o) {
                let { defaultOptions: r } = e,
                    {
                        addEvent: a,
                        createElement: l,
                        css: h,
                        defined: c,
                        destroyObjectProperties: d,
                        discardElement: u,
                        extend: p,
                        fireEvent: g,
                        isNumber: m,
                        merge: b,
                        objectEach: f,
                        pad: x,
                        pick: y,
                        pInt: v,
                        splat: A,
                    } = o;
                class w {
                    static compose(t, e) {
                        s.compose(t, e, w);
                    }
                    constructor(t) {
                        (this.buttonOptions = w.prototype.defaultButtons),
                            (this.initialButtonGroupWidth = 0),
                            (this.chart = t),
                            this.init(t);
                    }
                    clickButton(e, i) {
                        let s = this.chart,
                            n = this.buttonOptions[e],
                            o = s.xAxis[0],
                            r =
                                (s.scroller && s.scroller.getUnionExtremes()) ||
                                o ||
                                {},
                            l = n.type,
                            h = n.dataGrouping,
                            d = r.dataMin,
                            u = r.dataMax,
                            p,
                            b = o && Math.round(Math.min(o.max, y(u, o.max))),
                            f,
                            x = n._range,
                            v,
                            w,
                            C,
                            E,
                            T,
                            M = !0;
                        if (null !== d && null !== u) {
                            if (
                                ((s.fixedRange = x),
                                this.setSelected(e),
                                h &&
                                    ((this.forcedDataGrouping = !0),
                                    t.prototype.setDataGrouping.call(
                                        o || { chart: this.chart },
                                        h,
                                        !1
                                    ),
                                    (this.frozenStates =
                                        n.preserveDataGrouping)),
                                "month" === l || "year" === l)
                            )
                                o
                                    ? ((E = {
                                          range: n,
                                          max: b,
                                          chart: s,
                                          dataMin: d,
                                          dataMax: u,
                                      }),
                                      (p = o.minFromRange.call(E)),
                                      m(E.newMax) && (b = E.newMax),
                                      (M = !1))
                                    : (x = n);
                            else if (x)
                                (b = Math.min((p = Math.max(b - x, d)) + x, u)),
                                    (M = !1);
                            else if ("ytd" === l) {
                                if (o)
                                    (void 0 === u || void 0 === d) &&
                                        ((d = Number.MAX_VALUE),
                                        (u = Number.MIN_VALUE),
                                        s.series.forEach((t) => {
                                            let e = t.xData;
                                            e &&
                                                ((d = Math.min(e[0], d)),
                                                (u = Math.max(
                                                    e[e.length - 1],
                                                    u
                                                )));
                                        }),
                                        (i = !1)),
                                        (p = v =
                                            (T = this.getYTDExtremes(
                                                u,
                                                d,
                                                s.time.useUTC
                                            )).min),
                                        (b = T.max);
                                else {
                                    this.deferredYTDClick = e;
                                    return;
                                }
                            } else
                                "all" === l &&
                                    o &&
                                    (s.navigator &&
                                        s.navigator.baseSeries[0] &&
                                        (s.navigator.baseSeries[0].xAxis.options.range =
                                            void 0),
                                    (p = d),
                                    (b = u));
                            M && n._offsetMin && c(p) && (p += n._offsetMin),
                                n._offsetMax && c(b) && (b += n._offsetMax),
                                this.dropdown &&
                                    (this.dropdown.selectedIndex = e + 1),
                                o
                                    ? o.setExtremes(p, b, y(i, !0), void 0, {
                                          trigger: "rangeSelectorButton",
                                          rangeSelectorButton: n,
                                      })
                                    : ((C = (f = A(s.options.xAxis)[0]).range),
                                      (f.range = x),
                                      (w = f.min),
                                      (f.min = v),
                                      a(s, "load", function () {
                                          (f.range = C), (f.min = w);
                                      })),
                                g(this, "afterBtnClick");
                        }
                    }
                    setSelected(t) {
                        this.selected = this.options.selected = t;
                    }
                    init(t) {
                        let e = this,
                            i = t.options.rangeSelector,
                            s = i.buttons || e.defaultButtons.slice(),
                            n = i.selected,
                            o = function () {
                                let t = e.minInput,
                                    i = e.maxInput;
                                t && t.blur && g(t, "blur"),
                                    i && i.blur && g(i, "blur");
                            };
                        (e.chart = t),
                            (e.options = i),
                            (e.buttons = []),
                            (e.buttonOptions = s),
                            (this.eventsToUnbind = []),
                            this.eventsToUnbind.push(
                                a(t.container, "mousedown", o)
                            ),
                            this.eventsToUnbind.push(a(t, "resize", o)),
                            s.forEach(e.computeButtonRange),
                            void 0 !== n && s[n] && this.clickButton(n, !1),
                            this.eventsToUnbind.push(
                                a(t, "load", function () {
                                    t.xAxis &&
                                        t.xAxis[0] &&
                                        a(
                                            t.xAxis[0],
                                            "setExtremes",
                                            function (i) {
                                                this.max - this.min !==
                                                    t.fixedRange &&
                                                    "rangeSelectorButton" !==
                                                        i.trigger &&
                                                    "updatedData" !==
                                                        i.trigger &&
                                                    e.forcedDataGrouping &&
                                                    !e.frozenStates &&
                                                    this.setDataGrouping(
                                                        !1,
                                                        !1
                                                    );
                                            }
                                        );
                                })
                            );
                    }
                    updateButtonStates() {
                        let t = this,
                            e = this.chart,
                            i = this.dropdown,
                            s = e.xAxis[0],
                            n = Math.round(s.max - s.min),
                            o = !s.hasVisibleSeries,
                            r = 24 * 36e5,
                            a =
                                (e.scroller && e.scroller.getUnionExtremes()) ||
                                s,
                            l = a.dataMin,
                            h = a.dataMax,
                            d = t.getYTDExtremes(h, l, e.time.useUTC),
                            u = d.min,
                            p = d.max,
                            g = t.selected,
                            b = t.options.allButtonsEnabled,
                            f = t.buttons,
                            x = m(g),
                            y = !1;
                        t.buttonOptions.forEach((e, a) => {
                            let d = e._range,
                                m = e.type,
                                v = e.count || 1,
                                A = f[a],
                                w = e._offsetMax - e._offsetMin,
                                C = a === g,
                                E = d > h - l,
                                T = d < s.minRange,
                                M = 0,
                                S = !1,
                                k = !1,
                                P = d === n;
                            C && E && (y = !0),
                                ("month" === m || "year" === m) &&
                                n + 36e5 >=
                                    { month: 28, year: 365 }[m] * r * v - w &&
                                n - 36e5 <=
                                    { month: 31, year: 366 }[m] * r * v + w
                                    ? (P = !0)
                                    : "ytd" === m
                                    ? ((P = p - u + w === n), (S = !C))
                                    : "all" === m &&
                                      ((P = s.max - s.min >= h - l),
                                      (k = !C && x && P));
                            let B =
                                    !b &&
                                    !(y && "all" === m) &&
                                    (E || T || k || o),
                                D =
                                    (y && "all" === m) ||
                                    (C && P) ||
                                    (P && !x && !S) ||
                                    (C && t.frozenStates);
                            B ? (M = 3) : D && ((x = !0), (M = 2)),
                                A.state !== M &&
                                    (A.setState(M),
                                    i &&
                                        ((i.options[a + 1].disabled = B),
                                        2 === M && (i.selectedIndex = a + 1)),
                                    0 === M && g === a
                                        ? t.setSelected()
                                        : ((2 === M && !c(g)) || y) &&
                                          t.setSelected(a));
                        });
                    }
                    computeButtonRange(t) {
                        let e = t.type,
                            i = t.count || 1,
                            s = {
                                millisecond: 1,
                                second: 1e3,
                                minute: 6e4,
                                hour: 36e5,
                                day: 864e5,
                                week: 6048e5,
                            };
                        s[e]
                            ? (t._range = s[e] * i)
                            : ("month" === e || "year" === e) &&
                              (t._range =
                                  24 * { month: 30, year: 365 }[e] * 36e5 * i),
                            (t._offsetMin = y(t.offsetMin, 0)),
                            (t._offsetMax = y(t.offsetMax, 0)),
                            (t._range += t._offsetMax - t._offsetMin);
                    }
                    getInputValue(t) {
                        let e = "min" === t ? this.minInput : this.maxInput,
                            i = this.chart.options.rangeSelector,
                            s = this.chart.time;
                        return e
                            ? (
                                  ("text" === e.type && i.inputDateParser) ||
                                  this.defaultInputDateParser
                              )(e.value, s.useUTC, s)
                            : 0;
                    }
                    setInputValue(t, e) {
                        let i = this.options,
                            s = this.chart.time,
                            n = "min" === t ? this.minInput : this.maxInput,
                            o = "min" === t ? this.minDateBox : this.maxDateBox;
                        if (n) {
                            let t = n.getAttribute("data-hc-time"),
                                r = c(t) ? Number(t) : void 0;
                            if (c(e)) {
                                let t = r;
                                c(t) &&
                                    n.setAttribute("data-hc-time-previous", t),
                                    n.setAttribute("data-hc-time", e),
                                    (r = e);
                            }
                            (n.value = s.dateFormat(
                                this.inputTypeFormats[n.type] ||
                                    i.inputEditDateFormat,
                                r
                            )),
                                o &&
                                    o.attr({
                                        text: s.dateFormat(
                                            i.inputDateFormat,
                                            r
                                        ),
                                    });
                        }
                    }
                    setInputExtremes(t, e, i) {
                        let s = "min" === t ? this.minInput : this.maxInput;
                        if (s) {
                            let t = this.inputTypeFormats[s.type],
                                n = this.chart.time;
                            if (t) {
                                let o = n.dateFormat(t, e);
                                s.min !== o && (s.min = o);
                                let r = n.dateFormat(t, i);
                                s.max !== r && (s.max = r);
                            }
                        }
                    }
                    showInput(t) {
                        let e = "min" === t ? this.minDateBox : this.maxDateBox,
                            i = "min" === t ? this.minInput : this.maxInput;
                        if (i && e && this.inputGroup) {
                            let t = "text" === i.type,
                                { translateX: s = 0, translateY: n = 0 } =
                                    this.inputGroup,
                                { x: o = 0, width: r = 0, height: a = 0 } = e,
                                { inputBoxWidth: l } = this.options;
                            h(i, {
                                width: t ? r + (l ? -2 : 20) + "px" : "auto",
                                height: a - 2 + "px",
                                border: "2px solid silver",
                            }),
                                t && l
                                    ? h(i, {
                                          left: s + o + "px",
                                          top: n + "px",
                                      })
                                    : h(i, {
                                          left:
                                              Math.min(
                                                  Math.round(
                                                      o +
                                                          s -
                                                          (i.offsetWidth - r) /
                                                              2
                                                  ),
                                                  this.chart.chartWidth -
                                                      i.offsetWidth
                                              ) + "px",
                                          top:
                                              n -
                                              (i.offsetHeight - a) / 2 +
                                              "px",
                                      });
                        }
                    }
                    hideInput(t) {
                        let e = "min" === t ? this.minInput : this.maxInput;
                        e &&
                            h(e, {
                                top: "-9999em",
                                border: 0,
                                width: "1px",
                                height: "1px",
                            });
                    }
                    defaultInputDateParser(t, e, s) {
                        let n = t.split("/").join("-").split(" ").join("T");
                        if ((-1 === n.indexOf("T") && (n += "T00:00"), e))
                            n += "Z";
                        else {
                            var o;
                            if (
                                i.isSafari &&
                                (!((o = n).length > 6) ||
                                    (o.lastIndexOf("-") !== o.length - 6 &&
                                        o.lastIndexOf("+") !== o.length - 6))
                            ) {
                                let t = new Date(n).getTimezoneOffset() / 60;
                                n += t <= 0 ? `+${x(-t)}:00` : `-${x(t)}:00`;
                            }
                        }
                        let r = Date.parse(n);
                        if (!m(r)) {
                            let e = t.split("-");
                            r = Date.UTC(v(e[0]), v(e[1]) - 1, v(e[2]));
                        }
                        return (
                            s && e && m(r) && (r += s.getTimezoneOffset(r)), r
                        );
                    }
                    drawInput(t) {
                        let { chart: e, div: s, inputGroup: n } = this,
                            o = this,
                            a = e.renderer.style || {},
                            c = e.renderer,
                            d = e.options.rangeSelector,
                            u = r.lang,
                            g = "min" === t;
                        function f() {
                            let { maxInput: i, minInput: s } = o,
                                n = e.xAxis[0],
                                r =
                                    (e.scroller &&
                                        e.scroller.getUnionExtremes()) ||
                                    n,
                                a = r.dataMin,
                                l = r.dataMax,
                                h = o.getInputValue(t);
                            h !==
                                Number(
                                    A.getAttribute("data-hc-time-previous")
                                ) &&
                                m(h) &&
                                (A.setAttribute("data-hc-time-previous", h),
                                g && i && m(a)
                                    ? h > Number(i.getAttribute("data-hc-time"))
                                        ? (h = void 0)
                                        : h < a && (h = a)
                                    : s &&
                                      m(l) &&
                                      (h <
                                      Number(s.getAttribute("data-hc-time"))
                                          ? (h = void 0)
                                          : h > l && (h = l)),
                                void 0 !== h &&
                                    n.setExtremes(
                                        g ? h : n.min,
                                        g ? n.max : h,
                                        void 0,
                                        void 0,
                                        { trigger: "rangeSelectorInput" }
                                    ));
                        }
                        let x =
                                u[
                                    g ? "rangeSelectorFrom" : "rangeSelectorTo"
                                ] || "",
                            y = c
                                .label(x, 0)
                                .addClass("highcharts-range-label")
                                .attr({
                                    padding: x ? 2 : 0,
                                    height: x ? d.inputBoxHeight : 0,
                                })
                                .add(n),
                            v = c
                                .label("", 0)
                                .addClass("highcharts-range-input")
                                .attr({
                                    padding: 2,
                                    width: d.inputBoxWidth,
                                    height: d.inputBoxHeight,
                                    "text-align": "center",
                                })
                                .on("click", function () {
                                    o.showInput(t), o[t + "Input"].focus();
                                });
                        e.styledMode ||
                            v.attr({
                                stroke: d.inputBoxBorderColor,
                                "stroke-width": 1,
                            }),
                            v.add(n);
                        let A = l(
                            "input",
                            { name: t, className: "highcharts-range-selector" },
                            void 0,
                            s
                        );
                        A.setAttribute(
                            "type",
                            (function (t) {
                                let e = -1 !== t.indexOf("%L");
                                if (e) return "text";
                                let i = [
                                        "a",
                                        "A",
                                        "d",
                                        "e",
                                        "w",
                                        "b",
                                        "B",
                                        "m",
                                        "o",
                                        "y",
                                        "Y",
                                    ].some((e) => -1 !== t.indexOf("%" + e)),
                                    s = ["H", "k", "I", "l", "M", "S"].some(
                                        (e) => -1 !== t.indexOf("%" + e)
                                    );
                                return i && s
                                    ? "datetime-local"
                                    : i
                                    ? "date"
                                    : s
                                    ? "time"
                                    : "text";
                            })(d.inputDateFormat || "%e %b %Y")
                        ),
                            e.styledMode ||
                                (y.css(b(a, d.labelStyle)),
                                v.css(b({ color: "#333333" }, a, d.inputStyle)),
                                h(
                                    A,
                                    p(
                                        {
                                            position: "absolute",
                                            border: 0,
                                            boxShadow:
                                                "0 0 15px rgba(0,0,0,0.3)",
                                            width: "1px",
                                            height: "1px",
                                            padding: 0,
                                            textAlign: "center",
                                            fontSize: a.fontSize,
                                            fontFamily: a.fontFamily,
                                            top: "-9999em",
                                        },
                                        d.inputStyle
                                    )
                                )),
                            (A.onfocus = () => {
                                o.showInput(t);
                            }),
                            (A.onblur = () => {
                                A === i.doc.activeElement && f(),
                                    o.hideInput(t),
                                    o.setInputValue(t),
                                    A.blur();
                            });
                        let w = !1;
                        return (
                            (A.onchange = () => {
                                w || (f(), o.hideInput(t), A.blur());
                            }),
                            (A.onkeypress = (t) => {
                                13 === t.keyCode && f();
                            }),
                            (A.onkeydown = (t) => {
                                (w = !0),
                                    (38 === t.keyCode || 40 === t.keyCode) &&
                                        f();
                            }),
                            (A.onkeyup = () => {
                                w = !1;
                            }),
                            { dateBox: v, input: A, label: y }
                        );
                    }
                    getPosition() {
                        let t = this.chart,
                            e = t.options.rangeSelector,
                            i =
                                "top" === e.verticalAlign
                                    ? t.plotTop - t.axisOffset[0]
                                    : 0;
                        return {
                            buttonTop: i + e.buttonPosition.y,
                            inputTop: i + e.inputPosition.y - 10,
                        };
                    }
                    getYTDExtremes(t, e, i) {
                        let s = this.chart.time,
                            n = new s.Date(t),
                            o = s.get("FullYear", n),
                            r = i ? s.Date.UTC(o, 0, 1) : +new s.Date(o, 0, 1),
                            a = n.getTime();
                        return {
                            max: Math.min(t || a, a),
                            min: Math.max(e, r),
                        };
                    }
                    render(t, e) {
                        let i = this.chart,
                            s = i.renderer,
                            n = i.container,
                            o = i.options,
                            r = o.rangeSelector,
                            a = y(o.chart.style && o.chart.style.zIndex, 0) + 1,
                            h = r.inputEnabled,
                            d = this.rendered;
                        if (!1 !== r.enabled) {
                            if (
                                !d &&
                                ((this.group = s
                                    .g("range-selector-group")
                                    .attr({ zIndex: 7 })
                                    .add()),
                                (this.div = l("div", void 0, {
                                    position: "relative",
                                    height: 0,
                                    zIndex: a,
                                })),
                                this.buttonOptions.length &&
                                    this.renderButtons(),
                                n.parentNode &&
                                    n.parentNode.insertBefore(this.div, n),
                                h)
                            ) {
                                this.inputGroup = s
                                    .g("input-group")
                                    .add(this.group);
                                let t = this.drawInput("min");
                                (this.minDateBox = t.dateBox),
                                    (this.minLabel = t.label),
                                    (this.minInput = t.input);
                                let e = this.drawInput("max");
                                (this.maxDateBox = e.dateBox),
                                    (this.maxLabel = e.label),
                                    (this.maxInput = e.input);
                            }
                            if (h) {
                                this.setInputValue("min", t),
                                    this.setInputValue("max", e);
                                let s =
                                    (i.scroller &&
                                        i.scroller.getUnionExtremes()) ||
                                    i.xAxis[0] ||
                                    {};
                                if (c(s.dataMin) && c(s.dataMax)) {
                                    let t = i.xAxis[0].minRange || 0;
                                    this.setInputExtremes(
                                        "min",
                                        s.dataMin,
                                        Math.min(
                                            s.dataMax,
                                            this.getInputValue("max")
                                        ) - t
                                    ),
                                        this.setInputExtremes(
                                            "max",
                                            Math.max(
                                                s.dataMin,
                                                this.getInputValue("min")
                                            ) + t,
                                            s.dataMax
                                        );
                                }
                                if (this.inputGroup) {
                                    let t = 0;
                                    [
                                        this.minLabel,
                                        this.minDateBox,
                                        this.maxLabel,
                                        this.maxDateBox,
                                    ].forEach((e) => {
                                        if (e) {
                                            let { width: i } = e.getBBox();
                                            i &&
                                                (e.attr({ x: t }),
                                                (t += i + r.inputSpacing));
                                        }
                                    });
                                }
                            }
                            this.alignElements(), (this.rendered = !0);
                        }
                    }
                    renderButtons() {
                        let { buttons: t, chart: e, options: s } = this,
                            n = r.lang,
                            o = e.renderer,
                            h = b(s.buttonTheme),
                            c = h && h.states,
                            d = h.width || 28;
                        delete h.width,
                            delete h.states,
                            (this.buttonGroup = o
                                .g("range-selector-buttons")
                                .add(this.group));
                        let u = (this.dropdown = l(
                            "select",
                            void 0,
                            {
                                position: "absolute",
                                width: "1px",
                                height: "1px",
                                padding: 0,
                                border: 0,
                                top: "-9999em",
                                cursor: "pointer",
                                opacity: 1e-4,
                            },
                            this.div
                        ));
                        a(u, "touchstart", () => {
                            u.style.fontSize = "16px";
                        }),
                            [
                                [i.isMS ? "mouseover" : "mouseenter"],
                                [i.isMS ? "mouseout" : "mouseleave"],
                                ["change", "click"],
                            ].forEach(([e, i]) => {
                                a(u, e, () => {
                                    let s = t[this.currentButtonIndex()];
                                    s && g(s.element, i || e);
                                });
                            }),
                            (this.zoomText = o
                                .label((n && n.rangeSelectorZoom) || "", 0)
                                .attr({
                                    padding: s.buttonTheme.padding,
                                    height: s.buttonTheme.height,
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                })
                                .add(this.buttonGroup)),
                            this.chart.styledMode ||
                                (this.zoomText.css(s.labelStyle),
                                (h["stroke-width"] = y(h["stroke-width"], 0))),
                            l(
                                "option",
                                {
                                    textContent: this.zoomText.textStr,
                                    disabled: !0,
                                },
                                void 0,
                                u
                            ),
                            this.buttonOptions.forEach((e, i) => {
                                l(
                                    "option",
                                    { textContent: e.title || e.text },
                                    void 0,
                                    u
                                ),
                                    (t[i] = o
                                        .button(
                                            e.text,
                                            0,
                                            0,
                                            (t) => {
                                                let s;
                                                let n =
                                                    e.events && e.events.click;
                                                n && (s = n.call(e, t)),
                                                    !1 !== s &&
                                                        this.clickButton(i),
                                                    (this.isActive = !0);
                                            },
                                            h,
                                            c && c.hover,
                                            c && c.select,
                                            c && c.disabled
                                        )
                                        .attr({
                                            "text-align": "center",
                                            width: d,
                                        })
                                        .add(this.buttonGroup)),
                                    e.title && t[i].attr("title", e.title);
                            });
                    }
                    alignElements() {
                        let {
                                buttonGroup: t,
                                buttons: e,
                                chart: i,
                                group: s,
                                inputGroup: n,
                                options: o,
                                zoomText: r,
                            } = this,
                            a = i.options,
                            l =
                                a.exporting &&
                                !1 !== a.exporting.enabled &&
                                a.navigation &&
                                a.navigation.buttonOptions,
                            {
                                buttonPosition: h,
                                inputPosition: c,
                                verticalAlign: d,
                            } = o,
                            u = (t, e) =>
                                l &&
                                this.titleCollision(i) &&
                                "top" === d &&
                                "right" === e.align &&
                                e.y - t.getBBox().height - 12 <
                                    (l.y || 0) + (l.height || 0) + i.spacing[0]
                                    ? -40
                                    : 0,
                            p = i.plotLeft;
                        if (s && h && c) {
                            let a = h.x - i.spacing[3];
                            if (t) {
                                if (
                                    (this.positionButtons(),
                                    !this.initialButtonGroupWidth)
                                ) {
                                    let t = 0;
                                    r && (t += r.getBBox().width + 5),
                                        e.forEach((i, s) => {
                                            (t += i.width || 0),
                                                s !== e.length - 1 &&
                                                    (t += o.buttonSpacing);
                                        }),
                                        (this.initialButtonGroupWidth = t);
                                }
                                (p -= i.spacing[3]), this.updateButtonStates();
                                let n = u(t, h);
                                this.alignButtonGroup(n),
                                    (s.placed = t.placed = i.hasLoaded);
                            }
                            let l = 0;
                            n &&
                                ((l = u(n, c)),
                                "left" === c.align
                                    ? (a = p)
                                    : "right" === c.align &&
                                      (a = -Math.max(i.axisOffset[1], -l)),
                                n.align(
                                    {
                                        y: c.y,
                                        width: n.getBBox().width,
                                        align: c.align,
                                        x: c.x + a - 2,
                                    },
                                    !0,
                                    i.spacingBox
                                ),
                                (n.placed = i.hasLoaded)),
                                this.handleCollision(l),
                                s.align({ verticalAlign: d }, !0, i.spacingBox);
                            let g = s.alignAttr.translateY,
                                m = s.getBBox().height + 20,
                                b = 0;
                            if ("bottom" === d) {
                                let t = i.legend && i.legend.options,
                                    e =
                                        t &&
                                        "bottom" === t.verticalAlign &&
                                        t.enabled &&
                                        !t.floating
                                            ? i.legend.legendHeight +
                                              y(t.margin, 10)
                                            : 0;
                                b =
                                    g -
                                    (m = m + e - 20) -
                                    (o.floating ? 0 : o.y) -
                                    (i.titleOffset ? i.titleOffset[2] : 0) -
                                    10;
                            }
                            "top" === d
                                ? (o.floating && (b = 0),
                                  i.titleOffset &&
                                      i.titleOffset[0] &&
                                      (b = i.titleOffset[0]),
                                  (b += i.margin[0] - i.spacing[0] || 0))
                                : "middle" === d &&
                                  (c.y === h.y
                                      ? (b = g)
                                      : (c.y || h.y) &&
                                        (c.y < 0 || h.y < 0
                                            ? (b -= Math.min(c.y, h.y))
                                            : (b = g - m))),
                                s.translate(o.x, o.y + Math.floor(b));
                            let {
                                minInput: f,
                                maxInput: x,
                                dropdown: v,
                            } = this;
                            o.inputEnabled &&
                                f &&
                                x &&
                                ((f.style.marginTop = s.translateY + "px"),
                                (x.style.marginTop = s.translateY + "px")),
                                v && (v.style.marginTop = s.translateY + "px");
                        }
                    }
                    alignButtonGroup(t, e) {
                        let {
                                chart: i,
                                options: s,
                                buttonGroup: n,
                                buttons: o,
                            } = this,
                            { buttonPosition: r } = s,
                            a = i.plotLeft - i.spacing[3],
                            l = r.x - i.spacing[3];
                        "right" === r.align
                            ? (l += t - a)
                            : "center" === r.align && (l -= a / 2),
                            n &&
                                n.align(
                                    {
                                        y: r.y,
                                        width: y(
                                            e,
                                            this.initialButtonGroupWidth
                                        ),
                                        align: r.align,
                                        x: l,
                                    },
                                    !0,
                                    i.spacingBox
                                );
                    }
                    positionButtons() {
                        let {
                                buttons: t,
                                chart: e,
                                options: i,
                                zoomText: s,
                            } = this,
                            n = e.hasLoaded ? "animate" : "attr",
                            { buttonPosition: o } = i,
                            r = e.plotLeft,
                            a = r;
                        s &&
                            "hidden" !== s.visibility &&
                            (s[n]({ x: y(r + o.x, r) }),
                            (a += o.x + s.getBBox().width + 5));
                        for (
                            let e = 0, s = this.buttonOptions.length;
                            e < s;
                            ++e
                        )
                            "hidden" !== t[e].visibility
                                ? (t[e][n]({ x: a }),
                                  (a += (t[e].width || 0) + i.buttonSpacing))
                                : t[e][n]({ x: r });
                    }
                    handleCollision(t) {
                        let { chart: e, buttonGroup: i, inputGroup: s } = this,
                            {
                                buttonPosition: n,
                                dropdown: o,
                                inputPosition: r,
                            } = this.options,
                            a = () => {
                                let t = 0;
                                return (
                                    this.buttons.forEach((e) => {
                                        let i = e.getBBox();
                                        i.width > t && (t = i.width);
                                    }),
                                    t
                                );
                            },
                            l = (e) => {
                                if (s && i) {
                                    let o =
                                            s.alignAttr.translateX +
                                            s.alignOptions.x -
                                            t +
                                            s.getBBox().x +
                                            2,
                                        a = s.alignOptions.width,
                                        l =
                                            i.alignAttr.translateX +
                                            i.getBBox().x;
                                    return (
                                        l + e > o &&
                                        o + a > l &&
                                        n.y < r.y + s.getBBox().height
                                    );
                                }
                                return !1;
                            },
                            h = () => {
                                s &&
                                    i &&
                                    s.attr({
                                        translateX:
                                            s.alignAttr.translateX +
                                            (e.axisOffset[1] >= -t ? 0 : -t),
                                        translateY:
                                            s.alignAttr.translateY +
                                            i.getBBox().height +
                                            10,
                                    });
                            };
                        if (i) {
                            if ("always" === o) {
                                this.collapseButtons(t), l(a()) && h();
                                return;
                            }
                            "never" === o && this.expandButtons();
                        }
                        s && i
                            ? r.align === n.align ||
                              l(this.initialButtonGroupWidth + 20)
                                ? "responsive" === o
                                    ? (this.collapseButtons(t), l(a()) && h())
                                    : h()
                                : "responsive" === o && this.expandButtons()
                            : i &&
                              "responsive" === o &&
                              (this.initialButtonGroupWidth > e.plotWidth
                                  ? this.collapseButtons(t)
                                  : this.expandButtons());
                    }
                    collapseButtons(t) {
                        let {
                            buttons: e,
                            buttonOptions: i,
                            chart: s,
                            dropdown: n,
                            options: o,
                            zoomText: r,
                        } = this;
                        if (!0 === this.isCollapsed) return;
                        this.isCollapsed = !0;
                        let a =
                                (s.userOptions.rangeSelector &&
                                    s.userOptions.rangeSelector.buttonTheme) ||
                                {},
                            l = (t) => ({
                                text: t ? `${t} ▾` : "▾",
                                width: "auto",
                                paddingLeft: y(
                                    o.buttonTheme.paddingLeft,
                                    a.padding,
                                    8
                                ),
                                paddingRight: y(
                                    o.buttonTheme.paddingRight,
                                    a.padding,
                                    8
                                ),
                            });
                        r && r.hide();
                        let h = !1;
                        i.forEach((t, i) => {
                            let s = e[i];
                            2 !== s.state
                                ? s.hide()
                                : (s.show(), s.attr(l(t.text)), (h = !0));
                        }),
                            h ||
                                (n && (n.selectedIndex = 0),
                                e[0].show(),
                                e[0].attr(
                                    l(this.zoomText && this.zoomText.textStr)
                                ));
                        let { align: c } = o.buttonPosition;
                        this.positionButtons(),
                            ("right" === c || "center" === c) &&
                                this.alignButtonGroup(
                                    t,
                                    e[this.currentButtonIndex()].getBBox().width
                                ),
                            this.showDropdown();
                    }
                    expandButtons() {
                        let {
                            buttons: t,
                            buttonOptions: e,
                            options: i,
                            zoomText: s,
                        } = this;
                        this.hideDropdown(),
                            !1 !== this.isCollapsed &&
                                ((this.isCollapsed = !1),
                                s && s.show(),
                                e.forEach((e, s) => {
                                    let n = t[s];
                                    n.show(),
                                        n.attr({
                                            text: e.text,
                                            width: i.buttonTheme.width || 28,
                                            paddingLeft: y(
                                                i.buttonTheme.paddingLeft,
                                                "unset"
                                            ),
                                            paddingRight: y(
                                                i.buttonTheme.paddingRight,
                                                "unset"
                                            ),
                                        }),
                                        n.state < 2 && n.setState(0);
                                }),
                                this.positionButtons());
                    }
                    currentButtonIndex() {
                        let { dropdown: t } = this;
                        return t && t.selectedIndex > 0
                            ? t.selectedIndex - 1
                            : 0;
                    }
                    showDropdown() {
                        let {
                            buttonGroup: t,
                            buttons: e,
                            chart: i,
                            dropdown: s,
                        } = this;
                        if (t && s) {
                            let { translateX: n = 0, translateY: o = 0 } = t,
                                r = e[this.currentButtonIndex()].getBBox();
                            h(s, {
                                left: i.plotLeft + n + "px",
                                top: o + 0.5 + "px",
                                width: r.width + "px",
                                height: r.height + "px",
                            }),
                                (this.hasVisibleDropdown = !0);
                        }
                    }
                    hideDropdown() {
                        let { dropdown: t } = this;
                        t &&
                            (h(t, {
                                top: "-9999em",
                                width: "1px",
                                height: "1px",
                            }),
                            (this.hasVisibleDropdown = !1));
                    }
                    getHeight() {
                        let t = this.options,
                            e = this.group,
                            i = t.inputPosition,
                            s = t.buttonPosition,
                            n = t.y,
                            o = s.y,
                            r = i.y,
                            a = 0;
                        return t.height
                            ? t.height
                            : (this.alignElements(),
                              (a = e ? e.getBBox(!0).height + 13 + n : 0),
                              ((r < 0 && o < 0) || (r > 0 && o > 0)) &&
                                  (a += Math.abs(Math.min(r, o))),
                              a);
                    }
                    titleCollision(t) {
                        return !(
                            t.options.title.text || t.options.subtitle.text
                        );
                    }
                    update(t) {
                        let e = this.chart;
                        b(!0, e.options.rangeSelector, t),
                            this.destroy(),
                            this.init(e),
                            this.render();
                    }
                    destroy() {
                        let t = this,
                            e = t.minInput,
                            i = t.maxInput;
                        t.eventsToUnbind &&
                            (t.eventsToUnbind.forEach((t) => t()),
                            (t.eventsToUnbind = void 0)),
                            d(t.buttons),
                            e && (e.onfocus = e.onblur = e.onchange = null),
                            i && (i.onfocus = i.onblur = i.onchange = null),
                            f(
                                t,
                                function (e, i) {
                                    e &&
                                        "chart" !== i &&
                                        (e instanceof n
                                            ? e.destroy()
                                            : e instanceof window.HTMLElement &&
                                              u(e)),
                                        e !== w.prototype[i] && (t[i] = null);
                                },
                                this
                            );
                    }
                }
                return (
                    p(w.prototype, {
                        defaultButtons: [
                            {
                                type: "month",
                                count: 1,
                                text: "1m",
                                title: "View 1 month",
                            },
                            {
                                type: "month",
                                count: 3,
                                text: "3m",
                                title: "View 3 months",
                            },
                            {
                                type: "month",
                                count: 6,
                                text: "6m",
                                title: "View 6 months",
                            },
                            {
                                type: "ytd",
                                text: "YTD",
                                title: "View year to date",
                            },
                            {
                                type: "year",
                                count: 1,
                                text: "1y",
                                title: "View 1 year",
                            },
                            { type: "all", text: "All", title: "View all" },
                        ],
                        inputTypeFormats: {
                            "datetime-local": "%Y-%m-%dT%H:%M:%S",
                            date: "%Y-%m-%d",
                            time: "%H:%M:%S",
                        },
                    }),
                    w
                );
            }
        ),
        i(
            e,
            "Accessibility/Components/RangeSelectorComponent.js",
            [
                e["Accessibility/AccessibilityComponent.js"],
                e["Accessibility/Utils/Announcer.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Core/Globals.js"],
                e["Accessibility/KeyboardNavigationHandler.js"],
                e["Stock/RangeSelector/RangeSelector.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, n, o, r) {
                let {
                        unhideChartElementFromAT: a,
                        getAxisRangeDescription: l,
                    } = i,
                    { composed: h } = s,
                    { addEvent: c, attr: d, pushUnique: u } = r;
                class p extends t {
                    init() {
                        let t = this.chart;
                        this.announcer = new e(t, "polite");
                    }
                    onChartUpdate() {
                        let t = this.chart,
                            e = this,
                            i = t.rangeSelector;
                        i &&
                            (this.updateSelectorVisibility(),
                            this.setDropdownAttrs(),
                            i.buttons &&
                                i.buttons.length &&
                                i.buttons.forEach((t) => {
                                    e.setRangeButtonAttrs(t);
                                }),
                            i.maxInput &&
                                i.minInput &&
                                ["minInput", "maxInput"].forEach(function (
                                    s,
                                    n
                                ) {
                                    let o = i[s];
                                    o &&
                                        (a(t, o),
                                        e.setRangeInputAttrs(
                                            o,
                                            "accessibility.rangeSelector." +
                                                (n ? "max" : "min") +
                                                "InputLabel"
                                        ));
                                }));
                    }
                    updateSelectorVisibility() {
                        let t = this.chart,
                            e = t.rangeSelector,
                            i = e && e.dropdown,
                            s = (e && e.buttons) || [],
                            n = (t) => t.setAttribute("aria-hidden", !0);
                        e && e.hasVisibleDropdown && i
                            ? (a(t, i), s.forEach((t) => n(t.element)))
                            : (i && n(i), s.forEach((e) => a(t, e.element)));
                    }
                    setDropdownAttrs() {
                        let t = this.chart,
                            e = t.rangeSelector && t.rangeSelector.dropdown;
                        if (e) {
                            let i = t.langFormat(
                                "accessibility.rangeSelector.dropdownLabel",
                                { rangeTitle: t.options.lang.rangeSelectorZoom }
                            );
                            e.setAttribute("aria-label", i),
                                e.setAttribute("tabindex", -1);
                        }
                    }
                    setRangeButtonAttrs(t) {
                        d(t.element, { tabindex: -1, role: "button" });
                    }
                    setRangeInputAttrs(t, e) {
                        let i = this.chart;
                        d(t, {
                            tabindex: -1,
                            "aria-label": i.langFormat(e, { chart: i }),
                        });
                    }
                    onButtonNavKbdArrowKey(t, e) {
                        let i = t.response,
                            s = this.keyCodes,
                            n = this.chart,
                            o =
                                n.options.accessibility.keyboardNavigation
                                    .wrapAround,
                            r = e === s.left || e === s.up ? -1 : 1,
                            a = n.highlightRangeSelectorButton(
                                n.highlightedRangeSelectorItemIx + r
                            );
                        return a
                            ? i.success
                            : o
                            ? (t.init(r), i.success)
                            : i[r > 0 ? "next" : "prev"];
                    }
                    onButtonNavKbdClick(t) {
                        let e = t.response,
                            i = this.chart,
                            s = 3 === i.oldRangeSelectorItemState;
                        return (
                            s ||
                                this.fakeClickEvent(
                                    i.rangeSelector.buttons[
                                        i.highlightedRangeSelectorItemIx
                                    ].element
                                ),
                            e.success
                        );
                    }
                    onAfterBtnClick() {
                        let t = this.chart,
                            e = l(t.xAxis[0]),
                            i = t.langFormat(
                                "accessibility.rangeSelector.clickButtonAnnouncement",
                                { chart: t, axisRangeDescription: e }
                            );
                        i && this.announcer.announce(i);
                    }
                    onInputKbdMove(t) {
                        let e = this.chart,
                            i = e.rangeSelector,
                            s = (e.highlightedInputRangeIx =
                                (e.highlightedInputRangeIx || 0) + t);
                        if (s > 1 || s < 0) {
                            if (e.accessibility)
                                return (
                                    (e.accessibility.keyboardNavigation.exiting =
                                        !0),
                                    e.accessibility.keyboardNavigation.tabindexContainer.focus(),
                                    e.accessibility.keyboardNavigation.move(t)
                                );
                        } else if (i) {
                            let t = i[s ? "maxDateBox" : "minDateBox"],
                                n = i[s ? "maxInput" : "minInput"];
                            t && n && e.setFocusToElement(t, n);
                        }
                        return !0;
                    }
                    onInputNavInit(t) {
                        let e = this,
                            i = this.chart,
                            s = t > 0 ? 0 : 1,
                            n = i.rangeSelector,
                            o = n && n[s ? "maxDateBox" : "minDateBox"],
                            r = n && n.minInput,
                            a = n && n.maxInput,
                            l = s ? a : r;
                        if (((i.highlightedInputRangeIx = s), o && r && a)) {
                            i.setFocusToElement(o, l),
                                this.removeInputKeydownHandler &&
                                    this.removeInputKeydownHandler();
                            let t = (t) => {
                                    let i =
                                        (t.which || t.keyCode) ===
                                        this.keyCodes.tab;
                                    i &&
                                        e.onInputKbdMove(t.shiftKey ? -1 : 1) &&
                                        (t.preventDefault(),
                                        t.stopPropagation());
                                },
                                s = c(r, "keydown", t),
                                n = c(a, "keydown", t);
                            this.removeInputKeydownHandler = () => {
                                s(), n();
                            };
                        }
                    }
                    onInputNavTerminate() {
                        let t = this.chart.rangeSelector || {};
                        t.maxInput && t.hideInput("max"),
                            t.minInput && t.hideInput("min"),
                            this.removeInputKeydownHandler &&
                                (this.removeInputKeydownHandler(),
                                delete this.removeInputKeydownHandler);
                    }
                    initDropdownNav() {
                        let t = this.chart,
                            e = t.rangeSelector,
                            i = e && e.dropdown;
                        e &&
                            i &&
                            (t.setFocusToElement(e.buttonGroup, i),
                            this.removeDropdownKeydownHandler &&
                                this.removeDropdownKeydownHandler(),
                            (this.removeDropdownKeydownHandler = c(
                                i,
                                "keydown",
                                (e) => {
                                    let i =
                                            (e.which || e.keyCode) ===
                                            this.keyCodes.tab,
                                        s = t.accessibility;
                                    i &&
                                        (e.preventDefault(),
                                        e.stopPropagation(),
                                        s &&
                                            (s.keyboardNavigation.tabindexContainer.focus(),
                                            s.keyboardNavigation.move(
                                                e.shiftKey ? -1 : 1
                                            )));
                                }
                            )));
                    }
                    getRangeSelectorButtonNavigation() {
                        let t = this.chart,
                            e = this.keyCodes,
                            i = this;
                        return new n(t, {
                            keyCodeMap: [
                                [
                                    [e.left, e.right, e.up, e.down],
                                    function (t) {
                                        return i.onButtonNavKbdArrowKey(
                                            this,
                                            t
                                        );
                                    },
                                ],
                                [
                                    [e.enter, e.space],
                                    function () {
                                        return i.onButtonNavKbdClick(this);
                                    },
                                ],
                            ],
                            validate: function () {
                                return !!(
                                    t.rangeSelector &&
                                    t.rangeSelector.buttons &&
                                    t.rangeSelector.buttons.length
                                );
                            },
                            init: function (e) {
                                let s = t.rangeSelector;
                                if (s && s.hasVisibleDropdown)
                                    i.initDropdownNav();
                                else if (s) {
                                    let i = s.buttons.length - 1;
                                    t.highlightRangeSelectorButton(
                                        e > 0 ? 0 : i
                                    );
                                }
                            },
                            terminate: function () {
                                i.removeDropdownKeydownHandler &&
                                    (i.removeDropdownKeydownHandler(),
                                    delete i.removeDropdownKeydownHandler);
                            },
                        });
                    }
                    getRangeSelectorInputNavigation() {
                        let t = this.chart,
                            e = this;
                        return new n(t, {
                            keyCodeMap: [],
                            validate: function () {
                                return !!(
                                    t.rangeSelector &&
                                    t.rangeSelector.inputGroup &&
                                    "hidden" !==
                                        t.rangeSelector.inputGroup.element.style
                                            .visibility &&
                                    !1 !==
                                        t.options.rangeSelector.inputEnabled &&
                                    t.rangeSelector.minInput &&
                                    t.rangeSelector.maxInput
                                );
                            },
                            init: function (t) {
                                e.onInputNavInit(t);
                            },
                            terminate: function () {
                                e.onInputNavTerminate();
                            },
                        });
                    }
                    getKeyboardNavigation() {
                        return [
                            this.getRangeSelectorButtonNavigation(),
                            this.getRangeSelectorInputNavigation(),
                        ];
                    }
                    destroy() {
                        this.removeDropdownKeydownHandler &&
                            this.removeDropdownKeydownHandler(),
                            this.removeInputKeydownHandler &&
                                this.removeInputKeydownHandler(),
                            this.announcer && this.announcer.destroy();
                    }
                }
                return (
                    (function (t) {
                        function e(t) {
                            let e =
                                    (this.rangeSelector &&
                                        this.rangeSelector.buttons) ||
                                    [],
                                i = this.highlightedRangeSelectorItemIx,
                                s =
                                    this.rangeSelector &&
                                    this.rangeSelector.selected;
                            return (
                                void 0 !== i &&
                                    e[i] &&
                                    i !== s &&
                                    e[i].setState(
                                        this.oldRangeSelectorItemState || 0
                                    ),
                                (this.highlightedRangeSelectorItemIx = t),
                                !!e[t] &&
                                    (this.setFocusToElement(
                                        e[t].box,
                                        e[t].element
                                    ),
                                    t !== s &&
                                        ((this.oldRangeSelectorItemState =
                                            e[t].state),
                                        e[t].setState(1)),
                                    !0)
                            );
                        }
                        function i() {
                            let t = this.chart.accessibility;
                            if (t && t.components.rangeSelector)
                                return t.components.rangeSelector.onAfterBtnClick();
                        }
                        t.compose = function t(s, n) {
                            if (u(h, t)) {
                                let t = s.prototype;
                                (t.highlightRangeSelectorButton = e),
                                    c(o, "afterBtnClick", i);
                            }
                        };
                    })(p || (p = {})),
                    p
                );
            }
        ),
        i(
            e,
            "Accessibility/Components/SeriesComponent/ForcedMarkers.js",
            [e["Core/Globals.js"], e["Core/Utilities.js"]],
            function (t, e) {
                var i;
                let { composed: s } = t,
                    { addEvent: n, merge: o, pushUnique: r } = e;
                return (
                    (function (t) {
                        function e(t) {
                            o(!0, t, {
                                marker: {
                                    enabled: !0,
                                    states: { normal: { opacity: 0 } },
                                },
                            });
                        }
                        function i(t) {
                            return (
                                t.marker.states &&
                                t.marker.states.normal &&
                                t.marker.states.normal.opacity
                            );
                        }
                        function a(t) {
                            return !!(
                                t._hasPointMarkers &&
                                t.points &&
                                t.points.length
                            );
                        }
                        function l() {
                            this.chart.styledMode &&
                                (this.markerGroup &&
                                    this.markerGroup[
                                        this.a11yMarkersForced
                                            ? "addClass"
                                            : "removeClass"
                                    ]("highcharts-a11y-markers-hidden"),
                                a(this) &&
                                    this.points.forEach((t) => {
                                        t.graphic &&
                                            (t.graphic[
                                                t.hasForcedA11yMarker
                                                    ? "addClass"
                                                    : "removeClass"
                                            ]("highcharts-a11y-marker-hidden"),
                                            t.graphic[
                                                !1 === t.hasForcedA11yMarker
                                                    ? "addClass"
                                                    : "removeClass"
                                            ](
                                                "highcharts-a11y-marker-visible"
                                            ));
                                    }));
                        }
                        function h(t) {
                            this.resetA11yMarkerOptions = o(
                                t.options.marker || {},
                                this.userOptions.marker || {}
                            );
                        }
                        function c() {
                            let t = this.options;
                            (function (t) {
                                let e = t.chart,
                                    i = e.options.accessibility.enabled,
                                    s =
                                        !1 !==
                                        (t.options.accessibility &&
                                            t.options.accessibility.enabled);
                                return (
                                    i &&
                                    s &&
                                    (function (t) {
                                        let e = t.chart.options.accessibility;
                                        return (
                                            t.points.length <
                                                e.series
                                                    .pointDescriptionEnabledThreshold ||
                                            !1 ===
                                                e.series
                                                    .pointDescriptionEnabledThreshold
                                        );
                                    })(t)
                                );
                            })(this)
                                ? (t.marker &&
                                      !1 === t.marker.enabled &&
                                      ((this.a11yMarkersForced = !0),
                                      e(this.options)),
                                  a(this) &&
                                      (function (t) {
                                          let s = t.points.length;
                                          for (; s--; ) {
                                              let n = t.points[s],
                                                  r = n.options,
                                                  a = n.hasForcedA11yMarker;
                                              if (
                                                  (delete n.hasForcedA11yMarker,
                                                  r.marker)
                                              ) {
                                                  let t = a && 0 === i(r);
                                                  r.marker.enabled && !t
                                                      ? (o(!0, r.marker, {
                                                            states: {
                                                                normal: {
                                                                    opacity:
                                                                        i(r) ||
                                                                        1,
                                                                },
                                                            },
                                                        }),
                                                        (n.hasForcedA11yMarker =
                                                            !1))
                                                      : !1 ===
                                                            r.marker.enabled &&
                                                        (e(r),
                                                        (n.hasForcedA11yMarker =
                                                            !0));
                                              }
                                          }
                                      })(this))
                                : this.a11yMarkersForced &&
                                  (delete this.a11yMarkersForced,
                                  (function (t) {
                                      let e = t.resetA11yMarkerOptions;
                                      if (e) {
                                          let i =
                                              e.states &&
                                              e.states.normal &&
                                              e.states.normal.opacity;
                                          t.userOptions &&
                                              t.userOptions.marker &&
                                              (t.userOptions.marker.enabled =
                                                  !0),
                                              t.update({
                                                  marker: {
                                                      enabled: e.enabled,
                                                      states: {
                                                          normal: {
                                                              opacity: i,
                                                          },
                                                      },
                                                  },
                                              });
                                      }
                                  })(this),
                                  delete this.resetA11yMarkerOptions);
                        }
                        t.compose = function t(e) {
                            r(s, t) &&
                                (n(e, "afterSetOptions", h),
                                n(e, "render", c),
                                n(e, "afterRender", l));
                        };
                    })(i || (i = {})),
                    i
                );
            }
        ),
        i(
            e,
            "Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js",
            [
                e["Core/Series/Point.js"],
                e["Core/Series/Series.js"],
                e["Core/Series/SeriesRegistry.js"],
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
                e["Accessibility/KeyboardNavigationHandler.js"],
                e["Accessibility/Utils/EventProvider.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
            ],
            function (t, e, i, s, n, o, r, a) {
                let { seriesTypes: l } = i,
                    { composed: h, doc: c } = s,
                    { defined: d, fireEvent: u, pushUnique: p } = n,
                    {
                        getPointFromXY: g,
                        getSeriesFromName: m,
                        scrollAxisToPoint: b,
                    } = a;
                function f(t) {
                    let e = t.index,
                        i = t.series.points,
                        s = i.length;
                    if (i[e] === t) return e;
                    for (; s--; ) if (i[s] === t) return s;
                }
                function x(t) {
                    let e = t.chart.options.accessibility,
                        i = e.keyboardNavigation.seriesNavigation,
                        s = t.options.accessibility || {},
                        n = s.keyboardNavigation;
                    return (
                        (n && !1 === n.enabled) ||
                        !1 === s.enabled ||
                        !1 === t.options.enableMouseTracking ||
                        !t.visible ||
                        (i.pointNavigationEnabledThreshold &&
                            +i.pointNavigationEnabledThreshold <=
                                t.points.length)
                    );
                }
                function y(t) {
                    let e = t.series.chart.options.accessibility,
                        i =
                            t.options.accessibility &&
                            !1 === t.options.accessibility.enabled;
                    return (
                        (t.isNull &&
                            e.keyboardNavigation.seriesNavigation
                                .skipNullPoints) ||
                        !1 === t.visible ||
                        !1 === t.isInside ||
                        i ||
                        x(t.series)
                    );
                }
                function v(t) {
                    let e = t.series || [],
                        i = e.length;
                    for (let t = 0; t < i; ++t)
                        if (!x(e[t])) {
                            let i = (function (t) {
                                let e = t.points || [],
                                    i = e.length;
                                for (let t = 0; t < i; ++t)
                                    if (!y(e[t])) return e[t];
                                return null;
                            })(e[t]);
                            if (i) return i;
                        }
                    return null;
                }
                function A(t) {
                    let e = t.series.length,
                        i = e,
                        s = !1;
                    for (
                        ;
                        i-- &&
                        ((t.highlightedPoint =
                            t.series[i].points[t.series[i].points.length - 1]),
                        !(s = t.series[i].highlightNextValidPoint()));

                    );
                    return s;
                }
                function w(t) {
                    delete t.highlightedPoint;
                    let e = v(t);
                    return !!e && e.highlight();
                }
                class C {
                    constructor(t, e) {
                        (this.keyCodes = e), (this.chart = t);
                    }
                    init() {
                        let i = this,
                            s = this.chart,
                            n = (this.eventProvider = new r());
                        n.addEvent(e, "destroy", function () {
                            return i.onSeriesDestroy(this);
                        }),
                            n.addEvent(s, "afterApplyDrilldown", function () {
                                !(function (t) {
                                    let e = v(t);
                                    e && e.highlight(!1);
                                })(this);
                            }),
                            n.addEvent(s, "drilldown", function (t) {
                                let e = t.point,
                                    s = e.series;
                                i.lastDrilledDownPoint = {
                                    x: e.x,
                                    y: e.y,
                                    seriesName: s ? s.name : "",
                                };
                            }),
                            n.addEvent(s, "drillupall", function () {
                                setTimeout(function () {
                                    i.onDrillupAll();
                                }, 10);
                            }),
                            n.addEvent(t, "afterSetState", function () {
                                let t = this.graphic && this.graphic.element,
                                    e = c.activeElement,
                                    i = e && e.getAttribute("class"),
                                    n =
                                        i &&
                                        i.indexOf(
                                            "highcharts-a11y-proxy-element"
                                        ) > -1;
                                s.highlightedPoint === this &&
                                    e !== t &&
                                    !n &&
                                    t &&
                                    t.focus &&
                                    t.focus();
                            });
                    }
                    onDrillupAll() {
                        let t;
                        let e = this.lastDrilledDownPoint,
                            i = this.chart,
                            s = e && m(i, e.seriesName);
                        e && s && d(e.x) && d(e.y) && (t = g(s, e.x, e.y)),
                            (t = t || v(i)),
                            i.container && i.container.focus(),
                            t && t.highlight && t.highlight(!1);
                    }
                    getKeyboardNavigationHandler() {
                        let t = this,
                            e = this.keyCodes,
                            i = this.chart,
                            s = i.inverted;
                        return new o(i, {
                            keyCodeMap: [
                                [
                                    s ? [e.up, e.down] : [e.left, e.right],
                                    function (e) {
                                        return t.onKbdSideways(this, e);
                                    },
                                ],
                                [
                                    s ? [e.left, e.right] : [e.up, e.down],
                                    function (e) {
                                        return t.onKbdVertical(this, e);
                                    },
                                ],
                                [
                                    [e.enter, e.space],
                                    function (t, e) {
                                        let s = i.highlightedPoint;
                                        return (
                                            s &&
                                                ((e.point = s),
                                                u(s.series, "click", e),
                                                s.firePointEvent("click")),
                                            this.response.success
                                        );
                                    },
                                ],
                                [
                                    [e.home],
                                    function () {
                                        return w(i), this.response.success;
                                    },
                                ],
                                [
                                    [e.end],
                                    function () {
                                        return A(i), this.response.success;
                                    },
                                ],
                                [
                                    [e.pageDown, e.pageUp],
                                    function (t) {
                                        return (
                                            i.highlightAdjacentSeries(
                                                t === e.pageDown
                                            ),
                                            this.response.success
                                        );
                                    },
                                ],
                            ],
                            init: function () {
                                return t.onHandlerInit(this);
                            },
                            validate: function () {
                                return !!v(i);
                            },
                            terminate: function () {
                                return t.onHandlerTerminate();
                            },
                        });
                    }
                    onKbdSideways(t, e) {
                        let i = this.keyCodes,
                            s = e === i.right || e === i.down;
                        return this.attemptHighlightAdjacentPoint(t, s);
                    }
                    onHandlerInit(t) {
                        let e = this.chart,
                            i = e.options.accessibility.keyboardNavigation;
                        return (
                            i.seriesNavigation.rememberPointFocus &&
                            e.highlightedPoint
                                ? e.highlightedPoint.highlight()
                                : w(e),
                            t.response.success
                        );
                    }
                    onKbdVertical(t, e) {
                        let i = this.chart,
                            s = this.keyCodes,
                            n = e === s.down || e === s.right,
                            o =
                                i.options.accessibility.keyboardNavigation
                                    .seriesNavigation;
                        if (o.mode && "serialize" === o.mode)
                            return this.attemptHighlightAdjacentPoint(t, n);
                        let r =
                            i.highlightedPoint &&
                            i.highlightedPoint.series.keyboardMoveVertical
                                ? "highlightAdjacentPointVertical"
                                : "highlightAdjacentSeries";
                        return i[r](n), t.response.success;
                    }
                    onHandlerTerminate() {
                        let t = this.chart,
                            e = t.options.accessibility.keyboardNavigation;
                        t.tooltip && t.tooltip.hide(0);
                        let i = t.highlightedPoint && t.highlightedPoint.series;
                        i && i.onMouseOut && i.onMouseOut(),
                            t.highlightedPoint &&
                                t.highlightedPoint.onMouseOut &&
                                t.highlightedPoint.onMouseOut(),
                            e.seriesNavigation.rememberPointFocus ||
                                delete t.highlightedPoint;
                    }
                    attemptHighlightAdjacentPoint(t, e) {
                        let i = this.chart,
                            s =
                                i.options.accessibility.keyboardNavigation
                                    .wrapAround,
                            n = i.highlightAdjacentPoint(e);
                        return n
                            ? t.response.success
                            : s && (e ? w(i) : A(i))
                            ? t.response.success
                            : t.response[e ? "next" : "prev"];
                    }
                    onSeriesDestroy(t) {
                        let e = this.chart,
                            i =
                                e.highlightedPoint &&
                                e.highlightedPoint.series === t;
                        i &&
                            (delete e.highlightedPoint,
                            e.focusElement &&
                                e.focusElement.removeFocusBorder());
                    }
                    destroy() {
                        this.eventProvider.removeAddedEvents();
                    }
                }
                return (
                    (function (t) {
                        function e(t) {
                            let e, i;
                            let s = this.series,
                                n = this.highlightedPoint,
                                o = (n && f(n)) || 0,
                                r = (n && n.series.points) || [],
                                a =
                                    this.series &&
                                    this.series[this.series.length - 1],
                                l =
                                    a &&
                                    a.points &&
                                    a.points[a.points.length - 1];
                            if (!s[0] || !s[0].points) return !1;
                            if (n) {
                                if (
                                    ((e = s[n.series.index + (t ? 1 : -1)]),
                                    (i = r[o + (t ? 1 : -1)]) ||
                                        !e ||
                                        (i =
                                            e.points[
                                                t ? 0 : e.points.length - 1
                                            ]),
                                    !i)
                                )
                                    return !1;
                            } else i = t ? s[0].points[0] : l;
                            return y(i)
                                ? (x((e = i.series))
                                      ? (this.highlightedPoint = t
                                            ? e.points[e.points.length - 1]
                                            : e.points[0])
                                      : (this.highlightedPoint = i),
                                  this.highlightAdjacentPoint(t))
                                : i.highlight();
                        }
                        function i(t) {
                            let e = this.highlightedPoint,
                                i = 1 / 0,
                                s;
                            return (
                                !!(d(e.plotX) && d(e.plotY)) &&
                                (this.series.forEach((n) => {
                                    x(n) ||
                                        n.points.forEach((o) => {
                                            if (
                                                !d(o.plotY) ||
                                                !d(o.plotX) ||
                                                o === e
                                            )
                                                return;
                                            let r = o.plotY - e.plotY,
                                                a = Math.abs(o.plotX - e.plotX),
                                                l =
                                                    Math.abs(r) * Math.abs(r) +
                                                    a * a * 4;
                                            n.yAxis &&
                                                n.yAxis.reversed &&
                                                (r *= -1),
                                                !(
                                                    (r <= 0 && t) ||
                                                    (r >= 0 && !t) ||
                                                    l < 5 ||
                                                    y(o)
                                                ) &&
                                                    l < i &&
                                                    ((i = l), (s = o));
                                        });
                                }),
                                !!s && s.highlight())
                            );
                        }
                        function s(t) {
                            let e, i, s;
                            let n = this.highlightedPoint,
                                o =
                                    this.series &&
                                    this.series[this.series.length - 1],
                                r =
                                    o &&
                                    o.points &&
                                    o.points[o.points.length - 1];
                            return this.highlightedPoint
                                ? !!(
                                      (e =
                                          this.series[
                                              n.series.index + (t ? -1 : 1)
                                          ]) &&
                                      (i = (function (t, e, i, s) {
                                          let n = 1 / 0,
                                              o,
                                              r,
                                              a,
                                              l = e.points.length,
                                              h = (t) =>
                                                  !(d(t.plotX) && d(t.plotY));
                                          if (!h(t)) {
                                              for (; l--; )
                                                  !h((o = e.points[l])) &&
                                                      (a =
                                                          (t.plotX - o.plotX) *
                                                              (t.plotX -
                                                                  o.plotX) *
                                                              4 +
                                                          (t.plotY - o.plotY) *
                                                              (t.plotY -
                                                                  o.plotY) *
                                                              1) < n &&
                                                      ((n = a), (r = l));
                                              return d(r)
                                                  ? e.points[r]
                                                  : void 0;
                                          }
                                      })(n, e, 0))
                                  ) &&
                                      (x(e)
                                          ? (i.highlight(),
                                            (s =
                                                this.highlightAdjacentSeries(
                                                    t
                                                )))
                                              ? s
                                              : (n.highlight(), !1)
                                          : (i.highlight(),
                                            i.series.highlightNextValidPoint()))
                                : ((e = t ? this.series && this.series[0] : o),
                                  !!(i = t
                                      ? e && e.points && e.points[0]
                                      : r) && i.highlight());
                        }
                        function n(t = !0) {
                            let e = this.series.chart,
                                i = e.tooltip?.label?.element;
                            !this.isNull && t
                                ? this.onMouseOver()
                                : e.tooltip && e.tooltip.hide(0),
                                b(this),
                                this.graphic &&
                                    (e.setFocusToElement(this.graphic),
                                    !t &&
                                        e.focusElement &&
                                        e.focusElement.removeFocusBorder()),
                                (e.highlightedPoint = this);
                            let s = i?.getBoundingClientRect().top;
                            if (i && s && s < 0) {
                                let t = window.scrollY;
                                window.scrollTo({
                                    behavior: "smooth",
                                    top: t + s,
                                });
                            }
                            return this;
                        }
                        function o() {
                            let t = this.chart.highlightedPoint,
                                e = (t && t.series) === this ? f(t) : 0,
                                i = this.points,
                                s = i.length;
                            if (i && s) {
                                for (let t = e; t < s; ++t)
                                    if (!y(i[t])) return i[t].highlight();
                                for (let t = e; t >= 0; --t)
                                    if (!y(i[t])) return i[t].highlight();
                            }
                            return !1;
                        }
                        t.compose = function t(r, a, c) {
                            if (p(h, t)) {
                                let t = r.prototype,
                                    h = a.prototype,
                                    d = c.prototype;
                                (t.highlightAdjacentPoint = e),
                                    (t.highlightAdjacentPointVertical = i),
                                    (t.highlightAdjacentSeries = s),
                                    (h.highlight = n),
                                    (d.keyboardMoveVertical = !0),
                                    ["column", "gantt", "pie"].forEach((t) => {
                                        l[t] &&
                                            (l[
                                                t
                                            ].prototype.keyboardMoveVertical =
                                                !1);
                                    }),
                                    (d.highlightNextValidPoint = o);
                            }
                        };
                    })(C || (C = {})),
                    C
                );
            }
        ),
        i(
            e,
            "Accessibility/Components/SeriesComponent/SeriesComponent.js",
            [
                e["Accessibility/AccessibilityComponent.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Accessibility/Components/SeriesComponent/ForcedMarkers.js"],
                e[
                    "Accessibility/Components/SeriesComponent/NewDataAnnouncer.js"
                ],
                e[
                    "Accessibility/Components/SeriesComponent/SeriesDescriber.js"
                ],
                e[
                    "Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js"
                ],
            ],
            function (t, e, i, s, n, o) {
                let { hideSeriesFromAT: r } = e,
                    { describeSeries: a } = n;
                return class extends t {
                    static compose(t, e, n) {
                        s.compose(n), i.compose(n), o.compose(t, e, n);
                    }
                    init() {
                        (this.newDataAnnouncer = new s(this.chart)),
                            this.newDataAnnouncer.init(),
                            (this.keyboardNavigation = new o(
                                this.chart,
                                this.keyCodes
                            )),
                            this.keyboardNavigation.init(),
                            this.hideTooltipFromATWhenShown(),
                            this.hideSeriesLabelsFromATWhenShown();
                    }
                    hideTooltipFromATWhenShown() {
                        let t = this;
                        this.chart.tooltip &&
                            this.addEvent(
                                this.chart.tooltip.constructor,
                                "refresh",
                                function () {
                                    this.chart === t.chart &&
                                        this.label &&
                                        this.label.element &&
                                        this.label.element.setAttribute(
                                            "aria-hidden",
                                            !0
                                        );
                                }
                            );
                    }
                    hideSeriesLabelsFromATWhenShown() {
                        this.addEvent(
                            this.chart,
                            "afterDrawSeriesLabels",
                            function () {
                                this.series.forEach(function (t) {
                                    t.labelBySeries &&
                                        t.labelBySeries.attr("aria-hidden", !0);
                                });
                            }
                        );
                    }
                    onChartRender() {
                        let t = this.chart;
                        t.series.forEach(function (t) {
                            let e =
                                !1 !==
                                    (t.options.accessibility &&
                                        t.options.accessibility.enabled) &&
                                t.visible &&
                                0 !== t.data.length;
                            e ? a(t) : r(t);
                        });
                    }
                    getKeyboardNavigation() {
                        return this.keyboardNavigation.getKeyboardNavigationHandler();
                    }
                    destroy() {
                        this.newDataAnnouncer.destroy(),
                            this.keyboardNavigation.destroy();
                    }
                };
            }
        ),
        i(
            e,
            "Accessibility/Components/ZoomComponent.js",
            [
                e["Accessibility/AccessibilityComponent.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
                e["Accessibility/KeyboardNavigationHandler.js"],
                e["Core/Utilities.js"],
            ],
            function (t, e, i, s, n) {
                let { unhideChartElementFromAT: o } = e,
                    { getFakeMouseEvent: r } = i,
                    { attr: a, pick: l } = n;
                return class extends t {
                    constructor() {
                        super(...arguments), (this.focusedMapNavButtonIx = -1);
                    }
                    init() {
                        let t = this,
                            e = this.chart;
                        this.proxyProvider.addGroup("zoom", "div"),
                            [
                                "afterShowResetZoom",
                                "afterApplyDrilldown",
                                "drillupall",
                            ].forEach((i) => {
                                t.addEvent(e, i, function () {
                                    t.updateProxyOverlays();
                                });
                            });
                    }
                    onChartUpdate() {
                        let t = this.chart,
                            e = this;
                        t.mapNavigation &&
                            t.mapNavigation.navButtons.forEach((i, s) => {
                                o(t, i.element),
                                    e.setMapNavButtonAttrs(
                                        i.element,
                                        "accessibility.zoom.mapZoom" +
                                            (s ? "Out" : "In")
                                    );
                            });
                    }
                    setMapNavButtonAttrs(t, e) {
                        let i = this.chart,
                            s = i.langFormat(e, { chart: i });
                        a(t, { tabindex: -1, role: "button", "aria-label": s });
                    }
                    onChartRender() {
                        this.updateProxyOverlays();
                    }
                    updateProxyOverlays() {
                        let t = this.chart;
                        if (
                            (this.proxyProvider.clearGroup("zoom"),
                            t.resetZoomButton &&
                                this.createZoomProxyButton(
                                    t.resetZoomButton,
                                    "resetZoomProxyButton",
                                    t.langFormat(
                                        "accessibility.zoom.resetZoomButton",
                                        { chart: t }
                                    )
                                ),
                            t.drillUpButton &&
                                t.breadcrumbs &&
                                t.breadcrumbs.list)
                        ) {
                            let e =
                                t.breadcrumbs.list[
                                    t.breadcrumbs.list.length - 1
                                ];
                            this.createZoomProxyButton(
                                t.drillUpButton,
                                "drillUpProxyButton",
                                t.langFormat("accessibility.drillUpButton", {
                                    chart: t,
                                    buttonText: t.breadcrumbs.getButtonText(e),
                                })
                            );
                        }
                    }
                    createZoomProxyButton(t, e, i) {
                        this[e] = this.proxyProvider.addProxyElement(
                            "zoom",
                            { click: t },
                            "button",
                            { "aria-label": i, tabindex: -1 }
                        );
                    }
                    getMapZoomNavigation() {
                        let t = this.keyCodes,
                            e = this.chart,
                            i = this;
                        return new s(e, {
                            keyCodeMap: [
                                [
                                    [t.up, t.down, t.left, t.right],
                                    function (t) {
                                        return i.onMapKbdArrow(this, t);
                                    },
                                ],
                                [
                                    [t.tab],
                                    function (t, e) {
                                        return i.onMapKbdTab(this, e);
                                    },
                                ],
                                [
                                    [t.space, t.enter],
                                    function () {
                                        return i.onMapKbdClick(this);
                                    },
                                ],
                            ],
                            validate: function () {
                                return !!(
                                    e.mapView &&
                                    e.mapNavigation &&
                                    e.mapNavigation.navButtons.length
                                );
                            },
                            init: function (t) {
                                return i.onMapNavInit(t);
                            },
                        });
                    }
                    onMapKbdArrow(t, e) {
                        let i = this.chart,
                            s = this.keyCodes,
                            n = i.container,
                            o = e === s.up || e === s.down,
                            a = e === s.left || e === s.up ? 1 : -1,
                            l = ((o ? i.plotHeight : i.plotWidth) / 10) * a,
                            h = 10 * Math.random(),
                            c = {
                                x:
                                    n.offsetLeft +
                                    i.plotLeft +
                                    i.plotWidth / 2 +
                                    h,
                                y:
                                    n.offsetTop +
                                    i.plotTop +
                                    i.plotHeight / 2 +
                                    h,
                            },
                            d = o
                                ? { x: c.x, y: c.y + l }
                                : { x: c.x + l, y: c.y };
                        return (
                            [
                                r("mousedown", c),
                                r("mousemove", d),
                                r("mouseup", d),
                            ].forEach((t) => n.dispatchEvent(t)),
                            t.response.success
                        );
                    }
                    onMapKbdTab(t, e) {
                        let i = this.chart,
                            s = t.response,
                            n = e.shiftKey,
                            o =
                                (n && !this.focusedMapNavButtonIx) ||
                                (!n && this.focusedMapNavButtonIx);
                        if (
                            (i.mapNavigation.navButtons[
                                this.focusedMapNavButtonIx
                            ].setState(0),
                            o)
                        )
                            return (
                                i.mapView && i.mapView.zoomBy(),
                                s[n ? "prev" : "next"]
                            );
                        this.focusedMapNavButtonIx += n ? -1 : 1;
                        let r =
                            i.mapNavigation.navButtons[
                                this.focusedMapNavButtonIx
                            ];
                        return (
                            i.setFocusToElement(r.box, r.element),
                            r.setState(2),
                            s.success
                        );
                    }
                    onMapKbdClick(t) {
                        let e =
                            this.chart.mapNavigation.navButtons[
                                this.focusedMapNavButtonIx
                            ].element;
                        return this.fakeClickEvent(e), t.response.success;
                    }
                    onMapNavInit(t) {
                        let e = this.chart,
                            i = e.mapNavigation.navButtons[0],
                            s = e.mapNavigation.navButtons[1],
                            n = t > 0 ? i : s;
                        e.setFocusToElement(n.box, n.element),
                            n.setState(2),
                            (this.focusedMapNavButtonIx = t > 0 ? 0 : 1);
                    }
                    simpleButtonNavigation(t, e, i) {
                        let n = this.keyCodes,
                            o = this,
                            r = this.chart;
                        return new s(r, {
                            keyCodeMap: [
                                [
                                    [n.tab, n.up, n.down, n.left, n.right],
                                    function (t, e) {
                                        let i =
                                            (t === n.tab && e.shiftKey) ||
                                            t === n.left ||
                                            t === n.up;
                                        return this.response[
                                            i ? "prev" : "next"
                                        ];
                                    },
                                ],
                                [
                                    [n.space, n.enter],
                                    function () {
                                        let t = i(this, r);
                                        return l(t, this.response.success);
                                    },
                                ],
                            ],
                            validate: function () {
                                let i = r[t] && r[t].box && o[e].innerElement;
                                return i;
                            },
                            init: function () {
                                r.setFocusToElement(
                                    r[t].box,
                                    o[e].innerElement
                                );
                            },
                        });
                    }
                    getKeyboardNavigation() {
                        return [
                            this.simpleButtonNavigation(
                                "resetZoomButton",
                                "resetZoomProxyButton",
                                function (t, e) {
                                    e.zoomOut();
                                }
                            ),
                            this.simpleButtonNavigation(
                                "drillUpButton",
                                "drillUpProxyButton",
                                function (t, e) {
                                    return e.drillUp(), t.response.prev;
                                }
                            ),
                            this.getMapZoomNavigation(),
                        ];
                    }
                };
            }
        ),
        i(
            e,
            "Accessibility/HighContrastMode.js",
            [e["Core/Globals.js"]],
            function (t) {
                let { doc: e, isMS: i, win: s } = t;
                return {
                    isHighContrastModeActive: function () {
                        let t = /(Edg)/.test(s.navigator.userAgent);
                        if (s.matchMedia && t)
                            return s.matchMedia("(-ms-high-contrast: active)")
                                .matches;
                        if (i && s.getComputedStyle) {
                            let t = e.createElement("div");
                            (t.style.backgroundImage =
                                "url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)"),
                                e.body.appendChild(t);
                            let i = (t.currentStyle || s.getComputedStyle(t))
                                .backgroundImage;
                            return e.body.removeChild(t), "none" === i;
                        }
                        return (
                            s.matchMedia &&
                            s.matchMedia("(forced-colors: active)").matches
                        );
                    },
                    setHighContrastTheme: function (t) {
                        t.highContrastModeActive = !0;
                        let e = t.options.accessibility.highContrastTheme;
                        t.update(e, !1),
                            t.series.forEach(function (t) {
                                let i = e.plotOptions[t.type] || {};
                                t.update({
                                    color: i.color || "windowText",
                                    colors: [i.color || "windowText"],
                                    borderColor: i.borderColor || "window",
                                }),
                                    t.points.forEach(function (t) {
                                        t.options &&
                                            t.options.color &&
                                            t.update(
                                                {
                                                    color:
                                                        i.color || "windowText",
                                                    borderColor:
                                                        i.borderColor ||
                                                        "window",
                                                },
                                                !1
                                            );
                                    });
                            }),
                            t.redraw();
                    },
                };
            }
        ),
        i(e, "Accessibility/HighContrastTheme.js", [], function () {
            return {
                chart: { backgroundColor: "window" },
                title: { style: { color: "windowText" } },
                subtitle: { style: { color: "windowText" } },
                colorAxis: {
                    minColor: "windowText",
                    maxColor: "windowText",
                    stops: [],
                },
                colors: ["windowText"],
                xAxis: {
                    gridLineColor: "windowText",
                    labels: { style: { color: "windowText" } },
                    lineColor: "windowText",
                    minorGridLineColor: "windowText",
                    tickColor: "windowText",
                    title: { style: { color: "windowText" } },
                },
                yAxis: {
                    gridLineColor: "windowText",
                    labels: { style: { color: "windowText" } },
                    lineColor: "windowText",
                    minorGridLineColor: "windowText",
                    tickColor: "windowText",
                    title: { style: { color: "windowText" } },
                },
                tooltip: {
                    backgroundColor: "window",
                    borderColor: "windowText",
                    style: { color: "windowText" },
                },
                plotOptions: {
                    series: {
                        lineColor: "windowText",
                        fillColor: "window",
                        borderColor: "windowText",
                        edgeColor: "windowText",
                        borderWidth: 1,
                        dataLabels: {
                            connectorColor: "windowText",
                            color: "windowText",
                            style: { color: "windowText", textOutline: "none" },
                        },
                        marker: {
                            lineColor: "windowText",
                            fillColor: "windowText",
                        },
                    },
                    pie: {
                        color: "window",
                        colors: ["window"],
                        borderColor: "windowText",
                        borderWidth: 1,
                    },
                    boxplot: { fillColor: "window" },
                    candlestick: {
                        lineColor: "windowText",
                        fillColor: "window",
                    },
                    errorbar: { fillColor: "window" },
                },
                legend: {
                    backgroundColor: "window",
                    itemStyle: { color: "windowText" },
                    itemHoverStyle: { color: "windowText" },
                    itemHiddenStyle: { color: "#555" },
                    title: { style: { color: "windowText" } },
                },
                credits: { style: { color: "windowText" } },
                drilldown: {
                    activeAxisLabelStyle: { color: "windowText" },
                    activeDataLabelStyle: { color: "windowText" },
                },
                navigation: {
                    buttonOptions: {
                        symbolStroke: "windowText",
                        theme: { fill: "window" },
                    },
                },
                rangeSelector: {
                    buttonTheme: {
                        fill: "window",
                        stroke: "windowText",
                        style: { color: "windowText" },
                        states: {
                            hover: {
                                fill: "window",
                                stroke: "windowText",
                                style: { color: "windowText" },
                            },
                            select: {
                                fill: "#444",
                                stroke: "windowText",
                                style: { color: "windowText" },
                            },
                        },
                    },
                    inputBoxBorderColor: "windowText",
                    inputStyle: {
                        backgroundColor: "window",
                        color: "windowText",
                    },
                    labelStyle: { color: "windowText" },
                },
                navigator: {
                    handles: {
                        backgroundColor: "window",
                        borderColor: "windowText",
                    },
                    outlineColor: "windowText",
                    maskFill: "transparent",
                    series: { color: "windowText", lineColor: "windowText" },
                    xAxis: { gridLineColor: "windowText" },
                },
                scrollbar: {
                    barBackgroundColor: "#444",
                    barBorderColor: "windowText",
                    buttonArrowColor: "windowText",
                    buttonBackgroundColor: "window",
                    buttonBorderColor: "windowText",
                    rifleColor: "windowText",
                    trackBackgroundColor: "window",
                    trackBorderColor: "windowText",
                },
            };
        }),
        i(e, "Accessibility/Options/A11yDefaults.js", [], function () {
            return {
                accessibility: {
                    enabled: !0,
                    screenReaderSection: {
                        beforeChartFormat:
                            "<{headingTagName}>{chartTitle}</{headingTagName}><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{playAsSoundButton}</div><div>{viewTableButton}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div><div>{annotationsTitle}{annotationsList}</div>",
                        afterChartFormat: "{endOfChartMarker}",
                        axisRangeDateFormat: "%Y-%m-%d %H:%M:%S",
                    },
                    series: {
                        descriptionFormat:
                            "{seriesDescription}{authorDescription}{axisDescription}",
                        describeSingleSeries: !1,
                        pointDescriptionEnabledThreshold: 200,
                    },
                    point: {
                        valueDescriptionFormat:
                            "{xDescription}{separator}{value}.",
                        describeNull: !0,
                    },
                    landmarkVerbosity: "all",
                    linkedDescription:
                        '*[data-highcharts-chart="{index}"] + .highcharts-description',
                    keyboardNavigation: {
                        enabled: !0,
                        focusBorder: {
                            enabled: !0,
                            hideBrowserFocusOutline: !0,
                            style: {
                                color: "#334eff",
                                lineWidth: 2,
                                borderRadius: 3,
                            },
                            margin: 2,
                        },
                        order: [
                            "series",
                            "zoom",
                            "rangeSelector",
                            "navigator",
                            "legend",
                            "chartMenu",
                        ],
                        wrapAround: !0,
                        seriesNavigation: {
                            skipNullPoints: !0,
                            pointNavigationEnabledThreshold: !1,
                            rememberPointFocus: !1,
                        },
                    },
                    announceNewData: {
                        enabled: !1,
                        minAnnounceInterval: 5e3,
                        interruptUser: !1,
                    },
                },
                legend: {
                    accessibility: {
                        enabled: !0,
                        keyboardNavigation: { enabled: !0 },
                    },
                },
                exporting: { accessibility: { enabled: !0 } },
                navigator: { accessibility: { enabled: !0 } },
            };
        }),
        i(e, "Accessibility/Options/LangDefaults.js", [], function () {
            return {
                accessibility: {
                    defaultChartTitle: "Chart",
                    chartContainerLabel:
                        "{title}. Highcharts interactive chart.",
                    svgContainerLabel: "Interactive chart",
                    drillUpButton: "{buttonText}",
                    credits: "Chart credits: {creditsStr}",
                    thousandsSep: ",",
                    svgContainerTitle: "",
                    graphicContainerLabel: "",
                    screenReaderSection: {
                        beforeRegionLabel: "",
                        afterRegionLabel: "",
                        annotations: {
                            heading: "Chart annotations summary",
                            descriptionSinglePoint:
                                "{annotationText}. Related to {annotationPoint}",
                            descriptionMultiplePoints:
                                "{annotationText}. Related to {annotationPoint}{#each additionalAnnotationPoints}, also related to {this}{/each}",
                            descriptionNoPoints: "{annotationText}",
                        },
                        endOfChartMarker: "End of interactive chart.",
                    },
                    sonification: {
                        playAsSoundButtonText: "Play as sound, {chartTitle}",
                        playAsSoundClickAnnouncement: "Play",
                    },
                    legend: {
                        legendLabelNoTitle:
                            "Toggle series visibility, {chartTitle}",
                        legendLabel: "Chart legend: {legendTitle}",
                        legendItem: "Show {itemName}",
                    },
                    zoom: {
                        mapZoomIn: "Zoom chart",
                        mapZoomOut: "Zoom out chart",
                        resetZoomButton: "Reset zoom",
                    },
                    rangeSelector: {
                        dropdownLabel: "{rangeTitle}",
                        minInputLabel: "Select start date.",
                        maxInputLabel: "Select end date.",
                        clickButtonAnnouncement:
                            "Viewing {axisRangeDescription}",
                    },
                    navigator: {
                        handleLabel:
                            "{#eq handleIx 0}Start, percent{else}End, percent{/eq}",
                        groupLabel: "Axis zoom",
                        changeAnnouncement: "{axisRangeDescription}",
                    },
                    table: {
                        viewAsDataTableButtonText:
                            "View as data table, {chartTitle}",
                        tableSummary: "Table representation of chart.",
                    },
                    announceNewData: {
                        newDataAnnounce: "Updated data for chart {chartTitle}",
                        newSeriesAnnounceSingle:
                            "New data series: {seriesDesc}",
                        newPointAnnounceSingle: "New data point: {pointDesc}",
                        newSeriesAnnounceMultiple:
                            "New data series in chart {chartTitle}: {seriesDesc}",
                        newPointAnnounceMultiple:
                            "New data point in chart {chartTitle}: {pointDesc}",
                    },
                    seriesTypeDescriptions: {
                        boxplot:
                            "Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.",
                        arearange:
                            "Arearange charts are line charts displaying a range between a lower and higher value for each point.",
                        areasplinerange:
                            "These charts are line charts displaying a range between a lower and higher value for each point.",
                        bubble: "Bubble charts are scatter charts where each data point also has a size value.",
                        columnrange:
                            "Columnrange charts are column charts displaying a range between a lower and higher value for each point.",
                        errorbar:
                            "Errorbar series are used to display the variability of the data.",
                        funnel: "Funnel charts are used to display reduction of data in stages.",
                        pyramid:
                            "Pyramid charts consist of a single pyramid with item heights corresponding to each point value.",
                        waterfall:
                            "A waterfall chart is a column chart where each column contributes towards a total end value.",
                    },
                    chartTypes: {
                        emptyChart: "Empty chart",
                        mapTypeDescription:
                            "Map of {mapTitle} with {numSeries} data series.",
                        unknownMap:
                            "Map of unspecified region with {numSeries} data series.",
                        combinationChart:
                            "Combination chart with {numSeries} data series.",
                        defaultSingle:
                            "Chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.",
                        defaultMultiple: "Chart with {numSeries} data series.",
                        splineSingle:
                            "Line chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.",
                        splineMultiple: "Line chart with {numSeries} lines.",
                        lineSingle:
                            "Line chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.",
                        lineMultiple: "Line chart with {numSeries} lines.",
                        columnSingle:
                            "Bar chart with {numPoints} {#eq numPoints 1}bar{else}bars{/eq}.",
                        columnMultiple:
                            "Bar chart with {numSeries} data series.",
                        barSingle:
                            "Bar chart with {numPoints} {#eq numPoints 1}bar{else}bars{/eq}.",
                        barMultiple: "Bar chart with {numSeries} data series.",
                        pieSingle:
                            "Pie chart with {numPoints} {#eq numPoints 1}slice{else}slices{/eq}.",
                        pieMultiple: "Pie chart with {numSeries} pies.",
                        scatterSingle:
                            "Scatter chart with {numPoints} {#eq numPoints 1}point{else}points{/eq}.",
                        scatterMultiple:
                            "Scatter chart with {numSeries} data series.",
                        boxplotSingle:
                            "Boxplot with {numPoints} {#eq numPoints 1}box{else}boxes{/eq}.",
                        boxplotMultiple:
                            "Boxplot with {numSeries} data series.",
                        bubbleSingle:
                            "Bubble chart with {numPoints} {#eq numPoints 1}bubbles{else}bubble{/eq}.",
                        bubbleMultiple:
                            "Bubble chart with {numSeries} data series.",
                    },
                    axis: {
                        xAxisDescriptionSingular:
                            "The chart has 1 X axis displaying {names[0]}. {ranges[0]}",
                        xAxisDescriptionPlural:
                            "The chart has {numAxes} X axes displaying {#each names}{#unless @first},{/unless}{#if @last} and{/if} {this}{/each}.",
                        yAxisDescriptionSingular:
                            "The chart has 1 Y axis displaying {names[0]}. {ranges[0]}",
                        yAxisDescriptionPlural:
                            "The chart has {numAxes} Y axes displaying {#each names}{#unless @first},{/unless}{#if @last} and{/if} {this}{/each}.",
                        timeRangeDays: "Data range: {range} days.",
                        timeRangeHours: "Data range: {range} hours.",
                        timeRangeMinutes: "Data range: {range} minutes.",
                        timeRangeSeconds: "Data range: {range} seconds.",
                        rangeFromTo:
                            "Data ranges from {rangeFrom} to {rangeTo}.",
                        rangeCategories:
                            "Data range: {numCategories} categories.",
                    },
                    exporting: {
                        chartMenuLabel: "Chart menu",
                        menuButtonLabel: "View chart menu, {chartTitle}",
                    },
                    series: {
                        summary: {
                            default:
                                "{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                            defaultCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                            line: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                            lineCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                            spline: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                            splineCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                            column: "{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                            columnCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                            bar: "{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                            barCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                            pie: "{series.name}, pie {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}slice{else}slices{/eq}.",
                            pieCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}. Pie with {series.points.length} {#eq series.points.length 1}slice{else}slices{/eq}.",
                            scatter:
                                "{series.name}, scatter plot {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}point{else}points{/eq}.",
                            scatterCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}, scatter plot with {series.points.length} {#eq series.points.length 1}point{else}points{/eq}.",
                            boxplot:
                                "{series.name}, boxplot {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}box{else}boxes{/eq}.",
                            boxplotCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}. Boxplot with {series.points.length} {#eq series.points.length 1}box{else}boxes{/eq}.",
                            bubble: "{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
                            bubbleCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
                            map: "{series.name}, map {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}area{else}areas{/eq}.",
                            mapCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}. Map with {series.points.length} {#eq series.points.length 1}area{else}areas{/eq}.",
                            mapline:
                                "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                            maplineCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                            mapbubble:
                                "{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
                            mapbubbleCombination:
                                "{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
                        },
                        description: "{description}",
                        xAxisDescription: "X axis, {name}",
                        yAxisDescription: "Y axis, {name}",
                        nullPointValue: "No value",
                        pointAnnotationsDescription:
                            "{#each annotations}Annotation: {this}{/each}",
                    },
                },
            };
        }),
        i(
            e,
            "Accessibility/Options/DeprecatedOptions.js",
            [e["Core/Utilities.js"]],
            function (t) {
                let { error: e, pick: i } = t;
                function s(t, e, s) {
                    let n = t,
                        o,
                        r = 0;
                    for (; r < e.length - 1; ++r)
                        n = n[(o = e[r])] = i(n[o], {});
                    n[e[e.length - 1]] = s;
                }
                function n(t, i, n, o) {
                    function r(t, e) {
                        return e.reduce(function (t, e) {
                            return t[e];
                        }, t);
                    }
                    let a = r(t.options, i),
                        l = r(t.options, n);
                    Object.keys(o).forEach(function (r) {
                        let h = a[r];
                        void 0 !== h &&
                            (s(l, o[r], h),
                            e(32, !1, t, {
                                [i.join(".") + "." + r]:
                                    n.join(".") + "." + o[r].join("."),
                            }));
                    });
                }
                return function (t) {
                    (function (t) {
                        let i = t.options.chart,
                            s = t.options.accessibility || {};
                        ["description", "typeDescription"].forEach(function (
                            n
                        ) {
                            i[n] &&
                                ((s[n] = i[n]),
                                e(32, !1, t, {
                                    [`chart.${n}`]: `use accessibility.${n}`,
                                }));
                        });
                    })(t),
                        (function (t) {
                            t.axes.forEach(function (i) {
                                let s = i.options;
                                s &&
                                    s.description &&
                                    ((s.accessibility = s.accessibility || {}),
                                    (s.accessibility.description =
                                        s.description),
                                    e(32, !1, t, {
                                        "axis.description":
                                            "use axis.accessibility.description",
                                    }));
                            });
                        })(t),
                        t.series &&
                            (function (t) {
                                let i = {
                                    description: [
                                        "accessibility",
                                        "description",
                                    ],
                                    exposeElementToA11y: [
                                        "accessibility",
                                        "exposeAsGroupOnly",
                                    ],
                                    pointDescriptionFormatter: [
                                        "accessibility",
                                        "point",
                                        "descriptionFormatter",
                                    ],
                                    skipKeyboardNavigation: [
                                        "accessibility",
                                        "keyboardNavigation",
                                        "enabled",
                                    ],
                                    "accessibility.pointDescriptionFormatter": [
                                        "accessibility",
                                        "point",
                                        "descriptionFormatter",
                                    ],
                                };
                                t.series.forEach(function (n) {
                                    Object.keys(i).forEach(function (o) {
                                        let r = n.options[o];
                                        "accessibility.pointDescriptionFormatter" ===
                                            o &&
                                            (r =
                                                n.options.accessibility &&
                                                n.options.accessibility
                                                    .pointDescriptionFormatter),
                                            void 0 !== r &&
                                                (s(
                                                    n.options,
                                                    i[o],
                                                    "skipKeyboardNavigation" ===
                                                        o
                                                        ? !r
                                                        : r
                                                ),
                                                e(32, !1, t, {
                                                    [`series.${o}`]:
                                                        "series." +
                                                        i[o].join("."),
                                                }));
                                    });
                                });
                            })(t),
                        n(t, ["accessibility"], ["accessibility"], {
                            pointDateFormat: ["point", "dateFormat"],
                            pointDateFormatter: ["point", "dateFormatter"],
                            pointDescriptionFormatter: [
                                "point",
                                "descriptionFormatter",
                            ],
                            pointDescriptionThreshold: [
                                "series",
                                "pointDescriptionEnabledThreshold",
                            ],
                            pointNavigationThreshold: [
                                "keyboardNavigation",
                                "seriesNavigation",
                                "pointNavigationEnabledThreshold",
                            ],
                            pointValueDecimals: ["point", "valueDecimals"],
                            pointValuePrefix: ["point", "valuePrefix"],
                            pointValueSuffix: ["point", "valueSuffix"],
                            screenReaderSectionFormatter: [
                                "screenReaderSection",
                                "beforeChartFormatter",
                            ],
                            describeSingleSeries: [
                                "series",
                                "describeSingleSeries",
                            ],
                            seriesDescriptionFormatter: [
                                "series",
                                "descriptionFormatter",
                            ],
                            onTableAnchorClick: [
                                "screenReaderSection",
                                "onViewDataTableClick",
                            ],
                            axisRangeDateFormat: [
                                "screenReaderSection",
                                "axisRangeDateFormat",
                            ],
                        }),
                        n(
                            t,
                            ["accessibility", "keyboardNavigation"],
                            [
                                "accessibility",
                                "keyboardNavigation",
                                "seriesNavigation",
                            ],
                            {
                                skipNullPoints: ["skipNullPoints"],
                                mode: ["mode"],
                            }
                        ),
                        n(
                            t,
                            ["lang", "accessibility"],
                            ["lang", "accessibility"],
                            {
                                legendItem: ["legend", "legendItem"],
                                legendLabel: ["legend", "legendLabel"],
                                mapZoomIn: ["zoom", "mapZoomIn"],
                                mapZoomOut: ["zoom", "mapZoomOut"],
                                resetZoomButton: ["zoom", "resetZoomButton"],
                                screenReaderRegionLabel: [
                                    "screenReaderSection",
                                    "beforeRegionLabel",
                                ],
                                rangeSelectorButton: [
                                    "rangeSelector",
                                    "buttonText",
                                ],
                                rangeSelectorMaxInput: [
                                    "rangeSelector",
                                    "maxInputLabel",
                                ],
                                rangeSelectorMinInput: [
                                    "rangeSelector",
                                    "minInputLabel",
                                ],
                                svgContainerEnd: [
                                    "screenReaderSection",
                                    "endOfChartMarker",
                                ],
                                viewAsDataTable: [
                                    "table",
                                    "viewAsDataTableButtonText",
                                ],
                                tableSummary: ["table", "tableSummary"],
                            }
                        );
                };
            }
        ),
        i(
            e,
            "Accessibility/Accessibility.js",
            [
                e["Core/Defaults.js"],
                e["Core/Globals.js"],
                e["Core/Utilities.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
                e["Accessibility/A11yI18n.js"],
                e["Accessibility/Components/ContainerComponent.js"],
                e["Accessibility/FocusBorder.js"],
                e["Accessibility/Components/InfoRegionsComponent.js"],
                e["Accessibility/KeyboardNavigation.js"],
                e["Accessibility/Components/LegendComponent.js"],
                e["Accessibility/Components/MenuComponent.js"],
                e["Accessibility/Components/NavigatorComponent.js"],
                e[
                    "Accessibility/Components/SeriesComponent/NewDataAnnouncer.js"
                ],
                e["Accessibility/ProxyProvider.js"],
                e["Accessibility/Components/RangeSelectorComponent.js"],
                e[
                    "Accessibility/Components/SeriesComponent/SeriesComponent.js"
                ],
                e["Accessibility/Components/ZoomComponent.js"],
                e["Accessibility/HighContrastMode.js"],
                e["Accessibility/HighContrastTheme.js"],
                e["Accessibility/Options/A11yDefaults.js"],
                e["Accessibility/Options/LangDefaults.js"],
                e["Accessibility/Options/DeprecatedOptions.js"],
            ],
            function (
                t,
                e,
                i,
                s,
                n,
                o,
                r,
                a,
                l,
                h,
                c,
                d,
                u,
                p,
                g,
                m,
                b,
                f,
                x,
                y,
                v,
                A
            ) {
                let { defaultOptions: w } = t,
                    { composed: C, doc: E } = e,
                    {
                        addEvent: T,
                        extend: M,
                        fireEvent: S,
                        merge: k,
                        pushUnique: P,
                    } = i,
                    { removeElement: B } = s;
                class D {
                    constructor(t) {
                        this.init(t);
                    }
                    init(t) {
                        if (((this.chart = t), !E.addEventListener)) {
                            (this.zombie = !0),
                                (this.components = {}),
                                t.renderTo.setAttribute("aria-hidden", !0);
                            return;
                        }
                        A(t),
                            (this.proxyProvider = new p(this.chart)),
                            this.initComponents(),
                            (this.keyboardNavigation = new l(
                                t,
                                this.components
                            ));
                    }
                    initComponents() {
                        let t = this.chart,
                            e = this.proxyProvider,
                            i = t.options.accessibility;
                        (this.components = {
                            container: new o(),
                            infoRegions: new a(),
                            legend: new h(),
                            chartMenu: new c(),
                            rangeSelector: new g(),
                            series: new m(),
                            zoom: new b(),
                            navigator: new d(),
                        }),
                            i.customComponents &&
                                M(this.components, i.customComponents);
                        let s = this.components;
                        this.getComponentOrder().forEach(function (i) {
                            s[i].initBase(t, e), s[i].init();
                        });
                    }
                    getComponentOrder() {
                        if (!this.components) return [];
                        if (!this.components.series)
                            return Object.keys(this.components);
                        let t = Object.keys(this.components).filter(
                            (t) => "series" !== t
                        );
                        return ["series"].concat(t);
                    }
                    update() {
                        let t = this.components,
                            e = this.chart,
                            i = e.options.accessibility;
                        S(e, "beforeA11yUpdate"),
                            (e.types = this.getChartTypes());
                        let s = i.keyboardNavigation.order;
                        this.proxyProvider.updateGroupOrder(s),
                            this.getComponentOrder().forEach(function (i) {
                                t[i].onChartUpdate(),
                                    S(e, "afterA11yComponentUpdate", {
                                        name: i,
                                        component: t[i],
                                    });
                            }),
                            this.keyboardNavigation.update(s),
                            !e.highContrastModeActive &&
                                f.isHighContrastModeActive() &&
                                f.setHighContrastTheme(e),
                            S(e, "afterA11yUpdate", { accessibility: this });
                    }
                    destroy() {
                        let t = this.chart || {},
                            e = this.components;
                        Object.keys(e).forEach(function (t) {
                            e[t].destroy(), e[t].destroyBase();
                        }),
                            this.proxyProvider && this.proxyProvider.destroy(),
                            t.announcerContainer && B(t.announcerContainer),
                            this.keyboardNavigation &&
                                this.keyboardNavigation.destroy(),
                            t.renderTo &&
                                t.renderTo.setAttribute("aria-hidden", !0),
                            t.focusElement &&
                                t.focusElement.removeFocusBorder();
                    }
                    getChartTypes() {
                        let t = {};
                        return (
                            this.chart.series.forEach(function (e) {
                                t[e.type] = 1;
                            }),
                            Object.keys(t)
                        );
                    }
                }
                return (
                    (function (t) {
                        function e() {
                            this.accessibility && this.accessibility.destroy();
                        }
                        function i() {
                            this.a11yDirty &&
                                this.renderTo &&
                                (delete this.a11yDirty,
                                this.updateA11yEnabled());
                            let t = this.accessibility;
                            t &&
                                !t.zombie &&
                                (t.proxyProvider.updateProxyElementPositions(),
                                t.getComponentOrder().forEach(function (e) {
                                    t.components[e].onChartRender();
                                }));
                        }
                        function s(t) {
                            let e = t.options.accessibility;
                            e &&
                                (e.customComponents &&
                                    ((this.options.accessibility.customComponents =
                                        e.customComponents),
                                    delete e.customComponents),
                                k(!0, this.options.accessibility, e),
                                this.accessibility &&
                                    this.accessibility.destroy &&
                                    (this.accessibility.destroy(),
                                    delete this.accessibility)),
                                (this.a11yDirty = !0);
                        }
                        function o() {
                            let e = this.accessibility,
                                i = this.options.accessibility;
                            i && i.enabled
                                ? e && !e.zombie
                                    ? e.update()
                                    : ((this.accessibility = e = new t(this)),
                                      e && !e.zombie && e.update())
                                : e
                                ? (e.destroy && e.destroy(),
                                  delete this.accessibility)
                                : this.renderTo.setAttribute("aria-hidden", !0);
                        }
                        function a() {
                            this.series.chart.accessibility &&
                                (this.series.chart.a11yDirty = !0);
                        }
                        (t.i18nFormat = n.i18nFormat),
                            (t.compose = function t(d, p, b, f, x, y) {
                                if (
                                    (l.compose(d),
                                    u.compose(f),
                                    h.compose(d, p),
                                    c.compose(d),
                                    m.compose(d, b, f),
                                    n.compose(d),
                                    r.compose(d, x),
                                    y && g.compose(d, y),
                                    P(C, t))
                                ) {
                                    let t = d.prototype;
                                    (t.updateA11yEnabled = o),
                                        T(d, "destroy", e),
                                        T(d, "render", i),
                                        T(d, "update", s),
                                        ["addSeries", "init"].forEach((t) => {
                                            T(d, t, function () {
                                                this.a11yDirty = !0;
                                            });
                                        }),
                                        [
                                            "afterApplyDrilldown",
                                            "drillupall",
                                        ].forEach((t) => {
                                            T(d, t, function () {
                                                let t = this.accessibility;
                                                t && !t.zombie && t.update();
                                            });
                                        }),
                                        T(b, "update", a),
                                        [
                                            "update",
                                            "updatedData",
                                            "remove",
                                        ].forEach((t) => {
                                            T(f, t, function () {
                                                this.chart.accessibility &&
                                                    (this.chart.a11yDirty = !0);
                                            });
                                        });
                                }
                            });
                    })(D || (D = {})),
                    k(!0, w, y, {
                        accessibility: { highContrastTheme: x },
                        lang: v,
                    }),
                    D
                );
            }
        ),
        i(
            e,
            "masters/modules/accessibility.src.js",
            [
                e["Core/Globals.js"],
                e["Accessibility/Accessibility.js"],
                e["Accessibility/AccessibilityComponent.js"],
                e["Accessibility/Utils/ChartUtilities.js"],
                e["Accessibility/Utils/HTMLUtilities.js"],
                e["Accessibility/KeyboardNavigationHandler.js"],
                e[
                    "Accessibility/Components/SeriesComponent/SeriesDescriber.js"
                ],
            ],
            function (t, e, i, s, n, o, r) {
                (t.i18nFormat = e.i18nFormat),
                    (t.A11yChartUtilities = s),
                    (t.A11yHTMLUtilities = n),
                    (t.AccessibilityComponent = i),
                    (t.KeyboardNavigationHandler = o),
                    (t.SeriesAccessibilityDescriber = r),
                    e.compose(
                        t.Chart,
                        t.Legend,
                        t.Point,
                        t.Series,
                        t.SVGElement,
                        t.RangeSelector
                    );
            }
        );
});
