import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {AppState} from "../store";

// Define a type for the slices state
export interface AccountState {
    isLogin?: boolean,
    device_sid:string,
    jwt: any,
}


export const authSlice = createSlice({
    name: 'account',
    initialState: () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            return {
                isLogin: true,
                deviceSid:"",
                jwt: jwt,
            }
        } else {
            return {
                isLogin: false,
                deviceSid:"",
                jwt: null
            }
        }
    },
    reducers: {
        login: (state, action: PayloadAction<AccountState>) => {
            state.isLogin = true;
            state.jwt = action.payload.jwt;
            state.deviceSid = action.payload.device_sid;
            localStorage.setItem("jwt", action.payload.jwt);
        },
        loggedOut: (state) => {
            state.isLogin = false;
            state.jwt = '';
            localStorage.removeItem("jwt");
        }
    }
})

export const {login,loggedOut} = authSlice.actions
export const selectLogin = (state: AppState) => state.auth.isLogin;
export const selectDeviceSid = (state: AppState) => state.auth.deviceSid;
export default authSlice.reducer