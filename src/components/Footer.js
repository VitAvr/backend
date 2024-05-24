import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';

class Footer extends React.Component {
    render() {
        return (
            <footer
                style={{
                    backgroundColor: '#bb240e',
                    color: '#fff',
                    height: '60px',
                    position: 'relative',
                    marginTop: '60px',
                    padding: '10px',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                <Container fluid>
                    <p>Design &copy; 2024 | LFA | Vitalii Avramenko | JKTV22</p>
                </Container>
            </footer>
        );
    }
}
