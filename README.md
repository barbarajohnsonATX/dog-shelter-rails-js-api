# README
## Description
Dog Shelter Tracker is an app with a Javascript frontend and Ruby on Rails API backend to track dogs in a shelter and their record of events.

## Installation Instructions
Fork and clone the repo to your local machine.

Change directory into dog_shelter_backend and run:
* bundle install

Setup and seed the database:
* rake db:create
* rake db:migrate
* rake db:seed
  
Run the rails server: 
* rails s

Navigate to the dog-shelter-rails-js-api/dog_shelter_frontend.

Open the index.html file in the browser of your choice. 

## Usage
* Click on the dog's name for detailed information. Click again to hide the details.
* Click on Edit Info to update the dog's information.
* Click on Delete Dog to remove the dog.
* Click on View Record to view the selected dog's record of events. This button also toggles between displaying/hiding the record.
* Click on Edit Record to update an event.
* Click on Delete Record to remove the event.
