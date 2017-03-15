module.exports = (function () {

    let instance;

    let privateMethod = function addOne() {
        return this.id + 1;
    }

    let single = {
        id: 1,
        getId: function () {
            return this.id;
        },
        setId: function (id) {
            this.id = id;
        },
        addOne: function () {
            return privateMethod.call(this);
        }
    };


    return {
        getInstance: function () {
            if (!instance) {
                instance = Object.create(single);

                return instance;
            }

            return instance;
        }
    }
})();