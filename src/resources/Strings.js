// This file holds reference to 'key names' of the Json key value files in config/i18n folder
// the purpose of this file is to solve the code completion issue when getting strings from react-intl by providing a work around :
// if you take a look at [BaseComponent](../app/scenes/general/BaseComponent.html) file , there is a method called getString()
// and it should be used like this :
// getString(R.strings.error_connecting_network)
// this file is exported in R.js file and should be called from there
// the variables in this file should match EXACT same as the keys in the json files
/* eslint-disable */

export default class Strings {

    static error_connecting_network = "error_connecting_network";
}
