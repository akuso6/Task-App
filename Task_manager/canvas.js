// ligth & night mode func
document.getElementById("toggle").addEventListener("click", function () {
  document.getElementsByTagName("body")[0].classList.toggle("dark-theme");
});
// Creating What & Why element
let what = (document.createElement("span").innerHTML = "WHAT:".trim());
let why = (document.createElement("span").innerHTML = "WHY:".trim());

// Creating Do & Me element

const Do = (document.createElement("span").innerHTML = "DO");
const Me = (document.createElement("span").innerHTML = "ME!");

let input = document.querySelectorAll(".input");
let btn = document.querySelectorAll(".btn");
//get element id
getLabel = function (ele) {
  let id = ele.innerHTML;

  return id;
};

//Creating canvas
let lastHow = null;

let giftWallpaper = document.getElementById("gift_wallpaper");
let gift_wallpaper_phone = document.getElementById("gift_wallpaper_phone");
let gift_wallpaper_desktop = document.getElementById("gift_wallpaper_desktop");
let canvas = document.createElement("canvas");
canvas.width = window.screen.width * window.devicePixelRatio;
canvas.height = window.screen.height * window.devicePixelRatio;

let ctx = canvas.getContext("2d");

if (giftWallpaper) {
  let gw_text = detectmob() ? gift_wallpaper_phone : gift_wallpaper_desktop;
  giftWallpaper.innerHTML = gw_text.innerHTML;

  //variables
  let wallpaperLink = document.getElementById("wallpaper_link");

  let gift_wallpaper_filename = document.getElementById(
    "gift_wallpaper_filename"
  );

  let wallpaper_image = document.getElementById("wallpaper_image");

  let WALLPAPER_CHANGE = true;

  let changebtn = document.getElementById("change-btn");
  //Add what task
  let addWhatBtn = document.getElementById("add_what");
  addWhatBtn.addEventListener("click", add_what);
  function add_what() {
    let inputWhat = document.getElementById("input_what").value;
    let inputWords = inputWhat.split(" ");
    for (let i = 0; i < inputWords.length; i++) {
      inputWords[i] =
        inputWords[i][0].toLocaleUpperCase() + inputWords[i].substr(1);
    }
    let result = inputWords.join(" ");
    what += result;
    inputWhat = " ";
  }

  //Add why task

  let addWhyBtn = document.getElementById("add_why");
  addWhyBtn.addEventListener("click", add_why);
  function add_why() {
    let inputWhy = document.getElementById("input_why").value;
    let inputWords = inputWhy.split(" ");
    for (let i = 0; i < inputWords.length; i++) {
      inputWords[i] =
        inputWords[i][0].toLocaleUpperCase() + inputWords[i].substr(1);
    }
    let result = inputWords.join(" ");
    why += result;
  }
  //Change canva Bg color
  changebtn.addEventListener("click", changebg);
  function changebg() {
    let changeBG = document.getElementById("change-bg");
    window.Value = changeBG.value;

    ctx.fillStyle = window.Value;

    for (let i = 0; i < input.length; i++) {
      let currenEl = input[i];
      currenEl.style.borderColor = window.Value;
      currenEl.style.color = window.Value;
    }

    for (let i = 0; i < btn.length; i++) {
      const element = btn[i];
      element.style.borderColor = window.Value;
      element.style.color = window.Value;
    }
  }
  changebg();

  //change taskTextColor getElement variables

  let taskColorInput = document.getElementById("change-task_txt_color");
  let taskColorBtn = document.getElementById("btn-change-text-color");

  //change taskTextColor func
  taskColorBtn.addEventListener("click", changeTaskColor);
  function changeTaskColor() {
    window.taskColorValue = taskColorInput.value;
  }
  changeTaskColor();

  //turning image to downloadable file
  setInterval(function () {
    if (WALLPAPER_CHANGE) {
      let canvasMake = makeWallpaper();
      let dataURL = canvasMake.toDataURL();

      wallpaperLink.href = dataURL;
      wallpaperLink.download = getLabel(gift_wallpaper_filename);
      wallpaper_image.src = dataURL;
    }
  }, 1000);
}
// check to see device type
function detectmob() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}

// make image

let wallpaperBGImage = new Image();
wallpaperBGImage.src = "./pics/wallpaper.png";

function makeWallpaper() {
  wallpaperBGImage.style.boxShadow = "10px 20px 30px blue";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  let SIZE = 500;
  let squareSize = Math.min(canvas.width, canvas.height);

  let scale = (squareSize / SIZE) * 0.8;
  ctx.scale(scale, scale);
  ctx.translate(-SIZE / 2, -SIZE / 2);

  //Square
  ctx.drawImage(wallpaperBGImage, 0, 0, SIZE, SIZE);

  //draw text

  ctx.textAlign = "center";
  ctx.fillStyle = window.taskColorValue;
  ctx.font = "40px PatrickHand, Helvetica, Arial";
  ctx.fillText(what, 250, 400);
  ctx.fillText(why, 230, 450);

  // add text to what

  // draw DO Me

  ctx.font = "80px PatrickHand, Arial";
  ctx.fillStyle = window.Value;
  ctx.fillText(Do, 400, 190);
  ctx.fillText(Me, 400, 270);

  ctx.restore();

  return canvas;
}

makeWallpaper();
