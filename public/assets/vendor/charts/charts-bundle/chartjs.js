(function(window, document, $, undefined) {
        "use strict";
        $(function() {

                if ($('#chartjs_line').length) {
                    var ctx = document.getElementById('chartjs_line').getContext('2d');

                    var myChart = new Chart(ctx, {
                            type: 'line',

                            data: {
                                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                datasets: [{
                                    label: 'Almonds',
                                    data: [12, 19, 3, 17, 6, 3, 7],

                                    backgroundColor: "rgba(89, 105, 255,0.5)",
                                    borderColor: "rgba(89, 105, 255,0.7)",
                                    borderWidth: 2
                                }, {
                                    label: 'Cashew',
                                    data: [2, 29, 5, 5, 2, 3, 10],
                                    backgroundColor: "rgba(255, 64, 123,0.5)",
                                    borderColor: "rgba(255, 64, 123,0.7)",
                                    borderWidth: 2
                                }]

                            },
                            options: {
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                        ticks: {
                                            fontSize: 14,
                                            fontFamily: 'Circular Std Book',
                                            fontColor: '#71748d',
                                        }
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            fontSize: 14,
                                            fontFamily: 'Circular Std Book',
                                            fontColor: '#71748d',
                                        }
                                    }]
                                }
                            }



                    });
            }


            if ($('#chartjs_bar').length) {
                var ctx = document.getElementById("chartjs_bar").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14",
                                "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "29", "30" ],
                        datasets: [{
                            label: 'Actual Runtime',
                            data: [12, 19, 13, 17, 28, 24, 17, 12, 19, 11, 17, 28, 24, 18, 12, 19, 15, 17, 28, 24, 20, 21, 14, 24, 24, 23, 12, 16, 18],
                           backgroundColor: "rgba(89, 105, 255,0.5)",
                                    borderColor: "rgba(89, 105, 255,0.7)",
                            borderWidth: 2
                        },
                        {
                            label: 'Unplanned Downtime',
                            data: [2, 9, 3, 7, 8, 4, 7, 2, 9, 1, 7, 8, 4, 8, 2, 9, 5, 7, 8, 4, 5, 1, 4, 4, 6, 3, 2, 6, 8, 7],
                           backgroundColor: "rgba(255, 64, 123,0.5)",
                                    borderColor: "rgba(255, 64, 123,0.7)",
                            borderWidth: 2
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{

                            }]
                        },
                             legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },

                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 14,
                                fontFamily: 'Circular Std Book',
                                fontColor: '#71748d',
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                fontSize: 14,
                                fontFamily: 'Circular Std Book',
                                fontColor: '#71748d',
                            }
                        }]
                    }
                }


                });
            }

            if ($('#chartjs_radar').length) {
                var ctx = document.getElementById("chartjs_radar");
                var myChart = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ["M", "T", "W", "T", "F", "S", "S"],
                        datasets: [{
                            label: 'Almonds',
                           backgroundColor: "rgba(89, 105, 255,0.5)",
                                    borderColor: "rgba(89, 105, 255,0.7)",
                            data: [12, 19, 3, 17, 28, 24, 7],
                            borderWidth: 2
                        }, {
                            label: 'Cashew',
                             backgroundColor: "rgba(255, 64, 123,0.5)",
                                    borderColor: "rgba(255, 64, 123,0.7)",
                            data: [30, 29, 5, 5, 20, 3, 10],
                            borderWidth: 2
                        }]
                    },
                    options: {

                             legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },


                }

                });
            }


            if ($('#chartjs_polar').length) {
                var ctx = document.getElementById("chartjs_polar").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'polarArea',
                    data: {
                        labels: ["M", "T", "W", "T", "F", "S", "S"],
                        datasets: [{
                            backgroundColor: [
                                "#5969ff",
                                "#ff407b",
                                "#25d5f2",
                                "#ffc750",
                                "#2ec551",
                                "#7040fa",
                                "#ff004e"
                            ],
                            data: [12, 19, 3, 17, 28, 24, 7]
                        }]
                    },
                    options: {

                             legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },


                }
                });
            }


            if ($('#chartjs_pie').length) {
                var ctx = document.getElementById("chartjs_pie").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ["M", "T", "W", "T", "F", "S", "S"],
                        datasets: [{
                            backgroundColor: [
                               "#5969ff",
                                "#ff407b",
                                "#25d5f2",
                                "#ffc750",
                                "#2ec551",
                                "#7040fa",
                                "#ff004e"
                            ],
                            data: [12, 19, 3, 17, 28, 24, 7]
                        }]
                    },
                    options: {
                           legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },


                }
                });
            }


            if ($('#chartjs_doughnut').length) {
                var ctx = document.getElementById("chartjs_doughnut").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ["M", "T", "W", "T", "F", "S", "S"],
                        datasets: [{
                            backgroundColor: [
                                 "#5969ff",
                                "#ff407b",
                                "#25d5f2",
                                "#ffc750",
                                "#2ec551",
                                "#7040fa",
                                "#ff004e"
                            ],
                            data: [12, 19, 3, 17, 28, 24, 7]
                        }]
                    },
                    options: {

                             legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },


                }

                });
            }


        });

})(window, document, window.jQuery);
