const btnOpen = document.querySelector(".btnOpen");
const aside = document.querySelector("aside");
const btnClose = document.querySelector(".btnClose");

let _top = aside.querySelector(".top");
let _right = aside.querySelector(".right");
let _bottom = aside.querySelector(".bottom");
let _left = aside.querySelector(".left");
let inner = aside.querySelector(".inner");

let section = document.querySelector("section");


btnOpen.addEventListener("click",(e)=>{
    e.preventDefault();

    // 1단계 main의 그림들을 사라지게 함
    section.classList.add("on");

    aside.style.display = "block";
    // 선을 그려줌 - 콜백을 이용해서 순차적으로 그려줌
    new Anim(_top,{
        prop : "width",
        value: "100%",
        duration: 500,
        callback: ()=>{
            new Anim(_right,{
                prop : "height",
                value: "100%",
                duration: 500,
                callback: ()=>{
                    new Anim(_bottom,{
                        prop : "width",
                        value: "100%",
                        duration: 500,
                        callback: ()=>{
                            new Anim(_left,{
                                prop : "height",
                                value: "100%",
                                duration: 500,
                                callback: ()=>{
                                    new Anim(inner,{
                                        prop : "opacity",
                                        value: "1",
                                        duration: 500
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

})

btnClose.addEventListener("click",(e)=>{
    e.preventDefault();

    new Anim(inner,{
        prop : "opacity",
        value: "0",
        duration: 500,
        callback: ()=>{
            // 사라질 때는 선이 한 번에 사라지도록 대신에 이너가 사라진 다음에..
            new Anim(_top,{
                prop : "width",
                value: "0%",
                duration: 500
            });
            new Anim(_right,{
                prop : "height",
                value: "0%",
                duration: 500
            });
            new Anim(_bottom,{
                prop : "width",
                value: "0%",
                duration: 500
            });
            new Anim(_left,{
                prop : "height",
                value: "0%",
                duration: 500,
                callback: ()=>{
                    aside.style.display = "none";
                    section.classList.remove("on");

                }
            });
        }
    })
})
