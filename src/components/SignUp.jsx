import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import signUpMutation from '../mutations/signUp'
import { setCookie } from '../utils';

const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ signUp ] = useMutation(signUpMutation)

    const handleOnSubmit = event => {
        event.preventDefault();

        signUp({
            variables: { name, email, password }
        }).then(({ data: { signUp } = {} }) => {
            const { token } = signUp || {};
            setCookie('token', token, 30);

            document.location.href = '/';
        })
    }

    return (
        <div className="container">
            <h3>Sign Up</h3>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

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

export default SignUp;