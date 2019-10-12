function myFunction(x) {
    if (x.matches) { // If media query matches
        $(".recruitment").click(function () {
            $(".recruitment-link-container").slideToggle("swing");
        });

        $(document).click(function (e) {
            if (!$(e.target).hasClass('recruitment') && !$(e.target).hasClass('vacancy')) {
                $(".recruitment-link").hide(500);
            }
        });
    }
}

var x = window.matchMedia("(max-width: 972px)");
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes