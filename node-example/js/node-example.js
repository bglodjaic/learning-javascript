(function () {
    'use strict';
    var button = document.getElementById("logAction");

    var sendLog = function( message ){
            var torch = document.createElement('img');
            torch.src = 'http://localhost:8080/logger/?message=' + encodeURIComponent( message );
            torch.style.display = 'none';

            document.body.appendChild( torch );
        },
        logMessage = function(message, send){
            plm.liveLog( message );
            if( send ){
                sendLog( message );
            }
        };

    logMessage('Page loaded', true );
    plm.addEvent(button, "click", function(e){
        logMessage( 'Logging button clicked!', true );
    });
})();