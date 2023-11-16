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

export const GET_PROJECTS = gql`
  query GetProjects($categoryID: String!) {
    projects(categoryId: $categoryID) {
      id
      isActive
      isDeleted
      title
      description
      budget {
        id
        title
        priceFrom
        priceTo
      }
      duration
      location {
        id
        name
      }
      skill {
        id
        name
      }
      paymentType
      attachment
      status
    }
  }
`;
