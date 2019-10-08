<template lang="pug">
div
	v-card
		v-card-title(@click="clickTpl()") Переменные для шаблона
		v-card-text
			tpl-params-item(v-for="(item,index) in formatterList" :item="item" :key="index").mr-2.mb-2

		v-card-actions
			v-btn(@click="clickClear()" color="warning") Reset TPL
			v-btn(@click="clickTpl()" color="primary").ml-auto Открыть шаблон
	div
</template>

<script>
import { clearTpl,openTpl, tplKeys } from '@helpers/gendoc'
import TplParamsItem from './TplParamsItem'


export default {
	data: () => ({
		tplKeys
	}),
	computed:{
		formatterList(){
			return this.tplKeys.map(item => `{${item}}`).sort()
		}
	},
	methods:{
		clickTpl(){
			openTpl()
		},
		clickClear(){
			clearTpl()
		}
	},
	components:{
		TplParamsItem
	}


}
</script>

<style>

</style>
