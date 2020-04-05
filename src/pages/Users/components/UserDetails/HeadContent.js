import React, { memo } from 'react';
import { Descriptions } from 'antd';
import { isEmpty } from 'ramda';

const { Item } = Descriptions;

export const HeadContent = memo(({ i18n, user }) => {
  return (
    <Descriptions>
      <Item label={i18n.t`Receiver`}>
        {!isEmpty(user.shipping)
          ? `${user.shipping.firstName} ${user.shipping.lastName1}`
          : null}
      </Item>
      <Item label={i18n.t`Phone`}>
        {!isEmpty(user.shipping) ? `${user.shipping.phone}` : null}
      </Item>
      <Item label={i18n.t`PostalCode`}>
        {!isEmpty(user.shipping) ? `${user.shipping.postCode}` : null}
      </Item>
      <Item label={i18n.t`Address`} className={'address'}>
        {!isEmpty(user.shipping)
          ? `${user.shipping.street} ${user.shipping.town} ${user.shipping.city} ${user.shipping.country}`
          : null}
      </Item>
    </Descriptions>
  );
});
