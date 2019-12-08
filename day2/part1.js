const fs = require('fs')
const readLine = require('readline')

const reader = readLine.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
})

async function readProgram() {
  for await (const line of reader) return line
}

const getIntcodeArray = intcode => {
  const intcodeArray = intcode.split(',')
  return intcodeArray.map(i => ~~i)
}

const add = (instruction, intcode) => {
  const result = intcode[intcode[instruction + 1]] + intcode[intcode[instruction + 2]]
  intcode[intcode[instruction + 3]] = result
  instruction += 4
  return {instruction, intcode}
}

const multiply = (instruction, intcode) => {
  const result = intcode[intcode[instruction + 1]] * intcode[intcode[instruction + 2]]
  intcode[intcode[instruction + 3]] = result
  instruction += 4
  return {instruction, intcode}
}

const runIntcode = intcode => {
  // let intcodeArray = getIntcodeArray(intcode)
  let instruction = 0
  while (instruction < intcode.length && intcode[instruction] !== 99) {
    switch (intcode[instruction]) {
      case 1:
        ({instruction, intcode} = add(instruction, intcode))
        break
      case 2:
        ({instruction, intcode} = multiply(instruction, intcode))
        break
      default:
        throw 'Invalid opcode!!'
    }
  }
  return intcode
}

async function restoreGravityAssist() {
  const gravityAssitProgram = getIntcodeArray(await readProgram())
  gravityAssitProgram[1] = 12
  gravityAssitProgram[2] = 2
  console.log(runIntcode(gravityAssitProgram))
}

const testIntComputer = () => {
  const test1 = runIntcode([1,0,0,0,99])
  const test2 = runIntcode([2,3,0,3,99])
  const test3 = runIntcode([2,4,4,5,99,0])
  const test4 = runIntcode([1,1,1,4,99,5,6,0,99])

  console.log(test1, test2, test3, test4)
}

// testIntComputer()
restoreGravityAssist()
