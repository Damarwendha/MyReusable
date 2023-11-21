import { useNavigate } from 'react-router-dom';

export function useMoveBack(num: Number = -1) {
  const navigate = useNavigate();
  return () => navigate(num);
}
