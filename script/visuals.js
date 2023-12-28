// AUDIO

let lightSound = document.getElementById("flashlight")
let ambienceMus = document.getElementById("ambience")
let menuMus = document.getElementById("menumusic")
let walkingSound = document.getElementById("walking")
let freddleSound = document.getElementById("freddle")
let screamerSound = document.getElementById("screamer")
let breathingSound = document.getElementById("breathing")
let footstepBonnieSound = document.getElementById("footstep-bonnie")
let footstepChicaSound = document.getElementById("footstep-chica")

function PlaySound(soundobj) {
    soundobj.currentTime = 0;
    soundobj.play();
}

let lookingStatus = 0

// STATUS - BEDROOM

const lookingCenter = 0
const lookingLeft = 1
const lookingRight = 2
const lookingBack = 3

// STATUS - DOORS

const lookingLeftDoor = 4
const lookingRightDoor = 5
const lookingClosetClose = 6

let l

let gameVisuals = document.getElementById("game-render")
let deadScreen = document.getElementById("dead-screen")

let leftButton = document.getElementById("turn-left")
let rightButton = document.getElementById("turn-right")
let middleButton = document.getElementById("go-front")
let backButton = document.getElementById("turn-back")

let animationPlaying = false
let flashlightWorking = false

let imageBedroomLeft = "images/tutorials/tutorial-left.png"
let imageBedroomFront = "images/tutorials/tutorial-front.png"
let imageBedroomRight = "images/tutorials/tutorial-right.png"
let imageBedroomBed = "images/tutorials/tutorial-bed.png"
let imageDoorLeft = "images/tutorials/tutorial-left-door.png"
let imageDoorRight = "images/tutorials/tutorial-right-door.png"

function hideTips() {
    document.getElementById("hide-button").style.display = "none"
    imageBedroomLeft = "images/bedroom/bedroom-front-left-4.png"
    imageBedroomFront = "images/bedroom/bedroom-front.png"
    imageBedroomRight = "images/bedroom/bedroom-front-right-4.png"
    imageBedroomBed = "images/bed/bed-no-light.png"
    imageDoorLeft = "images/left-door/door-left-enter-18.png"
    imageDoorRight = "images/right-door/right-door-go-15.png"
}
// ANIMATIONS - JUMPSCARES

function killAnywhere (frameCount, frameName, pointerDisabler) {
    pointerDisabler()
    stopAllAI()
    blackScreenGameDiv.style.display = "block"
    let jumpscareBlackout = blackScreenGameDiv.animate(
        blackoutJumpscare, fadeReallyFastTiming
    )
    jumpscareBlackout.onfinish = () => { 
        blackScreenGameDiv.style.display = "none";
        animationJumpscareBase(frameCount, frameName, () => {});
    }
}

function animationJumpscareBase (frameCount, frameName, pointerDisabler) {
    pointerDisabler()
    stopAllAI()
    PlaySound(screamerSound)
    breathingSound.pause()
    l = 1
    lookingStatus = lookingCenter
    ambienceMus.pause()
    var animationInterval = setInterval(animate, 40);
    animationPlaying = true
    function animate() { 
        gameVisuals.src = frameName + l + ".png" 
        l++;
        if (l==frameCount+1) {
            l=1
            clearInterval(animationInterval)
            deadScreen.style.display = "block"
            stopAllAI()
            let deadScreenFadeIn = deadScreen.animate(fadeIn, fadeTimingFast)
            deadScreenFadeIn.onfinish = () => {
                menuDiv.style.display = "block"
                gameVisuals.src = imageBedroomFront
                console.log(gameVisuals)
                let deadScreenFadeOut = deadScreen.animate(fadeOut, fadeTimingFast)
                deadScreenFadeOut.onfinish = () => {
                    animationPlaying = false
                    PlaySound(menuMus)
                    let blackScreenAnimAfterDeath = blackScreenDiv.animate(
                        fadeOut, fadeTiming
                    )
                    blackScreenAnimAfterDeath.onfinish = () => {
                        deadScreen.style.display = "none"
                        blackScreenDiv.style.display = "none"
                    }
                }
            }
        }
    }
} 

