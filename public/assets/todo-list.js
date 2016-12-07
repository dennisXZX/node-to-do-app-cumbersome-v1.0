// when the document is ready
$(document).ready(function(){

  // handle the add item function
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

  // handle the delete item function
  $('li').on('click', function(){

      // replace space with hyphen on the clicked item
      let item = $(this).text().replace(/ /g, "-");
      
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          // refresh the list when the data is passed back from controller 
          refreshList(data);
        }
      });
  });

  // handle the search item function
  $('#searchTerm').on('keypress', function(){

      // retrieve the search term
      let searchTerm = $(this).val();
      
  });  

});

// this function refreshes the to-do list
function refreshList(data){
  // refresh the list when the data is passed back from controller 
  var newList = '<ul>';
  for (var i = 0; i < data.length; i++) {
      newList += '<li>' + data[i].item + '</li>';
  }
  newList += '</ul>';

  $('#itemList').html(newList);  
}