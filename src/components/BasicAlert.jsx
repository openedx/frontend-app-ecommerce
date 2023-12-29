import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Alert,
  AlertModal,
  Button,
} from '@openedx/paragon';
import { Info } from '@openedx/paragon/icons';

import SupportLink from './SupportLink';
import messages from './BasicAlert.messages';

const BasicAlert = ({ isModal, isVisible, onClose }) => {
  const { formatMessage } = useIntl();

  const title = formatMessage(
    messages['ecommerce.order.history.basic.alert.title'],
  );
  const body = formatMessage(
    messages['ecommerce.order.history.basic.alert.body'],
    {
      supportLink: <SupportLink />,
    },
  );
  const buttonLabel = formatMessage(
    messages['ecommerce.order.history.basic.alert.button'],
  );

  return isModal ? (
    <AlertModal
      data-testid="basic-alert"
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
    <Alert
      data-testid="basic-alert"
      variant="danger"
      icon={Info}
      show={isVisible}
    >
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
