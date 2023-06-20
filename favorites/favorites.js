import { setToStorage, getFromStorage } from "../services/localStorage.js";



function favoritesToDisplay(){
    // pegamos o objeto do local storage
    const storageLikes = getFromStorage('cocktails-app')
    console.log(storageLikes)
    // pegamos o elemento do html
    const favContainer = document.getElementById('fav-container')
    Object.values(storageLikes).forEach(drink => {
        favContainer.innerHTML +=favoriteTemplate(drink)
    });
}

function favoriteTemplate(drink){
    return `
    <div class='fav-drink'>
        <img width="200px" src='${drink.url}' />
        <p>${drink.name}</p>
    </div>
    `
}


favoritesToDisplay()