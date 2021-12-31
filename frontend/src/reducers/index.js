import { combineReducers } from 'redux';
import orders from './ordersReducer';
import categories from './categoryReducer';

export default combineReducers({
    orders: orders,
    categories: categories
});
