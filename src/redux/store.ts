import { TabProps } from "@mui/material";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import { UseSelector, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key : "rootPersist",
    storage
}
const rootReduser = combineReducers({cartSlice})
const reduxPersistedReduser = persistReducer(persistConfig, rootReduser)

export const store = configureStore(
    {
        reducer: reduxPersistedReduser   
    }
    
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector