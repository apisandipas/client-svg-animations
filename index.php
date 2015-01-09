<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="css/normalize.css">   
        <link rel="stylesheet" href="css/screen.css">   
    </head>
    <body>
        <div class="panel intro">
            <h1>SVG Animation Demo</h1>
            <i>scroll down ...</i>
        </div>
    
        <div class="panel chart">
            <?php include 'svg/chart.svg'; ?>
        </div>
    
        <div class="panel devices">
            <?php include 'svg/devices.svg'; ?>
        </div>


        <div class="panel gears">
            <?php include 'svg/gears.svg'; ?>
        </div>

        <div class="panel rocket">
            <?php include 'svg/rocket.svg'; ?>           

        </div>

        <?php // Libs & Plugins ?>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/snap.svg/0.3.0/snap.svg-min.js"></script>
        <script src="js/libs/jquery.inview.js"></script>

        <?php // Animations Scripts ?>
        <script src="js/rocket.js"></script>
        <script src="js/gears.js"></script>
        <script src="js/chart.js"></script>
        <script src="js/devices.js"></script>
    </body>
</html>