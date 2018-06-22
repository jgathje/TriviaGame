$(document).ready(function () {
    $("#trivia").hide();
    $("#timer").hide();
    $("#end").hide();
    $("#header").text("WORLD CUP TRIVIA");
    $("#clickToBegin").text("Click The Ball To Begin!");
    $("#start").on("click", () => gameStart());

})
let intervalId;
let intermissionIntervalId;
let compareAnswer;

const trivia = {
    right: 0,
    wrong: 0,
    unanswered: 0,
    time: 10,
    number: -1,
    intermissionTime: 4,

    questions: [
        `Who scored the infamous "Hand Of God" goal in the 1986 World Cup Final?`,
        `Which Italian player missed the final penalty kick in the 1994 World Cup Final?`,
        `Which player won the Golden Ball award in 2002 despite losing in the final?`,
        `Who did Zinadine Zidane headbut in the 2006 World Cup Final?`,
        `South Africa became the first African nation to host the World Cup in which year:`,
        `Which United States player scored in dramatic fashion to beat Ghana in the 2010 World Cup?`,
        `Which goalkeeper set a record for saves in a single match against Belgium in 2014?`,
        `Which team has won the most World Cups with 5?`,
        `Who is the only host country to ever win a World Cup?`,
        `Which Mexican player recently tied a record by appearing in his 5th World Cup?`,
    ],

    answers: [
        ["Sergio Almirón", "Diego Maradona", "Carlos Tapia", "Sergio Batista"],
        ["Dino Baggio", "Paolo Maldini", "Roberto Baggio", "Daniele Massaro"],
        ["Michael Ballack", "Oliver Kahn", "Miroslav Klose", "Oliver Bierhoff"],
        ["Marco Materazzi", "Gianluigi Buffon", "Alessandro Del Piero", "Francesco Totti"],
        ["2002", "2006", "2010", "2014"],
        ["Clint Dempsey", "Landon Donovan", "Jozy Altidore", "Michael Bradley(is awful)"],
        ["Iker Casillas", "Manuel Neuer", "Joe Hart", "Tim Howard"],
        ["Brazil", "France", "Germany", "Italy"],
        ["France", "Germany", "England", "Mexico"],
        ["Javier Hernández", "Rafael Márquez", "Miguel Layún", "Guillermo Ochoa"],
    ],

    correctAnswers: [
        "Diego Maradona",
        "Roberto Baggio",
        "Oliver Kahn",
        "Marco Materazzi",
        "2010",
        "Landon Donovan",
        "Tim Howard",
        "Brazil",
        "France",
        "Rafael Márquez",
    ],

}

function timer() {
    trivia.time--;
    $("#timer").html("<h1>" + trivia.time + "</h1>");
    console.log(trivia.time);
    console.log(trivia.intermissionTime);
    if (trivia.time === 0) {
        noAnswer();
    }

}
function clock() {
    clearInterval(intermissionIntervalId);
    intervalId = setInterval(timer, 1000);
}

function intermissionTimer() {
    trivia.intermissionTime--;
    console.log(trivia.intermissionTime);
    if (trivia.intermissionTime === 0) {
        gameStart();
    }
}

function intermissionClock() {
    clearInterval(intervalId);
    intermissionIntervalId = setInterval(intermissionTimer, 1000);
}

function gameStart() {
    trivia.number++;
    console.log("Trivia num " + trivia.number)
    console.log("Question length " + trivia.questions.length)
    if (trivia.number === trivia.questions.length) {
        gameOver();
    }
    else {
        trivia.intermissionTime = 4;
        clearInterval(intermissionIntervalId);
        $("#correctAnswer").hide();
        $("#clickToBegin").hide();
        $("#intermission").hide();
        $("#end").hide();
        $("#start").hide();
        $("#header").hide();
        $("#trivia").show();
        $("#timer").show();
        $("#timer").html("<h1>" + trivia.time + "</h1>");
        getQuestion();
        clock();
        answer();
    }
}

function getQuestion() {
    $("#question").text(trivia.questions[trivia.number]);
    $("#answer1").text(trivia.answers[trivia.number][0]);
    $("#answer2").text(trivia.answers[trivia.number][1]);
    $("#answer3").text(trivia.answers[trivia.number][2]);
    $("#answer4").text(trivia.answers[trivia.number][3]);
}

