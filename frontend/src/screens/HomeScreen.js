// import data from '../data'
import { useEffect,  useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import HomeCover from '../components/Home';
import { API_BASE_URL } from '../Config'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
    })
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`${API_BASE_URL}/api/products`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });

            } catch (err) {
                dispatch({ type: 'FETCH_FAILED', payload: err.message });
            }
            // setProducts(result.data)
        };
        fetchData();
    }, [])
    return <div className="heading container"> 
     <Helmet>
        <title>Amazona</title>
      </Helmet>
      <HomeCover/>
      <h1 className="text-center">Featured products</h1>
        <div className="products mt-5">
            {loading ? (
                <LoadingBox />
            ) : error ? (
               <MessageBox varient="danger">{error}</MessageBox>
            )
                : (
                    <Row>
                        {products.map((product) => (
                            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                <Product product={product}></Product>
                            </Col>
                        ))
                        }
                    </Row>
                )
            }
        </div></div>
}
export default HomeScreen;