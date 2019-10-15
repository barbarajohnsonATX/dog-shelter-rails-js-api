class EventSerializer < ActiveModel::Serializer
  belongs_to :dog
  attributes :id, :dog_id, :title, :description, :updated_at, :created_at
end
