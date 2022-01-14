import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Search from '../components/Search/Search';

function Dashboard() {
    const [greeting, setGreeting] = useState('Dzień dobry');
    const authContext = useContext(AuthContext);
    const { authState } = authContext;

    useEffect(() => {
        var today = new Date();
        var time = today.getHours()
        if (time > 18 || time < 5) {
            setGreeting('Dobry wieczór');
        }
    }, []);

    return (
        <div>
            <h1>{greeting} {authState.userInfo.firstName}</h1>
            <Search />
        </div>
    )
}

export default Dashboard;