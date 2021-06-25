import { useDispatch } from 'react-redux';

import { DispatchType } from './rootTypes';

export const useAppDispatch = () => useDispatch<DispatchType>();
