const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const windowWidth = window.innerWidth;
const frameCount = 400;
let screen = "lg_c";
let extension = "jpg";
if (windowWidth < 576) {
  screen = "sm_c"; // Extra Small
} else if (windowWidth < 769) {
  screen = "md_c"; // Small
} else if (windowWidth < 992) {
  screen = "lg_c"; // Medium
} else if (windowWidth < 1200) {
  screen = "xl_c"; // Large
} else if (windowWidth < 1400) {
  screen = "xxl_c"; // Extra Large
} else {
  screen = "xxxl_c"; // Larger than 1400 pixels
  extension="png"
}

console.log("Screen size: " + screen);



const currentFrame = (index) => {
  return `https://cdn.jsdelivr.net/gh/mgohar/wwd_img_sequence_anim@1.0.2/Viewport/RG%20(${index}).${extension}`
};

const img = new Image();
console.log(currentFrame(1));
img.src = currentFrame(1);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Calculate aspect ratios
var imageAspectRatio = img.width / img.height;
var canvasAspectRatio = canvas.width / canvas.height;

// Calculate scaling factors
var scaleWidth = 1;
var scaleHeight = 1;

if (imageAspectRatio > canvasAspectRatio) {
    // Image is wider than the canvas
    scaleWidth = canvas.width / img.width;
} else {
    // Image is taller or has the same aspect ratio as the canvas
    scaleHeight = canvas.height / img.height;
}

// Calculate the new dimensions to cover the canvas
var newWidth = img.width * scaleWidth;
var newHeight = img.height * scaleHeight;


img.onload = function () {
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
};

const updateImage = (index) => {
  console.log(currentFrame(index));
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
};

const specificPointsInit = getSectionScrollPoints("start_wwd_amin");
const wwdaminInit = document.getElementById("hero-lightpass");
const canvas_wwd_box = document.getElementById("canvas_wwd_box");
const wwdaminCanvas = document.getElementById("hero-lightpass");
console.log("wwdaminCanvas.innerHeight",wwdaminCanvas.height)
// canvas_wwd_box.style.height=`${wwdaminCanvas.height-100}px`
wwdaminInit.style.top = `0px`;
window.addEventListener("scroll", () => {
  const specificPoints = getSectionScrollPoints("start_wwd_amin");
  if (
    
    html.scrollTop >= specificPoints.start &&
    html.scrollTop <= specificPoints.end
  ) {
    const scrollTop = html.scrollTop - specificPoints.start;
    const maxScrollTop = specificPoints.end;
    const scrollFraction = scrollTop / (maxScrollTop - specificPoints.start);
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    // if (specificPoints) {
    //   console.log("Scroll start point:", specificPoints.start);
    //   console.log("Scroll bottom point:", specificPoints.end);
    // }

    console.log("scrollTop:", scrollTop);
    console.log("html.scrollHeight:", html.scrollHeight);
    console.log("window.innerHeight:", window.innerHeight);
    console.log("maxScrollTop:", maxScrollTop);
    console.log("scrollFraction:", scrollFraction);
    console.log("current Scroll:", html.scrollTop);
    console.log("Start:", specificPoints.start);
    console.log("End:", specificPoints.end);
    console.log("frameIndex:", frameIndex);

    requestAnimationFrame(() => updateImage(frameIndex + 1));
  }
  if (
    html.scrollTop >= specificPoints.start &&
    html.scrollTop <= specificPoints.end
  ) {
    const wwdamin = document.getElementById("hero-lightpass");

    wwdamin.style.position = "fixed";
    wwdamin.style.top = "0px";
  } else if (html.scrollTop >= specificPoints.end) {
    const wwdamin = document.getElementById("hero-lightpass");

    wwdamin.style.position = "absolute";
    wwdamin.style.top = `${specificPoints.end}px`;
  } else if (html.scrollTop <= specificPoints.start) {
    wwdaminInit.style.position = "fixed";
    wwdaminInit.style.top = `0px`;
  }
});



function getSectionScrollPoints(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const scrollStart = section.offsetTop;
    const scrollEnd = scrollStart + section.offsetHeight;
    return {
      start: scrollStart,
      end: scrollEnd,
    };
  }
  return null; // Section not found
}
