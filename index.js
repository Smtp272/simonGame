let level = 0
let gamePattern = []
let userClickedPattern = []
let buttonColours = ["green", "red", "yellow", "blue"]
let gameHasStarted = false
let highScore = JSON.parse(localStorage.getItem('highScore'))

updateScore(0)

function nextSequence() {
    userClickedPattern = []
    level++
    $("h1").text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
}

$(document).keypress(function () {
    if (!gameHasStarted) {
        $("#level-title").text(`Level ${level}`)
        nextSequence()
        gameHasStarted = true
    }
})


function playSound(colour) {
    let audio = new Audio(`sounds/${colour}.mp3`)
    audio.play()
}

$(".btn").click(function () {
        let userChosenColour = $(this).attr("id")
        userClickedPattern.push(userChosenColour)
        playSound(userChosenColour)
        animatePress(userChosenColour)
        checkAnswer(userClickedPattern.length - 1)

    }
)

function checkAnswer(currentLevel) {
    let previousRandomColour = gamePattern[currentLevel]
    let userColour = userClickedPattern[currentLevel]
    if (previousRandomColour === userColour) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        playSound("wrong")
        animateGameOver()
        startOver()
    }
}

function animatePress(currentColour) {
    let activeButton = $(`#${currentColour}`)
    activeButton.addClass('pressed')
    setTimeout(function () {
        activeButton.removeClass("pressed")
    }, 100)
}

function animateGameOver() {
    let body = $(`body`)
    body.addClass('game-over')
    setTimeout(function () {
        body.removeClass("game-over")
    }, 200)
}

function startOver() {
    updateScore(level)
    level = 0
    gamePattern = []
    gameHasStarted = false
    $("#level-title").text(`Game Over!!\nPress any key to restart`)
}

function updateScore(currentScore) {
    if(!highScore){
        highScore = 0
    }
    if (highScore < currentScore) {
        highScore = currentScore
        localStorage.setItem('highScore', currentScore)
    }

    $("#high-score").text(`High score: ${highScore}`)
}
