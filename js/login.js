$(document).ready(function(){
    $('#logForm').submit(function(e) {
        e.preventDefault();        
        $.ajax({
            type: 'POST',
            url: '/php/login.php',
            data: $(this).serialize(),
            success: function(response) {
                console.log(response);
                if(response){
                    window.location.replace("/contenido/agenda.html"); 
                }else{
                    $('#errorM').css('visibility','visible');
                    setTimeout(function(){
                        $("p:last").remove();
                        $('#nombre').val('');
                        $('#passw').val('');
                    $('#errorM').css('visibility','hidden');

                    },1500);
                    
                }
                             
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
            });
      });
});