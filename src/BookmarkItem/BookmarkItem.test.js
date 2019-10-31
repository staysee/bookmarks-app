import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkItem from './BookmarkItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookmarkItem title='Title' url="http://www.google.com" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
