class Event {
    constructor(data) {
        this.id = data.id
        this.title = data.title 
        this.description = data.description
        this.updated_at = data.updated_at
        this.created_at = data.created_at
    }
}

function addEventsClickListeners() {
    document.querySelectorAll('.view-events-dog-button').forEach(element => {
        element.addEventListener('click', viewDogEvents)
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

    console.log(dogSelectedHtml)




}