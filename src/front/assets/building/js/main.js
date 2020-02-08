

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


function CreatPersonalArea(url = '') {
    let count = 0;

    if(JSON.parse(localStorage.getItem('products')) ) {
        count = JSON.parse(localStorage.getItem('products')).length
    }

    if(url === '' ) {
        personalArea.innerHTML = `
        <a href='PersonalArea.html' class="personalArea ">
            <div class='userPhoto-default icon-avatarDefault'></div>
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

CreatPersonalArea()

const presentSliderElements = document.querySelectorAll('.presentSlider-element')
let current = 0;


function presentSlider(n) {

    if(presentSliderElements.length != 0) {
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
        const productsStore = localStorageUtil.getProducts('products');
        let htmlCtalog = ''
        let i = 0;
        
      
    
        if(PRODUCT_LIST!== null){
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
                            <span class="icon-Local"> </span>${locl}</span>
                            <div class="products-list-item__bottom">
                                <a href=" " class="products-list-item__watch" data-id=${id}>смотреть</a> 
                            </div>
                        </li>      
                    `
                }
            });
            PRODUCT_LIST.innerHTML = `${htmlCtalog}`
        }
        
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

const cabinetList = document.getElementById('cabinet-list');


function myProfileSeting() {

    
    let options = `<option value="Выберите район:">Выберите район</option>`
    
  
    cabinetProducts.innerHTML = `
    
    <form class='myCabinetOut' id='ProfileSeting'>
            <fieldset>
                <legend class='myCabinetOut__title'>О себе</legend>
    
                <p class='myCabinetOut__box-input'>
                    <label for="name"  class='myCabinetOut__label'>Имя:</label>
                    <input type="text" name="name"   class='myCabinetOut__input'>
                </p>
    
                <p class='myCabinetOut__box-input'>
                    <label for="lastName" class='myCabinetOut__label'>Фамилия:</label>
                    <input type="text" name="lastName" class='myCabinetOut__input'>
                </p>
    
                <p class='myCabinetOut__box-input'>
                    <label for="city" class='myCabinetOut__label'>Город:</label>
                    <input type="text" name="city"  class='myCabinetOut__input'>
                </p>
    
                <p class='myCabinetOut__box-input'>
                    <label for="select" class='myCabinetOut__label' ></label>
                    <select name="select"  class='myCabinetOut__input' style='    width: 105%'>
                        ${options}
                    </select>
                </p>
                
                <p class='myCabinetOut__box-input'>
                    <label for="phone" class='myCabinetOut__label'>Телефон:</label>
                    <input type="text" name="phone"  class='myCabinetOut__input'>
                </p>
    
    
                <h3 class='myCabinetOut__title'>Дети</h3>
                <div class="addChildren">
                    
                    

                    
                </div>

                
    
                <button class='myCabinetOut__btnSave'>Сохранить</button>
            </fieldset>
    `

    addChildren()
    document.querySelector('.cabinet-list').style.height = 100 +'%'
    document.querySelector('.cabinet-list').style.height = cabinetProducts.offsetHeight +'px' 
}


function addChildren() {
    event.preventDefault()
    // создаем новый элемент div
    // и добавляем в него немного контента

    let div = document.createElement("div");
        div.classList.add('childrenList')
        div.innerHTML = `
                        <p class='myCabinetOut__box-input'>
                            <label for="nameChildren" class='myCabinetOut__label'>Имя:</label>
                            <input type="text" name="nameChildren"  class='myCabinetOut__input'>
                        </p>

                        <p class='myCabinetOut__box-input'>
                            <label for="ageChildren" class='myCabinetOut__label'>Возраст:</label>
                            <input type="text" name="ageChildren"  class='myCabinetOut__input'>
                        </p>
                        
                        <p class="myCabinetOut__btnAddChild">
                            <label  for='addChild'>Добавить поле</label>
                            <button name="addChild"  onclick='addChildren()'> </button>
                        </p>
        `;  

    // добавляем только что созданый элемент в дерево DOM

    let my_div = document.querySelector(".addChildren");
    my_div.appendChild(div);
}

const cabinetProducts = document.getElementById('cabinet-products');


const filterLikesElement = (data) => {
    let productsStore = localStorageUtil.getProducts('products');
    let result = [];
    

    if(productsStore !== null ) {

        productsStore.forEach(localid => {

            data.forEach(element => {

                if(element.id == localid) {
                    result.push(element) 
                } 
            }); 
        })
    }
    
    renderMyLikesProducts(result)
}



function renderMyLikesProducts(arr = undefined) {
    let i = 0
    let items = ''
    if (arr !== undefined) {
        arr.forEach( (el )=> {

            let product = el.product,
                title   = el.description,
                img     = product.images[0].resourceUrl,
                locl    = el.location.city,
                id      = el.id;
            i++
            
            if(i <= +ItemsListLength ){
                //   products-list-item__active
                items += `
                    <li class="products-list-item ">
                        <span class="product-like-this icon-star product-like-this__active" 
                                data-id-item="${id}"
                                onclick='productsPage.handleSetLocationStorage(this, "${id}")'>
                        </span>

                        <div class="products-list-item__img-box">
                            <img src="img/cards/${img}" alt="image" class="products-list-item__img">
                        </div>
                    
                        <div class="products-list-item__title">${title}</div>
                        <span class="products-list-item__location ">
                        <span class="icon-Local"> </span>${locl}</span>
                        <div class="products-list-item__bottom">
                            <a href=" " class="products-list-item__watch" data-id=${id}>смотреть</a> 
                        </div>
                    </li>      
                `  
            }
        });
    }
       
    
    creatMyActive(items)
}



function creatMyActive(items ){

    cabinetProducts.innerHTML = `
    
        <div class='myCabinetOut'>
            <h2 class='myCabinetOut__title'>Избранные объявления</h2>
            <ul class='products-list'> 
                ${items}
            </ul>
            
        </div>
    `
    document.querySelector('.cabinet-list').style.height = 50 +'vh' 
    document.querySelector('.cabinet-list').style.height = cabinetProducts.offsetHeight +'px' 
}


const creatMyActivePage = (event) => {
    event.preventDefault();
    
    let target = event.target
    let classElement = target.classList
    
    if(target.dataset.link === 'myProfile'){
        myProfileSeting()

    }else if(target.dataset.link === 'myLikesItem') {
        fetch('goods.JSON')
        .then(response => response.json())
        .then(data => filterLikesElement(data))

}

    
    
}

if (cabinetList){
    cabinetList.addEventListener('click' , creatMyActivePage )
}