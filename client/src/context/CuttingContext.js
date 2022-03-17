import { useState, createContext } from 'react';

const CuttingContext = createContext();

function CuttingProvider({ children }) {
    const [cuttingList, setCuttingList] = useState([]);

    return (
        <CuttingContext.Provider value={{
            // child products
            cuttingList,
            setCuttingList
        }}>
            {children}
        </CuttingContext.Provider>
    )
}

export { CuttingProvider, CuttingContext };