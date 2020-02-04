const personalArea = document.getElementById('personalArea')
const navbar       = document.querySelector('.navbar')


function CreatPersonalArea(url) {
    let count = JSON.parse(localStorage.getItem('products')).length
   
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



