import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AddComment, AddCommentVariables } from "./__generated__/AddComment";

export const addComment = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      clientMutationId
      commentEdge {
        node {
          id
          body
        }
      }
    }
  }
`;

export class AddCommentMutation extends Mutation<
  AddComment,
  AddCommentVariables
> {}
