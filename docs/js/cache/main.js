"use strict";

// Импортируем другие js-файлы
var timelineOpen = new mojs.Timeline({
  speed: 1.5
});
var timelineClose = new mojs.Timeline({
  speed: 2
});

var _strokeWidth;

var RADIUS = 15;
var hamburger = document.querySelector("#hamburger-open");
var spans = document.getElementsByClassName("spans");
var spanOne = document.querySelector("#spanOne");
var spanTwo = document.querySelector("#spanTwo");
var spanThree = document.querySelector("#spanThree");
var modalMenu = document.querySelector(".modal-menu");
var burst1 = new mojs.Burst({
  parent: hamburger,
  x: "50%",
  y: "50%",
  angle: {
    0: 90
  },
  radius: {
    30: 45
  },
  count: 3,
  children: {
    shape: "circle",
    radius: RADIUS,
    scale: {
      1: 0
    },
    fill: ["#ff4338", "#00b3e3", "#3cd52e"],
    duration: 2000,
    easing: "quad.out"
  }
});
var burst2 = new mojs.Burst({
  parent: hamburger,
  x: "50%",
  y: "50%",
  angle: {
    0: 90
  },
  radius: {
    30: 45
  },
  count: 3,
  children: {
    shape: "circle",
    radius: RADIUS,
    scale: {
      0: 1
    },
    strokeWidth: {
      1: 3
    },
    opacity: {
      1: 0
    },
    fill: "transparent",
    stroke: ["#ff4338", "#00b3e3", "#3cd52e"],
    duration: 2000,
    easing: "quad.out"
  }
}); // OPEN

var openBackground = new mojs.Shape({
  fill: "#111820",
  scale: {
    0: 8.5
  },
  radius: 200,
  delay: 1000,
  easing: "cubic.out",
  backwardEasing: "ease.out",
  duration: 2000,
  zIndex: 4
});
burst1.el.style.zIndex = 2; // check if the hamburger's been crossed

var cross = spanOne.classList.contains("white"); //timeline with burst and background open

timelineOpen.add(burst1, burst2, openBackground); //timeline with background close

timelineClose.add(openBackground); // football ajax

