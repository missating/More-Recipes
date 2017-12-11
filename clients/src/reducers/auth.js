const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'COOK_RICE':
      console.log(action);
      return state;
    default:
      return state;
  }
};

export default auth;
