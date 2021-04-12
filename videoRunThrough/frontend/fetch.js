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

const deleteFlower = (flower, flowerCard) => {
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

// PATCH

const editFlower = (flower, oldSunExposure) => {
    fetch(`http://localhost:3000/flowers/${flower.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ sunExposure: 'Shady' }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(newData => {
        oldSunExposure.innerText = newData.sunExposure;
    })  
}

// PUT

const putFlower = (flower, name) => {
    fetch(`http://localhost:3000/flowers/${flower.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: 'Lilly',
            imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.brecks.com%2Fproduct%2FEyeliner-Lily&psig=AOvVaw3F_xk2xnXaXZrugUr2ctJa&ust=1618271674833000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLiKw_Sx9-8CFQAAAAAdAAAAABAE',
        }),
        headers: { 
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then( newFlower => {
        name.innerText = newFlower.name
    })
}

const displayFlower = (flower) => {
    let flowerCard = document.createElement('div')
    flowerCard.className = 'flower-card'

    let name = document.createElement('p')
    name.className = 'flower-name'
    name.innerText = flower.name

    let deleteBtn = document.createElement('button')
    deleteBtn.className = 'del-btn'
    deleteBtn.innerText =  'X'

    let img = document.createElement('img')
    img.src = flower.imgUrl

    // Put
    img.addEventListener('click', () => putFlower(flower, name))
    
    let sunExposure = document.createElement('p')
    sunExposure.className = 'sun-exposure'
    sunExposure.innerText = flower.sunExposure 
    
    //Edit
    sunExposure.addEventListener('click', () => editFlower(flower, sunExposure) )
    
    flowerCard.append(name, img, sunExposure, deleteBtn)
    flowersGrid.append(flowerCard)

    //Delete
    deleteBtn.addEventListener('click', () => deleteFlower(flower, flowerCard))
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


