<template lang="pug">
v-list
	bank-account-list-item(v-for="item in list" :item="item" :key="item.key")

	div
</template>

<script>
import BankAccountListItem from './BankAccountListItem.vue';


export default {
	props:{
		list: Array
	},
	components: {
		BankAccountListItem

	},

}
</script>

<style>

</style>
