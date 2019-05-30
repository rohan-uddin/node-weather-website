console.log('Client side JS is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = search.value

    const messageOne = document.querySelector('#message1')
    const messageTwo = document.querySelector('#message2')

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            
        })
    })
})