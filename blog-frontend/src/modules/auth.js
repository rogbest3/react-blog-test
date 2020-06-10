import { createAction, handleActions } from 'redux-actions'
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import {takeLatest } from 'redux-saga/effects'
import * as authAPI from '../lib/api/auth'

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITAILIZE_FORM = 'auth/INITAILIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE ] = createRequestActionTypes('auth/REGISTER')
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE ] = createRequestActionTypes('auth/LOGIN')

// const REGISTER = 'auth/REGISTER'
// const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS'
// const REGISTER_FAILURE = 'auth/REGISTER_FAILURE'

// const LOGIN = 'auth/LOGIN'
// const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
// const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'

export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, key, value
    })
)
export const initailizeForm = createAction(INITAILIZE_FORM, form => form);
export const register = createAction(REGISTER, ({ username, password }) =>({
    username, password
}))
export const login = createAction(LOGIN, ({ username, password}) => ({
    username, password
}))

const registerSaga = createRequestSaga(REGISTER, authAPI.register)
const loginSaga = createRequestSaga(LOGIN, authAPI.login)
export function* authSaga(){
    yield takeLatest(REGISTER, registerSaga)
    yield takeLatest(LOGIN, loginSaga)
}

const initailState ={
    register : {
        username : '',
        password : '',
        passwordConfirm : ''
    },
    login : {
        username : '',
        password : ''
    },
    auth : null,
    authError : null
}

const auth = handleActions(
    {
        [CHANGE_FIELD] : (state, { payload : {form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value;
            }),
        [INITAILIZE_FORM] : (state, {payload:form}) => ({
            ...state, 
            [form] : initailState[form],
            authError : null
        }),
        [REGISTER_SUCCESS] : (state, {payload : auth }) =>({
            ...state,
            authError : null,
            auth
        }),
        [LOGIN_SUCCESS] : (state, {payload : auth }) =>({
            ...state,
            authError : null,
            auth
        }),
        [REGISTER_FAILURE] : (state, {payload : error}) =>({
            ...state, 
            authError : error
        }),
        [LOGIN_FAILURE] : (state, {payload : error}) =>({
            ...state, 
            authError : error
        })

    },
    initailState
)
export default auth;