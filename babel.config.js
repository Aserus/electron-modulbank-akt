module.exports = {
	presets: [
		'@vue/app'
	],
	plugins: [
		["module-resolver", {
			"root": ["./src"],
			"alias": {
				"@": "./src",
				"@comp": "./src/components",
				"@helpers": "./src/helpers"
			}
		}]
	]
}
