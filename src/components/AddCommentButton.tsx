import React from "react";
import { AddCommentMutation, addComment } from "./AddComment";

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
        <label htmlFor="comment-input">Comment text:</label>
        <input
          name="comment-input"
          width="200"
          onChange={e => this.setState({ text: e.target.value })}
          value={this.state.text}
        />
        <AddCommentMutation mutation={addComment}>
          {(addComment, { data }) => {
            if (addComment) {
              const updatedText =
                data && data.addComment && data.addComment.commentEdge.node
                  ? data.addComment.commentEdge.node.body
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
