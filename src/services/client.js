import {ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'


const uri = 'http://localhost:3000/graphql'; // Replace with your GraphQL endpoint

const httpLink = createHttpLink({
    uri: uri, 
  });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client