// ANIMATIONS - HALL

function animationStandard (reverse, frameName, frameCount, frameEndReverse = frameName + 1 + ".png", lookingStatusSetReverse, lookingStatusSet, frameEndStandard = frameName + frameCount + ".png") { 
    if (reverse) {
        l = frameCount
    } else {
        l = 1
    }
    var animationInterval = setInterval(animate, 40);
    animationPlaying = true
    function animate() { 
        if (reverse) {
            if (l==0) {
                l=4
                clearInterval(animationInterval)
                lookingStatus = lookingStatusSetReverse
                gameVisuals.src = frameEndReverse
                animationPlaying = false
            } else {
            gameVisuals.src = frameName + l + ".png" 
            l--;
            }
        } else {
            gameVisuals.src = frameName + l + ".png" 
            l++;
            if (l==frameCount+1) {
                l=1
                clearInterval(animationInterval)
                lookingStatus = lookingStatusSet
                gameVisuals.src = frameEndStandard
                animationPlaying = false
            }
        }
    }
}

function animationBack (reverse) {
    if (reverse) {
        middleButton.removeEventListener("mousedown", lightBed)
        middleButton.removeEventListener("mouseup", darkBed)
        l = 16
    } else {
        l = 1
    }
    var animationInterval = setInterval(animate, 40);
    animationPlaying = true
    function animate() { 
        if (reverse) {
            if (l==0) {
                l=16
                clearInterval(animationInterval)
                lookingStatus = lookingCenter
                gameVisuals.src = imageBedroomFront
                animationPlaying = false
            } else {
            gameVisuals.src = "./images/bedroom/bedroom-front-back-go-" + l + ".png" 
            l--;
        }
        } else {
            gameVisuals.src = "./images/bedroom/bedroom-front-back-go-" + l + ".png" 
            l++;
            if (l==17) {
                l=1
                clearInterval(animationInterval)
                lookingStatus = lookingBack
                gameVisuals.src = imageBedroomBed
                animationPlaying = false

                middleButton.addEventListener("mousedown", lightBed)
                middleButton.addEventListener("mouseup", darkBed)
            }
        }
    } 
}


// ANIMATION - WALK

function animationWalk (animation, reverse) {
    l = 1
    PlaySound(walkingSound)
    var animationInterval = setInterval(animate, 35);
    animationPlaying = true
    function animate() { 
        gameVisuals.src = "./images/running/running-" + l + ".png" 
        l++;
        if (l==30) {
            l=1
            clearInterval(animationInterval)
            animationPlaying = false
            animation(reverse)
        }
    }
} 

function animationDoorsStart (frameName, frameCount, animationApproach) { 
    l = 1
    var animationInterval = setInterval(animate, 35);
    animationPlaying = true
    function animate() { 
        gameVisuals.src = frameName + l + ".png" 
        l++;
        if (l==frameCount+1) {
            l=1
            clearInterval(animationInterval)
            animationPlaying = false
            animationWalk(animationApproach, false)
        }
    }
}

function animationDoorGetCloser (reverse, frameName, frameCount, lookingSet, lightFunc, darkFunc, posVal, maxVal, frameEndStandard = frameName + frameCount + ".png") {
    if (reverse) {
        middleButton.removeEventListener("mousedown", lightFunc)
        middleButton.removeEventListener("mouseup", darkFunc)
        l = frameCount
    } else {
        l = 1
    }
    lookingStatus = lookingSet
    var animationInterval = setInterval(animate, 40);
    animationPlaying = true
    function animate() { 
        if (reverse) {
            if (l==0) {
                l=frameCount
                clearInterval(animationInterval)
                animationWalk(animationCenterGo, true)
            } else {
            gameVisuals.src = frameName + l + ".png" 
            l--;
        }
        } else {
            gameVisuals.src = frameName + l + ".png" 
            l++;
            if (l==frameCount + 1) {
                l=1
                clearInterval(animationInterval)
                if (posVal >= maxVal) {
                    PlaySound(breathingSound)
                }
                animationPlaying = false
                gameVisuals.src = frameEndStandard
                middleButton.addEventListener("mousedown", lightFunc)
                middleButton.addEventListener("mouseup", darkFunc)
            }
        }
    } 
}

