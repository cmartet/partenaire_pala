import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/screens/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
