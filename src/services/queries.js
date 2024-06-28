import {gql} from '@apollo/client';

export const GET_USER_PRODUCTS = gql
`
    query {
  findAllProductOfUser {
    id
    title
    description
    sell_price
    rent_price_daily
    status
    sell_date
    createdAt
    updatedAt
    categories {
      category_name
    }
  }
}
`

export const BOOKING_TIMES = gql
`
query BookingTimes($id: Int!){
  findFutureBookingsByProductId(product_id: $id){
    start_date,
    end_date
  }
}
`

export const CREATE_PRODUCT = gql
`
mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      title
      createdAt
      categories {
        category_name
      }
    }
  }
`

export const RENT_PRODUCT = gql
`
mutation RentProduct($id: Int!, $start_date: DateTime!, $end_date: DateTime!) {
  rentProduct(product_id: $id, action: "rent", start_date: $start_date, end_date: $end_date)
}
`

export const AVAILABLE_PRODUCTS = gql
`
query{
  findAllAvailableProduct{
    id,
    title,
    categories{
      category_name
    }
    sell_price,
    rent_price_daily,
    description
    createdAt
    status
  }
}
`

export const BUY_PRODUCT = gql
`
mutation BuyProduct($id: Int!) {
  buyProduct(product_id: $id,action: "sell"){
    id,
    received_by{
      firstname,
      lastname
    }
    sell_date,
    sell_price,
    uploaded_by{
      firstname,
      lastname
    }
  }
}
`

export const GET_PRODUCT_BY_ID = gql
`
query GET_PRODUCT_BY_ID($id: Int!){
  findOneProduct(id: $id){
    id
    title
    description
    sell_price
    rent_price_daily
    status
    createdAt
    updatedAt
    sell_date
    categories{
      category_name
    }
    uploaded_by{
      firstname
      lastname
      access
    }
  }
}
`

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $title: String!, $description: String!, $sell_price: Float!, $rent_price_daily: Float!, $categories: [CreateProductCategoryInput!]!) {
  updateProduct(updateProductInput: {
    id: $id
    title: $title
    description: $description
    sell_price: $sell_price
    rent_price_daily: $rent_price_daily
    categories: $categories
  }) {
    id
    title
    description
    sell_price
    rent_price_daily
    status
    sell_date
    createdAt
    updatedAt
    categories {
      category_name
    }
  }
}
`

export const REMOVE_PRODUCT = gql`
mutation RemoveProduct($id: Int!) {
  removeProduct(id: $id)
}
`

export const GET_PRODUCTS_RELATED_TO_USER = gql
`
query {
  findAllProductRelatedToUser{
    borrowed{
      id
    title
    description
    sell_price
    rent_price_daily
    status
    sell_date
    createdAt
    updatedAt
    categories {
      category_name
    }
    },
    lent{
      id
    title
    description
    sell_price
    rent_price_daily
    status
    sell_date
    createdAt
    updatedAt
    categories {
      category_name
    }
    },
    sold{
      id
    title
    description
    sell_price
    rent_price_daily
    status
    sell_date
    createdAt
    updatedAt
    categories {
      category_name
    }
    },
    bought{
      id
    title
    description
    sell_price
    rent_price_daily
    status
    sell_date
    createdAt
    updatedAt
    categories {
      category_name
    }
    }
  }
}
`