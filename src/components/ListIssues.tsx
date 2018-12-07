import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {
  ListIssuesOfRepository,
  ListIssuesOfRepositoryVariables
} from "./__generated__/ListIssuesOfRepository";

type Props = {
  owner: string;
  project: string;
};

const LIST_ISSUES = gql`
  query ListIssuesOfRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      issues(last: 100) {
        edges {
          node {
            createdAt
            title
            labels(first: 10) {
              edges {
                node {
                  color
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

class ListIssuesQuery extends Query<
  ListIssuesOfRepository,
  ListIssuesOfRepositoryVariables
> {}

const ListIssues: React.SFC<Props> = props => (
  <ListIssuesQuery
    query={LIST_ISSUES}
    variables={{ owner: props.owner, name: props.project }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>loading...</p>;

      if (error) return <p>error happened</p>;

      if (data && data.repository && data.repository.issues.edges) {
        return (
          <React.Fragment>
            {data.repository.issues.edges.map(edge => {
              if (edge && edge.node) {
                return (
                  <React.Fragment>
                    <h1>{edge.node.title}</h1>
                    <p>Created at: {edge.node.createdAt}</p>
                  </React.Fragment>
                );
              }
            })}
          </React.Fragment>
        );
      }
    }}
  </ListIssuesQuery>
);

export default ListIssues;
