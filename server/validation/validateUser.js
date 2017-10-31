const validateUser = ({
  fullname, username, email, password
}) => {
  if (!fullname) {
    return { message: 'Fullname field is empty' };
  }

  if (!username) {
    return { message: 'Username field is empty' };
  }

  if (!email) {
    return { message: 'Email field is empty' };
  }
  if (typeof email !== 'string') {
    return { message: 'Invalid Email' };
  }

  if (!password) {
    return { message: 'Password field is empty' };
  }
  if (password.length < 6) {
    return { message: 'Passwords should be at leats 6 characters' };
  }
};

export default validateUser;

