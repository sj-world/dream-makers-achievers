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
    navContainer.style.left = "-155px";
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
    }
    else {
        navContainer.style.left = "-155px";
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
    document.querySelector('nav').style.left = "-155px";

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

// eBooks Email Submission

const eBooksMailForm = document.querySelector('#eBooksMail');
eBooksMailForm.addEventListener('submit', function (e) {
    PostToEbooksDataBase();
    e.preventDefault();    //stop form from submitting default
    e.target.eBooksEmailInput.value = '';

    // alert box after form submission
    alert('Thank You for Mailing us 😄 All eBooks will be send to your email within 24 hours!')
})

function PostToEbooksDataBase() {
    const eBooksEmailInput = $("#eBooksEmailInput").val();

    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfDDXseSzx8xV8R_zip-_cAYMFOus98K45cfN_mjjh-mler_Q/formResponse",
        data: { "emailAddress": eBooksEmailInput, },
        type: "POST",
        dataType: "xml",
    });
    return;
}

// REVIEW: Form submission using ajax

function postToDataBase() {

    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var mobile = $("#mobile").val();
    var question = $("#question").val();
    var message = $("#message").val();
    var email = $("#email").val();
    var address = $("#address").val();

    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLScxFD1DDFzIOfxt4TVJNbcNBGxrItc7vho4cpz_CaQ3D2cZbA/formResponse",
        data: { "entry.1154047464": firstName, "entry.2068507921": lastName, "entry.1825414465": mobile, "entry.479585436": question, "entry.479585436": message, "entry.1229940529": email, "entry.1192885676": address },
        type: "POST",
        dataType: "xml",
        // success: function () {
        //     console.log('your message has been sent ..!')
        // },

        // error: function () {
        //     console.log('problem with server ..!')
        // }
    });
    return;
}

