import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'search',
  initialState: {
    value: ''
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
  }
})

export const { setSearchValue } = counterSlice.actions

export default counterSlice.reducer;