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
    console.log("Submit new add event")
     
    const event = {
        title: document.getElementById('title').value,
        description: document.getElementById('event-description').value,
        dog_id: document.getElementById('event-dogId').value 
    }

    console.log("new event", event)
    console.log("json", JSON.stringify(event))
    fetch("http://localhost:3000/api/v1/events", {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then( resp => resp.json())
    .then(event => {
         
         console.log("event", event)
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
   // console.log(this)
    let dogId = this.getAttribute('id')
    this.style.display = "none"
    let eventsHtml = this.parentElement
    console.log(eventsHtml)
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
          console.log(json)
          let selectedEvent = document.querySelector(`.card[event-id="${eventId}"]`) 
          selectedEvent.remove()
      })
}



function updateEvent() { 
    let eventId = this.event.target.parentElement.getAttribute('event-id')     
    let event = {
        title: document.getElementById('title').value,
        description: document.getElementById('event-description').value,
        dog_id: document.getElementById('event-dogId').value,
    }
    console.log("event", event)

    

    fetch(`http://localhost:3000/api/v1/events/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(data => {
         console.log("updated event", data)
         clearDogsHtml()
         getDogs()  
    });
}



function renderEventForm (dogId) {
    console.log(dogId)
    let eventForm = document.createElement('form')
    eventForm.setAttribute("onsubmit", "updateEvent(); return false;")
    eventForm.innerHTML = renderEventFormFields(dogId)
    return eventForm 
}


function populateEventForm(data) { 
    
    console.log("data", data)
    let event = new Event(data)
    console.log("event.dog_id", event.dog_id)
    let eventForm = renderEventForm(event.dog_id)
    eventForm.querySelector('#title').value = event.title 
    eventForm.querySelector('#event-description').value = event.description 
    eventForm.querySelector('#event-dogId').value = event.dog_id 
    
    document.querySelector(`.card[event-id="${event.id}"]`).appendChild(eventForm)
}



function editEvent() { 
    console.log(this)
 
    toggleHideDisplay(this)

    let eventId = this.parentElement.getAttribute('event-id')
    fetch(`http://localhost:3000/api/v1/events/${eventId}`)
    .then(resp => resp.json())
    .then(data => {
        console.log('data', data)
        populateEventForm(data)
         
    })

}

function renderDogEventsHtml(events) {
    console.log(events)
    let dogEventsHtml = ''
    console.log("dogEventsHtml", dogEventsHtml)
    let list = ''
    events.forEach( event => {
        let newEvent = new Event(event)
        let date = parseTwitterDate(newEvent.updated_at)
        console.log("New Event", newEvent)
        list += `
                <div class="card" event-id="${newEvent.id}" >
                <i>Last update: </i>${date} <br/>
                <strong>Title: </strong>${newEvent.title} <br/>
                <strong>Description: </strong>${newEvent.description} <br/>
                <button class="edit-event-button" style="background-color:orange">Edit Record</button>  
                <button class="delete-event-button" style="background-color:red">Delete Record</button>  
                
                </div>`
    })
    dogEventsHtml = list
    console.log("rendered events", dogEventsHtml)
    return(dogEventsHtml) 
}


function viewDogEvents() {
    renderNewDogForm()
    //let dogId = this.parentElement.dataset.dogId
    //console.log(dogId)
    let dogSelectedHtml = this.parentElement.querySelector('.events')
    
    toggleHideDisplay(dogSelectedHtml)

    //console.log("dogSelectedHtml", dogSelectedHtml)
    //console.log("child elem. count dogSelectedHtml", dogSelectedHtml.childElementCount)
}