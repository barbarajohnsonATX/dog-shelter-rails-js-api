class EventSerializer < ActiveModel::Serializer
  belongs_to :dog
  attributes :id, :title, :description
end
