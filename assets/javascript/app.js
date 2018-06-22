let goal = new Audio("assets/javascript/goal.wav");
let whistle = new Audio("assets/javascript/whistle.wav");
let whiff = new Audio("assets/javascript/whiff.mp3");
$(document).ready(function () {
    $("#trivia").hide();
    $("#timer").hide();
    $("#red").hide();
    $("#goal").hide();
    $("#miss").hide();
    $("#score").hide();
    $("#end").hide();
    $("#correctAnswer").hide();
    $("#clickToBegin").text("Click The Ball To Begin!");
    $("#start").on("click", () => answer());

})
let intervalId;
let intermissionIntervalId;
let compareAnswer;
let scoreboard = "00:"

const trivia = {
    right: 0,
    wrong: 0,
    unanswered: 0,
    time: 10,
    number: -1,
    intermissionTime: 4,

    questions: [
        `Which team has won the most World Cups with 5?`,
        `Who scored the infamous "Hand Of God" goal in the 1986 World Cup Final?`,
        `Which Italian player missed the final penalty kick in the 1994 World Cup Final?`,
        `Which player won the Golden Ball award in 2002 despite losing in the final?`,
        `Who did Zinadine Zidane headbut in the 2006 World Cup Final?`,
        `South Africa became the first African nation to host the World Cup in which year:`,
        `Which United States player scored in dramatic fashion to beat Algeria in the 2010 World Cup?`,
        `Which goalkeeper set a record for saves in a single match against Belgium in 2014?`,
        `Who has the most career goals in World Cup history?`,
        `Which Mexican player recently tied a record by appearing in his 5th World Cup?`,
    ],

    answers: [
        ["Brazil", "France", "Germany", "Italy"],
        ["Sergio Almirón", "Diego Maradona", "Carlos Tapia", "Sergio Batista"],
        ["Dino Baggio", "Paolo Maldini", "Roberto Baggio", "Daniele Massaro"],
        ["Michael Ballack", "Oliver Kahn", "Miroslav Klose", "Oliver Bierhoff"],
        ["Marco Materazzi", "Gianluigi Buffon", "Alessandro Del Piero", "Francesco Totti"],
        ["2002", "2006", "2010", "2014"],
        ["Clint Dempsey", "Landon Donovan", "Jozy Altidore", "Michael Bradley(is awful)"],
        ["Iker Casillas", "Manuel Neuer", "Joe Hart", "Tim Howard"],
        ["Miroslav Klose", "Pelé", "Ronaldo", "Diego Maradona"],
        ["Javier Hernández", "Rafael Márquez", "Miguel Layún", "Guillermo Ochoa"],
    ],

    correctAnswers: [
        ["Brazil", "Germany and Italy are next with 4."],
        ["Diego Maradona", "With video review, the goal would not stand today."],
        ["Roberto Baggio", "Baggio's miss handed Brazil their 4th World Cup title."],
        ["Oliver Kahn", "Kahn and Germany lost to Brazil in the Final"],
        ["Marco Materazzi", "France ended up losing the title to Italy on penalties."],
        ["2010", "Spain captured their first World Cup title, defeating the Netherlands 1-0 in extra time."],
        ["Landon Donovan", "Donovan scored deep into stopage time to send the U.S. through to the knockout round."],
        ["Tim Howard", "Howard made 16 saves in a 2-1 extra time loss."],
        ["Miroslav Klose", "Klose scored 16 goals in his career. Ronaldo is second with 15."],
        ["Rafael Márquez", "Marquez joins Gianluigi Buffon, Lothar Matthäus, and Antonio Carbajal."],
    ],
    
    gifs: [
        '<img src="assets/images/brazilwin.gif" class="img-responsive">',
        '<img src="assets/images/handofgod.gif" class="img-responsive">',
        '<img src="assets/images/baggio.gif" class="img-responsive">',
        '<img src="assets/images/kahn.gif" class="img-responsive">',
        '<img src="assets/images/zidadne.gif" class="img-responsive">',
        '<img src="assets/images/southafrica.gif" class="img-responsive">',
        '<img src="assets/images/donovan.gif" class="img-responsive">',
        '<img src="assets/images/howard.gif" class="img-responsive">',
        '<img src="assets/images/klose.gif" class="img-responsive">',
        '<img src="assets/images/rafa.gif" class="img-responsive">',
    ],

}

