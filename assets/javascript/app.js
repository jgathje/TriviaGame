$(document).ready(function () {
    $("#trivia").hide();
    $("#timer").hide();
    $("#header").text("Time For Trivia!");
    $("#start").on("click", () => gameStart());

})
let intervalId;

const trivia = {
    right: 0,
    wrong: 0,
    unanswered: 0,
    time: 5,
    number: 0,
    intermissionTime: 5,

    questions: [
        `Who scored the infamous "Hand Of God" goal in the 1986 World Cup Final?`,
        `Which Italian player missed the final penalty kick in the 1994 World Cup Final?`,
        `Which player won the Golden Ball award in 2002 despite losing in the final?`,
        `Who did Zinadine Zidane headbut in the 2006 World Cup Final?`,
        `South Africa became the first African nation to host the World Cup in which year:`,
    ],

    answers: [
        ["Sergio Almirón", "Diego Maradona", "Carlos Tapia", "Sergio Batista"],
        ["Dino Baggio", "Paolo Maldini", "Roberto Baggio", "Daniele Massaro"],
        ["Michael Ballack", "Oliver Kahn", "Miroslav Klose", "Oliver Bierhoff"],
        ["Marco Materazzi", "Gianluigi Buffon", "Alessandro Del Piero", "Francesco Totti"],
        ["2002", "2006", "2010", "2014"]
    ],

    correctAnswers: [
        "Diego Maradona",
        "Roberto Baggio",
        "Oliver Kahn",
        "Marco Materazzi",
        "2010",
    ],
}


function gameStart() {
    $("#intermission").hide();
    $("#start").hide();
    $("#header").hide();
    $("#trivia").show();
    $("#timer").show();
    $("#timer").html("<h4>" + trivia.time + "</h4>");
    nextQuestion();
    clock();
}

function nextQuestion() {
    $("#question").text(trivia.questions[trivia.number]);
    $("#answer1").text(trivia.answers[trivia.number][0]);
    $("#answer2").text(trivia.answers[trivia.number][1]);
    $("#answer3").text(trivia.answers[trivia.number][2]);
    $("#answer4").text(trivia.answers[trivia.number][3]);
}

function timer() {
    trivia.time--;
    $("#timer").html("<h4>" + trivia.time + "</h4>");
    console.log(trivia.time);
    answer();

}

function clock() {
    clearInterval(intervalId);
    intervalId = setInterval(timer, 1000);
}

function answer() {
    let compareAnswer;
    $("#answer1").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][0]
        if (compareAnswer === trivia.correctAnswers[trivia.number]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number]) {
            wrongAnswer();
        } 
    })
    $("#answer2").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][1]
        if (compareAnswer === trivia.correctAnswers[trivia.number]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number]) {
            wrongAnswer();
        }
    })
    $("#answer3").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][2]
        if (compareAnswer === trivia.correctAnswers[trivia.number]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number]) {
            wrongAnswer();
        }
    })
    $("#answer4").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][3]
        if (compareAnswer === trivia.correctAnswers[trivia.number]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number]) {
            wrongAnswer();
        }
    })

}



function rightAnswer() {
    clearInterval(intervalId);
    clock();
    console.log(trivia.intermissionTime);
    console.log(trivia.number);
    trivia.intermissionTime--
    $("#trivia").hide();
    $("#timer").hide();
    $("#header").text("GOOOOOOOOOOOOOOOOOOAL!");
    $("#header").show();
    $("#intermission").show();
    $("#intermission").html('<img src="assets/images/correct.gif">');
    if (trivia.intermissionTime === 0) {
        trivia.number++;
        trivia.right++;
        trivia.time = 5;
        trivia.intermissionTime = 5;
        $("#timer").html("<h4>" + trivia.time + "</h4>");
        console.log(trivia.number);
        clearInterval(intervalId);
        gameStart();
    }
}

function wrongAnswer() {
    trivia.time=5;
    clearInterval(intervalId);
    clock();
    console.log(trivia.time);
    console.log(trivia.number);
    trivia.time--
    $("#trivia").hide();
    $("#timer").hide();
    $("#header").text("RED CARD!!!!");
    $("#header").show();
    $("#intermission").show();
    $("#intermission").html('<img src="assets/images/wrong.gif">');
    if (trivia.time === 0) {
        trivia.number++;
        trivia.wrong++;
        trivia.time = 5;
        trivia.intermissionTime = 5;
        $("#timer").html("<h4>" + trivia.time + "</h4>");
        console.log(trivia.number);
        clearInterval(intervalId);
        gameStart();
    }
}

function noAnswer() {
    clearInterval(intervalId);
    clock();
    console.log(trivia.intermissionTime);
    console.log(trivia.number);
    trivia.intermissionTime--
    $("#trivia").hide();
    $("#timer").hide();
    $("#header").text("It's like you didn't even try!?!");
    $("#header").show();
    $("#intermission").show();
    $("#intermission").html('<img src="assets/images/noanswer.gif">');
    if (trivia.intermissionTime === 0) {
        trivia.number++;
        trivia.unanswered++;
        trivia.time = 5;
        trivia.intermissionTime = 5;
        $("#timer").html("<h4>" + trivia.time + "</h4>");
        console.log(trivia.number);
        clearInterval(intervalId);
        gameStart();
    }
}
