/*
*  This will work ONLY with a MCP2300x chip
*  You must know the i2c address of the chip on the bus (see the scan.js sample)
*  Then use the environment vairable I2C_ADDRESS.  you can use the decimal or 0x00 hex.
*/

import Base from  '@uci/base'

const HOST = process.argv[3] || 'sbc'
const ADDRESS = +process.argv[2]
// const GPIOA = +process.env.GPIOA || 0x12

console.log(`Sending packets to host:${HOST} at i2c address ${ADDRESS}`)

const delay = time => new Promise(res=>setTimeout(()=>res(),time))

let relays = new Base({id:'tcp-i2c-client', sockets:'tc#c>t', tc:{host:HOST, port:1776}})

relays.c = {
  reply: async function (packet) {
  // console.dir(packet._header)
  if (packet._header.request.cmd === 'read') {
   console.log(`confirmation of bus write was ${packet.response}`)
   }
  }
}

;
(async () => {

  await relays.init()
  console.log('=============sending============')
  // set for separate banks (ICON BANK=1) so works for 08 or 17
  let packet = {cmd:'write', args:{address:ADDRESS,cmd: 0x0B, byte:128} }
  await relays.send(packet)
  // configure for outputs if not already
  packet = {cmd:'write', args:{address:ADDRESS, cmd: 0, byte:0} }
  await relays.send(packet)
  // turn on all relays
  packet = {cmd:'write', args:{address:ADDRESS,cmd: 9, byte:255} }
  await relays.send(packet)
  packet = {cmd:'read', args:{address:ADDRESS,cmd: 9} }
  await relays.send(packet)
  await delay(2000)
  // turn on only 1 and 8
  packet = {cmd:'write', args:{address:ADDRESS ,cmd:9, byte:129} }
  await relays.send(packet)
  packet = {cmd:'read', args:{address:ADDRESS,cmd: 9} }
  await relays.send(packet)
  await delay(2000)
  //turn off all relays
  packet = {cmd:'write', args:{address:ADDRESS,cmd: 9, byte:0} }
  await relays.send(packet)
  packet = {cmd:'read', args:{address:ADDRESS,cmd: 9} }
  await relays.send(packet)

  process.kill(process.pid, 'SIGTERM')


})().catch(err => {
  console.error('FATAL: UNABLE TO START SYSTEM!\n',err)
})
