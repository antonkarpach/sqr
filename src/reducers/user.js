export default (user = null, action) => {
  return action.type === 'LOAD_USER' ? action.payload : user;
};