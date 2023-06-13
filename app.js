



//I need to install json?
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
        console.log(error.message)
    })



function drinkTemplate(drink){
    return `
    <div class="section-drink">
        <a href="/drink/?id=${drink.idDrink}">
            <article>
                <img class="cocktail-photo" src="${drink.strDrinkThumb}" alt="cocktail">
                <h2>${drink.strDrink}</h2>
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