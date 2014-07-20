'use strict';
(function () {
    window.QzApp = {
        Models : {},
        Collections : {},
        Views : {},
        Helpers : {}
    };

    QzApp.Helpers.template = function (id) {
            return $('#' + id).html();
    };

    QzApp.Models.Question = Backbone.Model.extend({
        initialize : function () {
            this.on("invalid", function (model, error) {
                console.error(error);
            });
        },
        validate: function (attrs, options) {
            if (!attrs.title) {
                return 'Question must have a title!';
            }
            if (Object.keys(attrs.answers).length === 0) {
                return 'Error, no answers for question: "' + attrs.title + '"';
            }
        }
    });

    QzApp.Collections.QuestionCollection = Backbone.Collection.extend({
        model: QzApp.Models.Question
    });

    // View for all questions
    QzApp.Views.QuestionsView = Backbone.View.extend({
        tagName: 'ul',
        initialize: function () {
        },
        render: function () {
            // filter through all items in a collection
            this.collection.each(function (question) {
                // for each, create new QuestionView
                var questionView = new QzApp.Views.QuestionView({ model: question });
                // append to the root element
                this.$el.append(questionView.render().el);
            }, this);
            return this;
        }
    });

    QzApp.Views.QuestionView = Backbone.View.extend({
        tagName: 'li',
        className: 'question',
        template: _.template( QzApp.Helpers.template('questionTemplate')),
        events: {
            'click .answer' : 'answer'
        },
        render: function() {
            this.$el.html( this.template(this.model.toJSON()));
            return this;
        },
        answer: function(e){
            console.log(this.model.get('title'));
        }
    });

    var questionsCollestion = new QzApp.Collections.QuestionCollection([
        {
            "title" : "Na kom kontinentu se nalazi država Mali?",
            "answers" : {
                "a" : "Africi",
                "b" : "Aziji",
                "c" : "Južnoj Americi",
                "d" : "Evropi"
            },
            "correct" : "a",
            "points" : "3"
        },
        {
            "title" : "Kako se zove glavni grad Etiopije?",
            "answers" : {
                "a" : "Etiopija Siti",
                "b" : "Kartum",
                "c" : "Najrobi",
                "d" : "Adis Abeba"
            },
            "correct" : "d",
            "points" : "3"
        },
        {
            "title" : "Koja je najmnogoljudnija zemlja posle Kine?",
            "answers" : {
                "a" : "Iran",
                "b" : "Italija",
                "c" : "Indonezija",
                "d" : "Indija"
            },
            "correct" : "d",
            "points" : "3"
        }
    ]);
    
    var questionsView = new QzApp.Views.QuestionsView({ collection: questionsCollestion }); 

    $('#container').html(questionsView.render().el);

}());