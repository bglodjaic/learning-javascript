function stampit(methods, state, enclose) {
    var newObj = Object.create(methods);
    console.log(newObj);
    Object.defineProperties(newObj, state || {});

    enclose.call(newObj);
    return newObj;
};

var testObj = stampit(
    // methods
    {
        delegateMethod: function delegateMethod() {
            return 'shared property';
        }
    },

    // state
    {
        'instanceProp': {
            value: 'instance property',
            writable: true
        }
    },

    // enclose
    function () {
        var privateProp = 'private property';

        this.getPrivate = function getPrivate() {
            return privateProp;
        }
    });