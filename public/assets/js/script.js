/*------------------------------------------------------------------
[ Clay News App Script File]

Project:    Clay News App
Version:    1
Starting Date: 1st Nov 2021
Last change Date:    --/--/----
Primary use:   Clay News App

-------------------------------------------------------------------*/

/* ----------------------------------------
1. Loader Code Starts Here
---------------------------------------- */

$(window).on("load", function () {
    $(".se-pre-con.main").fadeOut("slow");

    // inner page loader
     $(".se-pre-con1").fadeOut("slow");
}),


$(".navbar-toggler").click(function () {
    $("header").addClass("header-bg");
});

/* ----------------------------------------
Loader Code Ends Here
---------------------------------------- */

/* ----------------------------------------
2. Video Popup Code Start
---------------------------------------- */
   $(document).on("click", ".videoPop", function (event) {
        event.preventDefault();
        $("#glassAnimalsVideo").attr("src", $(this).attr('data-src'));
        $("#glassAnimals").modal('show');

    });
    $(document).on("click", "#modalVideoClose", function (event) {
        event.preventDefault();
        $("#glassAnimalsVideo").attr("src", '');
        $("#glassAnimals").modal('hide');
    });
/* ----------------------------------------
Video Popup Code Start
---------------------------------------- */

/**----------------------------------------
3. Button Color Code  Start
------------------------------------------- **/

const colorClassArray = [
    {id: "#EC5E78", name: "button-mandy"},
    {id: "#8BB0BA", name: "button-chino"},
    {id: "#C281D1", name: "button-orchid"},
    {id: "#ECBD34", name: "button-yellow"},
    {id: "#1987FF", name: "button-blue"},
]

/**--------------------------------------------------
 Button Color Code  Ends
 -------------------------------------------------- **/

/* --------------------------------------------------
4. Search Content on Clicking Search Bar Start
---------------------------------------------------- */

let host = "http://localhost/olam/app/";
if (window.location.host === "localhost") {
    host = 'http://localhost/olam/app/';
} else if (window.location.host === 'www.osumstudio.com') {
    host = 'https://www.osumstudio.com/signal-app/';
}
const HOST = host;
$(document).on("click", "#search-page", function () {

    window.location.href = HOST + 'search-page.html';
});
// video stop code
$(document).on("click", "#stopVideo", function (e) {
    e.preventDefault();
    $(".videoOnOf").attr('src', '');
    window.location.href = HOST + $(this).attr('href');
});

/** --------------------------------------------------
 Search Content on Clicking in Search Bar Start
 --------------------------------------------------- */
$(document).on("click",".follow-btn-auth",function() {
       if($(this).hasClass('followed-active')){
           $(this).html('FOLLOW');
           $(this).removeClass('followed-active');
       }else{
            $(this).addClass('followed-active');
             $(this).html('FOLLOWED');
       }
    });
$(document).on("click",".like-icon",function() {
        if($(this).hasClass('like-icon-active')){
             $(this).find('.like-txt').html('Like');
           $(this).removeClass('like-icon-active');
       }else{
            $(this).addClass('like-icon-active');
            $(this).find('.like-txt').html('Liked');
       }
});
$(document).on("click",".author-btn",function() {
       if($(this).hasClass('followed-active-auth')){
           $(this).html('FOLLOW');
           $(this).removeClass('followed-active-auth');
       }else{
            $(this).addClass('followed-active-auth');
             $(this).html('FOLLOWED');
       }
    });

$(document).on("click",".follow-btn-story",function() {
       if($(this).hasClass('add-following')){
           $(this).html('FOLLOWED');
           $(this).removeClass('add-following');
       }else{
            $(this).addClass('add-following');
             $(this).html('FOLLOWING');
       }
    });

/** -------------------------------------------------
 4. Check Cookies Start  Here
------------------------------------------------ **/

