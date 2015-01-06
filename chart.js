(function(window, $, Snap){
    'use strict';
 

    $(function(){

        // these selectors are used to detect when theyre els are 'inview'
        var $chartEl = $('#chart-svg');

        var rootChartSvg = Snap('#chart-svg'),
        bars = {
            bar1: rootChartSvg.select('#bar-1'),
            bar2: rootChartSvg.select('#bar-2'),
            bar3: rootChartSvg.select('#bar-3'),
            bar4: rootChartSvg.select('#bar-4'),
            bar5: rootChartSvg.select('#bar-5')
        },
        delays = [
            0,
            500,
            1000,
            1500,
            2000,
        ],
        chartEasingFn = mina.easeout,
        chartTimeout = 500;

        $chartEl.bind('inview', function(event, visible){
            if (visible == true) {
                
                 // $.each(bars, function(index, el){
                    
                 //    var delay = delays[index];

                 //    animateBars( el, delay );

                 // });
                
                
                animateBars();

            } else {

                stopBarAnimations();
            }
        });

        function stopBarAnimations(){
            $.each(bars, function(index, el){
                el.stop();
                // el.attr( {
                //     'height': '0',
                // });
            });
        }

        // function getNextEl( el ){
        //     var currentID = el.attr('id'),
        //         id = currentID.split('-'),
        //         id = parseInt( id[1] );
        //     // ;
        //     id++;
        //     return 'bar' +  id ;
        //     // console.log(currentID);
        // }

        function animateBars(){

            animateBar( bars.bar1, delays[0] , function(){
                animateBar( bars.bar2, delays[1], function(){
                    animateBar( bars.bar3, delays[2], function(){
                        animateBar( bars.bar4, delays[3], function(){
                            animateBar( bars.bar5, delays[4], false );
                        } );
                    } );
                } );
            });
            
            // animateBar( bars.bar3, delays[2] );
            // animateBar( bars.bar4, delays[3] );
            // animateBar( bars.bar5, delays[4] );
        }


        function animateBar( el, delay, cb ){
            var startingBar = '',
                endingBar1 = ''
            ;
            
            // var nextEl = getNextEl(el);

            var targetHeight = el.attr('height');
      

            el.attr( {
                'height': '0',
            } );

            setTimeout(function(){
                el.animate(
                    { 
                        'height': targetHeight,
                    },
                    chartTimeout,
                    chartEasingFn//,
                    // animateBars.bind( null, bars[nextEl])
                );
            }, delay ); 


            if (cb) cb();
        }

    });


})(window, jQuery, Snap);