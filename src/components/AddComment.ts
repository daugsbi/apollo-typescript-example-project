import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AddComment } from "./__generated__/AddComment";

export const addComment = gql`
  mutation AddComment {
    addComment(
      input: {
        body: "Test to add a comment"
        subjectId: "MDU6SXNzdWUzODg2NzU5MzA="
      }
    ) {
      commentEdge {
        node {
          id
          body
        }
      }
    }
  }
`;

export class AddCommentMutation extends Mutation<AddComment> {}
