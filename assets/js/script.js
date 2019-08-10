// REVIEW: preloader when loading page
// jQuery(document).ready(function ($) {
//     $(window).load(function () {
//         $('#preloader').fadeOut('slow', function () { $(this).remove(); });
//     });
// });

// REVIEW: top sticky header nav-bar open-close setup

var mobileScreenSize = window.matchMedia("(max-width: 972px)");
var pcScreenSize = window.matchMedia("(min-width: 973px)");
var openBar = document.querySelector('.fa-align-right');
var closeBar = document.querySelector('.fa-times-rectangle');
var navContainer = document.querySelector('.top-sticky-header > nav');

function openSideNav() {
    navContainer.style.left = "0";
}

function closeSideNav() {
    navContainer.style.left = "-150px";
}

function toggleOpenBarIcon() {
    openBar.style.opacity = "0";
    openBar.style.transition = "0.6s";

    setTimeout(() => {
        openBar.style.display = "none";
        closeBar.style.display = "block";
        closeBar.style.opacity = "1";
        closeBar.style.transition = "0.5s";
    }, 400);
}

function toggleCloseBarIcon() {
    closeBar.style.opacity = "0";
    closeBar.style.transition = "0.5s";
    setTimeout(() => {
        closeBar.style.display = "none";
        openBar.style.display = "block";
        openBar.style.opacity = "1";
        openBar.style.transition = "0.5s";
    }, 400);
}

function toggleNavBar() {
    openBar.style.display = "block";

    openBar.addEventListener('click', function () {
        openSideNav();
        document.body.style.overflowY = "hidden";

        toggleOpenBarIcon();

    });

    closeBar.addEventListener('click', function () {
        closeSideNav();
        document.body.style.overflowY = "scroll";
        toggleCloseBarIcon();

    });
}

// REVIEW: Close nav, When Clicked Outside Of It.

$(document.body).mousedown(function (event) {
    var target = $(event.target);
    if (target.parents().andSelf().is(openBar) || target.parents().andSelf().is(navContainer)) {
        navContainer.style.left = "0px";
    } else {
        navContainer.style.left = "-150px";
        toggleCloseBarIcon()
        document.body.style.overflowY = "scroll";
    }
});

function checkMobileSize(size) {
    if (size.matches) {
        toggleNavBar();
    } else {
        closeBar.style.display = "none";
        openBar.style.display = "none";
    }
}

// REVIEW: close navbar when clicking on links
$('a[href*="#"]').on('click', function () {
    document.body.style.overflowY = "scroll";
    document.querySelector('nav').style.left = "-150px";

    function checkMobileSize(size) {
        if (size.matches) {
            toggleNavBar();
            toggleCloseBarIcon();
        } else {
            closeBar.style.display = "none";
            openBar.style.display = "none";
        }
    }
    checkMobileSize(mobileScreenSize)
    mobileScreenSize.addListener(checkMobileSize)
});


// REVIEW: open facebook page when clicking on fb icon


if (pcScreenSize.matches) {
    document.querySelector('.facebook').addEventListener('click', function () {

        const a = document.createElement('a');
        a.href = "https://www.facebook.com/Dream-Makers-Achievers-1382266625246369/";
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    })
}



// REVIEW: Form submission using ajax

function postToDataBase() {

    var field1 = $("#firstName").val();
    var field2 = $("#lastName").val();
    var field3 = $("#mobile").val();
    var field4 = $("#subject").val();
    var field5 = $("#message").val();
    var field6 = $("#email").val();
    var field7 = $("#address").val();


    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSd60r5wh_-4DRSxgp4g9_kMyitffQmkmXAhyKbKLVFjKIS6nQ/formResponse",
        data: { "entry.1062285405": field1, "entry.1115814915": field2, "entry.305354010": field3, "entry.2137892250": field4, "entry.334434444": field5, "emailAddress": field6, "entry.220273468": field7 },
        type: "POST",
        dataType: "xml",
        success: function () {
            console.log('your message has been sent ..!')
        },

        error: function () {
            console.log('problem with server ..!')
        }
    });
    return false;
}

var form = document.querySelector('#form');
form.addEventListener("submit", function (e) {

    e.preventDefault();    //stop form from submitting default
    e.target.firstName.value = '';
    e.target.lastName.value = '';
    e.target.phone.value = '';
    e.target.subject.value = '';
    e.target.message.value = '';
    e.target.email.value = '';
    e.target.address.value = '';

    // alert box after form submission
    document.querySelector('.submit-box-alert').style.display = "block";
    setTimeout(() => {
        document.querySelector('.submit-box-alert').style.display = "none";
    }, 7000);
    postToDataBase();
});

// REVIEW: back to top icon

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    var goTop = document.querySelector('.go-top');

    if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
        goTop.style.opacity = 1;
        goTop.style.display = "block";
    } else {
        goTop.style.opacity = "0";
        goTop.style.display = "none";
    }
}

// REVIEW: smooth scrolling setup using jquery, when clicking on links
$('a[href*="#"]').on('click', function (e) {
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top - 80
    }, 500);
    e.preventDefault();
});

// /*------- Swiper Slider -------*/
// var swiper = new Swiper('.swiper-container', {
// 	pagination: '.swiper-pagination',
// 	nextButton: '.swiper-button-next',
// 	prevButton: '.swiper-button-prev',
// 	paginationClickable: true,
// 	centeredSlides: true,
// 	autoplay: 3500,
// 	   speed: 1500,
// 	   loop: true,
// 	autoplayDisableOnInteraction: false
// });

// <!--REVIEW:  Initialize Swiper -->

var swiper = new Swiper('.swiper-container', {
    spaceBetween: 0,
    centeredSlides: true,
    loop: false,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// TODO: Working on Program Section
let programLinks = document.querySelectorAll('.program-link');

programLinks.forEach(button => {
    button.onclick = () => {
        switch (button.innerHTML) {
            case programLinks[0].innerHTML:
                console.log('link1');
                alert('link1');
                break;
            case programLinks[1].innerHTML:
                console.log('link2');
                alert('link2');
                break;
            case programLinks[2].innerHTML:
                console.log('link3');
                alert('link3');
                break;
            case programLinks[3].innerHTML:
                console.log('link4');
                alert('link4');
                break;
            default:
                break;
        }
    }
});

checkMobileSize(mobileScreenSize);
mobileScreenSize.addListener(checkMobileSize);
