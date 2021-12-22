
import { Redirect } from 'react-router-dom';

function Home(props) {

    if (props.ifLogin === -1) {
        return <Redirect to='/login'/>
    }
    else {
        return (
        <div>
            <h1>Home Page</h1>
        </div>
        );
    }
}

export default Home;
