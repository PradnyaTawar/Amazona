import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props) {
    return <Alert  className="container mt-3 " variant={props.variant || 'info'}>{props.children}</Alert>;
}