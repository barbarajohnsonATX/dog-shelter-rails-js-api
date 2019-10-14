class Event {
    constructor(data) {
        this.id = data.id
        this.title = data.title 
        this.description = data.description
        this.updated_at = data.updated_at
        this.created_at = data.created_at
    }
}

function renderNewEventForm() {
      
    console.log(this)
    let dogId = this.getAttribute('id')
    this.style.display = "none"
    let eventsHtml = this.parentElement
    console.log(eventsHtml)
    let eventForm = document.createElement('form')
    eventForm.setAttribute("onsubmit", "addEvent(); return false;")
    eventForm.innerHTML = 
    `<label><strong>Title: </strong></label><br/>
    <input type="text" id="title"><br/>
    <input type="hidden" id="dogId">
    <label><strong>Description:   </strong></label><br/>
    <input type="text" id="description"><br/>  

    <input type="submit" value="Add New Event" style="color:white;background-color:green">
    </form>` 

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

f 


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