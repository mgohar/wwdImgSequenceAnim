const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 226;
const currentFrame = (index) => {
  return `WWD/wwd (${index}).png`
};


const preloadImages = () => {
  for (let i = 2; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(2);
canvas.width = 1158;
canvas.height = 770;
img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

const specificPointsInit = getSectionScrollPoints("start_wwd_amin");
const wwdaminInit = document.getElementById("hero-lightpass");
const canvas_wwd_box = document.getElementById("canvas_wwd_box");
const wwdaminCanvas = document.getElementById("hero-lightpass");
console.log("wwdaminCanvas.innerHeight",wwdaminCanvas.height)
canvas_wwd_box.style.height=`${wwdaminCanvas.height-100}px`
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
    wwdaminInit.style.position = "relative";
    wwdaminInit.style.top = `0px`;
  }
});

preloadImages();

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
