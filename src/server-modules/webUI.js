import ReactDOMServer from 'react-dom/server';
import Html from './../components/Html';

export default (express) => {
    express.get('/', (req, res) => {
        res.send(ReactDOMServer.renderToStaticMarkup(Html('Jarvis Home', 'Hello world')));
    });
};
