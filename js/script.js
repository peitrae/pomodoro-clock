let breakTime = false;
let counting = null;
let startLoader = null;
const bell = new Audio("https://firebasestorage.googleapis.com/v0/b/personal-6013f.appspot.com/o/pomodoro%2Fbell.mp3?alt=media&token=24609889-ac5b-4c6a-9b43-1f8c891c38ed");

// Default Value
$("#count-bl").html(5);
$("#count-sl").html(25);
$("#minutes").html(25);
$("#seconds").html("00");

const addSession = () => {
  const plus = parseInt($("#count-sl").html()) + 1;
  $("#count-sl").html(plus);
  if (!breakTime) $("#minutes").html(plus);
};

const substractSession = () => {
  const substract = parseInt($("#count-sl").html()) - 1;
  $("#count-sl").html(substract);
  if (!breakTime) $("#minutes").html(substract);

  if ($("#count-sl").html() === "1") $("#substract-sl").addClass("disable");
};

const addBreak = () => {
  const plus = parseInt($("#count-bl").html()) + 1;
  $("#count-bl").html(plus);
  if (breakTime) $("#minutes").html(plus);
};

const substractBreak = () => {
  const substract = parseInt($("#count-bl").html()) - 1;
  $("#count-bl").html(substract);
  if (breakTime) $("#minutes").html(substract);

  if ($("#count-bl").html() === "1") $("#substract-bl").addClass("disable");
};

const countDown = () => {
  if ($("#seconds").html() === "00") {
    $("#seconds").html(60);
    $("#minutes").html(parseInt($("#minutes").html()) - 1);
  }
  const substract = parseInt($("#seconds").html()) - 1;

  $("#seconds").html(substract > 9 ? substract : `0${substract}`);

  if ($("#minutes").html() === "0" && $("#seconds").html() === "00")
    countingEnd();
};

const startCount = () => {
  counting = setInterval(countDown, 1000);
  startLoader = setInterval(loaderStart, 1000);
  $("#play").css("display", "none");
  $("#pause").css("display", "initial");
};

const stopCount = () => {
  clearInterval(counting);
  clearInterval(startLoader);
  $("#pause").css("display", "none");
  $("#play").css("display", "initial");
};

const countingEnd = () => {
  stopCount();
  bell.play();
  if (breakTime) {
    breakTime = false;
    $("#minutes").html($("#count-sl").html());
  } else {
    breakTime = true;
    $("#minutes").html($("#count-bl").html());
  }
  $(".timer").css(
    "background-image",
    `linear-gradient(90deg, #333 50%, transparent 50%),
    linear-gradient(270deg, #333 50%, transparent 50%)`
  );
};

const loaderStart = () => {
  const total = parseInt($("#count-sl").html()) * 60;
  const progress =
    parseInt($("#minutes").html()) * 60 + parseInt($("#seconds").html());
  const percentage = progress / total;
  const deg = 360 * percentage - 90;

  if (deg <= -90) clearInterval(startLoader);

  $(".timer").css(
    "background-image",
    `linear-gradient(${deg <= 90 ? 270 : 90}deg,
       ${deg <= 90 ? "#575757" : "#333"} 50%, transparent 50%), 
      linear-gradient(${deg}deg, #333 50%, transparent 50%)`
  );
};

$("#substract-bl").click(() =>
  $("#count-bl").html() === "1" ? null : substractBreak()
);

$("#add-bl").click(() => {
  addBreak();
  if ($("#substract-bl").hasClass("disable"))
    $("#substract-bl").removeClass("disable");
});

$("#substract-sl").click(() =>
  $("#count-sl").html() === "1" ? null : substractSession()
);

$("#add-sl").click(() => {
  addSession();
  if ($("#substract-sl").hasClass("disable"))
    $("#substract-sl").removeClass("disable");
});

$("#play").click(() => startCount());

$("#pause").click(() => stopCount());
