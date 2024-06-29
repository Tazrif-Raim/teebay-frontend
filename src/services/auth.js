import { gql } from '@apollo/client';
import client from './client';

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(LoginInput: $input)
  }
`;

const REGISTER_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
        email
    }
  }
`;

const LOGOUT_USER = gql`
  mutation LogoutUser($token: String!) {
    logout(token: $token)
  }
`;

export const login = async (input) => {
  try{
    console.log(input);
    const response = await client.mutate({
        mutation: LOGIN_USER,
        variables: { input },
      });
    const token = response.data.login;
    localStorage.setItem('token', token);
    console.log(token); 
    return token;
  }catch(error){
    console.error('Login failed:', error);
    return "";
  }
    
  
};

export const register = async (input) => {
  try{
    const response = await client.mutate({
        mutation: REGISTER_USER,
        variables: { "createUserInput": input },
      });
    return response.data.registerUser;
  }
  catch(error){
    console.error('Registration failed:', error);
    return "";
  }
};

export const logout = async () => {
    try{
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await client.mutate({
            mutation: LOGOUT_USER,
            variables: { token: token },
          });
          console.log(response.data);
        if(response.data.logout){
            localStorage.removeItem('token');
            client.clearStore();
        }
    }
    catch(error){
        console.error('Logout failed:', error);
    }
};
