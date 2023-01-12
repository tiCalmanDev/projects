// need to get the high score from the app document, numCorrect, so that i can set it as local storage, 
// as an object with the username

const username = document.getElementById('playername');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
 
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; console.log(highScores);

const MAX_HIGH_SCORES = 5;

finalScore.innerText  = mostRecentScore;
 
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score)
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('highscore.html');

}