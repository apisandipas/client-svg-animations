;(function(window, $, Snap){
    'use strict';
 
    $(function(){

         // jQuery reference to root SVG element
        var $chartEl = $('#chart');

        var rootChartSvg = Snap('#chart'),
        bars = {
            bar1: rootChartSvg.select('#bar-1'),
            bar2: rootChartSvg.select('#bar-2'),
            bar3: rootChartSvg.select('#bar-3'),
            bar4: rootChartSvg.select('#bar-4'),
            bar5: rootChartSvg.select('#bar-5')
        },
        
        points = {
            point1: rootChartSvg.select('#data-point-1'),
            point2: rootChartSvg.select('#data-point-2'),
            point3: rootChartSvg.select('#data-point-3'),
            point4: rootChartSvg.select('#data-point-4'),
            point5: rootChartSvg.select('#data-point-5'),
        },

        lineChartLine = rootChartSvg.select('#line-chart-line'),

        delays = [
            100,
            1000,
            2000,
            2800,
            3300,
        ],
        chartEasingFn = mina.linear,
        chartTimeout = 500,
        animationComplete = false;

        $chartEl.bind('inview', function(event, visible){
            if (visible == true) {
                                
                if ( ! animationComplete ) animateBars();
                animateLineGraph();

            } else {
                 stopBarAnimations();
              
               
            }
        });

        function stopBarAnimations(){
            animationComplete = false;
            $.each(bars, function(index, el){
                el.stop();
            });
        }

        function animateBars(){
           

            animateBar( bars.bar1, delays[0] , function(){
                animateBar( bars.bar2, delays[1], function(){
                    animateBar( bars.bar3, delays[2], function(){
                        animateBar( bars.bar4, delays[3], function(){
                            animateBar( bars.bar5, delays[4], function(){
                                animationComplete = true;
                            } );
                        } );
                    } );
                } );
            });
            
        }


        function animateBar( el, delay, cb ){
            
            // get the target height from the <rects> height attr and cache it.
            var targetHeight = el.attr('height');
        
            // Set out begining height to 0..
            el.attr( {
                'height': '0',
            } );

            // Animate to the target height after the required delay.
            setTimeout(function(){
                el.animate(
                    { 
                        'height': targetHeight,
                    },
                    chartTimeout,
                    chartEasingFn
                );
            }, delay ); 

            // call the next step
            if (cb) cb();
        }



        function animateLineGraph(){
            // console.log('animateLineGraph fired');
            animateLine( lineChartLine );
        }

        function animateLine( el ){
            el.attr({
                strokeWidth: 0,
                stroke: "rgba(0,0,0,0)", // makes the actual path invisible.
                fill: 0,
                fillOpacity: 0,
            });

            $.each(points, function(index, el){
                el.attr({
                    strokeWidth: 0,
                    stroke: "rgba(0,0,0,0)", // makes the actual path invisible.
                    fill: 0,
                    fillOpacity: 0,
                });
            }); 

            var pathLength = el.getTotalLength(),
           

            tracedPathConfig = {
                path: Snap.path.getSubpath(el, 0, 0),
                // stroke: "#fff",
                fill: "#fff",
                // fillOpacity: 1,
                // "stroke-dasharray": "4 8",
                // "stroke-dashoffset": "180",
                "transform": "translate(23,28)"
            };

            // console.log('pathLength = ', pathLength);

            var visiblePoint = {
                strokeWidth: 1,
                stroke: "#fff", // makes the actual path invisible.
                fill: "#fff",
                fillOpacity: 1,
                 "transform": "translate(0,-5)"
            }

            var tracedPath = rootChartSvg.path(tracedPathConfig),
                currentPoint = 0;

            function dotReveal( el ){
                el.attr({
                    strokeWidth: 0,
                    stroke: "rgba(0,0,0,0)", // makes the actual path invisible.
                    fill: 0,
                    fillOpacity: 0,
                });

                el.animate(
                    visiblePoint,
                    1000,
                    mina.elastic
                );
            };

            Snap.animate(0, pathLength, function( step ){
         
                    // console.log('step = ', step);
         
                    switch ( true ) {
                        case ( step < 0.008 ):
                            dotReveal( points.point1 );
                            break;
                        case ( step > 50 && step < 51 ):
                            dotReveal( points.point2 );
                            break;
                        case ( step > 109 && step < 111 ):
                            dotReveal( points.point3 );
                            break;
                        case ( step > 163 && step < 165 ):
                            dotReveal( points.point4 );
                            break;
                        case ( step > 215 && step < 220 ):
                            dotReveal( points.point5 );
                            break;
                        default:
                            break;
                    }

                    var stepPoint = el.getPointAtLength( step );
                    // console.log('stepPoint = ', stepPoint);

                    tracedPath.attr({
                        path: Snap.path.getSubpath(el, 0, step),
                        strokeWidth: 6,
                    });
                },
                4500, //duration
                mina.easeout//, //easing
            );
        }
    });


})(window, jQuery, Snap);