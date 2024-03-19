import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from './authActions'

const initialState = {
    loading: false,
    userInfo: {},
    userToken: {},
    error: null,
    success: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('token')
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload
                state.userToken = payload.token
            })
            .addCase(userLogin.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default authSlice.reducer