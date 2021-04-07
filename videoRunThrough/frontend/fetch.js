// GET
let getBtn = document.querySelector('.get-btn')
let flowersGrid = document.querySelector('.flowers-grid')

const getFlowers = () => {
    fetch('http://localhost:3000/flowers')
    .then(response => response.json())
    .then(flowers => {
        flowers.forEach( flower => {
            displayFlower(flower);
        })
    })
}

getFlowers();

// DELETE
const deleteFlower = (flower) => {
    fetch(`http://localhost:3000/flowers/${flower.id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type' : 'application/json'
    }
    })
    .then(res => res.json())
    .then(data => data)
    flowerCard.remove()
}

const displayFlower = (flower) => {
    let flowerCard = document.createElement('div')
    flowerCard.className = 'flower-card'

    let title = document.createElement('p')
    title.className = 'flower-name'
    title.innerText = flower.name

    let deleteBtn = document.createElement('button')
    deleteBtn.className = 'del-btn'
    deleteBtn.innerText =  'X'

    let img = document.createElement('img')
    img.src = flower.imgUrl
    
    let sunExposure = document.createElement('p')
    sunExposure.innerText = flower.sunExposure 

    flowerCard.append(title, img, sunExposure, deleteBtn)
    flowersGrid.append(flowerCard)

    deleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/flowers/${flower.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            flowerCard.remove()
    })
}

// POST
let addFlowerForm = document.querySelector('.add-flower-form')

const addFlower = (event) => {
    event.preventDefault()
    let newFlower = {
      name: event.target[0].value,
      sunExposure: event.target[1].value,
      imgUrl: event.target[2].value,
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

// PATCH
