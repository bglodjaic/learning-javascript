$(function(){
    // console.log('jQuery is ready.');
});

/** Creating TodoItem class */
var TodoItem = Backbone.Model.extend({
    initialize: function(){
        console.log('This model has been initialized.');
        this.on('change:status', function(e){
            console.log('ToDo status - Model has been changed!');
        });
    }
});
/** Creating todoItnem instance */
var todoItem = new TodoItem();
// todoItem.url = 'http://ip.jsontest.com';
todoItem.url = 'http://127.0.0.1:9999/get/todo';
// todoItem.url = 'http://plm.cloudant.com/todo/307b94cad8b36b294fb3a402e4d66e94';


/** Creating TodoView class */
var TodoView = Backbone.View.extend({
    render: function(){
        var html = '<h3>' + this.model.get('description') + ' STATUS: ' + this.model.get('status') + '</h3>';
        $(this.el).html(html);
    }
});
/** Creating todoView instance */
var todoView = new TodoView({ model: todoItem });

// Fetching data from server
todoItem.fetch({
    success: function(model, response, options){
        console.log(todoItem.get('status'));
        todoView.render();
        $(document.body).html(todoView.el);
        todoItem.set('status', 'in-progress');
        console.log(todoItem.get('status'));
        todoView.render();
        $(document.body).html(todoView.el);
    },
    error: function(model, response, options){
        console.log('Backbone fetch error');
        console.log(response);
    }
});
// var todoItem = new TodoItem(
//     { description: 'Learn JavaScript and learn it well!', status: 'incomplite', id: 1 }
// );



