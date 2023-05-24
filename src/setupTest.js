/* eslint-disable import/no-extraneous-dependencies */

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mergeConfig } from '@edx/frontend-platform';

Enzyme.configure({ adapter: new Adapter() });

mergeConfig({
  COMMERCE_COORDINATOR_BASE_URL: process.env.COMMERCE_COORDINATOR_BASE_URL,
  ENABLE_B2C_SUBSCRIPTIONS: process.env.ENABLE_B2C_SUBSCRIPTIONS,
  SUBSCRIPTIONS_BASE_URL: process.env.SUBSCRIPTIONS_BASE_URL,
  SUPPORT_URL: process.env.SUPPORT_URL,
});

// These configuration values are usually set in webpack's EnvironmentPlugin however
// Jest does not use webpack so we need to set these so for testing
process.env.LMS_BASE_URL = 'http://localhost:18000';
