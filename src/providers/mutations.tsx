import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstname
      lastName: $lastname
      email: $email
      password: $password
    ) {
      user {
        id
        isStaff
        isActive
        isSuperuser
        firstName
        lastName
        email
        lastLogin
      }
      message
      status
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        lastName
        isActive
        isStaff
        email
        firstName
        lastName
        username
        lastLogin
        dateJoined
      }
      userProfile {
        id
        location {
          name
          code
        }
        phoneNumber
        title
        description
        rate
        hourRate
        picture
      }
      message
      status
      token
    }
  }
`;
