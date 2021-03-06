const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const para1 = document.querySelector('#first')
const para2 = document.querySelector('#second')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    para1.textContent = 'Loading...'
    para2.textContent = ''

    fetch(`/weather?address=${location}`).then((resp) => {
        resp.json().then((data) => {
            if (data.error) {
                para1.textContent = data.error
                para2.textContent = ""
                console.log(data.error)
            } else {
                // console.log(data)
                para1.textContent = data.cityName
                para2.innerHTML = `${data.temp.day}°C ${data.weather[0].description} <br> <br> Max temperature ${data.temp.max}°C <br> <br>Min temperature ${data.temp.min}°C`
            }
        })
    })
})