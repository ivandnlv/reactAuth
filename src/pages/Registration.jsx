import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser, clearUser } from '../redux/slices/registerSlice';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [date, setDate] = useState('');

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = useSelector((state) => state.register.validate);

  const onRegistrationClick = () => {
    dispatch(registerNewUser({ email, password, name, surname, date }));
    if (!validate.type) {
      createUserWithEmailAndPassword(auth, email, password).catch((error) => {
        alert(error);
      });
      navigate('/');
    }
  };

  return (
    <Form>
      <Link to="/">
        <Button variant="primary" type="submit" onClick={() => dispatch(clearUser())}>
          Назад
        </Button>
      </Link>
      <Form.Group
        className="mb-3 mt-3"
        controlId="formBasicEmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}>
        <Form.Label className={validate.type === 'email' && 'text-danger'}>
          {validate.type === 'email' ? validate.text : 'Адрес электронной почты'}
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Введите свой email"
          className={validate.type === 'email' && 'border-danger'}
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicPassword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}>
        <Form.Label className={validate.type === 'password' && 'text-danger'}>
          {validate.type === 'password' ? validate.text : 'Пароль'}
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Придумайте пароль"
          className={validate.type === 'password' && 'border-danger'}
        />
      </Form.Group>

      <div className="row">
        <Form.Group
          className="mb-3 mt-3 col"
          controlId="formBasicName"
          value={name}
          onChange={(e) => setName(e.target.value)}>
          <Form.Label className={validate.type === 'name' && 'text-danger'}>
            {validate.type === 'name' ? validate.text : 'Ваше имя'}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Например, Иван"
            className={validate.type === 'name' && 'border-danger'}
          />
        </Form.Group>

        <Form.Group
          className="mb-3 mt-3 col"
          controlId="formBasicSurname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}>
          <Form.Label className={validate.type === 'surname' && 'text-danger'}>
            {validate.type === 'surname' ? validate.text : 'Ваша фамилия'}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Например, Иванов"
            className={validate.type === 'surname' && 'border-danger'}
          />
        </Form.Group>
      </div>

      <div className="row">
        <Form.Group
          className="mb-3 mt-3 col-md-auto"
          controlId="formBasicDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}>
          <Form.Label className={validate.type === 'date' && 'text-danger'}>
            {validate.type === 'date' ? validate.text : 'Введите дату рождения'}
          </Form.Label>
          <Form.Control
            type="date"
            placeholder="Например, Иванов"
            className={validate.type === 'date' && 'border-danger'}
          />
        </Form.Group>
      </div>
      <div className="row">
        <div className="col">
          <Button variant="success" type="button" onClick={onRegistrationClick}>
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Registration;
