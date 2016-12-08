// when the document is ready
$(document).ready(function(){

    let idCounter = 0;

    // handle the add item function
    addListenerToLiElements();

    $('form').on('submit', function(){

        // generate a key for the object
        itemKey = "item" + idCounter.toString();
        
        // generate a new object
        let todo = {};
        todo[itemKey] = $('#item').val();

        // update the id counter
        idCounter += 1;

        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            // refresh the list when the data (JSON format) is passed back from controller 
            refreshList(data);
          }
        });

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
    let count = 0;
    let ul = $('#itemList')
    ul.empty();
    $.each(data, function(i){
        let itemKey = "item" + count.toString();
        
        $('<li id=item' + count + '>').text(data[i][itemKey]).appendTo(ul);
        count += 1;
    });
    addListenerToLiElements();
}

function addListenerToLiElements() {

    $('li').on('click', function(){
        var item = $(this).text();
        
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