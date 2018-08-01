import {Interrupts} from '@uci/interrupt'

const PINS = [9,10,24]
const PORT = 9000
const PATH = 'interrupt' // include a path: option if the code you push to is on the same machine
const PUSH_CMD = 'pin.interrupt.find'  // default is just 'interrupt' change for use with mcp chips
const PINOPTS = {wait:20}
const RESET_CMD = 'pin.interrupt.reset'

let hook = (packet) =>
{
  console.log(`a before push hook`)
  console.log('can modify packet before pushing here')
  console.dir(packet)
  return packet
}

let interrupts  = new Interrupts(PINS,{hook:true, pushcmd:PUSH_CMD, resetCmd:RESET_CMD, 24:PINOPTS, 10:PINOPTS, 9:PINOPTS})

interrupts.setHook(hook)

;
(async () => {

  await interrupts.init()

})().catch(err => {
  console.error('FATAL: UNABLE TO START SYSTEM!\n',err)
  // process.kill(process.pid, 'SIGTERM')
})
