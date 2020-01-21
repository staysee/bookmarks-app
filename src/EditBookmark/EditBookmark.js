import React from 'react'
import PropTypes from 'prop-types'
import BookmarksContext from '../BookmarksContext'
import config from '../config'

import './EditBookmark.css'

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
        id: '',
        title: '',
        url: '',
        description: '',
        rating: 1
    }

    componentDidMount(){
        const { bookmarkId } = this.props.match.params
        fetch(config.API_ENDPOINT + `${bookmarkId}`,{
            method: 'GET',
            headers: {
                'authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => {
                throw error
              })
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

        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(newBookmark),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${config.API_KEY}`
            }  
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => {
                throw error
              })
            }
            return res.json()
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
        const { title, url, description, rating } = this.state
        return (
            <section className='EditBookmark'>
                <h2>Edit Bookmark</h2>
                <form className='EditBookmark__form' onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='title'>
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Article Title"
                            required
                            value={title}
                            onChange={this.handleChangeTitle}
                        />

                        <label htmlFor='url'>
                            URL
                        </label>
                        <input
                            id="url"
                            type="text"
                            name="url"
                            placeholder="https://url.com"
                            required
                            value={url}
                            onChange={this.handleChangeUrl}
                        />

                        <label htmlFor='description'>
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            placeholder="Article Description Here"
                            required
                            value={description}
                            onChange={this.handleChangeDescription}
                        />

                        <label htmlFor='rating'>
                            Rating
                        </label>
                        <input
                            id="rating"
                            type="text"
                            name="rating"
                            placeholder="5"
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