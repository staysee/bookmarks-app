import React from 'react';
import { Link } from 'react-router-dom'

export default function Nav(props) {
  return (
    <nav className='Nav'>
      {/* <button onClick={() => props.clickPage('list')}> */}
      <Link to={'/'}>
        Bookmark List
      </Link>
      {/* </button> */}
      {' '}
      {/* <button onClick={() => props.clickPage('add')}> */}
      <Link to={'/add-bookmark'}>
        Add Bookmark
      </Link>
      {/* </button> */}
    </nav>
  );
}
