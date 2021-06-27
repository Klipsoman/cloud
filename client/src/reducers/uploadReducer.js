const VISIBLE_TRUE = "VISIBLE_TRUE"
const VISIBLE_FALSE = "VISIBLE_FALSE"
const SET_FILE_TO_UPLOAD = "SET_FILE_TO_UPLOAD" 
const SET_PERCENT_UPLOADED = "SET_PERCENT_UPLOADED"

const initialState = {
    file: null,
    visible: false,
    percentUploadingFile: 0
};

export const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case VISIBLE_TRUE:
      return {
        ...state,
        visible: true
      }
    case VISIBLE_FALSE:
      return {
        ...state,
        visible: false
      }
    case SET_PERCENT_UPLOADED:
      return {
        ...state,
        percentUploadingFile: action.payload
      }
    case SET_FILE_TO_UPLOAD:
        return {
        ...state,
        file: action.payload
        }
    default:
      return state;
  }
};

export const uploadVisible = () => ({type:VISIBLE_TRUE})
export const uploadHidden = () => ({type:VISIBLE_FALSE})
export const setPercentLoaded = (percent) => ({type:SET_PERCENT_UPLOADED, payload: percent})
export const setFileToUpload = (file) => ({type:SET_FILE_TO_UPLOAD, payload: file})