import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Input from './input';
import {setComment} from '../actions/comments';
import {reset} from 'redux-form';

export class AddComment extends React.Component {

	onSubmit(values) {
		const {body} = values;
		
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