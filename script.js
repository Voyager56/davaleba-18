//1
const clock = document.querySelector(`.clock`);
let time = document.createElement(`div`);
time.className = `time`;
clock.appendChild(time);
const now = new Date();
let hours = now.getHours(),minutes = now.getMinutes(),seconds = now.getSeconds();
const tempTime = document.querySelector(`.time`);
tempTime.innerText = formatTime(hours,minutes,seconds);

setInterval(() => {
    const now = new Date();
    let hours = now.getHours(),minutes = now.getMinutes(),seconds = now.getSeconds();
    tempTime.innerText = formatTime(hours,minutes,seconds)  
}, 1000)

function formatTime(hours,minutes,seconds){
    let ampm = ``
    if(hours < 12 && hours > 0){ 
        ampm = `AM`
    }else{
        ampm = `PM`
    }
    if( hours >= 24) { 
        hours -= 24;
    }else if( hours > 12 ){ 
        hours -= 12;  }
    if(hours === 0){
        ampm = `AM`
     }
    return `${checkZeroes(hours)}:${checkZeroes(minutes)}:${checkZeroes(seconds)} ${ampm} `
}

function checkZeroes(unformatedTime){
    if (unformatedTime < 10) {
        unformatedTime = "0" + unformatedTime
    };
    return unformatedTime;
}


//2
const slides = document.querySelectorAll('.slide-item');
const slidesLength = slides.length;
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
const stopBtn = document.querySelector('#stop-sliding');
const startBtn = document.querySelector('#start-sliding');
let activeIndex = 0;

function renderSlider() {
    slides.forEach((element, index) => {
    element.style.transform = `translateX(${100 * (index - activeIndex % slidesLength)}%)`;
  })
}

renderSlider();

function nextSlide() {
  if(activeIndex === (slidesLength - 1)){
    activeIndex = 0;
  } else {
    activeIndex = activeIndex + 1;
}
  renderSlider();
  grayDot();
}

function prevSlide() {
    if(activeIndex === 0){
        activeIndex = slidesLength - 1;
    } else {
        activeIndex = activeIndex - 1;
    }
    renderSlider();
    grayDot( )
}

nextButton.addEventListener('click', (e) => {
    nextSlide();
});
prevButton.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
  if(e.code === 'ArrowRight'){
    nextSlide();
}
  if(e.code === 'ArrowLeft'){
      prevSlide();
  }
});

let intervalId = null;
let startClicked = false;
function startAutoSliding() {
  if(!intervalId){
    intervalId = setInterval(() => {
      nextSlide();
    }, 3000);
}
}

function stopAutoSliding() {
  clearInterval(intervalId);
  intervalId = null;
}

stopBtn.addEventListener('click', (e) => {
    stopAutoSliding()
    startClicked = false;
});

startBtn.addEventListener('click', (e) => {
    startAutoSliding()
    startClicked = true;
});

slides.forEach(slide => { 
    slide.addEventListener('mouseenter',(e) => {
        if (startClicked) {            
            stopAutoSliding()
        }
    });
    slide.addEventListener('mouseleave',(e) => {
        if (startClicked) {            
            startAutoSliding()
        }
    }); 
});


//3
const buttonDiv = document.querySelector(`.buttons`)
for(let i =0; i<slides.length;i++){
    const dot = document.createElement(`div`)
    dot.className = `${i}`;
    buttonDiv.appendChild(dot)
}

const dotArray = Array.from(buttonDiv.childNodes);
dotArray.shift();

function grayDot( ){ 	
    slides.forEach((slide,index )=>{ 
        let dotI = dotArray[index]
        if(slide.style.transform === `translateX(0%)`){ 
            dotI.style.opacity = `1`
        }else{ 
            dotI.style.opacity = `0.5`
        }
    })
}
grayDot();
dotArray.forEach((dot)=>{
    dot.addEventListener('click', (e) => {
        dotArray.forEach(grayDot =>{
        grayDot.style.opacity = `0.5`
        })
        e.target.style.opacity = `1`
        activeIndex = Number(e.target.className)
        slides.forEach((slide,indexSlide)=>{ 
            if(indexSlide === activeIndex){
                renderSlider()
            }
        })
    })
});

//4
const students = [-1, -3, 4, 2];
const angryProffesor = (k,students) => {
    let counter = 0;
    students.forEach(student => { 
        counter += (student > 0)? 0 : 1;
    })
    return (k > counter)? `YES` : `NO`;
}


// const angryProffesor = (k,students) => {
//     students.sort();
//     return (students[k-1] > 0)? `YES` : `NO`;
// }	    