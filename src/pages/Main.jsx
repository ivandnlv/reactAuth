import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { clearUser, registerNewUser } from '../redux/slices/registerSlice';

export const localUser = JSON.parse(localStorage.getItem('user'));

const Main = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, name, surname, date } = useSelector((state) => state.register.user);

  useEffect(() => {
    if (email) {
      dispatch(registerNewUser({ ...localUser }));
      setIsAuth(true);
    } else {
      setIsAuth(false);
      navigate('/login');
    }
  }, []);

  if (!isAuth) {
    return null;
  } else {
    const correctName = (name) => {
      const firstLetter = name.slice(0, 1);
      return firstLetter.toUpperCase() + name.slice(1).toLowerCase();
    };

    const correctDateBirth = () => {
      const months = {
        '01': 'января',
        '02': 'февраля',
        '03': 'марта',
        '04': 'апреля',
        '05': 'мая',
        '06': 'июня',
        '07': 'июля',
        '08': 'августа',
        '09': 'сентября',
        10: 'октября',
        11: 'ноября',
        12: 'декабря',
      };

      let month = '';

      for (let key in months) {
        if (date.slice(5, 7) == key) month = months[key];
      }

      return date.slice(8, 10) + ' ' + month + ' ' + date.slice(0, 4) + ' года';
    };

    const howOld = () => {
      const dateNow = Date.now();
      const total = dateNow - Date.parse(date);
      const age = `${Math.floor(total / 31536000000)}`;
      const currentAge =
        +age.slice(1) <= 4 && +age.slice(1) > 1
          ? `${age} года`
          : +age.slice(1) == 1
          ? `${age} год`
          : `${age} лет`;
      return currentAge;
    };

    const onExitClick = () => {
      dispatch(clearUser());
    };

    return (
      <>
        <ListGroup>
          <ListGroup.Item>Ваше имя: {correctName(name)}</ListGroup.Item>
          <ListGroup.Item>Ваша фамилия: {correctName(surname)}</ListGroup.Item>
          <ListGroup.Item>Ваш email {email}</ListGroup.Item>
          <ListGroup.Item>Ваш возраст: {howOld()}</ListGroup.Item>
          <ListGroup.Item>Ваша дата рождения: {correctDateBirth()}</ListGroup.Item>
        </ListGroup>
        <Button className="mt-5" variant="danger" onClick={onExitClick}>
          Выйти
        </Button>
      </>
    );
  }
};

export default Main;
