import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: {
      email: null,
      password: null,
      name: null,
      surname: null,
      date: null,
    },
    validate: {
      type: '',
      text: '',
    },
  },
  reducers: {
    registerNewUser(state, action) {
      const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
      const nameReg = /\d/;

      if (action.payload.email && emailReg.test(action.payload.email)) {
        state.user.email = action.payload.email;
      } else if (action.payload.email && !emailReg.test(action.payload.email)) {
        state.validate.type = 'email';
        state.validate.text = 'Введите корректный адресс электронной почты';
        return;
      } else {
        state.validate.type = 'email';
        state.validate.text = 'Введите email';
        return;
      }

      if (action.payload.password && action.payload.password.length >= 6) {
        state.user.password = action.payload.password;
      } else if (
        action.payload.password &&
        action.payload.password.length < 6 &&
        action.payload.password.length > 1
      ) {
        state.validate.type = 'password';
        state.validate.text = 'Пароль должен содержать от 6 символов';
        return;
      } else {
        state.validate.type = 'password';
        state.validate.text = 'Придумайте пароль';
        return;
      }

      if (action.payload.name && !nameReg.test(action.payload.name)) {
        state.user.name = action.payload.name;
      } else if (action.payload.name && nameReg.test(action.payload.name)) {
        state.validate.type = 'name';
        state.validate.text = 'В имени не должно быть цифр';
        return;
      } else {
        state.validate.type = 'name';
        state.validate.text = 'Введите имя';
        return;
      }

      if (action.payload.surname && !nameReg.test(action.payload.surname)) {
        state.user.surname = action.payload.surname;
      } else if (action.payload.surname && nameReg.test(action.payload.surname)) {
        state.validate.type = 'surname';
        state.validate.text = 'В фамилии не должно быть цифр';
        return;
      } else {
        state.validate.type = 'surname';
        state.validate.text = 'Введите фамилию';
        return;
      }

      if (action.payload.date) {
        state.user.date = action.payload.date;
      } else {
        state.validate.type = 'date';
        state.validate.text = 'Введите дату своего рождения';
        return;
      }
    },
    clearUser(state) {
      state.user.email = null;
      state.user.password = null;
      state.user.name = null;
      state.user.surname = null;
      state.user.date = null;

      state.validate.type = '';
      state.validate.text = '';
    },
  },
});

export const { registerNewUser, clearUser } = registerSlice.actions;
export default registerSlice.reducer;
