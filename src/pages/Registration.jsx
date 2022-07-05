import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surName: '',
    date: '',
  });

  const [disableForm, setDisableForm] = useState(false);

  const onRegistrationClick = () => {
    console.log(':P');
  };

  return (
    <Form>
      <Link to="/">
        <Button variant="primary" type="submit">
          Назад
        </Button>
      </Link>
      <Form.Group
        className="mb-3 mt-3"
        controlId="formBasicEmail"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}>
        <Form.Label>Адрес электронной почты</Form.Label>
        <Form.Control type="email" placeholder="Введите свой email" />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicPassword"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}>
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Придумайте пароль" />
      </Form.Group>

      <div className="row">
        <Form.Group
          className="mb-3 mt-3 col"
          controlId="formBasicName"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}>
          <Form.Label>Ваше Имя</Form.Label>
          <Form.Control type="text" placeholder="Например, Иван" />
        </Form.Group>

        <Form.Group
          className="mb-3 mt-3 col"
          controlId="formBasicSurname"
          onChange={(e) => setFormData({ ...formData, surName: e.target.value })}>
          <Form.Label>Ваша фамилия</Form.Label>
          <Form.Control type="text" placeholder="Например, Иванов" />
        </Form.Group>
      </div>

      <div className="row">
        <Form.Group
          className="mb-3 mt-3 col-md-auto"
          controlId="formBasicDate"
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}>
          <Form.Label>Введите дату рождения</Form.Label>
          <Form.Control type="date" placeholder="Например, Иванов" />
        </Form.Group>
      </div>
      <div className="row">
        <div className="col">
          {disableForm ? (
            <Button variant="success" type="button" disabled>
              Зарегистрироваться
            </Button>
          ) : (
            <Button variant="success" type="button" onClick={onRegistrationClick}>
              Зарегистрироваться
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
};

export default Registration;
