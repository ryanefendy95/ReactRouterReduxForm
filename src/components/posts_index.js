import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router-dom';

class PostsIndex extends Component {
    // call after the first time component renders
    componentDidMount() {
        this.props.fetchPosts(); // call action creator -> action -> reducer
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    {/* think of <Link /> as <a />*/}
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) { // after this.props.fetchPosts called posts from reducers is populated map to to prop.posts
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex); // action creator shortcut same as adding mapDispatchToProps function