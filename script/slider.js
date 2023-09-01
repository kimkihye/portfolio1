//변수설정
const slider_ul = document.querySelector("#slider ul");
const sliders = slider_ul.children;
const lis = slider_ul.querySelectorAll("li");


const btns = document.querySelector(".btns");
const [prev, next] = btns.children;
const pop = document.querySelector(".pop");
const close = pop.querySelector(".close");
const opens = slider_ul.querySelectorAll("a");

// let enableClick = true;

for (let i = 0; i < 3; i++) { slider_ul.prepend(slider_ul.lastElementChild); }

prev.addEventListener("click", () => {
    slider_ul.prepend(slider_ul.lastElementChild);

    for (let el of sliders) el.classList.remove("on");
    sliders[3].classList.add("on");

    // if(enableClick){
    //     for(let el of sliders) el.classList.remove("on");
    //     sliders[3].classList.add("on");
    // }

})

next.addEventListener("click", () => {
    slider_ul.append(slider_ul.firstElementChild);
    for (let el of sliders) el.classList.remove("on");
    sliders[3].classList.add("on");
})
//opens
console.log(opens);
opens.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();

        let txt = e.currentTarget.closest("li").querySelector("h2").innerText;
        console.log(txt);
        pop.querySelector("h2").innerText = txt;


        pop.classList.add("on");
        e.currentTarget.classList.add("off");
        btns.classList.add("off");




    })
})

close.addEventListener("click", () => {
    pop.classList.remove("on");
    btns.classList.remove("off");
    banner_ul.querySelector("li.on a").classList.remove("off");

})