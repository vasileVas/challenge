import { logoutUser } from '../utils';

const Logout = ({ history }) => {

    logoutUser();
    document.location.href = '/';

    return null
};

export default Logout;