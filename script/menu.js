const fadeOut = [
    {opacity: "100%"},
    {opacity: "100%"},
    {opacity: "0%"}
]

const fadeIn = [
    {opacity: "0%"},
    {opacity: "100%"},
    {opacity: "100%"}
]

const fadeInOut = [
    { opacity: "0%" },
    { opacity: "100%" },
    { opacity: "100%" },
    { opacity: "0%" },
];

const blackoutJumpscare = [
    { opacity: "0%" },
    { opacity: "100%" },
    { opacity: "50%" },
    { opacity: "100%" },
    { opacity: "0%" },
    { opacity: "80%" },
    { opacity: "50%" },
    { opacity: "100%" },
    { opacity: "100%" },
    { opacity: "100%" },
    { opacity: "100%" },
];

const fadeTiming = {
    duration: 4000,
    iterations: 1,
    fill: "forwards"
};

const fadeTimingFast = {
    duration: 2000,
    iterations: 1,
    fill: "forwards"
};

const fadeReallyFastTiming = {
    duration: 700,
    iterations: 1,
    fill: "forwards"
};

const menuDiv = document.getElementById("menu-div")
const disclaimerDiv = document.getElementById("disclaimer")
const blackScreenDiv = document.getElementById("black-screen")
const gameDiv = document.getElementById("game")
const blackScreenGameDiv = document.getElementById("black-screen-game")

const disclaimerAnim = disclaimerDiv.animate(
    fadeInOut, fadeTiming
)



disclaimerAnim.onfinish = () => {
    disclaimerDiv.style.display = "none"
    PlaySound(menuMus)
    let blackScreenAnim = blackScreenDiv.animate(
        fadeOut, fadeTiming
    )
    blackScreenAnim.onfinish = () => {
        blackScreenDiv.style.display = "none"
    }
}

// FNAF 4 Logo

const logoFNAF = document.getElementById("logo")
const logoFNAFFrameIndexes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 4]

setInterval(animate, 50); 
var x = 1; 
  
function animate() { 
    if (logoFNAFFrameIndexes.length == x) { 
        x = 1; 
    } 
    logoFNAF.src = "/images/misc/logo" + logoFNAFFrameIndexes[x] + ".png" 
    x++; 
} 

function startGame() {
    blackScreenDiv.style.display = "block"
    const blackScreenFadeIn = blackScreenDiv.animate(
        fadeIn, fadeTiming
    )
    blackScreenFadeIn.onfinish = () => {
        menuDiv.style.display = "none"
        gameDiv.style.display = "block"
        menuMus.pause()
        PlaySound(ambienceMus)
        const blackScreenGameAnim = blackScreenGameDiv.animate(
            fadeOut, fadeTimingFast
        )
        blackScreenGameAnim.onfinish = () => {
            blackScreenGameDiv.style.display = "none"
            startAllAI()
        }
    }
}