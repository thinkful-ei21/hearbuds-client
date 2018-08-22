import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
// import {editUser} from '../actions/users';
// import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const zipLength = length({min:5, max:5});
const matchesPassword = matches('password');

export class EditForm extends React.Component {

    onSubmit(values) {
        // grabs username, password and zipcode and from redux form
        const { password, zip } = values;

        // creates a user object 
        const user = {password, zip};
        console.log(user);
        // return this.props
        //     .dispatch(editUser(user))
        //     .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="zip">Zip Code</label>
                <Field
                    component={Input}
                    type="zip"
                    name="zip"
                    validate={[required, zipLength, isTrimmed]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Update Information
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'edit',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('edit', Object.keys(errors)[0]))
})(EditForm);