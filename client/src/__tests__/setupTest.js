import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.$ = () => ({
  modal: jest.fn()
});
global.token =
  // eslint-disable-next-line
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTE5MTI3NDc3fQ.jOZ8BYDMtc0M6ajJougAkN3Uq_NTI1mq7wwVb1ZaL2o';
