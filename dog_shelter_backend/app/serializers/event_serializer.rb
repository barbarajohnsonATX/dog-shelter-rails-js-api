class EventSerializer < ActiveModel::Serializer
  belongs_to :dog
  attributes :id, :title, :description, :updated_at, :created_at
end
