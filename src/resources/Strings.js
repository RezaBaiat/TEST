/* eslint-disable */
import EN from '../../assets/translations/EN';
import FA from '../../assets/translations/FA';
import i18next from 'i18next';

i18next.init({
    lng: 'en',
    debug: true,
    resources: {
        en: {
            translation: EN
        }
    }
}, function(err, t) {
    // initialized and ready to go!
    document.getElementById('output').innerHTML = i18next.t('key');
});

export default class Strings {

    static setLang(lang: 'en' | 'fa') {
        switch (lang) {
            case 'en':
                this.apply(EN);
                break;
            case 'fa':
                this.apply(FA);
                break;
        }
    }

    static apply(jsonObject : any){
        Object.keys(Strings).map((key)=>{
            if (jsonObject[key]){
                Strings[key] = jsonObject[key];
            } else {
                Strings[key] = 'N/A !'
            }
        })
    }

    static error_connecting_network = "";
}
