This project was created to show the interactions between typescript and graphql(apollo) via generated types of the client scripts.
It uses the Github API v4 (https://developer.github.com/v4/) to request the data via GraphQL. To create a token go to https://github.com/settings/tokens. Please make sure not to publish the access token.

### Installation

- clone this repository
- npm/yarn install
- Replace TOKEN_HERE with your github token in config.ts and apollo.config.js
- npm/yarn install -g apollo
- (optional) install apollo vscode extension with "ext install apollographql.vscode-apollo"
- npm/yarn run gen (for type generation)
- npm start

### What it does

- It lists some issues from a defined repository.
- It lets you add a comment to the issue 1 in this repository.
- It lists comments from the issue 1 in this repository.
