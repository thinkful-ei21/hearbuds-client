import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {setComment} from '../actions/comments';
import {reset} from 'redux-form';
import {getEvent} from '../actions/single-event';

export class AddComment extends React.Component {

	onSubmit(values) {
		const {body} = values;
		// console.log(body);
		this.props.dispatch(setComment(body));
		this.props.dispatch(reset('comment'));
	}

	render() {
		return (
			<form 
				className="comment-form"
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
				>
				<label htmlFor="body">Leave a comment</label>
				<Field
					component={Input}
					type="text"
					name="body"
				/>
				<button
					type="submit"
					disabled={this.props.pristine || this.props.submitting}>
					Submit
				</button>
			</form>
		)
	}
}

export default reduxForm({
	form: 'comment'
})(AddComment);