// Check Dark mode switch
$(document).ready(function () {
    if (typeof $.cookie('themeAppDarkMode') === 'undefined') {
        $.cookie("themeAppDarkMode", 0, {
            expires: 365
        });
        let cookieValue = $.cookie("themeAppDarkMode");
        $(".icon-day-night-icon").removeClass('active');
        $(".light-mode-logo").show();
        $(".dark-mode-logo").hide();
    } else {
        let cookieValue = $.cookie("themeAppDarkMode");
        if (cookieValue == 1) {
            $(".icon-day-night-icon").addClass('active');
            $(".main-home").addClass("night-mode-on");
            $(".light-mode-logo").hide();
            $(".dark-mode-logo").show();
        } else {
            $(this).removeClass('active');
            $(".main-home").removeClass("night-mode-on");
            $(".main-home").addClass("night-mode-off");
            $(".light-mode-logo").show();
            $(".dark-mode-logo").hide();
        }

    }

    // Check RTL Setting View

    if (typeof $.cookie('rtl-button') === 'undefined') {
        $.cookie("rtl-button", 0, {
            expires: 365
        });
        $(".main-home").addClass("rtl-off");
    } else {
        let cookieValue = $.cookie("rtl-button");
        if (cookieValue == 1) {
            $(".main-home").addClass("rtl-on");
        } else {
            $(".main-home").addClass("rtl-off");
        }

    }

    // Check Theme Button Color

    if (typeof $.cookie('themeAppButtonColorCode') === 'undefined') {
        let colorCode = '#1987FF';
        $.cookie("themeAppButtonColorCode", '#1987FF', {
            expires: 365
        });


        $(colorClassArray).each(function (index, value) {
            if (value.id == colorCode) {
                $(".main-home").addClass(value.name);
                $('.' + value.name + '-checked').prop('checked', true);
            } else {
                $(".main-home").removeClass(value.name);
                $('.' + value.name + '-checked').prop('checked', false);
            }
        });

    } else {
        let cookieValue = $.cookie("themeAppButtonColorCode");
        $(colorClassArray).each(function (index, value) {
            if (value.id == cookieValue) {
                $(".main-home").addClass(value.name);
                $('.' + value.name + '-checked').prop('checked', true);
            } else {
                $(".main-home").removeClass(value.name);
                $('.' + value.name + '-checked').prop('checked', false);
            }
        });
    }
});

/* ----------------------------------------
Check Cookies  Ends Here
---------------------------------------- */


/* ----------------------------------------
5. Slider Code Starts Here
---------------------------------------- */

$('.banner-carousel').flickity({
    wrapAround: false,
    prevNextButtons: false,
    pageDots: true,
    accessibility: true,
    autoPlay: 3000,
    fade: true,
    imagesLoaded: true
});
/* ----------------------------------------
Slider Code Ends Here
---------------------------------------- */


/* ----------------------------------------
6. Load More Code Starts Here
---------------------------------------- */

$("#more-listing").hide();

function loadMore() {
    $("#more-listing").show();
    $('.load-more-btn').hide();
}

/* ----------------------------------------
Load More Code Ends Here
---------------------------------------- */


/* ---------------------------------------------
7. Set the Dark Mode Start Here
---------------------------------------------- */

$(document).on("click", ".icon-day-night-icon", function () {

    if ($(".icon-day-night-icon").hasClass("active")) {
        $(this).removeClass('active');
        $(".main-home").removeClass("night-mode-on");
        $(".main-home").addClass("night-mode-off");
        if (typeof $.cookie('themeAppDarkMode') === 'undefined') {
            $.cookie("themeAppDarkMode", 0, {
                expires: 365
            });
        } else {

            $.removeCookie("themeAppDarkMode");
            $.cookie("themeAppDarkMode", 0, {
                expires: 365
            });
        }
        $(".light-mode-logo").show();
        $(".dark-mode-logo").hide();

    } else {
        $(this).addClass('active');
        $(".main-home").addClass("night-mode-on");
        if (typeof $.cookie('themeAppDarkMode') === 'undefined') {

            $.cookie("themeAppDarkMode", 1, {
                expires: 365
            });
        } else {

            $.removeCookie("themeAppDarkMode");
            $.cookie("themeAppDarkMode", 1, {
                expires: 365
            });
        }
        $(".light-mode-logo").hide();
        $(".dark-mode-logo").show();
    }

});

// Set RTL Mode
$(document).on("click", ".rtl-btn", function () {
    if ($(".main-home").hasClass('rtl-off')) {
        if (typeof $.cookie('rtl-button') === 'undefined') {
            $.cookie("rtl-button", 1, {
                expires: 365
            });
        } else {
            $.removeCookie("rtl-button");
            $.cookie("rtl-button", 1, {
                expires: 365
            });
        }
        $(".main-home").removeClass("rtl-off");
        $(".main-home").addClass("rtl-on");
    } else {
        if (typeof $.cookie('rtl-button') === 'undefined') {
            $.cookie("rtl-button", 0, {
                expires: 365
            });
        } else {
            $.removeCookie("rtl-button");
            $.cookie("rtl-button", 0, {
                expires: 365
            });
        }
        $(".main-home").removeClass("rtl-on");
        $(".main-home").addClass("rtl-off");
    }
});


