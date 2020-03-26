import React, { memo } from 'react';
import { Descriptions } from 'antd';
import { isEmpty } from 'lodash';

const { Item } = Descriptions;

export const HeadContent = memo(({ i18n, user }) => {
  const info = user.shippAddress;

  return (
    <Descriptions>
      <Item label={i18n.t`Receiver`}>
        {!isEmpty(info) ? `${info.firstName} ${info.lastName1}` : null}
      </Item>
      <Item label={i18n.t`Phone`}>
        {!isEmpty(info) ? `${info.phone2}` : null}
      </Item>
      <Item label={i18n.t`PostalCode`}>
        {!isEmpty(info) ? `${info.postCode}` : null}
      </Item>
      <Item label={i18n.t`Address`} className={'address'}>
        {!isEmpty(info)
          ? `${info.street} ${info.town} ${info.city} ${info.country}`
          : null}
      </Item>
    </Descriptions>
  );
});