function answer() {
    $("#answer1").on("click", function () {
        clearInterval(intervalId);
        compareAnswer = trivia.answers[trivia.number][0]
        console.log(compareAnswer);
        if (compareAnswer === trivia.correctAnswers[trivia.number]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number]) {
            wrongAnswer();
        }
    })
    $("#answer2").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][1]
        console.log(compareAnswer);
        if (compareAnswer === trivia.correctAnswers[trivia.number]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number]) {
            trivia.wrong++;
            wrongAnswer();
        }
    })
    $("#answer3").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][2]
        console.log(compareAnswer);
        if (compareAnswer === trivia.correctAnswers[trivia.number]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number]) {
            wrongAnswer();
        }
    })
    $("#answer4").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][3]
        console.log(compareAnswer);
        if (compareAnswer === trivia.correctAnswers[trivia.number]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number]) {
            wrongAnswer();
        }
    })
}

function rightAnswer() {
    clearInterval(intermissionIntervalId);
    intermissionClock();
    $("#trivia").hide();
    $("#timer").hide();
    $("#header").text("GOOOOOAL!!!");
    $("#header").show();
    $("#correctAnswer").show();
    $("#intermission").show();
    $("#intermission").html('<img src="assets/images/correct.gif">');
    $("#correctAnswer").text("CORRECT! It was " + trivia.correctAnswers[trivia.number] + "!");
    trivia.right += 1;
    trivia.time = 10;
    $("#timer").html("<h4>" + trivia.time + "</h4>");
    console.log("R" + trivia.right);
    console.log('W' + trivia.wrong);
    console.log("UA" + trivia.unanswered);
    console.log("Trivia time" + trivia.time);
    console.log("Trivia number" + trivia.number);
    clearInterval(intervalId);
    compareAnswer = "";
}

function wrongAnswer() {
    clearInterval(intermissionIntervalId);
    intermissionClock();
    console.log(trivia.time);
    $("#trivia").hide();
    $("#timer").hide();
    $("#header").text("RED CARD!!!");
    $("#header").show();
    $("#intermission").show();
    $("#correctAnswer").show();
    $("#intermission").html('<img src="assets/images/wrong.gif">');
    $("#correctAnswer").text("WRONG! The correct answer was " + trivia.correctAnswers[trivia.number] + "!");
    trivia.wrong += 1;
    trivia.time = 10;
    $("#timer").html("<h4>" + trivia.time + "</h4>");
    console.log("R" + trivia.right);
    console.log('W' + trivia.wrong);
    console.log("UA" + trivia.unanswered);
    clearInterval(intervalId);
    compareAnswer = "";
    console.log(compareAnswer);
}

function noAnswer() {
    intermissionClock();
    clearInterval(intervalId);
    console.log(trivia.time);
    $("#trivia").hide();
    $("#timer").hide();
    $("#header").text("It's like you didn't even try!?!");
    $("#header").show();
    $("#intermission").show();
    $("#correctAnswer").show();
    $("#intermission").html('<img src="assets/images/noanswer.gif">');
    $("#correctAnswer").text("WRONG! The correct answer was " + trivia.correctAnswers[trivia.number] + "!");
    trivia.unanswered++;
    trivia.time = 10;
    $("#timer").html("<h4>" + trivia.time + "</h4>");
    console.log("R" + trivia.right);
    console.log('W' + trivia.wrong);
    console.log("UA" + trivia.unanswered);
    clearInterval(intervalId);
}

function gameOver() {
    clearInterval(intermissionIntervalId);
    clearInterval(intervalId);
    console.log(trivia.unanswered);
    $("#trivia").hide();
    $("#correctAnswer").hide();
    $("#intermission").hide();
    $("#start").show();
    $("#clickToBegin").show();
    $("#timer").hide();
    $("#header").text(`THE REF HAS SIGNALED
    FULL TIME!`);
    $("#header").show();
    $("#end").show();
    $("#goals").text("Goals scored: " + trivia.right);
    $("#redcards").text("Red cards issued: " + trivia.wrong);
    $("#missedpks").text("Missed penalty kicks: " + trivia.unanswered);
    trivia.right = 0;
    trivia.wrong = 0;
    trivia.unanswered = 0;
    trivia.time = 10;
    trivia.number = -1;
    trivia.intermissionTime = 4;
}