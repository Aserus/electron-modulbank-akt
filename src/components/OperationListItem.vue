<template lang="pug">
div
	//pre {{item}}
	v-card.mb-3
		v-card-title
			.small {{contragentNameShort}}
		//v-card-subtitle {{item.contragentName}}
		v-card-text
			v-chip(x-small).mr-2 {{item.category}}
			v-chip(x-small).mr-2 {{item.status}}
			| {{item.paymentPurpose}}
		v-card-actions
			v-chip {{amountText}} {{item.currency}}

			v-btn(@click="toggleInfo()" icon).ml-auto
				v-icon mdi-information-outline
			v-btn(@click="genAkt()" color="primary") Скачать акт
		//v-card-text
		pre(v-if="showInfo").pa-2.small {{item}}
	div
</template>

<script>
//import { bankAccount } from '@helpers/bus'
import { formatMoney,formatCompanyName } from '@helpers/formatter'
import gendoc from '@helpers/gendoc';



export default {
	props:{
		item:Object,
		org:Object,


	},
	data: ()=>({
		showInfo: false
	}),
	computed:{
		amountText(){
			return formatMoney(this.item.amount)
		},
		contragentNameShort(){
			return formatCompanyName(this.item.contragentName)
		}
	},
	methods:{
		genAkt(){
			//console.log(this.org,this.item)
			gendoc(this.org,this.item)
		},
		toggleInfo(){
			this.showInfo = !this.showInfo
		}

	},
	mounted(){

	}

}
</script>

<style>

</style>
