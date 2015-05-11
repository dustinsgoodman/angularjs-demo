object @user => :data

node(:id) { |u| u.uid }
node(:type) { 'user' }
node :attributes do |user|
  {
    first_name: user.first_name,
    last_name: user.last_name
  }
end

node :errors, if: lambda { |user| user.invalid? } do |user|
  user.errors.messages.map do |field, errors|
    errors.uniq.map do |err|
      {
        field: field,
        code: err
      }
    end
  end.flatten
end
