//변수설정
const frame = document.querySelector("#banner");
const panels = frame.querySelectorAll(".panel li");
const btnss = frame.querySelectorAll(".btns li");
const btnPlay = frame.querySelector(".fa-play");
const btnStop = frame.querySelector(".fa-stop");
const bar = frame.querySelector(".bar");

const len = panels.length - 1;//index의 값과 일치하도록 -1을함
let num = 0;
let timer = null;
const interval = 5000; //롤링 반복 시간


startRolling();


//적용하는 대상으로는 동작 3가지
//1.btns를 클릭하면 해당 인덱스로 이동하는 동작
btnss.forEach((el, index) => {
    el.addEventListener("click", () => {
        active(index);
        stopRolling();
    });
})

//2.play btn을 클릭하면 자동롤링이 시작
btnPlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("on")) {
        return;
    } else {
        startRolling();
    }
});

//3.stop btn을 클릭하면 자동롤링이 멈춤
btnStop.addEventListener("click", stopRolling);


//적용하는 기능을 담은 함수를 생성

//1 롤링 시작기능
function startRolling() {
    bar.style.display = "block"; //1
    setTimeout(progress, 0);  //2

    active(num);
    //언제나 1이 먼저 실행되고 2가 이후에 실행됩니다
    // setInterval(()=>{},시간)
    //setInterval 콜백함수를 시간마다 계속 실행하도록 요청합니다
    //단점 : 리소스 찌꺼기가 남아요
    timer = setInterval(rolling, interval);

    btnPlay.classList.add("on");
    btnStop.classList.remove("on");
}

//2롤링을 멈추는 기능
function stopRolling() {
    bar.style.display = "none";
    clearInterval(timer);
    // setInterval이 만든 리소스 찌꺼기를 깔끔하게 청소해줍니다
    btnStop.classList.add("on");
    btnPlay.classList.remove("on");
}

//3. on클래스로 활성화 기능
function active(index) {
    //클릭을 하는 순간
    //모든 panels와 btns들에 on을 일시적으로 지우고
    //클릭한 인덱스에 해당하는 panels인덱스와 btns인덱스에만 on을 붙입니다
    for (let el of panels) el.classList.remove("on");
    for (let el of btnss) el.classList.remove("on");
    panels[index].classList.add("on");
    btnss[index].classList.add("on");
    num = index;
    //전역변수num을 active함수에서 함수가 실행되면서 변경된 index로
    //전역변수num을 갱신하도록 합니다
    bar.style.width = "0%";
}

//3-1 싱크를 맞추는 롤링함수
function rolling() {
    //여기에서 전역변수num의 값과 len의 값을 비교해서
    //순환을 시켜줍니다
    if (num < len) {
        num++;
    } else {
        num = 0;
    }
    active(num);
    progress();

}

//4. bar를 움직이는 기능
function progress() {

    const init = parseInt(bar.style.width) || 0;
    // const targetValue = 100;
    const unit = "%";
    const startTime = performance.now();
    function animate(time) {
        const realTime = time - startTime;
        const prog = realTime / interval;
        //prog의 값은 0~1사이의 값이 됩니다
        const currentValue = init + 100 * prog;
        //시작은 0 끝은 100
        bar.style.width = `${currentValue}${unit}`;

        if (prog < 1) {
            requestAnimationFrame(animate);
        } else if (prog >= 1) {
            bar.style.width = "0%";
            // if (typeof callback === "function") callback();
        }

    }
    requestAnimationFrame(animate);
    //requestAnimationFrame메소드안에 함수를 호출해서 실행해야하므로 
    // requestAnimationFrame(animate);이 렇게 작성해야합니다
    // requestAnimationFrame(animate());
    //이 내용은 함수의 값을 requestAnimationFrame에 매개변수로 넣는다는 의미
}