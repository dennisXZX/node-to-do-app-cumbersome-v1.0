// when the document is ready
$(document).ready(function(){

  // register a submit event
  $('form').on('submit', function(){

      console.log("inside submit");

      // retrieve the add item button
      let item = $('#item');
      console.log("item: ", item);
      
      let todo = {"item": item.val()};
      console.log("todo: ", todo);
      
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){ 

        // refresh the list when the data is passed back from controller 
        var newList = '<ul>';
        for (var i = 0; i < data.length; i++) {
            newList += '<li>' + data[i].item + '</li>';
        }
        newList += '</ul>';

        $('#itemList').html(newList);

          // location.reload();
          // console.log("reload");
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});