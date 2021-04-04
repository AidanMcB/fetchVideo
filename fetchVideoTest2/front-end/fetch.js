let getBtn = document.querySelector('.get-button');
let postBtn = document.querySelector('.post-button');

getBtn.addEventListener('click', () => {
    console.log("GET")
    fetch('http://localhost:9000/testAPI')
    .then(res => res.json())
    .then(data => console.log(data))
})

postBtn.addEventListener('click', () => {
    let localVar =  { objName: "testing a post request" }
    fetch('http://localhost:3001/add',
    {
        method: 'POST',
        body: JSON.stringify(localVar),
        // headers: {
        //     'Content-Type' : 'application/json'
        // }
    })
    .then(res => res.json())
    .then(data => console.log(data))
})