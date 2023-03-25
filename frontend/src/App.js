import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {LinkContainer} from 'react-router-bootstrap'
import {BrowserRouter, Route,Link, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
        <Navbar bg="dark" variant="dark">
          <Container >
            <LinkContainer to="/">
            <Navbar.Brand>Amazona</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen/>}></Route>
          <Route path="/product/:slug" element={<ProductScreen/>}></Route>

        </Routes>
       
      </main>

      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;