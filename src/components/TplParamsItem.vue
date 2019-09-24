<template lang="pug">
v-chip( v-clipboard:copy="item" v-clipboard:success="clickChip").mr-2.mb-2
	v-icon(:color="color").mr-2
		template(v-if="isCopy") mdi-check-circle-outline
		template(v-else) mdi-content-copy

	span {{ item }}
</template>

<script>

export default {
	props:{
		item:String,

	},
	data: () => ({
		isCopy:false,
		color: null
	}),
	methods:{
		clickChip(){

			this.color = "green"
			this.isCopy = true
			setTimeout(()=>{
				this.color = null
				this.isCopy = false
			},400)


		}
	}
}
</script>

<style>

</style>
