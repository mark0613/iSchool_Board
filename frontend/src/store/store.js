import { configureStore } from '@reduxjs/toolkit';
import sgeetsReducer from '../slices/sheetsSlice';

export const store = configureStore({
    reducer: {
        sheets: sgeetsReducer,
    },
});
