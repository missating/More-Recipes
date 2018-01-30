import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTE2ODg3NTU3fQ.iU_SPDM5iX_ZPUwE2ZpZQD - uUU0zGRda1E1dAskWzys';
