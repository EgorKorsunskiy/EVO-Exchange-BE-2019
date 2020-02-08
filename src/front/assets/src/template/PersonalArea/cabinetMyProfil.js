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
