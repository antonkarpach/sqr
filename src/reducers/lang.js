import ru from './ru';
import en from './en';

export default (state = ru, action) => {
  if(action.type === 'TRANSLATE') return [ru, en][+action.payload || 0];
  return state;
}