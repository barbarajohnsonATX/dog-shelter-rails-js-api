class Api::V1::EventsController < ApplicationController
    before_action :find_event, only: [:show, :edit, :update, :destroy]

    def index
        @events = Event.all.order('updated_at DESC')
        render json: @events 
    end 

    def show
        @event = Event.find(params[:id])
        render json: @event, status: 200
    end 

    def create
        @event = Event.create(event_params)
        render json: @event, status: 200
    end


    def update 
        @event.update(event_params)
        if @event.save
          render json: @event, status: 200
        else
          render json: { errors: @event.errors.full_messages }, status: :unprocessible_entity
        end
    end 

    def destroy
        event = Event.find_by(id: params[:id])
        event.destroy
        render json: event
    end


    private

    def event_params
        params.permit(:title, :description, :dog_id)
    end

    def find_event
        @event = Event.find(params[:id])
    end

end
