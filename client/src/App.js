import Login from './components/Login/Login';
import Home from './components/HomePage/HomePage';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import useToken from './components/Login/useToken';

function App() {
    const { token, setToken } = useToken();
    
    return (
    <Router>
    <Switch>
        <Route path='/login'>
            <Login
                ifLogin={token}
                setLogin={(status) => setToken(status)}
            />
        </Route>
        <Route path='/register'>
            <Login
                ifLogin={token}
                setLogin={(status) => setToken(status)}
            />
        </Route>
        <Route path='/'>
            <Home ifLogin={token} setLogin={(status) => setToken(status)} />
        </Route>
    </Switch>
    </Router>
    );
}

export default App;
