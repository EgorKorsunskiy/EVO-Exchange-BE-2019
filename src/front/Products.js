const PRODUCT_LIST = document.getElementById('products-list');
const LIKE_THIS    = document.querySelectorAll('.product-like-this');

const randomSort = (item) => item.sort( () => Math.random() - 0.5 );

let ItemsListLength = 8 // 8 придел чоличества отображаемых элементов на страницэ. чтоб сделать динамческую длину привязать переменную к импуту
class Products{



    render(data) {
        
        
        let htmlCtalog = ''
        let i = 0;
        let activeClss = '' 

        
        randomSort(data)

        data.forEach( (elem )=> {
            let product = elem.product,
                title   = elem.description,
                img     = product.images[0].resourceUrl,
                locl    = elem.location.city,
                id      = elem.id;
                i++

                if(localStorage.getItem(`products:${id}`)){
                    ;
                    activeClss = ' product-like-this__active'
                }else {
                    activeClss = '';
                }

                if(i <= ItemsListLength ){
                    //   products-list-item__active
                    htmlCtalog += `
                    <li class="products-list-item ">
                        <span class="product-like-this icon-star ${activeClss}" data-id-item="${id}"
                        ></span>

                        <div class="products-list-item__img-box">
                            <img src="img/cards/${img}" alt="image" class="products-list-item__img">
                        </div>
                    
                        <div class="products-list-item__title">${title}</div>
                        <span class="products-list-item__location icon-Facebook-Places">${locl}</span>
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
    fetch('goods.json')
    .then(response => response.json())
    .then(productsPage.render)
}

getData()


PRODUCT_LIST.addEventListener('click' , localStorageProducts)

