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

function close_video() {
    $('.video-overlay.open').removeClass('open').find('iframe').remove();
};

$('#play-video').on('click', function (e) {
    e.preventDefault();
    $('#video-overlay').addClass('open');
    $("#video-overlay").append('<iframe width="100%" height="705" src="https://www.youtube.com/embed/ngElkyQ6Rhs" frameborder="0" allowfullscreen></iframe>');
});

$('.video-overlay, .video-overlay-close').on('click', function (e) {
    e.preventDefault();
    close_video();
});

/*------------------------------
 // COUNTER
 ------------------------------*/

$('.counter-number').each(function () {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

/*----------------------------
// Ajax
----------------------------*/

var table = document.getElementById('out');

function readAllData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/js/data.json');
    xhr.send();
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (this.readyState !== this.DONE) {
            return;
        }
        for (var i = 0; i < this.response.length; i++) {
            addRow(this.response[i], table);
        }
    }
}

function addRow(todo, table) {
    var row = document.createElement('tr');
    row.setAttribute('id', todo.id);

    table.appendChild(row);

    var FullName = document.createElement('td');
    FullName.innerHTML = todo.FullName;

    var Date = document.createElement('td');
    Date.innerHTML = todo.Date;

    var Phone = document.createElement('td');
    Phone.innerHTML = todo.Phone;

    var Email = document.createElement('td');
    Email.innerHTML = todo.Email;

    var Desc = document.createElement('td');
    Desc.innerHTML = todo.Desc;

    // var Country = document.createElement('td');
    // Country.innerHTML = todo.Country;


    row.appendChild(FullName);
    row.appendChild(Date);
    row.appendChild(Phone);
    row.appendChild(Email);
    row.appendChild(Desc);
    // row.appendChild(Country);
}

readAllData();


/*---------------------------
// jquery-validation
---------------------------*/

$(function () {
    $('#formid').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            name: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            email: {
                require: 'Please enter an email address',
                email: 'Please enter a <i>valid</i> email address'
            },
            name: {
                require: 'Please enter your name',
                minlength: 'The length of your name must be at least {0} characters long'
            }
        }
    });
});

// toggle

$(document).ready(function () {
    $('.toggle-menu').click(function () {
        $('.sidebar-menu').addClass('hide-menu');
        $('.toggle-menu').addClass('opacity-zero')
    });

    $('.fa-times').click(function () {
        $('.sidebar-menu').removeClass('hide-menu');
        $('.toggle-menu').removeClass('opacity-zero')
    });
});
