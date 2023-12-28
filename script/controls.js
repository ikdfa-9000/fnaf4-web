// LOOK HANDLERS

function rightLook() {
    if (!animationPlaying && lookingStatus != lookingLeftDoor && lookingStatus != lookingRightDoor && lookingStatus != lookingClosetClose && lookingStatus != lookingBack) {
        function checkHover() {
            if (document.getElementById("turn-right").matches(':hover')) {
                rightLook()
            }
        }
        if (lookingStatus == lookingLeft) {
            animationStandard(true, "./images/bedroom/bedroom-front-left-", 4, "./images/bedroom/bedroom-front.png", lookingCenter, lookingLeft, imageBedroomFront)
            setTimeout(checkHover, 350)
        } else if (lookingStatus == lookingCenter) {
            animationStandard(false, "./images/bedroom/bedroom-front-right-", 4, "./images/bedroom/bedroom-front.png", lookingCenter, lookingRight, imageBedroomRight)
        }
    }
}

function leftLook() {
    if (!animationPlaying && lookingStatus != lookingLeftDoor && lookingStatus != lookingRightDoor && lookingStatus != lookingClosetClose && lookingStatus != lookingBack) {
        function checkHover() {
            if (document.getElementById("turn-left").matches(':hover')) {
                leftLook()
            }
        }
        if (lookingStatus == lookingRight) {
            // animationRightCenter(true)
            animationStandard(true, "./images/bedroom/bedroom-front-right-", 4, "./images/bedroom/bedroom-front.png", lookingCenter, lookingLeft, imageBedroomFront)
            setTimeout(checkHover, 350)
        } else if (lookingStatus == lookingCenter) {
            animationStandard(false, "./images/bedroom/bedroom-front-left-", 4, "./images/bedroom/bedroom-front.png", lookingCenter, lookingLeft, imageBedroomLeft)
        }
    }
}

function lookBack () {
    if (!animationPlaying) {
        switch (lookingStatus) {
            case lookingBack:
                animationBack(true)
                break
            case lookingLeftDoor:
                breathingSound.pause()
                animationDoorGetCloser(true, "./images/left-door/door-left-enter-", 18, lookingLeftDoor, lightLeft, darkLeft, frameEndStandard = imageDoorLeft)
                break
            case lookingRightDoor:
                breathingSound.pause()
                animationDoorGetCloser(true, "./images/right-door/right-door-go-", 15, lookingRightDoor, lightRight, darkRight, frameEndStandard = imageDoorRight)
                break
            case lookingClosetClose:
                animationClosetApproach(true)
                break
            default:
                animationBack(false)
                break
        }
    }
}

// CLICK HANDLERS

function middleClickHandler() {
    console.log(lookingStatus)
    if (!animationPlaying) {
        if (lookingStatus == lookingCenter) {
            PlaySound(lightSound)
            animationCenterGo()
        }
    }
}

function leftClickHandler () {
    if (!animationPlaying) {
        if (lookingStatus == lookingLeft) {
            PlaySound(lightSound)
            animationDoorsStart("./images/bedroom/bedroom-front-left-go-", 5, function(){ return animationDoorGetCloser(false, "./images/left-door/door-left-enter-", 18, lookingLeftDoor, lightLeft, darkLeft, bonnie.currpos, bonnie.maxpos, imageDoorLeft)})
        }
    }
}

function rightClickHandler () {
    if (!animationPlaying) {
        if (lookingStatus == lookingRight) {
            PlaySound(lightSound)
            animationDoorsStart("./images/bedroom/bedroom-front-right-go-", 5, function(){ return animationDoorGetCloser(false, "./images/right-door/right-door-go-", 15, lookingRightDoor, lightRight, darkRight, chica.currpos, chica.maxpos, imageDoorRight)})
        }
    }
}

// LIGHT HANDLERS

function lightBed(event) {
    if (!animationPlaying) {
        flashlightWorking = true
        PlaySound(lightSound)
        if (freddy.currpos >= 10 && freddy.currpos < 80) {
            PlaySound(freddleSound)
        }
        freddyHandler()
    }
}
function darkBed(event) {
    if (!animationPlaying) {
        flashlightWorking = false
        PlaySound(lightSound)
        gameVisuals.src = imageBedroomBed
        freddleSound.pause()
    }
}

function lightLeft(event) {
    if (!animationPlaying) {
        flashlightWorking = true
        PlaySound(lightSound)
        if (bonnie.currpos >= bonnie.maxpos) {
            animationJumpscareBase(18, "images/jumpscares/bonnie-door/bonnie-door-", () => { 
                middleButton.removeEventListener("mousedown", lightLeft);
                middleButton.removeEventListener("mouseup", darkLeft); 
            })
        }
        else if (bonnie.currpos >= 1) {
            bonnie.currpos = 0
            doorAnimatronicAnimHide("images/left-door/door-left-close-bonnie-go-", 9, "images/left-door/door-left-light-no.png")
        } else {
            gameVisuals.src = "images/left-door/door-left-light-no.png"
        }
    }
}
function darkLeft(event) {
    flashlightWorking = false
    PlaySound(lightSound)
    gameVisuals.src = imageDoorLeft
}

function lightRight(event) {
    if (!animationPlaying) {
        flashlightWorking = true
        PlaySound(lightSound)
        if (chica.currpos >= chica.maxpos) {
            animationJumpscareBase(16, "images/jumpscares/chica-door/chica-door-", () => { 
                middleButton.removeEventListener("mousedown", lightRight);
                middleButton.removeEventListener("mouseup", darkRight); 
            })
        }
        else if (chica.currpos >= 1) {
            chica.currpos = 0
            doorAnimatronicAnimHide("images/right-door/door-right-close-chica-go-", 13, "images/right-door/right-door-light-no.png")
        } else {
            gameVisuals.src = "images/right-door/right-door-light-no.png"
        }
    }
}
function darkRight(event) {
    flashlightWorking = false
    PlaySound(lightSound)
    gameVisuals.src = imageDoorRight
}