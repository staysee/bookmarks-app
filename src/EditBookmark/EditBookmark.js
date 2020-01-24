import React from 'react'
import PropTypes from 'prop-types'
import BookmarksContext from '../BookmarksContext'
import config from '../config'

import './EditBookmark.css'

const Required = () => (
    <span className='AddBookmark__required'>*</span>
  )

class EditBookmark extends React.Component{
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object
        }),
        history: PropTypes.shape({
            push: PropTypes.func
        }).isRequired
    }

    static contextType = BookmarksContext

    state = {
        error: null,
        id: '',
        title: '',
        url: '',
        description: '',
        rating: 1
    }

    componentDidMount(){
        const { bookmarkId } = this.props.match.params
        fetch(config.API_ENDPOINT + `/${bookmarkId}`,{
            method: 'GET',
            headers: {
                'authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if (!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
          })
        .then(responseData => {
            this.context.updateBookmark(responseData)
        })
        .catch( error => {
            console.log(error)
            this.setState({error})
        })
    }

    handleChangeTitle = e => {
        this.setState({ title: e.target.value })
    }
    handleChangeUrl = e => {
        this.setState({ url: e.target.value })
    }
    handleChangeDescription = e => {
        this.setState({ description: e.target.value })
    }
    handleChangeRating = e => {
        this.setState({ rating: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { bookmarkId } = this.props.match.params
        const { id, title, url, description, rating } = this.state
        const newBookmark = { id, title, url, description, rating }
        
        this.setState({ error: null })
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(newBookmark),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${config.API_KEY}`
            }  
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
            this.context.updateBookmark(newBookmark)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error(error)
            this.setState({error})
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render() {
        const { error, title, url, description, rating } = this.state
        return (
            <section className='EditBookmark'>
                <h2>Edit Bookmark</h2>
                <form className='EditBookmark__form' onSubmit={this.handleSubmit}>
                    <div className='EditBookmark__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='title'>
                            Title
                            {''}
                            <Required />
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            required
                            value={title}
                            onChange={this.handleChangeTitle}
                        />

                        <label htmlFor='url'>
                            URL
                            {' '}
                            <Required />
                        </label>
                        <input
                            id="url"
                            type="text"
                            name="url"
                            required
                            value={url}
                            onChange={this.handleChangeUrl}
                        />

                        <label htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={this.handleChangeDescription}
                        />
                        <label htmlFor='rating'>
                            Rating
                            {' '}
                            <Required />
                        </label>
                        <input
                            type="number"
                            name="rating"
                            id="rating"
                            min='1'
                            max='5'
                            required
                            value={rating}
                            onChange={this.handleChangeRating}
                        />
                    </div>
                    <div className='EditBookmark__buttons'>
                        <button type="button" onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                        <button type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default EditBookmark