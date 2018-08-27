import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {setComment} from '../actions/comments';

export class AddComment extends React.Component {
	onSubmit(values) {
		const {body} = values;
		console.log(body);
		return this.props.dispatch(setComment(body));
	}

	render() {
		return (
			<form 
				className="comment-form"
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
				>
				<label htmlForm="body">Leave a comment</label>
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