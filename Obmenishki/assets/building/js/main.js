

class LocalStorageUtil {
    constructor(){
        this.keyName = 'products';
    }


    getProducts(){
        const productsLocalStorag = localStorage.getItem(this.keyName);
        if (productsLocalStorag !== null) {
            return JSON.parse(productsLocalStorag);
        }
        return [];
    }

    putProducts(id){
        let products = this.getProducts();
        let pushProducts = false;
        const index = products.indexOf(id);

        if(index === -1) {
            products.push(id);
            pushProducts = true
        }else {
            products.splice(index, 1)
        }

        localStorage.setItem(this.keyName, JSON.stringify(products))

        return { pushProducts,products }


    }
}

const localStorageUtil = new LocalStorageUtil();
const personalArea = document.getElementById('personalArea')
const navbar       = document.querySelector('.navbar')


function CreatPersonalArea(url) {
    let count = 0;

    if(JSON.parse(localStorage.getItem('products')) ) {
        count = JSON.parse(localStorage.getItem('products')).length
    }

    if(url === '' ) {
        personalArea.innerHTML = `
        <a href='#' class="personalArea ">
            <div class='userPhoto-default icon-user2'></div>
            <span class='personalArea-text' >Мой кабинет</span>
            <div class='personalAreaCounter'>${count}</div>
        </a>
        
        `
    } else {
        personalArea.innerHTML = `
        <a href='#' class="personalArea">
            <img src='${url}' class='userPhoto'></img>
            <span class='personalArea-text'>Мой кабинет</span>
            <div class='personalAreaCounter'>${count}</div>
        </a>
        `
    }
}

function LikeClick(){
    document.querySelector('.personalAreaCounter').innerHTML = `${JSON.parse(localStorage.getItem('products')).length}`
}
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
const PRODUCT_LIST = document.getElementById('products-list');
const LIKE_THIS    = document.querySelectorAll('.product-like-this');

const randomSort = (item) => item.sort( () => Math.random() - 0.5 );

let ItemsListLength = 8; // 8 придел количества отображаемых элементов на странице


class Products{


    handleSetLocationStorage (el, id){
        const { pushProducts,products } = localStorageUtil.putProducts(id)

        if(pushProducts) {
            el.classList.add('product-like-this__active')

        }else {
            el.classList.remove('product-like-this__active')

        }
        LikeClick()
    }



    render(data) {
        const productsStore = localStorageUtil.getProducts();
        let htmlCtalog = ''
        let i = 0;
        let avatar = ''
        CreatPersonalArea(avatar)

        data.forEach( (elem )=> {

            let activeClass = '' ;

            let product = elem.product,
                title   = elem.description,
                img     = product.images[0].resourceUrl,
                locl    = elem.location.city,
                id      = elem.id;
            i++

            if(productsStore.indexOf(id) === -1){
                activeClass = ''
            }else {
                activeClass = ' product-like-this__active';
            }

            if(i <= +ItemsListLength ){
                //   products-list-item__active
                htmlCtalog += `
                    <li class="products-list-item ">
                        <span class="product-like-this icon-star ${activeClass}" 
                                data-id-item="${id}"
                                onclick='productsPage.handleSetLocationStorage(this, "${id}")'>
                                </span>

                        <div class="products-list-item__img-box">
                            <img src="img/cards/${img}" alt="image" class="products-list-item__img">
                        </div>
                    
                        <div class="products-list-item__title">${title}</div>
                        <span class="products-list-item__location ">
                        <span class="icon-Facebook-Places"> </span>${locl}</span>
                        <a href=" " class="products-list-item__watch" data-id=${id}>смотреть</a> 
                        </li>      
                    `
            }




        });

        PRODUCT_LIST.innerHTML = `${htmlCtalog}`

    }

}

const productsPage = new Products();

// productsPage.render();

function getData(){
    fetch('goods.JSON')
        .then(response => response.json())
        .then(data => productsPage.render(randomSort(data)))
}

getData()
const HSline = document.querySelector('.Home-page-slider__line');
const HSelements = document.querySelectorAll('.Home-page-slider__inner');
const HSsliderWidth =  document.querySelector('.Home-page-slider').offsetWidth;
let HSwidthArray = [0];
let HSlineWidth = 0;
let HSoffset = 0;
let HSstep = 0;
let HSbalance = 0

for (let i = 0; i < HSelements.length; i++) {
    HSwidthArray.push([HSelements[i].offsetWidth]);
    HSlineWidth += HSelements[i].offsetWidth  ;
}
HSline.style.width  = HSlineWidth + 'px'


document.querySelector('.Home-page-slider').onclick = HomeSliderMove;

function HomeSliderMove() {
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