$(document).ready(function () {
  var url = 'https://www.thesportsdb.com/api/v1/json/1/all_leagues.php';
  var urlTeam = 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php';
  var urlData = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php'; // let leagues = [];

  $.ajax({
    url: url,
    type: 'GET'
  }).fail(function () {
    alert("error");
  }).done(function (response) {
    console.log(response);
    leagues = response.leagues;
  }).then(function () {
    // let leaguesArray = [];
    var leaguesArray = {
      url: "https://www.thesportsdb.com/api/v1/json/1/all_leagues.php",
      listLocation: "leagues",
      getValue: "strLeague",
      placeholder: "Write the league",
      list: {
        maxNumberOfElements: 10,
        showAnimation: {
          type: "fade",
          //normal|slide|fade
          time: 400,
          callback: function callback() {}
        },
        hideAnimation: {
          type: "slide",
          //normal|slide|fade
          time: 400,
          callback: function callback() {}
        },
        match: {
          enabled: true
        }
      }
    }; // for (let i = 0; i < leagues.length; i++) {
    //     leaguesArray.push(leagues[i].strLeague)
    // }

    console.log(leaguesArray);
    $("#league").easyAutocomplete(leaguesArray); // $("#league").autocomplete({
    //     source: leaguesArray,
    //     _renderItem: function (ul, item) {
    //         return $("<li>")
    //             .attr(["strLeague", "strLeagueAlternate"], 123)
    //             .append(item.label)
    //             .appendTo(ul);
    //     },
    //     change: function (event, ui) {
    //         // console.log(ui);
    //         League();
    //     }
    // });
  });
  $('#league').change(League); //    $('#datepicker').change(Calc);

  function League() {
    var newUrl = urlTeam + "?l=" + $('#league').val(); //        var count = $('#count').val();

    $.ajax({
      url: newUrl,
      type: 'GET'
    }).fail(function () {
      alert("error");
    }).done(function (response) {
      console.log(response);
      teams = response.teams;
    }).then(function () {
      // let teamsArray = [];
      // for (let i = 0; i < teams.length; i++) {
      //     teamsArray.push(teams[i].strTeam)
      // }
      var teamsArray = {
        url: function url() {
          return "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php" + "?l=" + $('#league').val();
        },
        listLocation: "teams",
        getValue: "strTeam",
        placeholder: "Write the team",
        list: {
          maxNumberOfElements: 10,
          showAnimation: {
            type: "fade",
            //normal|slide|fade
            time: 400,
            callback: function callback() {}
          },
          hideAnimation: {
            type: "slide",
            //normal|slide|fade
            time: 400,
            callback: function callback() {}
          },
          match: {
            enabled: true
          }
        }
      };
      console.log(teamsArray);
      $("#team").easyAutocomplete(teamsArray);
    });
  }

  function Team() {
    var newUrl2 = urlData + "?t=" + $('#team').val();
    $.ajax({
      url: newUrl2,
      type: 'GET'
    }).fail(function () {
      alert("error");
    }).done(function (response) {
      console.log(response);
      team = response.teams;
    }).then(function () {
      var buff = '';

      for (var i = 0; i < team.length; i++) {
        var el = team[i];
        buff += "\n                        <div class=\"card card-football text-center\">\n                        <div class=\"card-header\">\n                        <h3 class=\"card-title\">".concat(el.strAlternate, "</h5>\n                        </div>\n                        <div id=\"team\" class=\"card-body football-body\">\n                          <img class=\"football-logo\" src=\"").concat(el.strTeamBadge, "\">\n                          <p class=\"card-text\">The foundation Year - ").concat(el.intFormedYear, "</p>\n                          <p class=\"card-text football-text\">").concat(el.strDescriptionEN, "</p>\n                          <h5 class=\"card-title\">").concat(el.strStadium, "</h5>\n                          <img class=\"football-stad\" src=\"").concat(el.strStadiumThumb, "\">                      \n                          <p class=\"card-text football-text\">").concat(el.strStadiumDescription, "</p>\n                          <p class=\"card-text\">Stadium location - ").concat(el.strStadiumLocation, "</p>\n                          <div class=\"football-socials d-flex flex-wrap socials justify-content-center\">\n                <a href=\"https://").concat(el.strFacebook, "\" target=\"_blank\" class=\"football-socials__link socials__link socials--fb\">\n                    <i class=\"fab fa-facebook-f\"></i>\n                </a>\n                <a href=\"https://").concat(el.strTwitter, "\" target=\"_blank\" class=\"football-socials__link socials__link socials--tw\">\n                    <i class=\"fab fa-twitter\"></i>\n                </a>\n                <a href=\"https://").concat(el.strInstagram, "\" target=\"_blank\" class=\"football-socials__link socials__link socials--insta\">\n                    <i class=\"fab fa-instagram\"></i>\n                </a>\n                <a href=\"https://").concat(el.strYoutube, "\" target=\"_blank\" class=\"football-socials__link socials__link socials--insta\">\n                <i class=\"fab fa-youtube\"></i>\n                </a>\n                <a href=\"https://").concat(el.strWebsite, "\" target=\"_blank\" class=\"football-socials__link socials__link socials--insta\">\n                <i class=\"fas fa-jedi\"></i>\n                </a>\n            </div>\n                  ");
      }

      $('#result').html(buff);
    });
  }

  $('#team').change(Team);
});
$('.nav-link').click(function () {
  $('.football-body').toggleClass('vis-hidden');
});
$(document).ready(function () {
  $("#modal-menu").addClass('z-index-1');
});
$("#hamburger-open").click(function () {
  $(".modal-menu").toggleClass('show');

  if ($(".modal-menu").hasClass('show')) {
    timelineOpen.play();
    spanOne.classList.add("spanOneRotate");
    spanTwo.classList.add("spanTwoRotate"); // spanThree.classList.add("spanThreeHide");

    $('#spanThree').addClass('close');
  } else {
    timelineClose.playBackward();
    spanOne.classList.remove("spanOneRotate");
    spanTwo.classList.remove("spanTwoRotate"); // spanThree.classList.remove("spanThreeHide");

    $('#spanThree').removeClass('close');
  }

  if ($('#modal-menu').hasClass('show')) {
    $(".modal-menu").addClass('z-index-2');
    $(".modal-menu").removeClass('z-index-1');
  } else {
    $(".modal-menu").addClass('z-index-1');
    $(".modal-menu").removeClass('z-index-2');
  } // timelineClose.playBackward();
  // $("body, html").toggleClass('overflow');
  // spanOne.classList.remove("spanOneRotate");
  //  spanTwo.classList.remove("spanTwoRotate");
  //  spanThree.classList.remove("spanThreeHide");

}); // I've overwriten this part
//click on the hamburger
// hamburger.addEventListener("click", function(e) {
//   // check if the menu is a cross
//   var cross = spanOne.classList.contains("white");
//   modalMenu.classList.toggle("show");
//   if (cross) {
//     timelineClose.playBackward();
//     for (var i = 0; i < spans.length; i++) {
//       spans[i].classList.remove("white");
//     }
//     spanOne.classList.remove("spanOneRotate");
//     spanTwo.classList.remove("spanTwoRotate");
//     spanThree.classList.remove("spanThreeHide");
//   } else {
//     timelineOpen.play();
//     for (var i = 0; i < spans.length; i++) {
//       spans[i].classList.add("white");
//     }
//     spanOne.classList.add("spanOneRotate");
//     spanTwo.classList.add("spanTwoRotate");
//     spanThree.classList.add("spanThreeHide");
//   }
// });

