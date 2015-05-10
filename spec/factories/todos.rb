FactoryGirl.define do
  factory :todo do
    task { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    complete { [true, false].sample }
  end
end
