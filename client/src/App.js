import Login from './pages/Login';
import Home from './components/HomePage/HomePage';
import Admin from './components/Admin/Admin';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import {
    AuthContext,
    AuthProvider
} from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import { useContext } from 'react';
import Navbar from './components/Navbar/Navbar';

function AuthenticatedRoute({ children, ...rest }) {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
    console.log(isAuthenticated());
    return (
        <Route {...rest} render={() =>
            isAuthenticated() ? <><Navbar /><div className='page-content'>{children}</div></> : <Redirect to='/login' />
        }/>
    )
}

function AdminRoute({ children, ...rest }) {
    const authContext = useContext(AuthContext);
    const { isAdmin, isAuthenticated } = authContext; 
    return (
        <Route {...rest} render={() =>
            isAdmin() ? <><Navbar /><div className='page-content'>{children}</div></> : isAuthenticated() ? <Redirect to='/' /> : <Redirect to='/login' />
        }/>
    )
}


function Routes() {
    return (
    <Switch>
        <Route path='/login'>
            <Login />
        </Route>
        <Route path='/register'>
            <Login />
        </Route>
        <AdminRoute path='/admin'>
            <Admin />
        </AdminRoute>
        <AuthenticatedRoute path='/' exact>
            <Home />
        </AuthenticatedRoute>
    </Switch>
    )
}

function App() {    
    return (
        <Router>
        <AuthProvider>
        <FetchProvider>
            <Routes />
        </FetchProvider>
        </AuthProvider>
        </Router>
    );
}

export default App;
