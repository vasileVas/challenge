import { deleteCookie } from '../utils';

const Logout = ({ history }) => {

    deleteCookie('token');
    document.location.href = '/';

    return null
};

export default Logout;