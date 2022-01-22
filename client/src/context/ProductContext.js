import { useState, createContext } from 'react';

const ProductContext = createContext();

function ProductProvider({ children }) {
    const [searchPage, setSearchPage] = useState(true);
    const [productData, setProductData] = useState({});
    const [childProducts, setChildProducts] = useState({});
    const [searchResult, setSearchResult] = useState([]);

    return (
        <ProductContext.Provider value={{
            // searchPage is a boolean that determines if the search results are displayed or the product detail
            searchPage,
            setSearchPage,
            // result products from search
            searchResult,
            setSearchResult,
            // information about the product
            symbol: productData.symbol,
            productId: productData.productId,
            comments: productData.comments,
            sale: productData.sale,
            img: productData.img,
            category: productData.category,
            // set chosen product
            setProductData,
            // child products
            childProducts,
            setChildProducts
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductProvider, ProductContext };