
class Dog {
    constructor(data) {
        this.id = data.id
        this.name = data.name 
        this.sex = data.sex
        this.age = data.age
        this.description = data.description 
        this.status = data.status
    }


}

function renderNewDogForm() {
    let newDogFormDiv = document.getElementById('new-dog-form')
    newDogFormDiv.innerHTML = `
    <form onsubmit="createDog(); return false;">
    <label>Name: </label><br/>
    <input type="text" id="name"><br/>

    <label>Age:   </label><br/>
    <input type="integer" id="age"><br/>  

    <label>Sex:   </label><br/>
    <input type="text" id="sex"><br/>  
    
    <label>Description: </label><br/>
    <textarea id="description" rows="3" cols="20"></textarea><br/>

    <label>Status: </label><br/>
    <input type="text" id="status"><br/><br/>

    <input type="submit" value="Add New Dog">
    </form>
    <br/>`

}

function createDog() {
    debugger
}
function getDogs() {
    fetch("http://localhost:3000/api/v1/dogs")
    .then(resp => resp.json())
    .then(data => {
        renderDogsHtml(data)
        addDogsClickListeners()

    })
}


function getDog(id) {
    fetch(`http://localhost:3000/api/v1/dogs/${id}`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        renderDogHtml(data)

    })
}

function showMoreInfo() {
    let dogId = parseInt(this.parentElement.dataset.dogId)
    getDog(dogId)
   
}

function addDogsClickListeners() {
     document.querySelectorAll('.dog-name').forEach(element => {
        element.addEventListener("click", showMoreInfo)
    })

    
}



function renderDogHtml(data) {
    let dogShow = document.querySelector(`.card[data-dog-id="${data.id}"]`)
    dogShow.innerHTML += `<p>Description: ${data.description}</p>
                          <p>Status: ${data.status}</p>
                        `

}


function renderDogsHtml(data) {
    let dogsIndex = document.getElementById("dogs-list")

    data.forEach((dog) => {
        let newDog = new Dog(dog)
        dogsIndex.innerHTML += 
        `<div class="card" data-dog-id="${dog.id}">
            <strong class="dog-name">${newDog.name}</strong>
            <p>Age: ${newDog.age} years young</p>
            <p>Sex: ${newDog.sex} </p> 
        </div>`
    });

}



 