// CLOSET

function animationCenterGo (reverse) {
    if (reverse) {
        l = 4
    } else {
        l = 1
    }
    var animationInterval = setInterval(animate, 40);
    animationPlaying = true
    function animate() { 
        if (reverse) {
            if (l==0) {
                l=4
                clearInterval(animationInterval)
                lookingStatus = lookingCenter
                gameVisuals.src = imageBedroomFront
                animationPlaying = false
            } else {
            gameVisuals.src = "./images/bedroom/bedroom-front-closet-" + l + ".png" 
            l--;
        }
        } else {
            gameVisuals.src = "./images/bedroom/bedroom-front-closet-" + l + ".png" 
            l++;
            if (l==5) {
                l=1
                clearInterval(animationInterval)
                lookingStatus = lookingClosetClose
                animationPlaying = false
                animationWalk(animationClosetApproach, false)
            }
        }
    } 
}

function animationClosetApproach (reverse = false) {
    if (reverse) {
        l = 13
    } else {
        l = 1
    }
    var animationInterval = setInterval(animate, 35);
    animationPlaying = true
    function animate() { 
        if (reverse) {
            if (l==0) {
                l=13
                clearInterval(animationInterval)
                animationWalk(animationCenterGo, true)
            } else {
            gameVisuals.src = "./images/closet/closet-go-" + l + ".png" 
            l--;
        }
        } else {
            if (l==14) {
                l=1
                clearInterval(animationInterval)
                lookingStatus = lookingClosetClose
                animationPlaying = false
            } else {
            gameVisuals.src = "./images/closet/closet-go-" + l + ".png" 
            l++;
            }
        }
    } 
}

// ANIMATIONS - FREDDLES

function freddleAnimShaking(frameName, frameCount, frameCountWithEsc, aiDecrease, aiBorder, pointerDisabler) {
    l = 1
    let animationInterval = setInterval(animate, 35)
    function animate() {
        if (flashlightWorking) {    
            gameVisuals.src = frameName + l + ".png" 
            l++;
            if (l >= frameCount+1) {
                console.log(freddy.currpos)
                if (freddy.currpos < aiBorder) {
                    if (l >= frameCountWithEsc) {
                        l = 1
                        clearInterval(animationInterval)
                        freddyHandler()
                    }
                } else {
                    l = 1
                    freddy.currpos = freddy.currpos - aiDecrease
                }
            }
        } else {
            clearInterval(animationInterval)
        }
    }
}

function freddyHandler() {
    console.log("Freddy handler called! Current freddy level: " + freddy.currpos)
    l = 1
    if (freddy.currpos >= freddy.maxpos) {
        animationJumpscareBase(19, "/images/jumpscares/freddy-bed/freddy-bed-", () => { 
            middleButton.removeEventListener("mousedown", lightBed);
            middleButton.removeEventListener("mouseup", darkBed) 
        })
    }
    else if (freddy.currpos >= 60) {
        freddleAnimShaking("images/bed/bed-freddle-3-", 5, 8, 8, 60)
    } else if (freddy.currpos >= 35) {
        freddleAnimShaking("images/bed/bed-freddle-2-", 7, 10, 8, 35)
    } else if (freddy.currpos >= 10) {
        freddleAnimShaking("images/bed/bed-freddle-1-", 7, 12, 8, 10)
    } 
    else { 
        freddleSound.pause()
        gameVisuals.src = "images/bed/bed.png"
    }
}

// DOOR ANIM HIDE

function doorAnimatronicAnimHide (frameName, frameCount, imageAfter) {
    l = 1
    let animationInterval = setInterval(animate, 35)
    function animate() {
        if (flashlightWorking) {    
            gameVisuals.src = frameName + l + ".png" 
            l++;
            if (l >= frameCount+1) {
                clearInterval(animationInterval)
                gameVisuals.src = imageAfter
        }
    }
    else {
        clearInterval(animationInterval)
    }
    }
}