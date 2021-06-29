const SET_FILES = "SET_FILES";
const SET_CURRENT_DIR = "SET_CURRENT_DIR";
const ADD_FILE = "ADD_FILE";
const PUSH_TO_STACK = "PUSH_TO_STACK";
const POP_TO_STACK = "POP_TO_STACK";
const DELETE_FILE = "DELETE_FILE"
const CHANGE_VIEW = "CHANGE_VIEW"

const initialState = {
  files: [],
  currentDir: null,
  dirStack: [],
  view: 'list'
};

export const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case SET_CURRENT_DIR:
      return {
        ...state,
        currentDir: action.payload,
      };
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    case PUSH_TO_STACK:
      return {
        ...state,
        dirStack: [...state.dirStack, action.payload],
      };
    case POP_TO_STACK:
      return {
        ...state,
        dirStack: [...state.dirStack, action.payload],
      };
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter(file=>file._id !== action.payload)]
      }
    case CHANGE_VIEW:
      return {
        ...state,
        view: action.payload
      }
    default:
      return state;
  }
};

export const setFiles = (files) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir });
export const addFile = (file) => ({ type: ADD_FILE, payload: file });
export const pushToStack = (dir) => ({type: PUSH_TO_STACK, payload: dir})
export const deleteFile = (id) => ({type: DELETE_FILE, payload: id})
export const changeView = (view) => ({type: CHANGE_VIEW, payload: view})
