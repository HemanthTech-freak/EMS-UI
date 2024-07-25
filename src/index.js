import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink
} from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';


const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
