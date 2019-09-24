<template lang="pug">
div
	v-card(color="#1F7087" dark).mb-3
		v-card-title Настрйоки
		v-card-text
			v-text-field(v-model="token" label="Token")
			v-switch(v-model="sandbox" class="ma-4" label="Sandbox")
</template>

<script>
import api from '@helpers/api'
import store from '@helpers/store'

export default {
	data: ()=>({
		token: store.get('token',''),
		sandbox: store.get('sandbox',true)
	}),
	watch:{
		token(v){
			store.set('token',v)

		},
		sandbox(v){
			store.set('sandbox',v)
		}
	},
	destroyed(){
		api.setApi(store.get('token','sandboxtoken'),store.get('sandbox','sandboxtoken'))
	}

}
</script>

<style>

</style>
