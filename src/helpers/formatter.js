const replaceArr = [
	{
		from:'Индивидуальный предприниматель ',
		to: 'ИП '
	}
]

export function formatCompanyName(name){
	let out = name;

	for(let rp of replaceArr){
		if(out.indexOf(rp.from)===0) return out.replace(rp.from,rp.to)
	}
	return out;
}


export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = " ") {
	try {
		decimalCount = Math.abs(decimalCount);
		decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

		const negativeSign = amount < 0 ? "-" : "";

		let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
		let j = (i.length > 3) ? i.length % 3 : 0;

		const d = (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "")

		return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (d !== '.00' ? d : '');
	} catch(err){
		!!err
	}
}
