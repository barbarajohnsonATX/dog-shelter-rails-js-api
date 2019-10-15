class Event {
    constructor(data) {
        this.id = data.id
        this.title = data.title 
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
        debugger 
         console.log("event", event)
         getDogs()
      });
}


function renderNewEventForm() {
      
   // console.log(this)
    let dogId = this.getAttribute('id')
    this.style.display = "none"
    let eventsHtml = this.parentElement
    console.log(eventsHtml)
    let eventForm = document.createElement('form')
    eventForm.setAttribute("onsubmit", "addEvent(); return false;")
    eventForm.innerHTML = 
    `<label><strong>Title: </strong></label><br/>
    <input type="text" id="title"><br/>
    <input type="hidden" id="event-dogId" value="${dogId}">
    <label><strong>Description:   </strong></label><br/>
    <input type="text" id="event-description"><br/>  

    <input type="submit" value="Submit" style="color:white;background-color:orange">
    ` 

    eventsHtml.appendChild(eventForm)
      


}


function addEventsClickListeners() {
    document.querySelectorAll('.view-events-dog-button').forEach(element => {
        element.addEventListener('click', viewDogEvents)
    })

    document.querySelectorAll('.add-event-button').forEach(element => {
        element.addEventListener('click', renderNewEventForm)
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
                <div class="card" event-id="${newEvent.id}">
                <i>Last update: </i>${date} <br/>
                <strong>Title: </strong>${newEvent.title} <br/>
                <strong>Description: </strong>${newEvent.description} <br/>
                </div>`
    })
    dogEventsHtml = list
    console.log("rendered events", dogEventsHtml)
    return(dogEventsHtml) 
}



function viewDogEvents() {
    renderNewDogForm()
    let dogId = this.parentElement.dataset.dogId
    console.log(dogId)
    let dogSelectedHtml = this.parentElement.querySelector('.events')
    
    if (dogSelectedHtml.style.display === "none") {
        dogSelectedHtml.style.display = "block"
    } else {
        dogSelectedHtml.style.display = "none"
    }

    console.log("dogSelectedHtml", dogSelectedHtml)
    console.log("child elem. count dogSelectedHtml", dogSelectedHtml.childElementCount)
    
  
     

 


}