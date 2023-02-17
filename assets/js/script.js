let qI = 0
let clockId;  
let time = 60;
const clock = document.getElementById("clock");
const main = document.getElementById("main");

const runClock = ()=> {
    time--;
    if(time<1) {
        clearInterval(clockId);
        time = 0;
    }
    clock.innerText = time;
};

const handleQuestion= ()=> {
    let {Q, A} = questions[qI];

    main.innerHTML= `<h1> ${Q} </h1> <div id="ansDiv"></div>`;

    A.forEach(ans => {
        document.getElementById('ansDiv').innerHTML += `<button onclick="hanAns()">${ans}</button>`;
    });
};

document.getElementById("start").onclick = () => {
    clockId =setInterval(runClock, 1000);
    handleQuestion();
};

