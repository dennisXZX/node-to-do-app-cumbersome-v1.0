let idCounter = 0;

// when the document is ready
$(document).ready(function(){

    // handle the add item function
    addClickListenerToLiElements();

    $('form').on('submit', function(){

        // generate a key for the object
        itemKey = "item" + idCounter.toString();
        
        // generate a new object
        let todoItem = {};
        todoItem[itemKey] = $('#item').val();

        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todoItem,
          success: function(data){
            // refresh the list when the data (JSON format) is passed back from controller 
            regenerateList(data);

            // update the id counter
            idCounter += 1;            

            // hide the no item message
            $("#noItem").hide();
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
function regenerateList(data){

    // empty the current list
    let ul = $('#itemList');
    ul.empty();

    // generate a new to-do list
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
        
        // handle the delete feature
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data){

              idCounter -= 1;

              // refresh the list when the data is passed back from controller 
              regenerateList(data);

              // if the to-do list is empty, display the no item message
              if(data.length == 0){
                  $('#noItem').show();
              }
            
            }
        });
    });
}