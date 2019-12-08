const fs = require('fs')
const readLine = require('readline')

const reader = readLine.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
})

async function getModuleMasses() {
  const moduleMasses = []

  for await (const line of reader) moduleMasses.push(line)

  return moduleMasses
}

async function calculateFuelForAllModules() {
  const moduleMasses = await getModuleMasses()
  let totalFuelCost = 0

  for (const mass of moduleMasses) totalFuelCost += getFuelCost(mass)

  console.log(totalFuelCost)
}

const getFuelCost = mass => {
  const fuelCost = getCostPerModule(mass)
  return fuelCost > 0 ? fuelCost + getFuelCost(fuelCost) : 0
}

const getCostPerModule = mass => Math.floor(mass / 3) - 2

async function testRead() {
  const values = await getModuleMasses()
  console.log(values)
}

const testFuelCost = () => {
  let test1 = getFuelCost(12)
  let test2 = getFuelCost(14)
  let test3 = getFuelCost(1969)
  let test4 = getFuelCost(100756)
  let test5 = getFuelCost(116072)
  
  console.log(test1, test2, test3, test4, test5)
}

// testRead()
// testFuelCost()
calculateFuelForAllModules()
