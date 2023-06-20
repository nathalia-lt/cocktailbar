import { setToStorage, getFromStorage } from "./services/localStorage.js";

// pegamos o objeto do local storage
const storageLikes = getFromStorage('cocktails-app')
console.log(storageLikes)
// transformamos em uma array => Object.entries(storageLikes)
// e iniciamos o Map com esta array
let likes = storageLikes ? new Map(Object.entries(storageLikes)) : new Map()

console.log(likes)
//Mapeamento de likes (key => value)
//id => {name, imageUrl}

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
  // take the response, which is a JSON-formatted **string**,
  // and parse it into an actual JavaScript **object**
    .then(function (response) {
        console.log(response);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        return response.json();
    })
    .then(function (data){
        console.log(data)
        drinksToDisplay(data.drinks)
    })
    .catch(function (error){
        console.log(error)
        console.log(error.message)
    })



function drinkTemplate(drink){

    const likedClass = likes.has(drink.idDrink) ? 'liked' : ''

    return `
    <div class="section-drink">
        <a href="/drink/?id=${drink.idDrink}">
            <article>
                <img class="cocktail-photo" src="${drink.strDrinkThumb}" alt="cocktail">
                <div class="fav-container">
                <h2>${drink.strDrink}</h2>
                <button class="fav-button" data-id="${drink.idDrink}" data-name="${drink.strDrink}" data-url="${drink.strDrinkThumb}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${likedClass}">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
                </div>
            </article>
        </a>
    </diV>`
}

function drinksToDisplay(drinks){
    const sectionDrinks = document.getElementById('section-drinks')
    sectionDrinks.innerHTML = ''
    drinks.forEach(drink => {
        sectionDrinks.innerHTML += drinkTemplate(drink)
    });
    setTimeout(addListenersToFavButtons, 50);
}

const searchForm = document.getElementById('search-form')

searchForm.addEventListener('keyup', (e) =>{
    e.preventDefault()
    // console.log(e)
    const input = searchForm.querySelector('input')
    const value = input.value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
  // take the response, which is a JSON-formatted **string**,
  // and parse it into an actual JavaScript **object**
    .then(function (response) {
        console.log(response);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        return response.json();
    })
    .then(function (data){
        console.log(data)
        drinksToDisplay(data.drinks)
    })
    .catch(function (error){
        console.log(error.message)
    })
})



function addListenersToFavButtons(){
    const favButtons = document.querySelectorAll('.fav-button') //css
    favButtons.forEach(btn =>{
        btn.addEventListener('click', (e) =>{
            e.preventDefault() // <a><button></button></a> logo quando clicamos em cima o elemento mais externo é que vai receber o clique, o elemento a, depois o clique é passado para os outros elemntos da pilha

            // desestruturação do dataset
            const {id, name, url} = btn.dataset
            // const id = btn.dataset.id
            // const name = btn.dataset.name
            // const url = btn.dataset.url

            const svg = btn.querySelector('svg')

            if (likes.has(id)) {
                likes.delete(id)
                svg.classList.remove('liked')
            } else {
                likes.set(id, {name, url})
                svg.classList.add('liked')
            }
            setToStorage('cocktails-app', Object.fromEntries(likes))
            console.log('likes', likes)
            console.log(likes.size)
        })
    })
}



const moreLessBtn = document.getElementById('more')
moreLessBtn.addEventListener('click', () =>{
    const sectionDrinks = document.getElementById('section-drinks')
    sectionDrinks.classList.toggle('more-btn')
    if (moreLessBtn.innerText === 'show more'){
        moreLessBtn.innerText = 'show less'
    }else{
        moreLessBtn.innerText = 'show more'
    }
})


