document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    function checkSectionInView() {
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - 50) {
                section.classList.add('in-view');
            } else {
                section.classList.remove('in-view');
            }
        });
    }

    // Check on scroll
    window.addEventListener('scroll', checkSectionInView);

    // Check on page load
    checkSectionInView();
});

$(document).ready(function(){
    $('#contact-form').on('submit', function(e){
        e.preventDefault(); // Prevent the form from submitting the default way

        var formData = $(this).serialize(); // Serialize the form data

        $.ajax({
            type: 'POST',
            url: 'send_message.php',
            data: formData,
            dataType: 'json',
            success: function(response){
                if(response.status === 'success') {
                    $('#form-message').removeClass('alert-danger').addClass('alert-success').html(response.message).show();
                    $('#contact-form')[0].reset(); // Reset the form after successful submission
                } else {
                    $('#form-message').removeClass('alert-success').addClass('alert-danger').html(response.message).show();
                }
                setTimeout(function(){
                    $('#form-message').fadeOut();
                }, 3000); // Hide the message after 3 seconds
            },
            error: function(){
                $('#form-message').removeClass('alert-success').addClass('alert-danger').html('Error sending message. Please try again.').show();
                setTimeout(function(){
                    $('#form-message').fadeOut();
                }, 3000); // Hide the message after 3 seconds
            }
        });
    });
});
