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
