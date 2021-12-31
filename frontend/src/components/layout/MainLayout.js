import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Order from '../Order';

class MainLayout extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Order />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default MainLayout;