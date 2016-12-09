const bodyParser = require('body-parser');

let data = [];

// initialize the body parser middleware
const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // place the obj {"item0": value} into the data array
        data.push(req.body); 
        console.log("raw data");
        
        console.log(data);
        
        // send back the data array as JSON
        res.json(data);
    });

    app.delete('/todo/:itemID', function(req, res){

        // filter out the item that need to be deleted
        data = data.filter(function(todoItemObj){
            let objKey = Object.keys(todoItemObj);
            return objKey != req.params.itemID;
        });

        // regenerate the data array again to arrange the object key from item0 - itemX
        let newData = [];

        for(let i=0; i<data.length; i++){
         
            // generate a new object
            let todoItem = {};

            // generate a key for the object
            itemKey = "item" + i.toString();
            todoItem[itemKey] = data[i][Object.keys(data[i])];
            newData.push(todoItem);
        }

        data = newData;

        // send back the data array as JSON
        res.json(newData);
    });      
};