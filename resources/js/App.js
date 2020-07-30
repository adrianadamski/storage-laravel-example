import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import StorageItems from './features/storage-items';
import Storages from './features/storages';
import AppLayout from './layouts/AppLayout';
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <AppLayout header={<Header/>}>
                <Route path={`/`} exact={true}>
                    <Storages/>
                </Route>
                <Route path={`/storage-item/:id`}>
                    <StorageItems/>
                </Route>
            </AppLayout>
        </Router>
    );
}

export default App;
