import {useState, createContext} from 'react';

const SearchContext = createContext();

function SearchProvider({ children }) {
    const [searchResults, setSearchResults] = useState(true);
    const [chosenProductData, setChosenProductData] = useState({});

    return (
        <SearchContext.Provider value={{
            searchResults,
            setSearchResults,
            chosenProductData,
            setChosenProductData
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export { SearchProvider, SearchContext };