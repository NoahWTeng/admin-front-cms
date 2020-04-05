import { CLOSE_MODAL, SHOW_MODAL } from '@constants';

const initialState = {
  isModal: false,
  modalType: ''
};

export const modal = (state = initialState, action = {}) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        isModal: false,
        modalType: ''
      };
    case SHOW_MODAL:
      return {
        ...state,
        isModal: true,
        modalType: action.payload
      };
    default:
      return state;
  }
};
