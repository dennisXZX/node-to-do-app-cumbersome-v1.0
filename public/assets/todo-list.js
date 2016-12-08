// when the document is ready
$(document).ready(function(){

    let idCounter = 0;

    // handle the add item function
    addClickListenerToLiElements();

    $('form').on('submit', function(){

        // generate a key for the object
        itemKey = "item" + idCounter.toString();
        
        // generate a new object
        let todoItem = {};
        todoItem[itemKey] = $('#item').val();

        // update the id counter
        idCounter += 1;

        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todoItem,
          success: function(data){
            // refresh the list when the data (JSON format) is passed back from controller 
            refreshList(data);
          }
        });

        // empty the item input field
        $("#item").val("");

        return false;
    });

  // handle the search item function
  $('#searchTerm').on('keypress', function(){
      // retrieve the search term
      let searchTerm = $(this).val();
  });  

});

// this function refreshes the to-do list
function refreshList(data){

    // empty the current list
    let ul = $('#itemList')
    ul.empty();

    for(let i=0; i<data.length; i++){
        // retrieve the key of the object
        let itemKey = Object.keys(data[i]);
        $('<li id=item' + i + '>').text(data[i][itemKey]).appendTo(ul);
    }

    addClickListenerToLiElements();
}

function addClickListenerToLiElements() {

    $('li').on('click', function(){

        var item = $(this).attr("id");
        
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data){
              // refresh the list when the data is passed back from controller 
              refreshList(data);
            }
        });
    });
}