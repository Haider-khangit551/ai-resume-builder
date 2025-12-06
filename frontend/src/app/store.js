import authReducer from '../app/features/authSlice'


import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})