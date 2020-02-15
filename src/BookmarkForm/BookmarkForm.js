import React from 'react'
import PropTypes from 'prop-types'
import './BookmarkForm.css'

const Required = () => (
    <span className='BookmarkForm__required'>*</span>
)

class BookmarkForm extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func,
        bookmark: PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            title: PropTypes.string,
            url: PropTypes.string,
            description: PropTypes.string,
            rating: PropTypes.oneOf([1, 2, 3, 4, 5])
        })
    }

    static defaultProps = {
        onSubmit: () => {},
        onCancel: () => {},
        bookmark: {}
    }

    state = {
        id: this.props.bookmark.id || undefined,
        title: this.props.bookmark.title || '',
        url: this.props.bookmark.url || '',
        description: this.props.bookmark.description || '',
        rating: this.props.bookmark.rating || 1
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
        const { id, title, url, description, rating } = this.state
        this.props.onSubmit(
            {
                id,
                title,
                url,
                description,
                rating: Number(rating)
            },
            this.resetFields
        )
    }

    resetFields = newFields => {
        this.setState({
            id: newFields.id || undefined,
            title: newFields.title || '',
            url: newFields.url || '',
            description: newFields.description || '',
            rating: newFields.rating || 1
        })
    }

    render() {
        const { error, onCancel } = this.props
        const { id, title, url, description, rating } = this.state

        return (
        
            <form className='BookmarkForm__form' onSubmit={this.handleSubmit}>

                <div className='BookmarkForm__error' role='alert'>
                    {error && <p>{error.message}</p>}
                </div>
                {id && (<input type='hidden' name='id' value={id} />)}
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
                <div className='BookmarkForm__buttons'>
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit">
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

export default BookmarkForm