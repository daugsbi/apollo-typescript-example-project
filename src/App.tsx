import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ListIssues from "./components/ListIssues";
import { AddCommentButton } from "./components/AddCommentButton";
import ListComments from "./components/ListComments";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListIssues owner="facebook" project="react" />
        <AddCommentButton subjectId="MDU6SXNzdWUzODg2NzU5MzA=" />
        <ListComments />
      </div>
    );
  }
}

export default App;
