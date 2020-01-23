import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import AddBookmark from './AddBookmark/AddBookmark';
import EditBookmark from './EditBookmark/EditBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarksContext from './BookmarksContext'
import Nav from './Nav/Nav';
// import Rating from './Rating/Rating'
import config from './config';
import './App.css';

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  // changePage = (page) => {
  //   this.setState({ page })
  // }

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
      // page: 'list',
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = bookmarkId => {
    console.log(bookmarkId)
    // todo: remove bookmark with bookmarkId from state
    const newBookmarks = this.state.bookmarks.filter(bm =>
      bm.id !== bookmarkId  
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }
  
  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  updateBookmark = updatedBookmark => {
    const newBookmarks = this.state.bookmarks.map(bookmark =>
      (bookmark.id === updatedBookmark.id)
        ? updatedBookmark
        : bookmark
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }

	render() {
		const contextValue = {
			bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark
		}

		return (
			<main className='App'>
			<h1>Bookmarks!</h1>

			<BookmarksContext.Provider value={contextValue}>
				<Nav />
				<div className='content' aria-live='polite'>
					<Route exact path='/' component={BookmarkList} />
					<Route path='/add-bookmark' component={AddBookmark} />
          {/* <Rating value={1} /> */}
          <Route path='/edit/:bookmarkId' component={EditBookmark} />
				</div>
			</BookmarksContext.Provider>
			</main>
		);
	}
}

export default App;
