<template lang="pug">
div
	v-card(color="#1F7087" dark).mb-3
		v-card-title {{organization.companyName}}
		v-card-text
			v-row
				v-col
					div {{item.accountName}}
					.small {{item.category}}
				v-col.text-right
					v-chip {{balanceText}} {{item.currency}}
			div

			div {{item.bankName}}
			.small {{item.number}}

	div.mb-3
		//pre {{item}}
		//pre {{item}}
	operation-list-item(v-for="item in operationList" :item="item" :org="organization" :key="item.id")

	div
</template>

<script>
//import { bankAccount } from '@helpers/bus'
import api from '@helpers/api';
import { formatMoney } from '@helpers/formatter'

import OperationListItem from './OperationListItem.vue';

export default {
	props:{
		item:Object,

	},
	computed:{
		balanceText(){
			return formatMoney(this.item.balance)
		},
		organization(){
			return this.item.organization
		}
	},
	data: ()=>({
		operationList:[]
	}),
	methods:{
		async uploadData(){
			this.operationList = await api.operationHistory(this.item.id)
		}
	},
	mounted(){
		this.uploadData()
	},
	components:{
		OperationListItem
	}

}
</script>

<style>

</style>
