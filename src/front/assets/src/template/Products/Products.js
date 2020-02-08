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
                
                let product = elem.product,
                    title   = elem.description,
                    img     = product.images[0].resourceUrl,
                    locl    = elem.location.city,
                    id      = elem.id;
                i++

                let activeClass = '' ;
    
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
        // return  `${htmlCtalog}`
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





