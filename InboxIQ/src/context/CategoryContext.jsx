import { createContext, useContext } from "react";

export const categoryContext = createContext({
    
})

export const useCategory = () => {
    return useContext(categoryContext)
}

export const CategoryContextProvider = categoryContext.Provider