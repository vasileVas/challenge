import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import signInMutation from '../mutations/signIn'
import { setCookie } from '../utils';

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ signIn ] = useMutation(signInMutation)

    const handleOnSubmit = event => {
        event.preventDefault();

        signIn({
            variables: { email, password }
        }).then(({ data: { signIn } = {} }) => {
            const { token } = signIn || {};
            setCookie('token', token, 30);

            document.location.href = '/';
        })
    }

    return (
        <div className="container">
            <h3>Sign In</h3>
            <form onSubmit={handleOnSubmit}>

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                <button className="btn waves-effect waves-light" type="submit">Submit
                    <i className="material-icons right">send</i>
                </button>

            </form>
        </div>
    )    
};

export default SignIn;