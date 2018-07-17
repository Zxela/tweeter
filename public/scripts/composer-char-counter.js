$(document).ready(function() {
    $(".new-tweet textarea").on('keyup', function() { //Counter
        let $len = $(this).val().length; // assign varibale to number of characters typed
        let count = 140 - $len;
        let $counter = $(this).siblings('.counter')
        $counter.text(count);
        if (count <= 0) {
            $counter.addClass('overcount');
        } else {
            $counter.removeClass('overcount');
        }
    })
});