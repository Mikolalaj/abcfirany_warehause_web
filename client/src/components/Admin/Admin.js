
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

function Admin() {
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const { authState } = authContext;

    function onLogoutButtonClick() {
        authContext.logout();
        history.push('/login');
    }

    return (
    <div>
        <h1>Cześć {authState.userInfo.firstName}, tylko admin może wejść na tą stronę</h1>
        <button onClick={onLogoutButtonClick}>Wyloguj</button>
    </div>
    
    );
}

export default Admin;
