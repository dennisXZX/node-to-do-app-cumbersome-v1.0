const bodyParser = require('body-parser');

let data = [
    {item: 'buy milk'},
    {item: 'walk dog'},
    {item: 'write some code'},
];

// initialize the body parser middleware
const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // update the data array
        data.push(req.body); 
        // send back the data array as JSON
        res.json(data);
    });

    app.delete('/todo/:item', function(req, res){
        console.log("delete routing");
        
        // filter out the item that need to be deleted
        data = data.filter(function(todoItem){
            return todoItem.item.replace(/ /g, '-') !== req.params.item;
        });
        // send back the data array as JSON
        res.json(data);
    });    
};