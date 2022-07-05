import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Адрес электронной почты</Form.Label>
        <Form.Control type="email" placeholder="Введите свой email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" />
      </Form.Group>

      <div className="row">
        <div className="col-md-auto">
          <Button variant="primary" type="submit">
            Войти
          </Button>
        </div>
        <div className="col">
          <Link to="/registration">
            <Button variant="danger" type="button">
              Зарегистрироваться
            </Button>
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default Login;
