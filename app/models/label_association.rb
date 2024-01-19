class LabelAssociation
  include Mongoid::Document

  embedded_in :task
  embedded_in :label
end
