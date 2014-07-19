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
        defaults: {
            title: 'No text',
            answers: {
                1 : 'Answer A'
            },
            cansw: false,
            givenAnswer: 0
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
        initialize: function () {
        },
        render: function() {
            this.$el.html( this.template(this.model.toJSON()));
            return this;
        }
    });

    var questionsCollestion = new QzApp.Collections.QuestionCollection([
        {
            title: 'Koliko ima zvezda na nebu?',
            answers : {
                'a': '100',
                'b': '10000',
                'c': '100000000',
                'd': '>100000000000'
            },
            cansw: 'd'
        },
        {
            title: 'Question two?',
            answers : {
                'a': 'answer 1',
                'b': 'answer 2',
                'c': 'answer 3',
                'd': 'answer 4'
            },
            cansw: 'b'
        }
    ]);

    var questionsView = new QzApp.Views.QuestionsView({ collection: questionsCollestion }); 

    $('#container').html(questionsView.render().el);

}());