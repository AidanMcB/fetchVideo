//Get Post Patch Put Delete 
let flowersGrid = document.querySelector('.flowers-grid');
//Get 
fetch('http://localhost:3000/flowers')
.then( res => res.json())
.then( flowers => {
    console.log(flowers)
    flowers.forEach( flower => {
        displayFlower(flower)
    })
})

//display flower 
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

    sunExposure.addEventListener('click', () => editFlower(flower))

    deleteBtn.addEventListener('click', () => deleteFlower(flower))

    flowerCard.append(name, img, sunExposure, deleteBtn);
    flowersGrid.append(flowerCard);
}

// DELETE 

const deleteFlower = (flower) => {

    fetch(`http://localhost:3000/flowers/${flower.id}`, {
        method: 'DELETE', //http method
        headers: {  
            'Content-Type': 'application/json'
        }
    })
    .then( res => res.json())       //parsing our response
    .then( data => console.log(data))   //logging the information
}

//POST 
let flowerForm = document.querySelector('.add-flower-form');

const addFlower = (event) => {
    event.preventDefault();

    let newFlower = {
        name: event.target[0].value,
        sunExposure: event.target[1].value,
        imgUrl: event.target[2].value,
    }

    fetch('http://localhost:3000/flowers', {
        method: 'POST',
        body: JSON.stringify(newFlower),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then( data => console.log(data))

}

flowerForm.addEventListener('submit', (e) => addFlower(e));

// PATCH 

const editFlower = (flower) => {
    fetch(`http://localhost:3000/flowers/${flower.id}`,{
        method: 'PATCH',
        body: JSON.stringify({ sunExposure: 'Shady'}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

