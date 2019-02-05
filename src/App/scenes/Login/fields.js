export function validateEmail(email) {
  const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRex.test(email);
}

export const validatePassword = password => password.length > 5;

const fields = {
  email: {
    name: 'email',
    validator: validateEmail,
    type: 'email',
    placeholder: 'leonardo@email.com',
    label: 'Email',
    validMessage: 'Valid email.',
    message: 'Uh oh! Looks like there is an issue with your email. Please input a correct email.',
  },
  password: {
    name: 'password',
    validator: validatePassword,
    type: 'password',
    placeholder: '********',
    label: 'Password',
    message: 'Your password must have at least 6 characters.',
  },
};

export default fields;
