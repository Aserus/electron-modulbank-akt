<template lang="pug">
v-card.mb-3
	v-card-title {{item.companyName}}
	bank-account-list(:list="item.bankAccounts")


	div
</template>

<script>
import BankAccountList from './BankAccountList.vue';

export default {
	props:{
		item:Object
	},
	components:{
		BankAccountList
	}

}
</script>

<style>

</style>
