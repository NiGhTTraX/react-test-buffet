import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiReact from './chai-react.js';

chai.use(chaiReact);
chai.use(sinonChai);

global.expect = chai.expect;
