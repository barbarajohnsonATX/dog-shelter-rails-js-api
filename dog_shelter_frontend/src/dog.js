const dogFormFields = `
    <label><strong>Name: </strong></label><br/>
    <input type="text" id="name"><br/>
    <input type="hidden" id="dogId">
    <label><strong>Age:   </strong></label><br/>
    <input type="integer" id="age"><br/>  
    <label>Sex:   </strong></label><br/>
    <input type="text" id="sex"><br/>  

    <label><strong>Description: </strong></label><br/>
    <textarea id="description" rows="3" cols="20"></textarea><br/>
    <label><strong>Status: </strong></label><br/>
    <input type="text" id="status"><br/><br/>`


class Dog {
    constructor(data) {
        this.id = data.id
        this.name = data.name 
        this.sex = data.sex
        this.age = data.age
        this.description = data.description 
        this.status = data.status
        //this.events = data.events
        this.events = data.events.sort((a,b) => (a.updated_at < b.updated_at) ? 1 : ((b.updated_at < a.updated_at) ? -1 : 0)); 
    }
    

    static newDogForm() {
        let newDogFormDiv = document.getElementById('dog-form')
        newDogFormDiv.innerHTML = `
        <form onsubmit="createDog(); return false;">` + 
        dogFormFields + 
        `<input type="submit" value="Add New Dog" style="color:white;background-color:green">
        </form>
        <br/>`
    }
    
    static editDogForm() {
        let editDogFormDiv = document.getElementById('dog-form')
        editDogFormDiv.innerHTML = `
        <form onsubmit="updateDog(); return false;">` + 
        dogFormFields + 
        `<input type="submit" value="Update Info">
        </form>
        <br/>`
    }

    
    static additionalInfo(data) {
        let dogShow = document.querySelector(`.card[data-dog-id="${data.id}"]`)
        console.log(dogShow)
        
        let additionalInfo = dogShow.querySelector('.additional-info')
        toggleHideDisplay(additionalInfo)

        // console.log("additional info", additionalInfo)
        // console.log("!!additional info", !!additionalInfo)
          
        // if (!!additionalInfo === false) {
        //     dogShow.lastElementChild.insertAdjacentHTML('beforebegin', 
        //         `<div class="additional-info">     
        //          <strong>Description: </strong>${data.description}<br/>
        //          <strong>Status: </strong>${data.status}<br/>
        //          </div>`)
          
        // } else {
        //     additionalInfo.remove('additional-info')
        // }
    }
}


function getDogs() {
    fetch("http://localhost:3000/api/v1/dogs")
    .then(resp => resp.json())
    .then(data => {
        renderDogsHtml(data)
        addDogsClickListeners()
        addEventsClickListeners()
    })
}


// Handler to create new dog
function createDog() {
    const dog = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        sex: document.getElementById('sex').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
    }


    fetch("http://localhost:3000/api/v1/dogs", {
        method: 'POST',
        body: JSON.stringify(dog),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(dog => {
         clearDogsHtml()
         getDogs()
         Dog.newDogForm()
      });
    
}


function showMoreInfo() {
    console.log("this", this)
    console.log(this.parentElement.querySelector('.additional-info'))
    toggleHideDisplay(this.parentElement.querySelector('.additional-info'))
}

function updateDog() {
    let dogId = this.event.target.dogId.value

    const dog = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        sex: document.getElementById('sex').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
    }


    fetch(`http://localhost:3000/api/v1/dogs/${dogId}`, {
        method: 'PATCH',
        body: JSON.stringify(dog),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(dog => {
         clearDogsHtml()
         getDogs()
         Dog.newDogForm()
        });
}


function editDog() {
    let dogId = this.parentElement.getAttribute('data-dog-id')

    // Populate the dog form with dog's info
        fetch(`http://localhost:3000/api/v1/dogs/${dogId}`)
        .then(resp => resp.json())
        .then(data => {
            Dog.editDogForm()
            let dogForm = document.getElementById('dog-form')
            dogForm.querySelector('#name').value = data.name 
            dogForm.querySelector('#dogId').value = data.id 
            dogForm.querySelector('#sex').value = data.sex
            dogForm.querySelector('#description').value = data.description
            dogForm.querySelector('#age').value = data.age
            dogForm.querySelector('#status').value = data.status
        })
}


function deleteDog() {
    let dogId = this.parentElement.getAttribute('data-dog-id')
    
    fetch(`http://localhost:3000/api/v1/dogs/${dogId}`, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(json => {
          let selectedDog = document.querySelector(`.card[data-dog-id="${dogId}"]`) 
          selectedDog.remove()
      })
}


function addDogsClickListeners() {
     document.querySelectorAll('.dog-name').forEach(element => {
        element.addEventListener("click", showMoreInfo)
    })

    document.querySelectorAll('.edit-dog-button').forEach(element => {
        element.addEventListener("click", editDog)
    })

    document.querySelectorAll('.delete-dog-button').forEach(element => {
        element.addEventListener("click", deleteDog)
    })
    
}


function clearDogsHtml() {
    let dogsIndex = document.getElementById("dogs-list")
    dogsIndex.innerHTML = ''
}


Dog.prototype.dogEventsHtml = function () {

	let dogEvents = this.events.map(event => {
        let date = parseTwitterDate(event.updated_at)

        return (`
        <div class="card" event-id="${event.id}" >
        <i>Last update: </i>${date} <br/>
        <strong>Title: </strong>${event.title} <br/>
        <strong>Description: </strong>${event.description} <br/>
        
        <button class="edit-event-button" style="background-color:orange">Edit Record</button>  
        <button class="delete-event-button" style="background-color:red">Delete Record</button>  
        </div>

		`)
    }).join('')

    return (dogEvents)
}

Dog.prototype.dogHtml = function () {
     
    return `<div class="card" data-dog-id="${this.id}">
            <button class="view-events-dog-button" style="background-color:blue">View Record</button>  
            <button class="edit-dog-button" style="background-color:orange">Edit Info</button>  
            <button class="delete-dog-button" style="background-color:red">Delete Dog</button>
            </br></br>
            <strong class="dog-name">${this.name}</strong> <br/>
            <strong>Age: </strong>${this.age} years young <br/>
            <strong>Sex: </strong>${this.sex} <br/>

            <div class="additional-info" style="display:none">     
            <strong>Description: </strong>${this.description}<br/>
            <strong>Status: </strong>${this.status}<br/>
            </div>

        </div>` 
}

Dog.prototype.addEventButton = function () {

    let addNewEventButton = document.createElement('button')
    addNewEventButton.className = 'add-event-button'
    addNewEventButton.id = this.id 
    addNewEventButton.innerText = "Add Event"
    addNewEventButton.style.backgroundColor = "green"
     
    return addNewEventButton

}

function renderDogsHtml(data) {
    let dogsIndex = document.getElementById("dogs-list")


    data.forEach((dog) => {
  
        let eventsIndexHtml = document.createElement('div')
        eventsIndexHtml.className = 'events'
        eventsIndexHtml.style.display = 'none'
        let emptyEventsHtml = eventsIndexHtml
          

        let newDog = new Dog(dog)
        eventsIndexHtml.innerHTML = newDog.dogEventsHtml()     
   
        dogsIndex.innerHTML += newDog.dogHtml() 
   
        let selectedDogHtml = document.querySelector(`.card[data-dog-id="${newDog.id}"]`)           
        selectedDogHtml.append(eventsIndexHtml.childElementCount ? eventsIndexHtml : emptyEventsHtml )
        selectedDogHtml.querySelector('.events').appendChild(newDog.addEventButton())

    });

}