var form = document.querySelector('#form');
form.addEventListener("submit", function (e) {
    postToDataBase();

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
    speed: 1000,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    autoplay: {
        delay: 5000,
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

// TODO: Program Section
let programLinks = document.querySelectorAll('.program-link');
var firstLink = document.querySelector('.first');
firstLink.style.backgroundColor = "#007EB7";
firstLink.style.color = "white";

const secondLink = document.querySelector('.second');
const thirdLink = document.querySelector('.third');
const fourthLink = document.querySelector('.fourth');

// Requiring Program boxes
const ProgramfirstBox = document.querySelector('.program-link-1-container');
const ProgramSecondBox = document.querySelector('.program-link-2-container');
const ProgramThirdBox = document.querySelector('.program-link-3-container');
const ProgramFourthBox = document.querySelector('.program-link-4-container');

// Program boxes default Setting
ProgramSecondBox.style.display = "none";
ProgramThirdBox.style.display = "none";
ProgramFourthBox.style.display = "none";

firstLink.onclick = function () {
    // first link
    firstLink.style.backgroundColor = "#007EB7";
    firstLink.style.color = "white";
    firstLink.style.border = "1px solid #007EB7";

    // second link
    secondLink.style.backgroundColor = "white";
    secondLink.style.color = "#007EB7";

    // third link color
    thirdLink.style.backgroundColor = "white";
    thirdLink.style.color = "#007EB7";

    // fourth link
    fourthLink.style.backgroundColor = "white";
    fourthLink.style.color = "#007EB7";

    // Program display
    ProgramfirstBox.style.display = "block";
    ProgramSecondBox.style.display = "none";
    ProgramThirdBox.style.display = "none";
    ProgramFourthBox.style.display = "none";
}

secondLink.onclick = function () {
    // first link
    firstLink.style.backgroundColor = "white";
    firstLink.style.color = "#007EB7";

    // second link
    secondLink.style.backgroundColor = "#007EB7";
    secondLink.style.color = "white";

    // third link color
    thirdLink.style.backgroundColor = "white";
    thirdLink.style.color = "#007EB7";

    // fourth link
    fourthLink.style.backgroundColor = "white";
    fourthLink.style.color = "#007EB7";

    // Program display
    ProgramfirstBox.style.display = "none";
    ProgramSecondBox.style.display = "block";
    ProgramThirdBox.style.display = "none";
    ProgramFourthBox.style.display = "none";
}

thirdLink.onclick = function () {
    // first link
    firstLink.style.backgroundColor = "white";
    firstLink.style.color = "#007EB7";

    // second link
    secondLink.style.backgroundColor = "white";
    secondLink.style.color = "#007EB7";

    // third link color
    thirdLink.style.backgroundColor = "#007EB7";
    thirdLink.style.color = "white";

    // fourth link
    fourthLink.style.backgroundColor = "white";
    fourthLink.style.color = "#007EB7";

    // Program display
    ProgramfirstBox.style.display = "none";
    ProgramSecondBox.style.display = "none";
    ProgramThirdBox.style.display = "block";
    ProgramFourthBox.style.display = "none";
}

fourthLink.onclick = function () {
    // first link
    firstLink.style.backgroundColor = "white";
    firstLink.style.color = "#007EB7";

    // second link
    secondLink.style.backgroundColor = "white";
    secondLink.style.color = "#007EB7";

    // third link color
    thirdLink.style.backgroundColor = "white";
    thirdLink.style.color = "#007EB7";

    // fourth link
    fourthLink.style.backgroundColor = "#007EB7";
    fourthLink.style.color = "white";

    // Program display
    ProgramfirstBox.style.display = "none";
    ProgramSecondBox.style.display = "none";
    ProgramThirdBox.style.display = "none";
    ProgramFourthBox.style.display = "block";
}

// Counsellers section

function checkCity() {
    var x = document.getElementById("city");
    var cityName = x.selectedIndex;
    var counsellersCity = document.getElementById("counsellers_city");
    counsellersCity.innerHTML = x.options[cityName].text;

    // If Kanpur
    const counsellers_in_kanpur = document.querySelector('.counsellers_in_kanpur');
    if (x.options[cityName].text == 'Kanpur') {
        counsellers_in_kanpur.style.display = "block";
    } else {
        counsellers_in_kanpur.style.display = "none";
    }
    // If Allahabad
    const counsellers_in_allahabad = document.querySelector('.counsellers_in_allahabad');
    if (x.options[cityName].text == 'Allahabad') {
        counsellers_in_allahabad.style.display = "block";
    } else {
        counsellers_in_allahabad.style.display = "none";
    }
    // If Delhi
    const counsellers_in_delhi = document.querySelector('.counsellers_in_delhi');
    if (x.options[cityName].text == 'Delhi') {
        counsellers_in_delhi.style.display = "block";
    } else {
        counsellers_in_delhi.style.display = "none";
    }
    // If Lucknow
    const counsellers_in_lukhnow = document.querySelector('.counsellers_in_lukhnow');
    if (x.options[cityName].text == 'Lucknow') {
        counsellers_in_lukhnow.style.display = "block";
    } else {
        counsellers_in_lukhnow.style.display = "none";
    }
    // If lakhimpur kheri
    const counsellers_in_lakhimpur = document.querySelector('.counsellers_in_lakhimpur');
    if (x.options[cityName].text == 'Lakhimpur Kheri') {
        counsellers_in_lakhimpur.style.display = "block";
    } else {
        counsellers_in_lakhimpur.style.display = "none";
    }
    // If Gorakhpur
    const counsellers_in_gorakhpur = document.querySelector('.counsellers_in_gorakhpur');
    if (x.options[cityName].text == 'Gorakhpur') {
        counsellers_in_gorakhpur.style.display = "block";
    } else {
        counsellers_in_gorakhpur.style.display = "none";
    }
    // If Gorakhpur
    const counsellers_in_jaunpur = document.querySelector('.counsellers_in_jaunpur');
    if (x.options[cityName].text == 'Jaunpur') {
        counsellers_in_jaunpur.style.display = "block";
    } else {
        counsellers_in_jaunpur.style.display = "none";
    }
}

// Gallery framework

(function () {
    Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.5.7/themes/classic/galleria.classic.min.js');
    Galleria.run('.galleria', {
        transition: 'fade',
        imageCrop: true,
        autoplay: 8000,
        lightbox: true,
        queue: true,
        responsive: true,
        variation: 'light'
    });
}());

// WhatsApp Share

waShBtn = function () {
    if (this.isIos === true) {
        var b = [].slice.call(document.querySelectorAll(".wa_btn"));
        for (var i = 0; i < b.length; i++) {
            var t = b[i].getAttribute("data-text");
            var u = b[i].getAttribute("data-href");
            var o = b[i].getAttribute("href");
            var at = "?text=" + encodeURIComponent(t);
            if (t) {
                at += "%20%0A";
            }
            if (u) {
                at += encodeURIComponent(u);
            } else {
                at += encodeURIComponent(document.URL);
            }
            b[i].setAttribute("href", o + at);
            b[i].setAttribute("target", "_top");
            b[i].setAttribute("target", "_top");
            b[i].className += ' activeWhatsapp';
        }
    }
}

waShBtn.prototype.isIos = ((navigator.userAgent.match(/Android|iPhone/i) && !navigator.userAgent.match(/iPod|iPad/i)) ? true : false);

var theWaShBtn = new waShBtn();
// WhatsApp Share End

// Event Program Notification

const eventMainBox = document.querySelector('.event-main-box');
const eventProgramContent = document.querySelector('.event-program-content');
const eventNumber = document.querySelector('.event-number');
const eventBox = document.querySelector('.event-box');

document.querySelector('.event-number').innerHTML = document.querySelectorAll('.evnet-program').length;

eventMainBox.onclick = function () {
    $('.event-program-content').toggle(900);

    if (eventBox.style.right == '-17px' || eventBox.style.right == '0px') {
        openEventMainBox();
    }
    else {
        closeEvent();
    }
    console.log(eventBox.style.right);
};

function openEventMainBox() {
    $(eventNumber).animate({
        right: 305
    }, 900),
        $(eventBox).animate({
            right: 273
        }, 900)
    document.body.style.overflowY = "hidden";
    return;
}

const closeEvent = function () {
    $(eventNumber).animate({
        right: 14.9
    }, 900),
        $(eventBox).animate({
            right: -17
        }, 900)
    document.body.style.overflowY = "scroll";
    return;
}

// owl Carousel for Blog
// todo: use this framework letter when you will work on blog, till keep it comment out !!!
// $('.owl-carousel').owlCarousel({
//     loop: true,
//     margin: 10,
//     nav: true,
//     responsive: {
//         0: {
//             items: 1
//         },
//         600: {
//             items: 3
//         },
//         1000: {
//             items: 5
//         }
//     }
// });

// Event Notifiaction (API) Asynchronous

// For little Screen
checkMobileSize(mobileScreenSize);
mobileScreenSize.addListener(checkMobileSize);