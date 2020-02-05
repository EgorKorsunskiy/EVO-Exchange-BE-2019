const presentSliderElements = document.querySelectorAll('.presentSlider-element')
let current = 0;


function presentSlider(n) {

    presentSliderElements[current].classList.add('opasity')

    current = n + current;


    if(current >= presentSliderElements.length){
        current = 0
    }

    if(current < 0) {
        current = presentSliderElements.length - 1
        presentSliderElements[current].classList.remove('opasity')
    }else if (current < presentSliderElements.length){
        presentSliderElements[current].classList.remove('opasity')
    }

}
presentSlider(0)


function presentSliderAutoMove (){



    for(let i = 0; i < 3; i++) {
        let n = 1
        if(i%2 != 0){
            n = -1
        }

        setInterval(() => {
            presentSlider(n)
        }, 3000);
    }
}
presentSliderAutoMove()