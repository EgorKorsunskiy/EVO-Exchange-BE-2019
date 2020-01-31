const line = document.querySelector('.Home-page-slider__line');
const elements = document.querySelectorAll('.Home-page-slider__element');
const sliderWedtch =  document.querySelector('.Home-page-slider').offsetWidth;
let widthArray = [0];
let lineWidth = 0;
let offset = 0;
let step = 0;

for (let i = 0; i < elements.length; i++) {
    widthArray.push([elements[i].offsetWidth]);
    lineWidth += elements[i].offsetWidth;
}
line.style.width  = lineWidth + 'px'

console.log(line.style.left)



document.querySelector('.Home-page-slider').onclick = function () {
    offset = offset+widthArray[step];
    line.style.left = offset+'px';
    step++
    console.log(line.style.left)
}

// line.addEventListener('click' , slederMove )


// function slederMove(event) {
//     event.preventDefault();
//     offset = offset+widthArray[step];
//     line.style.left = offset+'px';
//     step++
//     console.log('ok')
// }
