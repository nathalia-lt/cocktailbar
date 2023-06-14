// URLSearchParams
console.log(window.location.href)
console.log(window.location.search)
const params = new URLSearchParams(window.location.search)
console.log(params)
console.log(params.has('id'))
console.log(params.get('id'))


if (params.has('id')) {
    const id = params.get('id')
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(function (response) {
        console.log(response);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        return response.json();
    })
    .then(function (data){
        console.log(data)
        drinkToDisplay(data.drinks[0])
    })
    .catch(function (error){
        console.log(error.message)
    })
}


function drinkTemplate(drink, ingredients){
    return `
    <div class="drink-container">
    <img class="drink-photo" src="${drink.strDrinkThumb}" alt="cocktail">
        <article class="drink-info">
                <h2 class"drink-name">${drink.strDrink}</h2>
                <p class="drink-desc" >${drink.strInstructions}</p>
                <ul class="drink-ingredients">${ingredients}</ul>
        </article>
    </div>`
}

function ingredientTemplate(ingredient){
    return `<li class='ingredient'>${ingredient}</li>`
}

function drinkToDisplay(drink){
    const sectionDrink = document.getElementById('section-drink')
    const ingredientsHTML = ingredients(drink)
    sectionDrink.innerHTML += drinkTemplate(drink, ingredientsHTML)
}

function ingredients(drink){
    let html = ''
    for (let i = 1; i < 16; i++) { 
        if (drink[`strIngredient${i}`] === null) {
            break;
        }
        const ingredient = drink[`strIngredient${i}`]
        html += ingredientTemplate(ingredient)
    }
    return html
}

