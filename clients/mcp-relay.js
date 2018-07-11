/*
*  Direct to mcp chip on i2c-bus using mcp module
*
*/
import MCP230XX from '@uci/mcp'

const BUS_HOST = (process.env.BUS_HOST || 'sbc')
const BUS_PORT = 1776  // 1776 is default port for i2c-bus module
const ADDRESS = +process.argv[2]
const CHIP = !process.argv[3]

console.log(`Sending packets to I2C Bus host:${BUS_HOST} and i2c address ${ADDRESS} with Chip MCP230${CHIP?'17':'08'}`)

const delay = time => new Promise(res=>setTimeout(()=>res(),time))

let mcp = new MCP230XX({id:'mcp', chip17:CHIP, host:BUS_HOST, address:ADDRESS})

mcp.c = {
  reply: async function (packet) {
   console.log(`actual packets sent to bus ${JSON.stringify(packet._header.request)}, response ${packet.response}`)
   }
  }

  ;
(async () => {
  console.log('INTIALIZING')
  await mcp.init()
  console.log('CONFIGURING PINS')
  console.log(await mcp.pin.cfg({pins:'all', cfg:'output'}))  // outputs for relays
  console.log('ALL PINS PORT A OFF')
  await mcp.pin.state.off({pins:'all'})
  console.log('ALL PINS PORT A ON')
  await mcp.pin.state.on({pins:'all'})
  await delay(1000)
  console.log('TOGGLE 1 3 5 7')
  await mcp.pin.state.toggle({pins:'1 3 5 7'})
  await delay(1000)
  console.log('TOGGLE 2 4 6 8')
  await mcp.pin.state.toggle({pins:'2 4 6 8'})
  await delay(1000)
  console.log('TOGGLE ALL')
  await mcp.pin.state.toggle({pins:'all'})
  console.log('TOGGLE ALL')
  await delay(1000)
  await mcp.pin.state.toggle({pins:'all'})


})().catch(err => {
  console.error('FATAL: UNABLE TO START SYSTEM!\n',err)
})
