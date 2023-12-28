class DoorAnimatronic {
    constructor(ailevelc, currposc, maxposc, maxposinstac, directionc, walksound, frameCountc, frameNamec, pointerDisablerc) {
        this.ailevel = ailevelc // Определяет шанс на передвижение
        this.currpos = currposc // Текущая позиция
        this.maxpos = maxposc
        this.maxposinsta = maxposinstac // Максимальная позиция. Дальше - смэрть
        this.direction = directionc
        this.stepSound = walksound
        this.frameCount = frameCountc
        this.frameName = frameNamec
        this.pointerDisabler = pointerDisablerc
    }
    addChance() {
        let randNum = Math.round(Math.random() * 20)
        console.log("I tried! " + randNum)
        // && lookingStatus != this.direction
        if (!(lookingStatus == this.direction && flashlightWorking)) {
            if (this.ailevel > randNum) {
                if (this.currpos < this.maxpos) {
                    PlaySound(this.stepSound)
                }
                console.log("Something's getting closer...")
                this.currpos = this.currpos + 1
                console.log(this.currpos)
                if (this.currpos >= this.maxpos && lookingStatus == this.direction) {
                    PlaySound(breathingSound)
                }
                if (this.currpos == this.maxposinsta) {
                    killAnywhere(this.frameCount, this.frameName, this.pointerDisabler)
                }
            }
        }
    }
    startAI(){
        this.aiInterval = setInterval(this.addChance.bind(this), 5000)
    }
    stopAI(){
        clearInterval(this.aiInterval)
        this.currpos = 0
    }
}

class PassiveAnimatronic {
    constructor(ailevelc, currposc, maxposc, maxposinstac, frameCountc, frameNamec, pointerDisablerc) {
        this.ailevel = ailevelc // Определяет шанс на передвижение
        this.currpos = currposc // Текущая позиция
        this.maxpos = maxposc
        this.maxposinsta = maxposinstac // Максимальная позиция. Дальше - смэрть
        this.frameCount = frameCountc
        this.frameName = frameNamec
        this.pointerDisabler = pointerDisablerc
    }
    addChance() {
        if (!(lookingStatus == lookingBack && flashlightWorking)) {
            console.log("Something's getting stronger...")
            this.currpos = this.currpos + this.ailevel
            console.log(this.currpos)
            if (this.currpos >= this.maxposinsta) {
                killAnywhere(this.frameCount, this.frameName, this.pointerDisabler)
            }
        }
    }
    startAI(){
        this.aiInterval = setInterval(this.addChance.bind(this), 5000)
    }
    stopAI(){
        clearInterval(this.aiInterval)
        this.currpos = 0
    }
}

let freddy = new PassiveAnimatronic(10, 0, 80, 100, 15, "images/jumpscares/freddy-bedroom/freedy-bedroom-", () => { 
    middleButton.removeEventListener("mousedown", lightBed);
    middleButton.removeEventListener("mouseup", darkBed); 
})
let bonnie = new DoorAnimatronic(0, 0, 4, 6, lookingLeftDoor, footstepBonnieSound, 17, "images/jumpscares/bonnie-bedroom/bonnie-bedroom-", () => { 
    middleButton.removeEventListener("mousedown", lightLeft);
    middleButton.removeEventListener("mouseup", darkLeft); 
})
let chica = new DoorAnimatronic(0, 0, 4, 6, lookingRightDoor, footstepChicaSound, 13, "images/jumpscares/chica-bedroom/chica-bedroom-", () => { 
    middleButton.removeEventListener("mousedown", lightRight);
    middleButton.removeEventListener("mouseup", darkRight); 
})

function startAllAI() {
    console.log("void_sex")
    freddy.startAI()
    bonnie.startAI()
    chica.startAI()
}

function stopAllAI() {
    console.log("void_sex_stop")
    freddy.stopAI()
    bonnie.stopAI()
    chica.stopAI()
}