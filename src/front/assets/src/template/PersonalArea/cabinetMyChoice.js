
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

