import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TAppDispatch } from '../store';
import { actions } from '../store/exports';

export const useActions = () => {
  const dispatch = useDispatch<TAppDispatch>();
  return bindActionCreators(actions, dispatch);
};
