import ru from './ru';
import en from './en';
import cn from './cn';

export default (state = ru, action) => {
  if(action.type === 'TRANSLATE') return [ru, en, cn][+action.payload || 0];
  return state;
}