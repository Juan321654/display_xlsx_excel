let xlsx = require('xlsx');
let path = require("path")

let wb = xlsx.readFile('../uploads/StressTest1.xlsx')
let sheet = wb.Sheets['Sheet4']
let jsonSheet = xlsx.utils.sheet_to_json(sheet, {header: 1})

console.log(wb.SheetNames)