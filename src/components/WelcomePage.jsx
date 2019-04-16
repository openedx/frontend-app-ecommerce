import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function WelcomePage() {
  return (
    <div className="container-fluid d-flex py-5 justify-content-center align-items-start text-center">
      <p className="my-0 py-5 text-muted" style={{ maxWidth: '32em' }}>
        <FormattedMessage
          id="root.page"
          defaultMessage="Congratulations!  You have a new micro-frontend."
          description="Default page content for a new frontend application"
        />
      </p>
    </div>
  );
}
