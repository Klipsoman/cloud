const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'

const initialState = {
  show: false,
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        show: true
      }
    case HIDE_LOADER:
      return {
        ...state,
        show: false
      }
    default:
      return state;
  }
};

export const showLoader = () => ({type:SHOW_LOADER})
export const hideLoader = () => ({type:HIDE_LOADER})


