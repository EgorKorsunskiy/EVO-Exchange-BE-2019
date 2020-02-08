
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
