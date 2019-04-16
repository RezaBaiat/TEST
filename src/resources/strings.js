/* eslint-disable */
import EN from './langs/EN';
import FA from './langs/FA';

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
