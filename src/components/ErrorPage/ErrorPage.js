import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #666;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #6c63ff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
`;

const ErrorPage = ({ message }) => {
  return (
    <Container role="alert" aria-live="polite">
      <Heading>We cannot find this page</Heading>
      <Text>{message || 'Either the URL doesn’t exist, or you don’t have access to it.'}</Text>
      <Button to="/">Go to the main dashboard</Button>
    </Container>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string,
};

export default ErrorPage;