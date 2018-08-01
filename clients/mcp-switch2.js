/*
*
*
*/
// import { MCP230XXi } from '@uci/mcp'
import { MCP230XXi } from '../../uci/uci-mcp/src'
import Base from '@uci/base'

const BUS_HOST = 'sbc'  // if ihost not given will be the same as host:
const BUS_PORT = 1776  // 1776 is default port for i2c-bus module

let announce = new Base({ id:'switch:announce',sockets:'us#s>n,ts#s>t,mqtts#s>m,webs#s>w', ts:{port:8100}, webs:{ port:8090 }, mqtts:{ topics:['switch']} })

// unless specifically set the second gpio of the two will be for port B
let sw17  = new MCP230XXi([9,10],{id:'sw17', chip17:true, host:BUS_HOST, address:0x26})
let sw8  = new MCP230XXi([24],{id:'sw8', host:BUS_HOST, address:0x25})


sw17.c = { reply: () => {} } // silence the default reply command function
sw8.c = { reply: () => {} } // silence the default reply command function

function iprocess(details) {
  // details will be a packet with info about what caused the interrupt
  console.log('--common interrupt processor--')
  console.log(details)
  // here might be a place to look up in some database the "switch unique id" associated with this particular chip and pin and make/modify the details
  let packet = {cmd: 'switch/'+details.state, state:details.state, id:details.id+details.port+details.pin}
  console.log('pushing the switch change to anyone listening')
  console.log(packet)
  announce.push(packet)  // now the pushed details will have all the information needed to toggle relays from another porcess (client)
}


(async () => {

  await sw17.init()
  await sw8.init()
  sw17.interruptProcessor(iprocess)
  sw8.interruptProcessor(iprocess)
  await announce.init()


})().catch(err => {
  console.error('FATAL: UNABLE TO START SYSTEM!\n',err)
})
