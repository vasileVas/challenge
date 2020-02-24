import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import refreshTokenQuery from '../queries/refreshToken';
import { getCookie, setCookie } from '../utils';

const Token = () => {
    const refreshToken = getCookie('refreshToken');
    const { data, loading } = useQuery(refreshTokenQuery, {
        variables: { refreshToken }
    }); 

    if (loading) {
        return <div>Loading ...</div>
    }

    const token = data.refreshToken;

    setCookie('token', token, 1);

    return <h3>Token refreshed</h3>
};

export default Token;