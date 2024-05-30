import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Hyperlink } from '@openedx/paragon';

const SupportLink = () => (
  <Hyperlink destination={`${getConfig().SUPPORT_URL}/hc/requests/new`}>
    <FormattedMessage
      id="ecommerce.order.history.support.fragment"
      defaultMessage="contact support"
      description="The support link as in 'please {contact support}'"
    />
  </Hyperlink>
);

export default SupportLink;
