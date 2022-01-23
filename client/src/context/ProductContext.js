import { useState, createContext } from 'react';

const ProductContext = createContext();

function ProductProvider({ children }) {
    const [childProducts, setChildProducts] = useState({});
    const [searchResult, setSearchResult] = useState([]);

    return (
        <ProductContext.Provider value={{
            // result products from search
            searchResult,
            setSearchResult,
            // child products
            childProducts,
            setChildProducts
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductProvider, ProductContext };