import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import BookmarkItem from './BookmarkItem';

describe('Bookmark Item component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BookmarkItem id='1' title='Title' url="http://www.google.com" />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

})
