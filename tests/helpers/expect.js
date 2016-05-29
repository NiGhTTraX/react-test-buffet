import chai from 'chai';
import chaiReact from './chai-react.js';
import sinonChai from 'sinon-chai';

chai.use(chaiReact);
chai.use(sinonChai);

global.expect = chai.expect;
