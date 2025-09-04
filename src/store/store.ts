import { configureStore } from '@reduxjs/toolkit';
import dummyReducer from './dummySlice';

export const store = configureStore({
    reducer: {
        dummy: dummyReducer,
    },
});

// 👇 Export these for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
