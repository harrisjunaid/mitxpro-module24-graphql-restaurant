query getRestaurant($id:Int!){
  restaurant(id:$id){
    name
    description
    dishes{
      name
      price
    }
  }
}

query getRestraunts{
 restaurants {
  id
  name
  description
 } 
}

mutation setRestaurant {
  setrestaurant(input: {
    name: "Granite",
    description: "American"
  }) {
    name
    description
  }
}

mutation deleteRestaurant($id: Int!) {
  deleterestaurant(id: $id) {
    ok
  }
}

mutation editRestaurants($id: Int = 1, $name: String = "OLDO") {
  editrestaurant(id: $id, name: $name) {
    name
    description
  }
}