/*-----------------------------------------
// LOGO
-------------------------------------------*/
var i = 0;

function mask(a) {
    i++;
    if (i < a) {
        $("#logo")
            .attr("style", "-webkit-mask:-webkit-gradient(radial, 17 17,"
                + i + ", 17 17, " + (i + 15)
                + ", from(rgb(0, 0, 0)), color-stop(0.5, rgba(0, 0, 0, 0.2)), to(rgb(0, 0, 0)));");

        setTimeout(function () {
            mask(a);
        }, 17 - i);
    } else i = 0;
}

$("#logo").on("click", function () {
    mask(164)
});

/*---------------------------------------
// GALLERY
----------------------------------------*/

$(".img-tab-gallery").magnificPopup({
    type: 'image',
    gallery: {
        enabled: true
    },
    removalDelay: 300,
    mainClass: 'mfp-fade'
});

/*----------------------------
// VIDEO
-----------------------------*/

$('#play-video').on('click', function (e) {
    e.preventDefault();
    $('#video-overlay').addClass('open');
    $("#video-overlay").append('<iframe width="1920" height="1080" src="https://www.youtube.com/embed/ngElkyQ6Rhs" frameborder="0" allowfullscreen></iframe>');
});

$('.video-overlay, .video-overlay-close').on('click', function (e) {
    e.preventDefault();
    close_video();
});

function close_video() {
    $('.video-overlay.open').removeClass('open').find('iframe').remove();
};

/*------------------------------
 // COUNTER
 ------------------------------*/

$('.counter-number').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

