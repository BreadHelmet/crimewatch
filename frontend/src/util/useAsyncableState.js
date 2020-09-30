import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export function useAsyncableState(initial) {
  const [state, setState] = useState(initial);
  const currentRef = useRef({ mounted: true }).current;
  useEffect(() => () => currentRef.mounted = false, [currentRef]);
  return [
    state,
    useCallback(newState => {
      if (currentRef.mounted) {
        setState(newState);
      }
    }, [setState, currentRef]),
  ];
}
