import axios from 'axios';
import {
    GET_CATEGORIES
} from './types';

// Get orders...
export const listCategories = (params) => dispatch => {
    axios.get('/api/categories', { params: params }).then(res => {
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    }).catch(err => {
        dispatch({
            type: GET_CATEGORIES,
            payload: null
        });
    });
}