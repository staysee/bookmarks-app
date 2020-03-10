import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkForm from './BookmarkForm';

describe('BookmarkForm component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BookmarkForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

})
