import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; // think of refuxForm as connect in redux
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

// redux-form only manages states/data & we have to show markup/jsx

class PostsNew extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // pristine: clean state, touched: user focuses in then fouces out(dirty state), invalid: error
    renderField(field) {
        const { meta: {touched, error} } = field; // destructor from field.meta.touched & field.meta.error
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {/*handles validation - to show error if any*/}
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () =>
            this.props.history.push('/')
        );
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            //handle submission, handleSubmit called the callback, onSubmit, if everything is pass the validations, may need bind(this)
            <form onSubmit={handleSubmit(this.onSubmit)}>
                {/*Field == input, name: what state, need to be in identical w/ validate, component: return jsx */}
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

// helper func called automatically when user attempts to submit the form
function validate(values) {
    // console.log(values) -> {title: 'asdf, categories: 'asdf, content: 'asdf'}
    const errors = {};

    //validate the inputs from 'values'
    // if (values.title.length < 3) { errors.title = 'Title must be at least 3 characters'; }
    if (!values.title) { errors.title = 'Enter a title'; }
    if (!values.categories) { errors.categories = 'Enter a categories'; }
    if (!values.content) { errors.content = 'Enter a content'; }

    // if errors is empty -> form is good to submit
    // if errors has any *ANY* properties, redux form assumes form is invalid
    return errors;
}

// similar to connect, add additional properties
export default reduxForm({ // pass in config
    validate, // {validate : validate}
    form: 'PostsNewform' // need to be uniq
})(
    connect(null, { createPost })(PostsNew)
);

/*
submit flow:
1) user submits form
2) validate form
3) call 'onSubmit'
4) call an action creator to make API request
5) after success, navigate user back to post list
 */