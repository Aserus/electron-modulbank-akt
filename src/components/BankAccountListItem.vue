<template lang="pug">
v-list-item(@click="clickAccount")
	v-list-item-content
		v-list-item-title {{item.accountName}}
		v-list-item-subtitle {{item.category}}
	v-list-item-action
		v-chip {{balanceText}} {{item.currency}}

	div
</template>

<script>
import { bankAccount } from '@helpers/bus'
import { formatMoney } from '@helpers/formatter'

export default {
	props:{
		item:Object
	},
	methods:{
		clickAccount(){
			bankAccount.$emit('choose',this.item)
		}
	},
	computed:{
		balanceText(){
			return formatMoney(this.item.balance)
		}
	}

}
</script>

<style>

</style>
