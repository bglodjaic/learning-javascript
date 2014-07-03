var plm = (function(){
    var debug = true;
    return {
        init: function(){
            // setup window.performance, add function performance in case it don't exists
            this.performance();
        },
        getDebug: function(){
          return debug;
        },
        setDebug: function(val){
              debug = !!val;
          },
        log: function(msg){
            if( debug ){
                try{
                    console.log.apply( console, arguments );
                }
                catch(e){
                    alert( Array.prototype.join.call( arguments, " ") );
                }
            }
        },
        liveLog: function(){
            //log in to the console is url contain 'livelog' param, example: www.test.net?livelog
            var query = window.location.search.substring(0);
            if(query.match(/([?&])(livelog)(&|$)/g)){
                try{
                    console.log.apply( console, arguments );
                }
                catch(e){
                    alert( Array.prototype.join.call( arguments, " ") );
                }
            }
        },
        forEach: function(array, callback){
            for(var i=0; i < array.length; i++ ){
                callback(array[i]);
            }
        },
        cLogArr: function(arr){
            var self = this;
            this.forEach(arr, function(el){
                self.log(el);
            });
        },
        extend: function( Parent, Child ){
            // var F = function(){};
            // F.prototype = Parent.prototype;
            // Child.prototype = new F();
            // Child.prototype.constructor = Child;
            // console.log(Parent);
            for( var i in Parent.prototype ){
                Child.prototype[i] = Parent.prototype[i];
            }
            Child.prototype.constructor = Child;
            // for( var i in Parent){
            //   console.log( Parent[i] );
            // }

            Child._super = Parent.prototype;
        },
        shallowCopy: function( obj ){
            var newObj = {};
            for(var i in obj){
                newObj[i] = obj[i];
            }

            return newObj;
        },
        deepCopy: function( obj, newObj ){
            var newObj = newObj || {};
            for(var i in obj){
                if( typeof obj[i] == 'object' ){
                    // console.log( obj[i].constructor );    
                    newObj[i] = obj[i].constructor === Array ? [] : {};

                    newObj[i] = this.deepCopy( obj[i], newObj[i] );
                }
                else{
                    newObj[i] = obj[i];
                }
            }
            return newObj;
        },
        objectCreate: function(){
            return Object.create || function(obj){
                function F(){};
                if(arguments.length != 1) throw new Error('Object.create accepts only one parameter!');
                F.prototype = obj;
                return new F();
            }
        },
        /* Events */
        addEvent: function( element, event, eventHandler, useCapture){
            if( typeof window.addEventListener === "undefined" ){
                //IE
                element.attachEvent( "on" + event, eventHandler );
            }
            else{
                element.addEventListener( event, eventHandler, useCapture);
            }
        },
        removeEvent: function(){
            
        },
        getTarget: function( event ){
            return event.target ? event.target : event.srcElement;
        },
        preventDefault: function (event){
            if (typeof event.preventDefault !== "undefined"){
                event.preventDefault();
            }
            else{
                event.returnValue = false;
            }
        },

        getCharCode: function (event){
            if (typeof event.charCode === "number" && event.charCode){
                return event.charCode;
            }
            else{
                return event.keyCode;
            }
        },
        //
        performance: function(){
            window.performance = window.performance || {};
            performance.now = (function(){
                return  performance.now       ||
                        performance.mozNow    ||
                        performance.msNow     ||
                        performance.webkitNow ||
                        function(){ return new Date().getTime(); };
            }());
        }
    }
}());

plm.init();