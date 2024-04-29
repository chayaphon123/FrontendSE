import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interfaces";
import exp from "constants";

type CartState = {
    carItem: ReservationItem[]
}

const initialState:CartState = { carItem:[]}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addReservation: (state,action:PayloadAction<ReservationItem>)=>{
            state.carItem.push(action.payload)
        },
        removeReservation: (state,action:PayloadAction<ReservationItem>)=>{

            const remainItems = state.carItem.filter( obj =>{
                return ((obj.rsvDate !== action.payload.rsvDate)
                ||(obj.restaurant !== action.payload.restaurant)
                ||(obj.createdAt !== action.payload.createdAt))
            })
            state.carItem = remainItems
        }
    }

})

export const { addReservation, removeReservation} = cartSlice.actions
export default cartSlice.reducer