/* ----------------------------------------------------
 Set the Dark Mode End Here
---------------------------------------------------- */


/* ---------------------------------------------------
8. Set colore Code for  button and links Start Here
--------------------------------------------------- */

$(document).on("click", ".choose-color", function () {
    let colorCode = $(this).attr('data-color');
    colorCode = colorCode.trim();
    $(colorClassArray).each(function (index, value) {
        if (value.id == colorCode) {
            $(".main-home").addClass(value.name);
            $('.' + value.name + '-checked').prop('checked', true);
        } else {
            $(".main-home").removeClass(value.name);
            $('.' + value.name + '-checked').prop('checked', false);
        }
    });
    if (typeof $.cookie('themeAppButtonColorCode') === 'undefined') {
        $.cookie("themeAppButtonColorCode", colorCode, {
            expires: 365
        });
    } else {
        $.removeCookie("themeAppButtonColorCode");
        $.cookie("themeAppButtonColorCode", colorCode, {
            expires: 365
        });
    }
    $(".main-home").attr("color-code", colorCode);
});

/* ----------------------------------------------------
Set colore Code for  button and links Ends Here
-------------------------------------------------- */


/**----------------------------------------------
9. WeatherPage Owl Slider Strat Here
------------------------------------------- **/

var owl = $('.all-search .owl-carousel');
if ($('.all-search .owl-carousel').length) {

    owl.owlCarousel({
        loop: true,
        nav: true,
        margin: 10,
        smartSpeed: 250,
        responsive: {
            0: {
                items: 5
            },
            600: {
                items: 5
            },
            960: {
                items: 5
            },
            1200: {
                items: 5
            }
        }
    });

    owl.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            owl.trigger('prev.owl');
        } else {
            owl.trigger('next.owl');
        }
        e.preventDefault();
    });
}

/**-------------------------------------------------
 Home Page Weather Owl Slider Ends
 ------------------------------------------------ */


/**-------------------------------------------------
 10. News Tab Owl Slider Start Here
 ------------------------------------------------ */

var owl = $('.news-tab .owl-carousel');
if ($('.news-tab .owl-carousel').length) {
    owl.owlCarousel({
        loop: true,
        nav: true,
        margin: 5,
        smartSpeed: 250,
        responsive: {
            0: {
                items: 6
            },
            600: {
                items: 6
            },
            960: {
                items: 6
            },
            1200: {
                items: 6
            }
        }
    });
}

/**------------------------------------------------
News Tab Owl Slider Ends Here
------------------------------------------------ */


/*-----------------------------------------------
11. Load More StoryNews Content Start
--------------------------------------------- */

$(".readmore-link").click(function (e) {
    var isExpanded = $(e.target).hasClass("expand");
    $(".readmore.expand").removeClass("expand");
    $(".readmore-link.expand").removeClass("expand");
    if (!isExpanded) {
        $(e.target).parent(".readmore").addClass("expand");
        $(e.target).addClass("expand");
    }
});

/*-----------------------------------------------
Load More StoryNews Content Ends Here
--------------------------------------------- */

/*-----------------------------------------------
12. Submit Form Code Strat
--------------------------------------------- */

$('.contact-us-form').submit(function(e){
    e.preventDefault();
    $(".success-message").show();
    setTimeout(function() {
        window.location.reload(true);
    }, 2000);
});

/*-----------------------------------------------
12. Submit Form Code Ends
--------------------------------------------- */


/* ----------------------------------------
Video Player Code Start
---------------------------------------- */

$("img").click(function() {
  var video = $(this).parent().find('video');
  if (video.get(0).paused) {
    video.get(0).play();
    $(this).hide();
} else {
    video.get(0).pause();
    $(this).show();
  }
});

$("video").click(function() {
  //console.log(this);
  if (this.paused) {
    this.play();
    $(this).parent().find('img').hide();
  } else {
    this.pause();
    $(this).parent().find('img').show();
  }
});
$(document).ready(function (){
$("video").click();
});
/* ----------------------------------------
Video Player Code Ends
---------------------------------------- */
