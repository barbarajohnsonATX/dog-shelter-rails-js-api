class Event {
    constructor(data) {
        this.id = data.id
        this.title = data.title 
        this.dog_id = data.dog_id
        this.description = data.description
        this.updated_at = data.updated_at
        this.created_at = data.created_at
    }

}

function addEvent() {     
    const event = {
        title: document.getElementById('title').value,
        description: document.getElementById('event-description').value,
        dog_id: document.getElementById('event-dogId').value 
    }

    fetch("http://localhost:3000/api/v1/events", {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json())
    .then(event => {
         clearDogsHtml()
         getDogs()
      });
}

function renderEventFormFields(dogId) {
    return `<label><strong>Title: </strong></label><br/>
    <input type="text" id="title"><br/>
    <input type="hidden" id="event-dogId" value="${dogId}">
    <label><strong>Description:   </strong></label><br/>
    <input type="text" id="event-description"><br/>  
    <input type="submit" value="Submit" style="color:white;background-color:orange">
    `  
}


function renderNewEventForm() {
    let dogId = this.getAttribute('id')
    this.style.display = "none"
    let eventsHtml = this.parentElement
    let eventForm = document.createElement('form')
    eventForm.setAttribute("onsubmit", "addEvent(); return false;")
    eventForm.innerHTML = renderEventFormFields(dogId)
    eventsHtml.appendChild(eventForm)
}


function addEventsClickListeners() {
    document.querySelectorAll('.view-events-dog-button').forEach(element => {
        element.addEventListener('click', viewDogEvents)
    })

    document.querySelectorAll('.add-event-button').forEach(element => {
        element.addEventListener('click', renderNewEventForm)
    })
    
    document.querySelectorAll('.edit-event-button').forEach(element => {
        element.addEventListener("click", editEvent)
    })

    document.querySelectorAll('.delete-event-button').forEach(element => {
        element.addEventListener("click", deleteEvent)
    })

}

function deleteEvent() {
    let eventId = this.parentElement.getAttribute('event-id')

    fetch(`http://localhost:3000/api/v1/events/${eventId}`, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(json => {
          let selectedEvent = document.querySelector(`.card[event-id="${eventId}"]`) 
          selectedEvent.remove()
      })
}



function updateEvent() { 
    let eventId = this.event.target.parentElement.getAttribute('event-id')     
    let eventElement = document.querySelector(`.card[event-id="${eventId}"]`)
        
     let event = {
         title: eventElement.querySelector('#title').value, 
         description: eventElement.querySelector('#event-description').value, 
         dog_id: eventElement.querySelector('#event-dogId').value,
     }
       

    fetch(`http://localhost:3000/api/v1/events/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(data => {
         clearDogsHtml()
         getDogs()  
         Dog.newDogForm()
    })
}



function renderEventForm (dogId) {
    let eventForm = document.createElement('form')
    eventForm.setAttribute("onsubmit", "updateEvent(); return false;")
    eventForm.innerHTML = renderEventFormFields(dogId)
    return eventForm 
}


function populateEventForm(data) { 
    let event = new Event(data)
    let eventForm = renderEventForm(event.dog_id)
    
    eventForm.querySelector('#title').value = event.title 
    eventForm.querySelector('#event-description').value = event.description 
    eventForm.querySelector('#event-dogId').value = event.dog_id 
    document.querySelector(`.card[event-id="${event.id}"]`).appendChild(eventForm)
}

 

function editEvent() { 
    toggleHideDisplay(this)

    let eventId = this.parentElement.getAttribute('event-id')
    console.log("eventId", eventId)
    fetch(`http://localhost:3000/api/v1/events/${eventId}`)
    .then(resp => resp.json())
    .then(data => {

        populateEventForm(data)
 
    })

}

 


function viewDogEvents() {
    Dog.newDogForm()
    let dogSelectedHtml = this.parentElement.querySelector('.events')
    toggleHideDisplay(dogSelectedHtml)
}

 