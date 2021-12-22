
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [apiResponse, setApiResponse] = useState('');

    useEffect(() => {
        axios.get('http://localhost:9000/testAPI')
        .then(response => setApiResponse(response.data))
        .catch(error => console.log(error))
    }, []);

  return (
    <div className="App">
        <p>{apiResponse}</p>
    </div>
  );
}

export default App;
