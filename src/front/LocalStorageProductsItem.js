let arr = []


function localStorageProducts(event){
    const target = event.target
    const targetID = event.target.dataset.idItem;

    if( !localStorage.getItem(`products:${targetID}`) &&
        targetID !== undefined ) {
        localStorage.setItem(`products:${targetID}` , `${targetID}`)

        target.classList.add('product-like-this__active')
    }else {
        localStorage.removeItem(`products:${targetID}`)
        target.classList.remove('product-like-this__active')  
    }
  
    
}