// queries.js
import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      code
    }
  }
`;

export const get_skills = gql`
  query GetSkills($first: Int, $after: String) {
    allSkills(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
