// Provider and wrapper all-in-one solution for react-intl
// this class contains available languages,their equivalent strings,
// also listens to locale state change and updates strings list
// if necessary

import React, { PureComponent } from 'react';
import {
  injectIntl, intlShape, IntlProvider, addLocaleData,
} from 'react-intl';
import { connect } from 'react-redux';
import type { InitialState } from '../redux/general/GlobalReducer';

require('intl');

const faTranslation = require('../assets/i18n/fa/FA');
const enTranslation = require('../assets/i18n/en/EN');

addLocaleData([
  ...require('react-intl/locale-data/en'),
  ...require('react-intl/locale-data/fa'),
]);

export const AVAILABLE_LANGUAGES = ['en', 'fa'];
const MESSAGES = [enTranslation, faTranslation];

class Locale extends PureComponent<InitialState> {

  state = {
    children: this.props.children,
  };

  render() {
    const { children } = this.state;
    const { locale } = this.props;
    return (
      <IntlProvider
        key={locale}
        locale={locale}
        messages={MESSAGES[AVAILABLE_LANGUAGES.indexOf(locale)]}
        defaultLocale={locale}
      >
        {children}
      </IntlProvider>
    );
  }
}

export default connect((state) => {
  const { locale } = state.rootReducer;
  return {
    locale,
  };
})(Locale);