function timer() {
    trivia.time--;
    $("#timer").text(scoreboard + "0" + trivia.time);
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
        $("#welcome").hide();
        $("#red").hide();
        $("#goal").hide();
        $("#miss").hide();
        $("#score").hide();
        $("#trivia").show();
        $("#timer").show();
        $("#timer").text(scoreboard + trivia.time);
        getQuestion();
        clock();
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
    gameStart();
    $("#answer1").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][0]
        console.log(compareAnswer);
        if (compareAnswer === trivia.correctAnswers[trivia.number][0]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number][0]) {
            wrongAnswer();
        }
    })
    $("#answer2").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][1]
        console.log(compareAnswer);
        if (compareAnswer === trivia.correctAnswers[trivia.number][0]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number][0]) {
            wrongAnswer();
        }
    })
    $("#answer3").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][2]
        console.log(compareAnswer);
        if (compareAnswer === trivia.correctAnswers[trivia.number][0]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number][0]) {
            wrongAnswer();
        }
    })
    $("#answer4").on("click", function () {
        compareAnswer = trivia.answers[trivia.number][3]
        console.log(compareAnswer);
        if (compareAnswer === trivia.correctAnswers[trivia.number][0]) {
            rightAnswer();
        }
        else if (compareAnswer != trivia.correctAnswers[trivia.number][0]) {
            wrongAnswer();
        }
    })
}

function rightAnswer() {
    goal.play();
    clearInterval(intermissionIntervalId);
    intermissionClock();
    $("#trivia").hide();
    $("#timer").hide();
    $("#goal").text("GOOOOOAL!!!");
    $("#red").hide();
    $("#miss").hide();
    $("#score").hide();
    $("#header").show();
    $("#goal").show();
    $("#correctAnswer").show();
    $("#intermission").show();
    $("#intermission").html(trivia.gifs[trivia.number]);
    $("#correctAnswer").text("CORRECT! " + trivia.correctAnswers[trivia.number][1]);
    trivia.right++;
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
    whistle.play();
    clearInterval(intermissionIntervalId);
    intermissionClock();
    console.log(trivia.time);
    $("#trivia").hide();
    $("#timer").hide();
    $("#red").text("RED CARD!!!");
    $("#goal").hide();
    $("#miss").hide();
    $("#score").hide();
    $("#header").show();
    $("#red").show();
    $("#intermission").show();
    $("#correctAnswer").show();
    $("#intermission").html(trivia.gifs[trivia.number]);
    $("#correctAnswer").text("WRONG! The correct answer was " + trivia.correctAnswers[trivia.number][0] + "! " + trivia.correctAnswers[trivia.number][1]);
    trivia.wrong++;
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
    whiff.play();
    intermissionClock();
    clearInterval(intervalId);
    console.log(trivia.time);
    $("#trivia").hide();
    $("#timer").hide();
    $("#miss").text("PAY ATTENTION!!!");
    $("#goal").hide();
    $("#red").hide();
    $("#score").hide();
    $("#header").show();
    $("#miss").show();
    $("#intermission").show();
    $("#correctAnswer").show();
    $("#intermission").html(trivia.gifs[trivia.number]);
    $("#correctAnswer").text("The correct answer was " + trivia.correctAnswers[trivia.number][0] + "! " + trivia.correctAnswers[trivia.number][1]);
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
    $("#clickToBegin").text("Click Here To Try Again!")
    $("#trivia").hide();
    $("#correctAnswer").hide();
    $("#intermission").hide();
    $("#red").hide();
    $("#goal").hide();
    $("#miss").hide();
    $("#score").show();
    $("#clickToBegin").show();
    $("#timer").hide();
    $("#score").text(`THE REF HAS SIGNALED
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
    $("#clickToBegin").on("click", () => answer());
}