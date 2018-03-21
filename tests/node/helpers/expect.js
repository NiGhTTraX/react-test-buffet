import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiReact from './chai-react.js';

chai.use(chaiReact);
chai.use(sinonChai);

export default chai.expect;
