import React, {Component} from "react";
import { Container } from "react-bootstrap";

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto pt-3">
                <Container
                className="text-center"
                fluid
                style={{
                    backgroundColor: '#bb240e',
                    color: '#fff',
                    height: '60px',
                    position: 'relative',
                    marginTop: '60px',
                    padding: '10px',
                }}
                >
                    <p>Design &copy; 2024 | LFA | Vitalii Avramenko | JKTV22</p>
                </Container>
            </footer>
        );
    }
}
