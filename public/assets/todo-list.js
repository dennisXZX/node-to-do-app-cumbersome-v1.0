// when the document is ready
$(document).ready(function(){

  // handle the add item function
  addListenerToLiElements();

  $('form').on('submit', function(){
      // retrieve the add item input
      let item = $('#item');
      let todo = {"item": item.val()};
      
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){ 
          // refresh the list when the data is passed back from controller 
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
  var ul = $('#itemList')
  ul.empty();
  $.each(data, function(i){
    //console.log(data[i]);
    $('<li>').text(data[i].item).appendTo(ul);
  });
  addListenerToLiElements();
}

function addListenerToLiElements(){

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
  })
}