var body = document.querySelector(body);
var html = document.querySelector(html);
var menuitem = document.querySelector(".menuitem");
$("#hamburger-open, .menuitem").click(function () {
  $('.list').toggleClass('close');
  $('.btn-link').toggleClass('close');
  $('.athletes, .players').toggleClass('close');
  $('.header-subtitle, .logo').toggleClass('close');
  $('.wrapper').toggleClass('left');
  $('body, html').toggleClass('overflow');
});
$(".menuitem").click(function () {
  $(".modal-menu").toggleClass('show');
  timelineClose.playBackward(); // $("body, html").toggleClass('overflow');

  spanOne.classList.remove("spanOneRotate");
  spanTwo.classList.remove("spanTwoRotate"); // spanThree.classList.remove("spanThreeHide");

  $('#spanThree').removeClass('close');
  $(".modal-menu").addClass('z-index-1');
  $(".modal-menu").removeClass('z-index-2');
});
!function (s) {
  $(".modal-menu,.logo__img").on("click", "a", function () {
    event.preventDefault();
    var e = s(this).attr("href"),
        o = s(e).offset().top + 10;
    s("html, body").stop().animate({
      scrollTop: o
    }, 1e3, "swing", function () {});
  });
}(jQuery); //Parallax Effect

$("html, body").scroll(function () {
  var st = $(this).scrollTop();
  $(".home__line").css("transform", "translate(0%, " + st / 40 + "%");
  $(".athletes-img").css("transform", "translate(0%, " + st / 300 + "%");
  $(".athletes-line").css("transform", "translate(0%, " + st / 50 + "%");
  $(".athletes-darkplus").css("transform", "translate(0%, -" + st / 10 + "%");
  $(".athletes-lightplus").css("transform", "translate(0%, -" + st / 10 + "%");
  $(".players-img").css("transform", "translate(0%, " + st / 300 + "%");
  $(".players-line").css("transform", "translate(0%, " + st / 40 + "%");
  $(".players-line2").css("transform", "translate(0%, " + st / 20 + "%");
  $(".players-darkplus").css("transform", "translate(0%, -" + st / 10 + "%");
  $(".players-darkplus2").css("transform", "translate(0%, -" + st / 10 + "%");
  $(".players-lightplus").css("transform", "translate(0%, -" + st / 10 + "%");
  $(".download__content--line").css("transform", "translate(0%, " + st / 300 + "%");
  $(".download__content--line2").css("transform", "translate(0%, " + st / 300 + "%");
});
!function () {
  "use strict";

  var e;
  window.addEventListener("load", function () {
    e = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 38.907467,
        lng: -77.059163
      },
      zoom: 15,
      disableDefaultUI: !0,
      styles: [{
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative.locality",
        "elementType": "geometry.fill",
        "stylers": [{
          "weight": 1
        }]
      }, {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }]
    }), new google.maps.Marker({
      position: {
        lat: 38.907467,
        lng: -77.059163
      },
      map: e,
      draggable: true,
      animation: google.maps.Animation.BOUNCE,
      icon: "./img/marker.png"
    });
  });
}();
$(".slick").slick({
  arrows: false,
  dots: true,
  appendDots: $('.active-at'),
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  slide: ".slide"
});
$(".slick-pl").slick({
  arrows: false,
  dots: true,
  appendDots: $('.active-pl'),
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  slide: ".slide-pl"
});
$(".glist--link").click(function () {
  $(".football").toggleClass('closing');
  $(".list").toggleClass('top150');
});