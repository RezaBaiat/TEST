// All strings should be referenced from this class .
// this should also provide a solution
// to hold a key reference to the related language's Json file

/* eslint-disable */
import EN from '../assets/i18n/EN';
import FA from '../assets/i18n/FA';

export default class Strings {

   /* static setLang(lang: 'en' | 'fa') {
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
    }*/

    static error_connecting_network = "error_connecting_network";
}
