import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import AddBookmark from './AddBookmark';


describe(`AddBookmark component`, () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const history = createMemoryHistory()
    ReactDOM.render(<AddBookmark history={history}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})