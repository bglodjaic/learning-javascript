console.log('Application bootstrap');
require(['core'], function(core){
    'use strict';
    /* This function will be called after module(s) has been executed */

    console.log('module: \'core\' has been loaded: ', core);
});