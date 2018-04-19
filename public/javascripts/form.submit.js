$(document).ready(function(){
$('.modal').on('hidden.bs.modal', function(){
    $(this).find('#statusMessage').html("");
    $(this).find('form')[0].reset();
});
var API_URL = '/./api/mail';
var MY_URL = '/';
console.log("script loaded");
$('#contactForm').on('submit', function (e){
    e.preventDefault();
    console.log($('#contactForm').serialize())

    // var error = false;

    // // validation here, if there is an error, set error = true;

    // if (error == true) {
    //     alert('There was a problem!'); // do something better than this!
    //     return false;
    // }

    $.ajax({
      type: 'POST',
      url: API_URL,
      data: $('#contactForm').serialize(),
      success: function (response) {
            console.log(response)
            $('#statusMessage').html(response.message)
            setTimeout(function(){ $("#myModal .close").click(); }, 1500);
            // $('#myModal').modal('hide')
          },
          error: function (error) {
            console.log(error)
            $('#statusMessage').html(error.message); // do something better than this!
          }
        });

        
    //   },
    //   error: function (error) {
    //     console.log(error)
    //     alert('There was a problem2!'); // do something better than this!
    //   }
    // });
    // return false;
});

});