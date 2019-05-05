import React, { PureComponent } from 'react';
import {
  injectIntl, intlShape, IntlProvider, addLocaleData,
} from 'react-intl';
import { connect } from 'react-redux';
import { createMapStateToProps } from '../../scenes/BaseComponent';
import type { InitialState } from "../../redux/reducers/RootReducer";

require('intl');

const faTranslation = require('../../assets/translations/FA');
const enTranslation = require('../../assets/translations/EN');

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

export default connect(createMapStateToProps((state) => {
  const { locale } = state.rootReducer;
  return {
    locale,
  };
}))(Locale);
