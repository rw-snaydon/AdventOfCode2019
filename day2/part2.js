const fs = require('fs')
const readLine = require('readline')

const reader = readLine.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
})

async function readProgramFromFile() {
  for await (const line of reader) return line
}

const getIntcodeArray = intcode => {
  const intcodeArray = intcode.split(',')
  return intcodeArray.map(i => ~~i)
}

// const add = (ip, memory) => {
//   const result = memory[memory[ip + 1]] + memory[memory[ip + 2]]
//   memory[memory[ip + 3]] = result
//   ip += 4
//   return {ip, memory}
// }

// const multiply = (ip, memory) => {
//   const result = memory[memory[ip + 1]] * memory[memory[ip + 2]]
//   memory[memory[ip + 3]] = result
//   ip += 4
//   return {ip, memory}
// }

const add = (a, b) => a + b

const multiply = (a, b) => a * b

const operate = (ip, memory, opp) => {
  const result = opp(memory[memory[++ip]], memory[memory[++ip]])
  memory[memory[++ip]] = result
  return {ip: ++ip, memory}
}

const runIntcode = (program, noun, verb) => {
  let memory = getIntcodeArray(program)
  memory[1] = noun
  memory[2] = verb

  let ip = 0
  while (ip < memory.length && memory[ip] !== 99) {
    switch (memory[ip]) {
      case 1:
        ({ip, memory} = operate(ip, memory, add))
        break
      case 2:
        ({ip, memory} = operate(ip, memory, multiply))
        break
      default:
        throw 'Invalid opcode!!'
    }
  }
  return memory[0]
}

const findInputsFor = (program, desiredOutput) => {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      if (runIntcode(program, i, j) == desiredOutput) return {noun: i, verb: j}
    }
  }
  return {noun: undefined, verb: undefined}
}

async function completeGravityAssist() {
  const gravityAssistProgram = await readProgramFromFile()
  const {noun, verb} = findInputsFor(gravityAssistProgram, 19690720)
  console.log(noun, verb)
}

const testIntComputer = () => {
  const test1 = runIntcode([1,0,0,0,99])
  const test2 = runIntcode([2,3,0,3,99])
  const test3 = runIntcode([2,4,4,5,99,0])
  const test4 = runIntcode([1,1,1,4,99,5,6,0,99])

  console.log(test1, test2, test3, test4)
}

// testIntComputer()
completeGravityAssist()
