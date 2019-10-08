import fileUrl from 'file-url'

import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import tempfile from 'tempfile'

import { promises as fsAsync } from 'fs'
//import path from 'path'

import { shell } from 'electron'
import moment from 'moment'
import { rubles } from 'rubles'
import path from 'path'
import os from 'os'
import fs from 'fs'


//import { rootPath } from 'electron-root-path';

moment.locale('ru');

// eslint-disable-next-line
const appTplPath = path.join(__static,'tpl.docx')

export const tplPath = path.join(os.homedir(),'md_electron_tpl.docx')



function copyTpl(){
	fs.copyFileSync(appTplPath, tplPath)
}

if(!fs.existsSync(tplPath)){
	copyTpl();
}



export const tplUrl = fileUrl(tplPath);

export function clearTpl(){
	if(fs.existsSync(tplPath)){
		fs.unlinkSync(tplPath)
	}
	copyTpl()
}
export function openTpl(){
	shell.openExternal(tplUrl)
}

export default async function gendoc(org,item){
	//Load the docx file as a binary
	const content = await fsAsync.readFile(tplPath, 'binary');

	const zip = new PizZip(content);

	const doc = new Docxtemplater();
	doc.loadZip(zip);

	const data = generateParams(org,item)

	doc.setData(data);

	try {
		// render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
		doc.render()
	}
	catch (error) {
			/*const err = {
					message: error.message,
					name: error.name,
					stack: error.stack,
					properties: error.properties,
			}
			*/
			//console.log(err);
			// The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
			throw error;
	}

	const buf = doc.getZip().generate({type: 'nodebuffer'});

	const outFile = tempfile('.docx')

	await fsAsync.writeFile(outFile, buf);

	shell.openExternal(fileUrl(outFile))
}


function getAktNumber(text){
	const regList = [
		new RegExp("№(\\d+)",'i'),
		new RegExp("счету (\\d+) от",'i')
	]
	for(let reg of regList){
		const d = reg.exec(text)
		if(d && d[1]){
			return d[1]
		}
	}
	return ''
}

export function generateParams(org,item){
	const out = {}

	const created = item.created
	const executed = item.executed
	item.created = moment(created).format('DD.MM.YYYY')
	item.createdText = moment(created).format('LL')

	item.executed = moment(executed).format('DD.MM.YYYY')
	item.executedText = moment(executed).format('LL')


	item.amountText = rubles(item.amount);

	item.amountText = item.amountText.charAt(0).toUpperCase() + item.amountText.slice(1)

	item.aktNumber = getAktNumber(item.paymentPurpose)

	Object.keys(org).forEach(k => {
		if(k=='bankAccounts') return;
		const key = `o-${k}`
		out[key] = org[k]
	})
	Object.keys(item).forEach(k => {
		const key = `p-${k}`
		out[key] = item[k]
	})


	out.nowDate = moment().format('DD.MM.YYYY')
	out.nowDateText = moment().format('LL')

	//console.log(Object.keys(out))
	return out
}



export const tplKeys = [
	"o-companyId",
	"o-companyName",
	"o-registrationCompleted",
	"o-Inn",
	"o-Kpp",
	"o-Ogrn",
	"p-id",
	"p-companyId",
	"p-status",
	"p-category",
	"p-contragentName",
	"p-contragentInn",
	"p-contragentKpp",
	"p-contragentBankAccountNumber",
	"p-contragentBankName",
	"p-contragentBankBic",
	"p-currency",
	"p-amount",
	"p-bankAccountNumber",
	"p-paymentPurpose",
	"p-executed",
	"p-created",
	"p-docNumber",
	"p-createdText",
	"p-executedText",
	"p-amountText",
	"p-aktNumber",
	"nowDate",
	"nowDateText"]
