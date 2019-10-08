import { ModuleBankApi/*, ModuleBankPaymentCategory*/ } from 'module-bank-api';
import store from './store'
//import moment from 'moment'
//import request from 'request'
//import { Base64 } from 'js-base64';


let api

// function checkConnect(){
// 	return null
// }


export function setApi(token = 'sandboxtoken',sandbox = true){
	api = new ModuleBankApi(
		token,
		sandbox
	);
	//checkConnect(api,token)
}




export function account(){
	return new Promise((resolve,reject)=>{
		api.getAccountInfo((err,result)=>{
			if(err) return reject(err)
			resolve(result);
		})
	})
}



export function operationHistory(bankAccountId,params){
	return new Promise((resolve,reject)=>{
		api.getOperationHistory(bankAccountId, params, (err,result)=>{
			if(err) return reject(err)
			resolve(result);
		})
	})
}


export default {
	operationHistory,
	account,
	setApi
}



setApi(store.get('token','sandboxtoken'),store.get('sandbox','sandboxtoken'))
