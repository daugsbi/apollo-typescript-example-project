import React from "react";
import { AddCommentMutation, addComment } from "./AddComment";

type Props = {
  subjectId: string;
};

export const AddCommentButton: React.SFC<Props> = props => {
  return (
    <React.Fragment>
      <label htmlFor="comment-input">Comment text:</label>
      <input name="comment-input" width="200" />
      <AddCommentMutation mutation={addComment} variables={{}}>
        {(addComment, { data }) => {
          if (addComment) {
            const updatedText = data ? data.addComment : null;

            return (
              <div>
                {updatedText}
                <button onClick={e => addComment()}>Add comment</button>
              </div>
            );
          }
        }}
      </AddCommentMutation>
    </React.Fragment>
  );
};
