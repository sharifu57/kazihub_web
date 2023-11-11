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
