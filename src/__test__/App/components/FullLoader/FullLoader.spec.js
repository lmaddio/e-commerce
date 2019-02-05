/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'reactstrap';
import FullLoader from 'App/components/FullLoader/FullLoader';

describe('FullLoader component', () => {
  it('Render', () => {
    const wrapper = shallow(
      <FullLoader />,
    );
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});
