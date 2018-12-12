import React from "react";
import { AddCommentMutation, addComment } from "./AddComment";
import { LIST_COMMENTS } from "./ListComments";
import { ListCommentsOfIssue } from "./__generated__/ListCommentsOfIssue";

type Props = {
  subjectId: string;
};

type TextState = {
  text: string;
};

export class AddCommentButton extends React.Component<Props, TextState> {
  constructor(props: Props) {
    super(props);
    this.state = { text: "" };
  }

  render() {
    return (
      <React.Fragment>
        <h1>Mutation to add a comment on issue</h1>
        <a href="https://github.com/daugsbi/apollo-typescript-example-project/issues/1">
          Link to issue
        </a>
        <label htmlFor="comment-input">Comment text:</label>
        <input
          name="comment-input"
          width="200"
          onChange={e => this.setState({ text: e.target.value })}
          value={this.state.text}
        />
        <AddCommentMutation
          mutation={addComment}
          // Update list after mutation automaticaly, alternative refetch from server (much easier to implement)
          update={(proxy, { data }) => {
            const store = proxy.readQuery<ListCommentsOfIssue>({
              query: LIST_COMMENTS
            });
            if (
              store &&
              store.repository &&
              store.repository.issue &&
              store.repository.issue.comments.nodes &&
              data &&
              data.addComment &&
              data.addComment.commentEdge.node
            ) {
              store.repository.issue.comments.nodes = [
                data.addComment.commentEdge.node,
                ...store.repository.issue.comments.nodes
              ];
            }
            proxy.writeQuery({ query: LIST_COMMENTS, data: store });
          }}
        >
          {(addComment, { data }) => {
            if (addComment) {
              const updatedText =
                data && data.addComment && data.addComment.commentEdge.node
                  ? data.addComment.commentEdge.node.bodyText
                  : null;

              return (
                <div>
                  {updatedText}
                  <button
                    onClick={e => {
                      e.preventDefault();
                      addComment({
                        variables: {
                          input: {
                            body: this.state.text,
                            subjectId: "MDU6SXNzdWUzODg2NzU5MzA="
                          }
                        }
                      });
                      this.setState({ text: "" });
                    }}
                  >
                    Add comment
                  </button>
                </div>
              );
            }
          }}
        </AddCommentMutation>
      </React.Fragment>
    );
  }
}
