/**
 *
 * Photo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLi = styled.li`
  padding: 10px;
  flex-grow: 1;
  width: calc(33% - 20px);
  margin-right: 10px;
  margin-bottom: 10px;
  height: 200px;
  background: ${props => `url(${props.image})`} no-repeat center;

  @media (max-width: 766px) {
    height: 100px;
  }
`;

/* eslint-disable react/prefer-stateless-function */
class Photo extends React.PureComponent {
  render() {
    const { photo } = this.props;
    const { regular } = photo.urls;
    return <StyledLi image={regular} />;
  }
}

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default Photo;
