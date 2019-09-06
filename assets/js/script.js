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
    }
    else {
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
    var field4 = $("#question").val();
    var field5 = $("#message").val();
    var field6 = $("#email").val();
    var field7 = $("#address").val();

    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLScxFD1DDFzIOfxt4TVJNbcNBGxrItc7vho4cpz_CaQ3D2cZbA/formResponse",
        data: { "entry.1154047464": field1, "entry.2068507921": field2, "entry.1825414465": field3, "entry.479585436": field4, "entry.479585436": field5, "entry.1229940529": field6, "entry.1192885676": field7 },
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

checkMobileSize(mobileScreenSize);
mobileScreenSize.addListener(checkMobileSize);