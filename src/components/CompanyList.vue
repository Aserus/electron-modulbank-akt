<template lang="pug">
div
	company-list-item(v-for="item in list" :item="item" :key="item.key")

	div
</template>

<script>
import CompanyListItem from './CompanyListItem.vue';


export default {
	props:{
		list: Array
	},
	components: {
		CompanyListItem

	},

}
</script>

<style>

</style>
