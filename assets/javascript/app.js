const questions =
    [   {   text: "How many times are you supposed to feel tired in a day?",
            options:
            [   "One",
                "Two",
                "Three",
                "All the time"
            ],
            answer: 1,
        },
        {   text: "placeholder?",
            options:
            [   "placeholder",
                "placeholder",
                "placeholder",
                "placeholder"
            ],
            answer: 2,
        },
        {   text: "placeholder?",
            options:
            [   "placeholder",
                "placeholder",
                "placeholder",
                "placeholder"
            ],
            answer: 0,
        },
        {   text: "placeholder",
            options:
            [   "placeholder",
                "placeholder",
                "placeholder",
                "placeholder"
            ],
            answer: 1,
        },
        {   text: "placeholder?",
            options:
            [   "placeholder",
                "placeholder",
                "placeholder",
                "placeholder"
            ],
            answer: 1,
        },
        {   text: "placeholder?",
            options:
            [   "placeholder",
                "placeholder",
                "placeholder",
                "placeholder"
            ],
            answer: 1,
        },
        {   text: "placeholder?",
            options:
            [   "placeholder",
                "placeholder",
                "placeholder",
                "placeholder"
            ],
            answer: 1,
        },
        {   text: "placeholder?",
            options:
            [   "placeholder",
                "placeholder",
                "placeholder",
                "placeholder"
            ],
            answer: 3,
        },
        {   text: "placeholder?",
            options:
            [   "placeholder",
                "placeholder",
                "placeholder",
                "placeholder"
            ],
            answer: 3,
        },
        {   text: "Placeholder",
            options:
            [   "placeholder",
                "placeholder",
                "placeholder",
                "placeholder"
            ],
            answer: 1,
        }
    ]

var qCount = 0
var qIndex = []         
var qLength = questions.length

var correctAnswers = 0
var wrongAnswers = 0
var timedOut = 0

var defaultCounter = 15           
var counter = 15              
var questionInterval             
var questionActive = false


var readyCounter = 4

function randomizeIndex() {   
    for (var i=0; i<qLength; i++) {
       qIndex [i] = i
    }

    for (var i=qLength; i>=0; i--) {   
        var randomIndex = Math.floor(Math.random() * (i))

        var saveIndex = qIndex[randomIndex]

        qIndex.splice(randomIndex, 1)
        qIndex.push(saveIndex)
    }
}

function displayGameElements (gameElement) {
    var theElements = ["#intro", "#quiz", "#game-over"]

    theElements.forEach (function(e)
    {   $(e).css("display", ((gameElement === e) ? "block" : "none"))
        $(e).css("display", ((gameElement === e) ? "block" : "none"))
        $(e).css("display", ((gameElement === e)  ? "block" : "none"))
    })
}


function gameOver() {
    var quizStats = $("#game-stats")
    quizStats.empty()

    if (correctAnswers > 8)
        quizStats.append("<h3>Nicely done!</h3>")
    if (wrongAnswers > 5)
        quizStats.append("<h3>Yikes</h3>")
    if (timedOut > 5)
        quizStats.append("<h3>Hello????</h2>")

    quizStats
        .append("<p>You got " + correctAnswers + " questions correct.</p>")
        .append("<p>You got " + wrongAnswers + " questions wrong.</p>")
        .append("<p>You didn't answer " + timedOut + " questions.</p>")

    displayGameElements("#game-over")
}

function timer()
{
    
    if (counter > 0) {
       if (counter < 4)
        $(".counter")
            .text(counter + " seconds")
            .css("display", "block")
        --counter
    } else {  
        clearInterval(questionInterval)


        ++timedOut
        $(".counter").css("display", "none")

        if (qCount < qLength)
        {
            setTimeout(displayQuestion, 5000)
        }
        else {
            setTimeout(gameOver, 5000)
        }
    }
}

function setTimer() {
    clearInterval(questionInterval)
    counter = defaultCounter
    questionInterval = setInterval(timer, 1000)
}

function displayQuestion() {
    $(".get-ready-counter").css("display", "none")

    if (qCount<0) {
        clearInterval(questionInterval)
    } else {
        $("#quiz h2").text("Question #" + (qCount + 1))
        $(".counter").text(counter + " seconds")

        $("#question").text(questions[qIndex[qCount]].text)
        $("#explanation").text("")

        var tempArray = []
        for (var i=0; i<questions[qIndex[qCount]].options.length; i++) {
            tempArray[i] = questions[qIndex[qCount]].options[i]
        }

        var saveText = questions[qIndex[qCount]].options[questions[qIndex[qCount]].answer]

        qCount++

        for (var i=0; i<4; i++)
        {   var randomIndex = Math.floor(Math.random() * tempArray.length)

            $(".click[option=" + i + "]").text(tempArray[randomIndex])

            if (tempArray[randomIndex] === saveText) {
                    $(".click[option=" + i + "]")
                    .attr("answer", "correct")
                    .css("background", "#ffff88")
                $(".key[option=" + i + "]")
                    .attr("answer", "correct")
                    .css("background", "#ffff88")
            } else
            {   $(".click[option=" + i + "]")
                    .attr("answer", "wrong")
                    .css("background", "#ffff88");   
                $(".key[option=" + i + "]")
                    .attr("answer", "wrong")
                    .css("background", "#ffff88")
            }

            tempArray.splice(randomIndex, 1)
        }
        displayGameElements("#quiz")
        setTimer()

        questionActive = true
    }
}

function readyCount() { 
    if (readyCounter > 1) {
           setTimeout(readyCount, 1000)
    } else {
        setTimeout(displayQuestion, 1000)
    }

    readyCounter--
}

function initReadyCount() {

    readyCounter = 3
    setTimeout(readyCount, 1000)
}

function newGame() {

    randomizeIndex()

    qCount = 0
    correctAnswers = 0
    wrongAnswers = 0
    timedOut = 0

    initReadyCount()
}

function answerIt (selected) {
    if (!questionActive) return

    questionActive = false

    clearInterval(questionInterval)

    $(".counter").css("display", "none")

    if ($(".click[option=" + selected + "]").attr("answer") === "correct") {
        ++correctAnswers

        $("#explanation")
            .html("<h2>Yup")
            .html($("#explanation").html() + "<p>" + questions[qIndex[qCount - 1]].explain + "</p>")
        $(".click[answer=correct]").css("background", "#88ff88")
        $(".key[answer=correct]").css("background", "#88ff88")

    } else {
        ++wrongAnswers

        $("#explanation")
            .html("<h3>Nope</h3>")
            .html($("#explanation").html() + "<p>The correct answer is " + $(".click[answer=correct]").text() + "</p>")
            .html($("#explanation").html() + "<p>" + questions[qIndex[qCount - 1]].explain + "</p>")
        $(".click[option=" + selected + "]").css("background", "#ff8888")
        $(".click[answer=correct]").css("background", "#88ff88")
        $(".key[option=" + selected + "]").css("background", "#ff8888")
        $(".key[answer=correct]").css("background", "#88ff88")
    }

    if (qCount < qLength) {
        setTimeout(displayQuestion, 5000)
    } else {
        setTimeout(gameOver, 5000)
    }
}

$(document).ready(function() {
    $("#start-quiz").click(function()
    { 
        newGame()
    })
    $("#try-again").click(function()
    {
        newGame()
    })
    $(".click").click(function()
    { 
        answerIt($(this).attr("option"))
    })
    $(".key").click(function()
    {
        answerIt($(this).attr("option"))
    })
});