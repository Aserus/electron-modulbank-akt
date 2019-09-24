<template lang="pug">
div
	template(v-if="!error")
		v-list-item-group(v-model="selectIndex")
			company-list(:list="list")
	template(v-else)
		v-alert(type="error")
			div {{error}}
			.text-right
				v-btn(icon @click="uploadOrgs()")
					v-icon mdi-refresh
</template>

<script>
import api from '@helpers/api';


import CompanyList from './CompanyList.vue';




export default {
	props:{
		input: Object
	},
	data: ()=>({
		list: [],
		selectIndex:null,
		error:null
	}),
	mounted(){
		this.uploadOrgs()
	},
	methods:{
		async uploadOrgs(){
			this.error = null
			try{
				const list =  await api.account()
				if(!list) throw new Error('Нет доступа, возможно неправильный токен')
				list.forEach(item => {
					item.bankAccounts.forEach(bk => {
						bk.organization = item
					})
				})
				//console.log(list)
				this.list = list

			}catch(err){
				this.error = err.message
			}
		},
		clickAccount(account){
			this.bankAccount = account
		},
	},
	components: {
		CompanyList

	}

}
</script>

<style>

</style>
