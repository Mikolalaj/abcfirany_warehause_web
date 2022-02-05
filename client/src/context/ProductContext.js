import { useState, createContext } from 'react';

const ProductContext = createContext();

function ProductProvider({ children }) {
    const [childProducts, setChildProducts] = useState({});
    const [product, setProduct] = useState({
        productId: '',
        symbol: '',
        category: '',
        comments: '',
        sale: '',
        img: '',
        features: []
    });

    return (
        <ProductContext.Provider value={{
            // child products
            childProducts,
            setChildProducts,
            product,
            setProduct
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductProvider, ProductContext };