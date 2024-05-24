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

function App() {
    const appStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    };

    const contentStyle = {
        flex: '1'
    };

    return (
        <div style={appStyle}>
            <div style={contentStyle}>
                {/* Ваше основное содержимое здесь */}
                <Container className="mt-5">
                    <h1>Добро пожаловать на наш сайт!</h1>
                    <p>Основное содержимое страницы.</p>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
