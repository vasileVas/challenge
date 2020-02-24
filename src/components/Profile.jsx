import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import fetchProfileQuery from '../queries/fetchProfile';
import { getCookie } from '../utils';

const Profile = () => {

    const token = getCookie('token');

    const { data, loading } = useQuery(fetchProfileQuery, {
        variables: { token }
    }); 

    if (loading) {
        return <div>Loading ...</div>
    }

    const { profile: { name, email } } = data;

    return (
        <div className="container">
            <ul className="collection">
                <div className="collection-item">
                    Name: <b>{name}</b>
                </div>
                <div className="collection-item">
                    Email: <b>{email}</b>
                </div>
            </ul>
        </div>
    )
};

export default Profile;