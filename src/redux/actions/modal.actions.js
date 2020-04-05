import { SHOW_MODAL, CLOSE_MODAL } from '@constants';

export const openModal = data => ({
  type: SHOW_MODAL,
  payload: data
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
