// GET POST DELETE PATCH PUT
let flowersGrid = document.querySelector('.flowers-grid');
//GET => get or retrieve data from API endpoint
fetch('http://localhost:3000/flowers') //call to api endpoint
.then(response => response.json())  //set method to use as callback
//parse response to json
.then(flowers => {
    flowers.map( flower => displayFlower(flower)) 
})

const displayFlower = (flower) => {

    let flowerCard = document.createElement('div');
    flowerCard.className = 'flower-card';

    let name = document.createElement('p');
    name.className = 'flower-name';
    name.innerText = flower.name;

    let deleteBtn = document.createElement('button');
    deleteBtn.classsName = 'del-btn';
    deleteBtn.innerText = 'X';

    let img = document.createElement('img');
    img.src = flower.imgUrl;

    let sunExposure = document.createElement('p');
    sunExposure.className = 'sun-exposure';
    sunExposure.innerText = flower.sunExposure;

    flowerCard.append(name, img, sunExposure, deleteBtn);
    
    deleteBtn.addEventListener('click', () => deleteFlower(flower, flowerCard))

    flowersGrid.append(flowerCard);
}

// POST 
let flowerForm = document.querySelector('.add-flower-form');
const addFlower = (event) => {
    event.preventDefault();
    let newFlower = {
        name: event.target[0].value,
        sunExposure: event.target[1].value,
        imgUrl: event.target[2].value
    }
    fetch('http://localhost:3000/flowers', {
        method: 'POST',
        body: JSON.stringify(newFlower),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( res  => res.json())
    .then( result => console.log(result))
}
flowerForm.addEventListener('submit', (e) => addFlower(e))

// DELETE 

const deleteFlower = (flower, flowerCard) => {
    fetch(`http://localhost:3000/flowers/${flower.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then( data => console.log(data))

    flowerCard.remove();
}
