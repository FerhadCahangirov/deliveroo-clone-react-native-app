import { createSlice } from '@reduxjs/toolkit'

export interface RestaurantState {
    restaurant: {
        id?: number,
        imgUrl?: string,
        title?: string,
        rating?: number,
        genre?: string,
        address?: string,
        short_desc?: string,
        dishes?: any[],
        long?: number,
        lat?: number,
    }
};

const initialState: RestaurantState = {
    restaurant: {
        id: 0,
        imgUrl: "",
        title: "",
        rating: 0,
        genre: "",
        address: "",
        short_desc: "",
        dishes: [],
        long: 0,
        lat: 0,
    },
};

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.restaurant = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const {setRestaurant  } = restaurantSlice.actions;

export const selectRestaurant = (state: any) => state.restaurant.restaurant;

export default restaurantSlice.reducer;