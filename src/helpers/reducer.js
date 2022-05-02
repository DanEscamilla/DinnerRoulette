export const initialState = {
  loading: true,
  items: [],
  type: '',
  snackbarOpen: false,
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case 'SET_ITEMS':
      return { ...state, ...payload, loading: false };
    case 'SET_SNACKBAR':
      return { ...state, snackbarOpen: payload };
    case 'SET_LOADING':
      return { ...state, loading: payload };
    default:
      throw new Error(`Action type: '${type}' not recognized`);
  }
}

export function setItems(dispatch, type, items) {
  dispatch({
    type: 'SET_ITEMS',
    payload: {
      items,
      type,
    },
  });
}

export function setLoading(dispatch, loading) {
  dispatch({
    type: 'SET_LOADING',
    payload: loading,
  });
}

export function setSnackbarOpen(dispatch, newVal) {
  dispatch({ type: 'SET_SNACKBAR', payload: newVal });
}
