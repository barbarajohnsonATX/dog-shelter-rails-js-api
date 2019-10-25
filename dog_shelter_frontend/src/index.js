document.addEventListener("DOMContentLoaded", () => {
    Dog.newDogForm()
    getDogs();
 })

 function toggleHideDisplay(element) {
    if (element.style.display === "none") {
        element.style.display = "block"
    } else {
        element.style.display = "none"
    }
}