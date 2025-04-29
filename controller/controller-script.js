$('.home-btn').on('click', function() {
    $('#home-sec').css('display', 'block');
    $('#customer-sec').css('display', 'none');
    $('#item-sec').css('display', 'none');
    $('#order-sec').css('display', 'none');
});

$('.customer-btn').on('click', function() {
    $('#home-sec').css('display', 'none');
    $('#customer-sec').css('display', 'block');
    $('#item-sec').css('display', 'none');
    $('#order-sec').css('display', 'none');
});

$('.item-btn').on('click', function() {
    $('#home-sec').css('display', 'none');
    $('#customer-sec').css('display', 'none');
    $('#item-sec').css('display', 'block');
    $('#order-sec').css('display', 'none');
});

$('.order-btn').on('click', function() {
    $('#home-sec').css('display', 'none');
    $('#customer-sec').css('display', 'none');
    $('#item-sec').css('display', 'none');
    $('#order-sec').css('display', 'block');
});