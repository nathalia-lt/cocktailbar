console.log(window.location.href)
console.log(window.location.favorites)
const params = new URLSearchParams(window.location.favorites)
console.log(params)
console.log(params.has('id'))
console.log(params.get('id'))

fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
