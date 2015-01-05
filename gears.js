(function(window, $, Snap){
    'use strict';
 

    $(function(){

        // these selectors are used to detect when theyre els are 'inview'
        var $gearsEl = $('#gears');

        var rootRocketSvg = Snap('#gears'),
            minorGear       = rootRocketSvg.select('#gear-minor'),
            majorGear       = rootRocketSvg.select('#gear-major'),
            dottedPathMajor = rootRocketSvg.select('#dotted-path-major'),
            dottedPathMinor = rootRocketSvg.select('#dotted-path-minor'),
            arrowMajor      = rootRocketSvg.select('#arrow-major'),
            arrowMinor      = rootRocketSvg.select('#arrow-minor')

        ;

        var gearEasingFn = mina.linear;
        var gearTimeout = 10000;

        $gearsEl.bind('inview', function(event, visible){
            if (visible == true) {
                animateGears();
            } else {
                majorGear.stop();
                minorGear.stop();
            }
        });

        function clockwise( el ) {
            el.transform('R0,169,95'); // some kind of transform reset, or removing the previous completed transform maybe needed.
            el.animate(
                { transform: 'R-360,169,95' }, 
                gearTimeout, 
                gearEasingFn, 
                clockwise.bind( null, el)
            );
        };

        function counterClockwise( el ) {
            el.transform('r0,70,70'); // some kind of transform reset, or removing the previous completed transform maybe needed.
            el.animate(
                { transform: 'r360,70,70' }, 
                gearTimeout, 
                gearEasingFn, 
                counterClockwise.bind( null, el)
            );
        };


        var animateGears = function(){
   

            counterClockwise( minorGear );
            clockwise( majorGear );
  
        };

    });


})(window, jQuery, Snap);