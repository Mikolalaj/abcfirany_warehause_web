import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import SearchPage from './pages/SearchPage';
import ProductPage from './pages/ProductPage';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import { ProductProvider } from './context/ProductContext';
import { useContext } from 'react';
import Navbar from './components/Navbar/Navbar';

function AuthenticatedRoute({ children, ...rest }) {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
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
        <AuthenticatedRoute path='/search'>
            <SearchPage />
        </AuthenticatedRoute>
        <AuthenticatedRoute path='/product/:category/:productId'>
            <ProductPage />
        </AuthenticatedRoute>
        <AuthenticatedRoute path='/dashboard'>
            <Dashboard />
        </AuthenticatedRoute>
    </Switch>
    )
}

function App() {    
    return (
        <Router>
        <AuthProvider>
        <FetchProvider>
        <ProductProvider>
            <Routes />
        </ProductProvider>
        </FetchProvider>
        </AuthProvider>
        </Router>
    );
}

export default App;
