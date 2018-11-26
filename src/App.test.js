import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Tests were not part of the code test requirements. 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
