import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

export function TopBar({ children }) {
  return (
    <>
      <div className="top-bar">
        <Row>
          <Col md={3}>
            <h1>Crimewatch</h1>
          </Col>
          <Col md={3}>
            <Link to={'/incidents'}>incidents</Link>
          </Col>
          <Col md={3}>
            <Link to={'/map'}>map</Link>
          </Col>
          <Col md={3}>
            <Link to={'/dashboard'}>dashboard</Link>
          </Col>            
        </Row>
      </div>
      { children }
    </>
  );
}

export default TopBar;
