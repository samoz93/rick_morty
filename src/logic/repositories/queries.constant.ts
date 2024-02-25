import { gql } from "@apollo/client";

export const CHARACTER_QUERY = gql`
  query ($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      results {
        id
        name
        image
        episode {
          id
        }
      }
    }
  }
`;
