(function(window, $, Snap){
    'use strict';
 

    $(function(){

        // these selectors are used to detect when theyre els are 'inview'
        var $gearsEl = $('#gears');

        var rootGearSvg       = Snap('#gears'),
            minorGear         = rootGearSvg.select('#gear-minor'),
            majorGear         = rootGearSvg.select('#gear-major'),
            dottedPathMajor   = rootGearSvg.select('#dotted-path-major'),
            dottedPathMinor   = rootGearSvg.select('#dotted-path-minor'),
            arrowMajor        = rootGearSvg.select('#arrow-major'),
            arrowMinor        = rootGearSvg.select('#arrow-minor'),
            animationComplete = false,
            dottedLineMajor,
            dottedLineMinor
        ;

        var gearEasingFn = mina.linear;
        var gearTimeout = 10000;

        $gearsEl.bind('inview', function(event, visible){
            if (visible == true) {

                if ( ! animationComplete ) {

                    animateGears(function(){
                        animationComplete = true;
                    });
                }
               
            } else {
                // animation only fires once then turns continously thereafter.
            }
        });

        /**
         * Rotates on SVG element clockwise from the provided origin
         * @param   el   Snap wrapped SVG element
         * @param   rx   x coordinate for the rotation origin
         * @param   ry   y coordinate for the rotation origin
         * @return       [description]
         */
        function clockwise( el, rx, ry ) {
            var fromTransform = 'r0,' + rx + ',' + ry,
                toTransform = 'r-360,' + rx + ',' + ry;

            el.transform(fromTransform); 
            el.animate(
                { transform: toTransform }, 
                gearTimeout, 
                gearEasingFn, 
                clockwise.bind( null, el,  rx, ry)
            );
        }

        /**
         * Rotates on SVG element counter-clockwise from the provided origin
         * @param   el   Snap wrapped SVG element
         * @param   rx   x coordinate for the rotation origin
         * @param   ry   y coordinate for the rotation origin
         * @return       [description]
         */
        function counterClockwise( el, rx, ry) {

            var fromTransform = 'r0,' + rx + ',' + ry,
                toTransform = 'r360,' + rx + ',' + ry;

            el.transform( fromTransform ); 
            el.animate(
                { transform: toTransform }, 
                gearTimeout, 
                gearEasingFn, 
                counterClockwise.bind( null, el,  rx, ry)
            );
        }

        function moveArrow( el, path, xOffset, yOffset, reverse ){
            var pathLength = path.getTotalLength();
            // el.transform('t0,0');
            var lastPoint = { alpha: false };
            Snap.animate(0, pathLength, function( step ){

                    var arrowPoint =  path.getPointAtLength( step );
                    
                    // This sets the rotation of the arrow. The last step gives 90 for some reason, 
                    // so lets always just grab this value from the one before it.. so it ends on the proper heading
                    var arrowHeading =  ((lastPoint && lastPoint.alpha) ? lastPoint.alpha : arrowPoint.alpha);
                   
                   if (reverse) arrowHeading = arrowHeading - 180;
         
                    el.transform( 
                        'T' + parseInt( arrowPoint.x - xOffset ) 
                        + ',' 
                        + parseInt( arrowPoint.y  - yOffset ) 
                        + 'r' 
                        + parseInt( arrowHeading , 10)
                    );

                    // cache for the next iteration's reference
                    lastPoint = arrowPoint;
                    
                },
                4500,
                mina.easeout
            );
        }


        function resetDottedPath ( el ){
            el.attr({
                strokeWidth: 0,
                stroke: "rgba(0,0,0,0)", // makes the actual path invisible.
                fill: 0,
                fillOpacity: 0,
            });
        }


        function drawDottedPath( el , transform ) {
            el.attr({
                strokeWidth: 0,
                stroke: "rgba(0,0,0,0)", // makes the actual path invisible.
                fill: 0,
                fillOpacity: 0,
            });

            // get the length of the path
            var pathLength = el.getTotalLength(),
                // configure a new path to be drawn on top of our existing, 
                // invisible path, which sever as guides.
                tracedPathConfig = {
                    path: Snap.path.getSubpath(el, 0, 0),
                    stroke: "#fff",
                    fillOpacity: 0,
                    strokeWidth: 6,
                    "stroke-dasharray": "4 8",
                    "stroke-dashoffset": "180"
                };

            // Each dotted line element should provide it's own transform string
            //  to adjust the rotation of the element
            if ( "undefined" !=  typeof transform) {
                tracedPathConfig['transform'] = transform;
            }

            var tracedPath = rootGearSvg.path(tracedPathConfig);
                     
            Snap.animate(0, pathLength, function( step ){
                    // console.log('step', step);

                    tracedPath.attr({
                        path: Snap.path.getSubpath(el, 0, step),
                        strokeWidth: 1
                    });
                },
                4575, //duration
                mina.easeout, //easing
                function(){
                    console.log('anim done!');
                }
            );

        }


        function animateGears( cb ){
   
            counterClockwise( minorGear , 70, 70 );
            clockwise( majorGear, 166, 93 );
            drawDottedPath( dottedPathMajor );
            drawDottedPath( dottedPathMinor, 'r0,70,70' );
            moveArrow( arrowMinor, dottedPathMinor , 110, 10, true);
            moveArrow( arrowMajor, dottedPathMajor , 127, 22);

            if ( cb ) cb();
        };


       

    });


})(window, jQuery, Snap);