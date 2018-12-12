import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ListCommentsOfIssue } from "./__generated__/ListCommentsOfIssue";

type Props = {};

export const LIST_COMMENTS = gql`
  query ListCommentsOfIssue {
    repository(owner: "daugsbi", name: "apollo-typescript-example-project") {
      issue(number: 1) {
        comments(last: 10) {
          nodes {
            id
            author {
              login
            }
            bodyText
          }
        }
      }
    }
  }
`;

class ListCommentsQuery extends Query<ListCommentsOfIssue> {}
{
  /* pollInterval={5000} */
}
const ListComments: React.SFC<Props> = props => (
  <ListCommentsQuery query={LIST_COMMENTS}>
    {({ loading, error, data }) => {
      if (loading) return <p>loading...</p>;

      if (error) return <p>error happened</p>;

      if (
        data &&
        data.repository &&
        data.repository.issue &&
        data.repository.issue.comments &&
        data.repository.issue.comments.nodes
      ) {
        return (
          <React.Fragment>
            <h1>List of added comments in issue</h1>
            {data.repository.issue.comments.nodes.map(comments => {
              if (comments) {
                return (
                  <React.Fragment key={comments.id}>
                    <p>
                      Message: <b>{comments.bodyText}</b> <br />
                      From: {comments.author && comments.author.login}
                    </p>
                  </React.Fragment>
                );
              }
            })}
          </React.Fragment>
        );
      }
    }}
  </ListCommentsQuery>
);

export default ListComments;
