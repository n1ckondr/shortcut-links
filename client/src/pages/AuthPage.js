import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import './AuthPage.css';
import {AuthContext} from '../context/AuthContext';

export const AuthPage = () => {

  const auth = useContext(AuthContext);

  const message = useMessage();

  const {loading, error, request, eraseError} = useHttp();

  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect(() => {
    console.log('Error: ', error);
    message(error);
    eraseError();
  }, [error, message, eraseError]);

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {
      // Some code...
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId, data.email);
    } catch (e) {
      // Some code...
    }
  };

  return (
    <div className="container">
      <h1>Авторизация</h1>
      <form>
        <div className="form-group">
          <label htmlFor="InputEmail">E-mail</label>
          <input
            onChange={changeHandler}
            value={form.email}
            type="email"
            className="form-control"
            id="InputEmail"
            name="email"
            placeholder="name@example.com"/>
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword">Пароль</label>
          <input
            onChange={changeHandler}
            value={form.password}
            type="password"
            className="form-control"
            name="password"
            id="InputPassword"/>
        </div>
        <button
          onClick={loginHandler}
          disabled={loading}
          type="button"
          className="btn btn-dark">Войти
        </button>
        <button
          onClick={registerHandler}
          disabled={loading}
          type="button"
          className="btn btn-outline-dark">Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
