document.addEventListener("DOMContentLoaded", () => {
    getDogs();
    Dog.newDogForm()
 })

 function toggleHideDisplay(element) {
    if (element.style.display === "none") {
        element.style.display = "block"
    } else {
        element.style.display = "none"
    }
}