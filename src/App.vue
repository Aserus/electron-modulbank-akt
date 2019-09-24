<template lang="pug">
v-app
	v-app-bar(app color="indigo" dark)
		v-toolbar-title(@click="clickHome()") Modulbank
		v-btn(icon @click="clickTpl()").ml-auto
			v-icon mdi-file-document-box-multiple
		v-btn(icon @click="clickSettings()")
			v-icon mdi-settings

	v-content
		v-container(fluid)
			template(v-if="page=='main'")
				modul-list(v-if="!bankAccount")
				bank-account-view(v-else :item="bankAccount")
			template(v-else-if="page=='tpl'")
				tpl-params
			template(v-else-if="page=='settings'")
				settings-view

	div
</template>

<script>
import ModulList from '@comp/ModulList.vue';
import TplParams from '@comp/TplParams.vue';
import BankAccountView from '@comp/BankAccountView.vue';
import SettingsView from '@comp/SettingsView.vue';
import { bankAccount } from './helpers/bus'

export default {
	name: 'app',
	data: ()=>({
		page:'main',
		bankAccount: null
	}),
	components: {
		ModulList,
		TplParams,
		BankAccountView,
		SettingsView
	},
	mounted(){
		//console.log(store.get('token','sandboxtoken'),store.get('sandbox','sandboxtoken'))


		bankAccount.$on('choose',(account)=>{
			this.bankAccount = account
		})
	},
	methods:{
		clickTpl(){
			this.page = (this.page=='tpl') ? 'main' : 'tpl'
		},
		clickSettings(){
			this.page = (this.page=='settings') ? 'main' : 'settings'
		},
		clickHome(){
			this.page = 'main';
			this.bankAccount = null;
		}
	}
}
</script>

<style>
.small {
	font-size: 80%;
}
</style>
