import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    componentDidMount() {
        if (!this.props.post) { // caching records
            const { id } = this.props.match.params; // get id from wild card in url
            this.props.fetchPost(id); // fetch individual post
        }
    }

    onDeleteClick() {
        const { id } = this.props.match.params; // get id from wild card in url
        this.props.deletePost(id, () =>
            this.props.history.push('/')
        );
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}

// function mapStateToProps({ posts }, ownProps) { // destructure state, ownProps === this.props
//     console.log(ownProps);
//     return {
//         post: posts[ownProps.match.params.id]
//     };
// }

const mapStateToProps = (state, ownProps) => {
    // console.log(state); // state
    // console.log(ownProps); // ownProps
    return {post: state.posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);