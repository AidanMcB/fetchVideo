
let getBtn = document.querySelector('.get-btn')


const getFlowers = () => {
    fetch('http://localhost:3000/flowers')
    .then(response => response.json())
    .then(flowers => console.log(flowers))
}

getBtn.addEventListener('click', getFlowers)

let addFlowerForm = document.querySelector('.add-flower-form')
// let addFlowerBtn = document.querySelector('add-flower-btn')

const addFlower = (event) => {
    event.preventDefault()
    let newFlower = {
      name: event.target[0].value,
      color: event.target[1].value,
      type: event.target[2].value,
      sun: event.target[3].value,
      imgUrl: event.target[4].value,
    }
    fetch('http://localhost:3000/flowers', {
        method: 'POST',
        body: JSON.stringify(newFlower),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

addFlowerForm.addEventListener('submit', (event) => addFlower(event))
//  (event) => {
//     event.preventDefault()
//     console.log(event.target)
// })