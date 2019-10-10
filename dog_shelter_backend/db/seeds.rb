# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Dog.create(name: 'Mia', sex:'Female', age: 9, description: 'Extremely shy sheltie', status: 'Available')
Event.create(dog_id: 1, title: 'Vet visit', description: 'Rabies vaccination')
Event.create(dog_id: 1, title: 'Dental checkup', description: 'Teeth cleaning')

Dog.create(name: 'Megan', sex:'Female', age: 14, description: 'Friendly, outgoing sheltie', status: 'Available')
Event.create(dog_id: 2, title: 'Vet visit', description: 'Initial assessment')
Event.create(dog_id: 2, title: 'Vet visit', description: 'Allergy medicine')
Event.create(dog_id: 2, title: 'Foster', description: 'Fostered by the Johnson family')
 
