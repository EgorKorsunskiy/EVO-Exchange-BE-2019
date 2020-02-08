const HSline = document.querySelector('.Home-page-slider__line');
const HSelements = document.querySelectorAll('.Home-page-slider__inner');
let HSwidthArray = [0];
let HSlineWidth = 0;
let HSoffset = 0;
let HSstep = 0;
let HSbalance = 0

if (HSelements.length !== 0) {
    
for (let i = 0; i < HSelements.length; i++) {
    HSwidthArray.push([HSelements[i].offsetWidth]);
    HSlineWidth += HSelements[i].offsetWidth  ;
}
HSline.style.width  = HSlineWidth + 'px'


document.querySelector('.Home-page-slider').onclick = HomeSliderMove;

function HomeSliderMove() {

    const HSsliderWidth =  document.querySelector('.Home-page-slider').offsetWidth;

    HSbalance = HSlineWidth - HSsliderWidth - (+HSoffset + Number(HSwidthArray[HSstep]))

    if(HSbalance >= 0 ) {
        HSoffset = HSoffset + Number(HSwidthArray[HSstep]);
        let offsets = Number(HSoffset)
        HSline.style.left = Number(- offsets)+'px' ;

    }else {
        HSline.style.left = -(HSlineWidth - HSsliderWidth) + 'px'
        HSoffset  = 0;
        HSstep = -1;
    }

    if (HSstep + 1  === HSelements.length) {
        HSstep = 0;
        HSoffset = 0;
    }else {
        HSstep++
    }

}
HomeSliderMove()

setInterval(HomeSliderMove , 5000)



}
