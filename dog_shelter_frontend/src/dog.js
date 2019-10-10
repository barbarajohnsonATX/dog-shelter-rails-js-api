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

function getDogs() {
    fetch("http://localhost:3000/api/v1/dogs")
    .then(resp => resp.json())
    .then(data => {
        let dogsList = document.getElementById("dogs-list")

        data.forEach((dog) => {
            let d = new Dog(dog)
            dogsList.innerHTML += renderDogsListHtml(d)
        });
        debugger
    })
}

function renderDogsListHtml(dog) {
    return `<div class="card" data-dog-id="${dog.id}">
    <strong>${dog.name}</strong>
    <p>Age: ${dog.age} years young</p>
    <p>Sex: ${dog.sex} </p>
    
    </div>`
}


