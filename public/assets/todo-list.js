// when the document is ready
$(document).ready(function(){

  // register a submit event
  $('form').on('submit', function(){

      console.log("inside submit");

      // retrieve the add item button
      let item = $('#item');
      console.log("item: " + item);
      
      let todo = {item: item.val()};
      console.log("todo: " + todo);
      
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
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