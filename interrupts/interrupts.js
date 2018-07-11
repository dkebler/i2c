import {Interrupts} from '@uci/interrupt'

const PINS = [9,10]
const PORT = 9000
const PATH = 'interrupt' // include a path: option if the code you push to is on the same machine
const PUSH_CMD = 'pin.interrupt.find'  // default is just 'interrupt' change for use with mcp chips

let hook = (packet) =>
{
  console.log(`a before push hook`)
  console.log('can modify packet before pushing here')
  console.dir(packet)
  return packet
}

let interrupts  = new Interrupts(PINS,{hook:true, pushcmd:PUSH_CMD, 10:{wait:200}})

interrupts.setHook(hook)

;
(async () => {

  await interrupts.init()
  // interrupts.fire()

})().catch(err => {
  console.error('FATAL: UNABLE TO START SYSTEM!\n',err)
  // process.kill(process.pid, 'SIGTERM')
})
