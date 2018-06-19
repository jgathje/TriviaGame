let right = 0;
let wrong = 0;


$(document).ready(function () {
    $("#questions").hide();
    $("#header").text("Time For Trivia!");
    $("#start").on("click", () => gameStart());
    $("#right").on("click", () => {right++; console.log(right)});
    $("#wrong1").on("click", () => {wrong++; console.log(wrong)});
    $("#wrong2").on("click", () => {wrong++; console.log(wrong)});
    $("#wrong3").on("click", () => {wrong++; console.log(wrong)});
})

const gameStart = () => {
    $("#start").hide();
    $("#questions").show();
    setTimeout(function() {
        gameTime();
      }, 5000000000);
}

const gameTime = () => alert("Time Up")