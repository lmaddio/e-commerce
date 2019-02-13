import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Fade } from 'reactstrap';
import { ThemeContext } from 'App/context/ThemeContext';

class BadgeCart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fade: true,
    };
    this.clearAlertId = null;
    this.manageTimeout = this.manageTimeout.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!Object.is(prevProps, this.props)) {
      this.toggleFade();
    }
  }

  componentWillUnmount() {
    if (this.clearAlertId) {
      clearTimeout(this.clearAlertId);
    }
  }

  manageTimeout() {
    if (this.clearAlertId) {
      clearTimeout(this.clearAlertId);
    }
    this.clearAlertId = setTimeout(() => this.setState({ fade: true }), 100);
  }

  toggleFade() {
    this.setState({ fade: false }, this.manageTimeout);
  }

  render() {
    const {
      inCart, dispatch, theme, ...restProps
    } = this.props;
    const { fade } = this.state;
    return (
      <Fade in={fade} timeout={100}>
        <Badge color={theme} {...restProps}>
          {inCart.toString()}
        </Badge>
      </Fade>
    );
  }
}

BadgeCart.defaultProps = {
  inCart: 0,
};

BadgeCart.propTypes = {
  inCart: PropTypes.number,
};

const ContextWrapper = props => (
  <ThemeContext.Consumer>
    {({ theme }) => (
      <BadgeCart {...props} theme={theme} />
    )}
  </ThemeContext.Consumer>
);

export default ContextWrapper;
