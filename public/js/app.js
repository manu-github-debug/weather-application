console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {// here 'e' means an event
    e.preventDefault()// this will be preventing the default flow

    const location = search.value

    messageOne.textContent = 'Loading...'// initially we will declare this as loading
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {// this is the promise thing
        response.json().then((data) => {// here then is promise
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})