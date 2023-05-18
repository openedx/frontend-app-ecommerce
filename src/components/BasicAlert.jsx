import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Alert,
  AlertModal,
  Button,
  Hyperlink,
} from '@edx/paragon';
import { Info } from '@edx/paragon/icons';

import messages from './BasicAlert.messages';

const BasicAlert = ({ isModal, isVisible, onClose }) => {
  const { formatMessage } = useIntl();

  const title = formatMessage(
    messages['ecommerce.order.history.basic.alert.title'],
  );
  const body = formatMessage(
    messages['ecommerce.order.history.basic.alert.body'],
    {
      supportLink: (
        <Hyperlink destination={`${getConfig().SUPPORT_URL}/hc/requests/new`}>
          <FormattedMessage
            id="ecommerce.order.history.support.fragment"
            defaultMessage="contact support"
            description="The support link as in 'please {contact support}'"
          />
        </Hyperlink>
      ),
    },
  );
  const buttonLabel = formatMessage(
    messages['ecommerce.order.history.basic.alert.button'],
  );

  return isModal ? (
    <AlertModal
      variant="danger"
      title={title}
      icon={Info}
      isOpen={isVisible}
      onClose={onClose}
      footerNode={(
        <ActionRow>
          <Button variant="tertiary" onClick={onClose}>
            {buttonLabel}
          </Button>
        </ActionRow>
      )}
    >
      <p>{body}</p>
    </AlertModal>
  ) : (
    <Alert variant="danger" icon={Info} show={isVisible}>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{body}</p>
    </Alert>
  );
};

BasicAlert.propTypes = {
  isModal: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

BasicAlert.defaultProps = {
  isModal: false,
  onClose: undefined,
};

export default BasicAlert;
