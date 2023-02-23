let qI = 0
let clockId;  
let time = 60;
const clock = document.getElementById("clock");
const main = document.getElementById("main");

let store = localStorage.players ? JSON.parse(localStorage.players) : [];

const runClock = ()=> {
    time--;
    if(time<1) {
        clearInterval(clockId);
        time = 0;
    }
    clock.innerText = time;
};

const hanAns = val => {
    if(val == questions[qI].C) {
     correctAns.style = "display: block";
     setTimeout(() => {correctAns.style = "display: none"}, 1000)
     }
    else{
        time -= 10;
        wrongAns.style = "display: block";
        setTimeout(() => {wrongAns.style = "display: none"}, 1000)
    } 
    qI++;
    handleQuestion();
}

const endGame = () => {
    clearInterval (clockId);
    clock.innerText = time;
    main.innerHTML = `
        <h1>Done</h1>
        <p>Your final score: ${time}</p>
        <p>Your initials: <input id='initials'> 
        <button onclick='hanEnd()'>Submit</button>
    `;
}

const hanEnd = () => {
    store.push({player:initials.value, score: time});
    store = store.sort((a,b) => b.score - a.score);
    localStorage.players = JSON.stringify(store);

    main.innerHTML = '<h1>HIGHSCORES!!!</h1>';

    store.forEach((pyr,i) => {
        main.innerHTML += `<h3>${i+1}: ${pyr.player} ${pyr.score}</h3>`
    });
}

const handleQuestion= ()=> {
    if(qI==questions.length) return endGame();
    
    let {Q, A} = questions[qI];

    main.innerHTML= `<h1> ${Q} </h1> <div id="ansDiv"></div>`;

    A.forEach(ans => {
        document.getElementById('ansDiv').innerHTML += `<button onclick="hanAns('${ans}')">${ans}</button>`;
    });
};

document.getElementById("start").onclick = () => {
    clockId =setInterval(runClock, 1000);
    handleQuestion();
};




