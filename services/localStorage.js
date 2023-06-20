

function getFromStorage(key){
    const value = window.localStorage.getItem(key)

    return value ? JSON.parse(value) : null
}

function setToStorage(key, value){
    window.localStorage.setItem(key, JSON.stringify(value))
}

export {getFromStorage, setToStorage}
