const PRODUCT_LIST = document.getElementById('products-list');

const randomSort = (item) => item.sort( () => Math.random() - 0.5 );

console.log(PRODUCT_LIST)

class Products{

    render(data) {
        
        let htmlCtalog = ''
        let i = 0;

        randomSort(data)
        console.log(data)

        data.forEach( (elem )=> {
            let product = elem.product,
                title   = elem.description,
                img     = product.images[0].resourceUrl,
                locl    = elem.location.city,
                id      = elem.id;
                i++

                if(i < 9 ){
                    //   products-list-item__active
                    htmlCtalog += `
                    <div class="products-list-item ">
                        <span class="product-like-this"></span>

                        <div class="products-list-item__img-box">
                            <img src="img/cards/${img}" alt="image" class="products-list-item__img">
                        </div>
                    
                        <div class="products-list-item__title">${title}</div>
                        <div class="products-list-item__location">${locl}</div>
                        <a href=" " class="products-list-item__watch" data-id=${id}>смотреть</a> 
                     </div>      
                    `
                    console.log(locl)
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