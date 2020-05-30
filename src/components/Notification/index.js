import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../../hooks';
export function Notification({ children }) {
  const { openNotification } = useNotification();

  const { created, deleted, updated } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (created) {
      const description =
        created === 'error' ? 'ErrorCreated' : 'SuccessCreated';

      openNotification[created]({
        message: created,
        description,
      });
    }
    if (updated) {
      const description =
        updated === 'error' ? 'ErrorUpdated' : 'SuccessUpdated';

      openNotification[updated]({
        message: updated,
        description,
      });
    }
    if (deleted) {
      const description =
        deleted === 'error' ? 'ErrorDeleted' : 'SuccessDeleted';

      openNotification[deleted]({
        message: deleted,
        description,
      });
    }
  }, [created, deleted, updated]);

  return children;
}
