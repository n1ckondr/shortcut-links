import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export const NavBar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  console.log(auth)

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>&lt;Сокращай ссылки! /&gt;</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/create" className="nav-link" id="pills-home-tab" data-toggle="pill"
                   role="tab">Создать</NavLink>
          <NavLink to="/links" className="nav-link" id="pills-profile-tab" data-toggle="pill"
                   role="tab">Просмотр ссылок</NavLink>
        </Nav>
        <br/>
        <Navbar.Text style={{marginRight: '25px'}}>
          Ваш e-mail: <a href={`mailto:${auth.email}`}>{auth.email}</a>
        </Navbar.Text>
        <Button
          style={{width: '150px'}}
          onClick={logoutHandler}
          variant="danger">
          Выйти
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
