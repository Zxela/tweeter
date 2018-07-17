$(document).ready(function() {
    $(".new-tweet textarea").on('keydown', function() {
        console.log($(this).val().length);
    })
});