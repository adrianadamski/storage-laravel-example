import React from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router} from "react-router-dom";
import "./AppLayout.scss";

function App({children, header}) {
    return (
        <Router>
            <div className="wrapper">
                {header}

                <div className="main-container">
                    <Container className="pt-2">
                        {children}
                    </Container>
                </div>
            </div>
        </Router>
    );
}

export default App;
