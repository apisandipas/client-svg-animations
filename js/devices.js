;(function(window, $, Snap){
    'use strict';



    


    $(function(){

   

        // jQuery reference to root SVG element
        var $devicesEl = $('#devices-svg');
       window.$rootPhoneEl = $('#phone');

        // Cached Snap elemements
        var rootDevicesSvg = Snap('#devices-svg'),
            rootLaptop     = rootDevicesSvg.select('#laptop'),
            rootTablet     = rootDevicesSvg.select('#tablet'),
            rootPhone      = rootDevicesSvg.select('#phone'),

            phoneContent   = rootPhone.select('#phone-content'),
            tabletContent  = rootPhone.select('#tablet-content'),
            laptopContent  = rootLaptop.select('#binary'),
            binaryContent  = laptopContent.selectAll('tspan'),


            devicesEasingFn = mina.elastic,
            devicesTimeout  = 2000

        ;

        //  wait for the phone element to come into view (or miss it's animation entirely...)
        // $rootPhoneEl.bind('inview', function(event, visible){
        //     if (visible == true) {

        //        console.log('devices in view');

              
        //     } else {
        //         console.log('devices not in view');
        //        clearScreen();
        //     }
        // });



        var animatePhoneContent = function(){
            var fromState = 'translate(15, 41)',
                toState = 'translate(15, 31)';

            phoneContent.transform( fromState );

            phoneContent.animate(
                {
                    transform: toState,
                    x: 15,
                    y: 31,
                },
                devicesTimeout,
                devicesEasingFn,
                animatePhoneContent
            );
        };  

        var clearScreen = function(){
            binaryContent.items.forEach(function( el ){
               el.attr({
                   strokeWidth: 0,
                   stroke: '#06C7DE', // makes the actual path invisible.
                   fill: '',
                   fillOpacity: 0,
               });
            });
        };

        var indexCached;
        
        var drawScreen = function(){
            binaryContent.items.forEach(function( el , index ){
                indexCached = 1500 * (index + 1);
                el.animate({
                        strokeWidth: 0,
                        stroke: '#FFFFFF', // makes the actual path invisible.
                        fill: '#FFFFFF',
                        fillOpacity: 1
                    },
                    indexCached,
                    mina.elastic//,
                    // animateLaptopContent
                );
                // console.log(indexCached);
            });

        };

    
        var animateLaptopContent = function(){

           
             // clearScreen();
             // drawScreen();

             setInterval(function(){

                clearScreen();
            
                drawScreen();

             }, 2000);


        };


        animatePhoneContent();
        animateLaptopContent();
               

    });

})(window, jQuery, Snap);