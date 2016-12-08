const bodyParser = require('body-parser');

let data = [
    // {item: 'buy milk'},
    // {item: 'walk dog'},
    // {item: 'write some code'},
];

// initialize the body parser middleware
const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // place the obj {"item0": value} into the data array
        data.push(req.body); 
        // send back the data array as JSON
        res.json(data);
    });

    app.delete('/todo/:itemID', function(req, res){
        
        // filter out the item that need to be deleted
        data = data.filter(function(todoItem){

            // console.log("todoItem.item: " + todoItem.item);
            // console.log("req.params: " + req.params);
            
            // return todoItem.attr('id') != req.params.item;
        });

        // send back the data array as JSON
        res.json(data);
    });      
};