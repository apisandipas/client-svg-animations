;(function(window, $, Snap){
    'use strict';
 

    $(function(){

         // jQuery reference to root SVG element
        var $rocketEl = $('#rocket-rocket');
        var $gearsEl = $('#gears');

        // the selectors are used to reference parts of the illustration as Snap objects.
        var rootRocketSvg = Snap('#rocket-svg'),
            rocket  = rootRocketSvg.select('#rocket-rocket'),
            cloud1  = rootRocketSvg.select('#rocket-cloud-1'),
            cloud2  = rootRocketSvg.select('#rocket-cloud-2'),
            cloud3  = rootRocketSvg.select('#rocket-cloud-3'),
            cloud4  = rootRocketSvg.select('#rocket-cloud-4'),
            cloudGroup  = rootRocketSvg.group(cloud3, cloud4),
            flames  = rocket.select('#rocket-flames')
        ;

        cloudGroup.attr({'fill': '#fff'});
        
        // bind each to it's handler function
        $rocketEl.bind('inview', function(event, visible){
             if (visible == true) {
                flamesAnimation();
                rocketAnimation();
                cloudAnimation();
              } else {
                flames.stop();
                rocket.stop();
                cloud1.stop();
                cloud2.stop();
                cloudGroup.stop();
              }
        });

        $gearsEl.bind('inview', function(event, visible){
             if (visible == true) {
               
              } else {
                
              }
        });

        function rocketAnimation(){
            var rocketEasingFn = mina.easeinquint;
            var rocketTimeout = 3000;
            
   
            // console.log('rocket up..');
            rocket.stop().animate(
                { transform: 'translate(-15 -15)'},  
                rocketTimeout, 
                rocketEasingFn, 
                function(){ 

                    // console.log('rocket down..');
                    rocket.stop().animate(
                        { transform: 'translate(0 0)'}, 
                        rocketTimeout, 
                        rocketEasingFn,
                        rocketAnimation
                    );  
                }
            );
        }


        function flamesAnimation(){
            var flamesEasingFn = mina.easeinquint;
            var flamesTimeout = 1500;

            flames.stop().animate(
                { transform: 'translate(5 5) scale(0.99)'},
                flamesTimeout,
                flamesEasingFn,
                function(){

                    flames.stop().animate(
                        { transform: 'translate(0 0) scale(1)'},
                        flamesTimeout,
                        flamesEasingFn,
                        flamesAnimation
                    );
                }
            );
        }

        function cloudAnimation(){
            var cloudEasingFn = mina.easeinquint;
            var cloud1Timeout = 1500;
            var cloud2Timeout = 1500;
            var cloud3Timeout = 1500;

            cloud1.stop().animate(
                { transform: 'translate(0 5)' },
                cloud1Timeout,
                cloudEasingFn,
                function(){

                    cloud1.stop().animate(
                        { transform: 'translate(0 0)' },
                        cloud1Timeout,
                        cloudEasingFn,
                        cloudAnimation
                    );

                }
            );

            cloud2.stop().animate(
                { transform: 'translate(0 10)' },
                cloud2Timeout,
                cloudEasingFn,
                function(){

                    cloud2.stop().animate(
                        { transform: 'translate(0 0)' },
                        cloud2Timeout,
                        cloudEasingFn,
                        cloudAnimation
                    );

                }
            );

            cloudGroup.stop().animate(
                { transform: 'translate(0 8)' },
                cloud3Timeout,
                cloudEasingFn,
                function(){
                    cloudGroup.stop().animate(
                        { transform: 'translate(0 0)' },
                        cloud3Timeout,
                        cloudEasingFn,
                        cloudAnimation
                    );
                }
            );
        }

    });


})(window, jQuery, Snap);