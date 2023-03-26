import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./slices/search"

const store = configureStore({
    reducer: {
        search: searchReducer
    }
})

export default store;