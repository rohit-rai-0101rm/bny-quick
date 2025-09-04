import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DummyState {
    message: string;
    count: number;
}

const initialState: DummyState = {
    message: 'Hello from Redux Toolkit with TypeScript!',
    count: 0,
};

const dummySlice = createSlice({
    name: 'dummy',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        updateMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
    },
});

export const { increment, updateMessage } = dummySlice.actions;
export default dummySlice.reducer;
