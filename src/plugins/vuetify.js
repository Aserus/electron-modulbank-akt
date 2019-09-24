import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

import '@mdi/font/css/materialdesignicons.css'
//import 'font-awesome/css/font-awesome.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

Vue.use(Vuetify)

export default new Vuetify({
	icons: {
		iconfont: 'mdi', // default - only for display purposes
	},
	theme:{
	//	dark: true
	}
})
