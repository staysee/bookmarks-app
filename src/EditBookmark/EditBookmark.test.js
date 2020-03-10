import React from 'react';
import ReactDOM from 'react-dom';
import EditBookmark from './EditBookmark';

function pushHistory(){}

describe('EditBookmark component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditBookmark history={{push: pushHistory}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

})