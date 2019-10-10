class Api::V1::DogsController < ApplicationController
    before_action :find_dog, only: [:show, :edit, :update, :destroy]

    def index
        @dogs = Dog.all 
        render json: @dogs 
    end 

    def show
        @dog = Dog.find(params[:id])
        render json: @dog, status: 200
    end 

    def create
        @dog = Dog.create(dog_params)
        render json: @dog, status: 200
    end


    def update 
        @dog.update(dog_params)
        if @dog.save
          render json: @dog, status: 200
        else
          render json: { errors: @dog.errors.full_messages }, status: :unprocessible_entity
        end
    end 

    def destroy
        dog = Dog.find_by(id: params[:id])
        dog.destroy
        render json: dog
    end


    private

    def dog_params
        params.permit(:name, :sex, :age, :description, :status)
    end

    def find_dog
    @dog = Dog.find(params[:id])
    end


end
 