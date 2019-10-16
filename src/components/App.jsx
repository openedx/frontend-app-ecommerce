import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { sendTrackEvent } from '@edx/frontend-analytics';
import SiteHeader from '@edx/frontend-component-site-header';
import SiteFooter from '@edx/frontend-component-footer';
import { IntlProvider, injectIntl, intlShape, getLocale, getMessages } from '@edx/frontend-i18n';
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
  faRedditSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ErrorBoundary, fetchUserAccount } from '../common';
import { ConnectedOrderHistoryPage } from '../order-history';

import FooterLogo from '../assets/edx-footer.png';
import HeaderLogo from '../assets/logo.svg';
import NotFoundPage from './NotFoundPage';

import messages from './App.messages';


function PageContent({
  configuration,
  username,
  avatar,
  intl,
}) {
  const mainMenu = [
    {
      type: 'item',
      href: `${configuration.LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(messages['siteheader.links.courses']),
    },
    {
      type: 'item',
      href: `${configuration.LMS_BASE_URL}/dashboard/programs`,
      content: intl.formatMessage(messages['siteheader.links.programs']),
    },
    {
      type: 'item',
      href: `${configuration.MARKETING_SITE_BASE_URL}/course`,
      content: intl.formatMessage(messages['siteheader.links.content.search']),
      onClick: () => {
        sendTrackEvent(
          'edx.bi.dashboard.find_courses_button.clicked',
          { category: 'orders', label: 'header' },
        );
      },
    },
  ];
  const userMenu = [
    {
      type: 'item',
      href: `${process.env.LMS_BASE_URL}`,
      content: intl.formatMessage(messages['siteheader.user.menu.dashboard']),
    },
    {
      type: 'item',
      href: `${process.env.LMS_BASE_URL}/u/${username}`,
      content: intl.formatMessage(messages['siteheader.user.menu.profile']),
    },
    {
      type: 'item',
      href: `${process.env.LMS_BASE_URL}/account/settings`,
      content: intl.formatMessage(messages['siteheader.user.menu.account.settings']),
    },
    {
      type: 'item',
      href: process.env.ORDER_HISTORY_URL,
      content: intl.formatMessage(messages['siteheader.user.menu.order.history']),
    },
    {
      type: 'item',
      href: process.env.LOGOUT_URL,
      content: intl.formatMessage(messages['siteheader.user.menu.logout']),
    },
  ];
  const loggedOutItems = [
    {
      type: 'item',
      href: `${process.env.LMS_BASE_URL}/login`,
      content: intl.formatMessage(messages['siteheader.user.menu.login']),
    },
    {
      type: 'item',
      href: `${process.env.LMS_BASE_URL}/register`,
      content: intl.formatMessage(messages['siteheader.user.menu.register']),
    },
  ];
  const socialLinks = [
    {
      title: 'Facebook',
      url: configuration.FACEBOOK_URL,
      icon: <FontAwesomeIcon icon={faFacebookSquare} className="social-icon" size="2x" />,
      screenReaderText: 'Like edX on Facebook',
    },
    {
      title: 'Twitter',
      url: configuration.TWITTER_URL,
      icon: <FontAwesomeIcon icon={faTwitterSquare} className="social-icon" size="2x" />,
      screenReaderText: 'Follow edX on Twitter',
    },
    {
      title: 'LinkedIn',
      url: configuration.LINKED_IN_URL,
      icon: <FontAwesomeIcon icon={faLinkedin} className="social-icon" size="2x" />,
      screenReaderText: 'Follow edX on LinkedIn',
    },
    {
      title: 'Reddit',
      url: configuration.REDDIT_URL,
      icon: <FontAwesomeIcon icon={faRedditSquare} className="social-icon" size="2x" />,
      screenReaderText: 'Subscribe to the edX subreddit',
    },
  ];
  const enterpriseMarketingLinkData = {
    url: configuration.ENTERPRISE_MARKETING_URL,
    queryParams: {
      utm_campaign: configuration.ENTERPRISE_MARKETING_UTM_CAMPAIGN,
      utm_source: configuration.ENTERPRISE_MARKETING_UTM_SOURCE,
      utm_medium: configuration.ENTERPRISE_MARKETING_FOOTER_UTM_MEDIUM,
    },
  };

  return (
    <div id="app">
      <SiteHeader
        logo={HeaderLogo}
        loggedIn
        username={username}
        avatar={avatar}
        logoAltText={configuration.SITE_NAME}
        logoDestination={`${configuration.LMS_BASE_URL}/dashboard`}
        mainMenu={mainMenu}
        userMenu={userMenu}
        loggedOutItems={loggedOutItems}
      />
      <main>
        <Switch>
          <Route path="/orders" component={ConnectedOrderHistoryPage} />
          <Route path="/notfound" component={NotFoundPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
      <SiteFooter
        siteName={configuration.SITE_NAME}
        siteLogo={FooterLogo}
        marketingSiteBaseUrl={configuration.MARKETING_SITE_BASE_URL}
        enterpriseMarketingLink={enterpriseMarketingLinkData}
        supportUrl={configuration.SUPPORT_URL}
        contactUrl={configuration.CONTACT_URL}
        openSourceUrl={configuration.OPEN_SOURCE_URL}
        termsOfServiceUrl={configuration.TERMS_OF_SERVICE_URL}
        privacyPolicyUrl={configuration.PRIVACY_POLICY_URL}
        socialLinks={socialLinks}
        appleAppStoreUrl={configuration.APPLE_APP_STORE_URL}
        googlePlayUrl={configuration.GOOGLE_PLAY_URL}
        handleAllTrackEvents={sendTrackEvent}
      />
    </div>
  );
}

PageContent.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  configuration: PropTypes.shape({
    SITE_NAME: PropTypes.string.isRequired,
    MARKETING_SITE_BASE_URL: PropTypes.string.isRequired,
    SUPPORT_URL: PropTypes.string.isRequired,
    CONTACT_URL: PropTypes.string.isRequired,
    OPEN_SOURCE_URL: PropTypes.string.isRequired,
    TERMS_OF_SERVICE_URL: PropTypes.string.isRequired,
    PRIVACY_POLICY_URL: PropTypes.string.isRequired,
    FACEBOOK_URL: PropTypes.string.isRequired,
    TWITTER_URL: PropTypes.string.isRequired,
    YOU_TUBE_URL: PropTypes.string.isRequired,
    LINKED_IN_URL: PropTypes.string.isRequired,
    REDDIT_URL: PropTypes.string.isRequired,
    APPLE_APP_STORE_URL: PropTypes.string.isRequired,
    GOOGLE_PLAY_URL: PropTypes.string.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};

PageContent.defaultProps = {
  avatar: null,
};

const IntlPageContent = injectIntl(PageContent);

class App extends Component {
  componentDidMount() {
    const { username } = this.props;
    this.props.fetchUserAccount(username);
  }

  render() {
    return (
      <ErrorBoundary>
        <IntlProvider locale={getLocale()} messages={getMessages()}>
          <Provider store={this.props.store}>
            <ConnectedRouter history={this.props.history}>
              <IntlPageContent
                configuration={this.props.configuration}
                username={this.props.username}
                avatar={this.props.avatar}
              />
            </ConnectedRouter>
          </Provider>
        </IntlProvider>
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  fetchUserAccount: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  store: PropTypes.object.isRequired, // eslint-disable-line
  history: PropTypes.object.isRequired, // eslint-disable-line
  configuration: PropTypes.shape({
    SITE_NAME: PropTypes.string.isRequired,
    MARKETING_SITE_BASE_URL: PropTypes.string.isRequired,
    SUPPORT_URL: PropTypes.string.isRequired,
    CONTACT_URL: PropTypes.string.isRequired,
    OPEN_SOURCE_URL: PropTypes.string.isRequired,
    TERMS_OF_SERVICE_URL: PropTypes.string.isRequired,
    PRIVACY_POLICY_URL: PropTypes.string.isRequired,
    FACEBOOK_URL: PropTypes.string.isRequired,
    TWITTER_URL: PropTypes.string.isRequired,
    YOU_TUBE_URL: PropTypes.string.isRequired,
    LINKED_IN_URL: PropTypes.string.isRequired,
    REDDIT_URL: PropTypes.string.isRequired,
    APPLE_APP_STORE_URL: PropTypes.string.isRequired,
    GOOGLE_PLAY_URL: PropTypes.string.isRequired,
  }).isRequired,
};

App.defaultProps = {
  avatar: null,
};

const mapStateToProps = state => ({
  username: state.authentication.username,
  configuration: state.configuration,
  avatar: state.userAccount.profileImage.hasImage
    ? state.userAccount.profileImage.imageUrlMedium
    : null,
});

export default connect(
  mapStateToProps,
  {
    fetchUserAccount,
  },
)(App);
