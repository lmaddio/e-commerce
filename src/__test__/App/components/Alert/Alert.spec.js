/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { Alert } from 'reactstrap';
import CustomAlert from 'App/components/Alert/Alert';

describe('CustomAlert component', () => {
  it('Render', () => {
    const message = 'Alert!';

    const wrapper = mount(
      <CustomAlert
        showAlert
        toggle={() => {}}
        message={message}
      />,
    );

    expect(wrapper.find(Alert)).toHaveLength(1);
    expect(wrapper.find(Alert).text()).toContain(message);
  });
});
