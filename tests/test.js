import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'

import authSuccess from '../src/store/reducers/auth'
import * as actions from '../src/store/actions/auth'

describe('>>>A C T I O N --- Test authSuccess',()=>{
    it('+++ authSuccess', () => {
        const add = actions.authSuccess('token')
        expect(add).toEqual({type:"AUTH_SUCCESS",token:'token'})
    });
});

describe('>>>R E D U C E R --- Test calculatorReducers',()=>{
    it('+++ reducer for ADD_INPUT', () => {

        let state = {
            token: null,
            error: 'error',
            loading: true
        }

        state = authSuccess(state, {type:'AUTH_SUCCESS', token: 'token'})
        expect(state).toEqual({
            token: 'token',
            error: null,
            loading: false
        })
    });
});
