import {createContext} from 'react';

const ProductContext = createContext();

function ProductProvider({ children, productData, products, setProducts }) {
    const { symbol, productId, comments, sale, img, category } = productData;

    return (
        <ProductContext.Provider value={{
            symbol,
            productId,
            comments,
            sale,
            img,
            category,
            products,
            setProducts
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductProvider, ProductContext };