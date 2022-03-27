import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
const { v4: uuidv4 } = require('uuid');

class PostsNew extends Component {
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-control ${touched && error ? 'is-invalid' : ''}`

		return (
			<div className="form-group">
				<label>{field.label}</label>
				<input
					className={className}
					type="text"
					{...field.input}
				/>
				<div className="invalid-feedback">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		values.id = uuidv4();
		this.props.createPost(values)
		this.props.history.push('/react_blog/');
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
				<Link to="/react_blog/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = "Enter a title!";
	}
	if (!values.categories) {
		errors.categories = "Enter some categories";
	}
	if (!values.content) {
		errors.content = "Enter some content please!";
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(null, { createPost })(PostsNew)
);
