import axios from 'axios';
import {
    GET_ORDERS
} from './types';

// Get orders...
export const list = (params) => dispatch => {
    axios.get('/api/orders', { params: params }).then(res => {
        dispatch({
            type: GET_ORDERS,
            payload: res.data
        });
    }).catch(err => {
        dispatch({
            type: GET_ORDERS,
            payload: null
        });
    });
}

export const create = (data, cb) => dispatch => {
    axios.post('/api/orders', data).then(res => {
        cb({
            success: true,
            data: res.data
        });
    }).catch(err => {
        cb({
            success: false,
            data: err.response.data
        });
    });
}