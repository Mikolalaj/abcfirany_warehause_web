
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Admin() {
    const authContext = useContext(AuthContext);
    const { authState } = authContext;

    return (
    <div>
        <h1>Cześć {authState.userInfo.firstName}, tylko admin może wejść na tą stronę</h1>
    </div>
    
    );
}

export default Admin;
