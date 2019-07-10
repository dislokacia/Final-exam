var timelineOpen = new mojs.Timeline({ speed: 1.5 });
var timelineClose = new mojs.Timeline({ speed: 2 });

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
  angle: { 0: 90 },
  radius: { 30: 45 },
  count: 3,
  children: {
    shape: "circle",
    radius: RADIUS,
    scale: { 1: 0 },
    fill: ["#ff4338", "#00b3e3", "#3cd52e"],
    duration: 2000,
    easing: "quad.out"
  }
});

var burst2 = new mojs.Burst({
  parent: hamburger,
  x: "50%",
  y: "50%",
  angle: { 0: 90 },
  radius: { 30: 45 },
  count: 3,
  children: {
    shape: "circle",
    radius: RADIUS,
    scale: { 0: 1 },
    strokeWidth: { 1: 3 },
    opacity: { 1: 0 },
    fill: "transparent",
    stroke: ["#ff4338", "#00b3e3", "#3cd52e"],
    duration: 2000,
    easing: "quad.out"
  }
});

// OPEN
var openBackground = new mojs.Shape({
  fill: "#111820",
  scale: { 0: 8.5 },
  radius: 200,
  delay: 1000,
  easing: "cubic.out",
  backwardEasing: "ease.out",
  duration: 2000,
  zIndex: 4
});

burst1.el.style.zIndex = 2;

// check if the hamburger's been crossed
let cross = spanOne.classList.contains("white");

//timeline with burst and background open
timelineOpen.add(burst1, burst2, openBackground);
//timeline with background close
timelineClose.add(openBackground);

$( "#hamburger-open" ).click(function() {
  $(".modal-menu").toggleClass('show');
  if ($(".modal-menu").hasClass('show')) {
    timelineOpen.play();
    spanOne.classList.add("spanOneRotate");
    spanTwo.classList.add("spanTwoRotate");
    spanThree.classList.add("spanThreeHide");
  } else {
    timelineClose.playBackward();
    spanOne.classList.remove("spanOneRotate");
    spanTwo.classList.remove("spanTwoRotate");
    spanThree.classList.remove("spanThreeHide");
  }
  // timelineClose.playBackward();
  // $("body, html").toggleClass('overflow');
  // spanOne.classList.remove("spanOneRotate");
  //   spanTwo.classList.remove("spanTwoRotate");
  //   spanThree.classList.remove("spanThreeHide");
});

// I've overwriten this part

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

$( "#hamburger-open, .menuitem" ).click(function() {
  $('.list').toggleClass('close');
  $('.btn-link').toggleClass('close');
  $('.athletes, .players').toggleClass('close');
  $('.wrapper').toggleClass('left');
  $('body, html').toggleClass('overflow');
});

$( ".menuitem" ).click(function() {
  $(".modal-menu").toggleClass('show');
  timelineClose.playBackward();
  // $("body, html").toggleClass('overflow');
  spanOne.classList.remove("spanOneRotate");
    spanTwo.classList.remove("spanTwoRotate");
    spanThree.classList.remove("spanThreeHide");
});



! function (s){
  $(".modal-menu,.logo__img").on("click", "a", function () {
      event.preventDefault();
      var e = s(this).attr("href"),
          o = s(e).offset().top + 20;
      s("html, body").stop().animate({
          scrollTop: o
      }, 1e3, "swing", function () {})
  })
}(jQuery);

//Parallax Effect

$("html, body").scroll(function () {
  var st = $(this).scrollTop();

  $(".athletes-img").css("transform" , "translate(0%, " + st/300 + "%");
  $(".athletes-line").css("transform" , "translate(0%, " + st/300 + "%");
  $(".athletes-darkplus").css("transform" , "translate(0%, " + st/100 + "%");
  $(".athletes-lightplus").css("transform" , "translate(0%, " + st/150 + "%");

  $(".players-img").css("transform" , "translate(0%, " + st/300 + "%");
  $(".players-line").css("transform" , "translate(0%, " + st/300 + "%");
  $(".players-line2").css("transform" , "translate(0%, " + st/300 + "%");
  $(".players-darkplus").css("transform" , "translate(0%, " + st/100 + "%");
  $(".players-darkplus2").css("transform" , "translate(0%, " + st/100 + "%");
  $(".players-lightplus").css("transform" , "translate(0%, " + st/150 + "%");

});

