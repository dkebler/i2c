/*
*  A tcp customer/client to talk with the RPI i2c bus listener and scan the bus for devices
*  BUS_HOST=<hostname or ip address> node -r esm scan
*/
import Base from  '@uci/base'
const HOST = (process.env.BUS_HOST || 'sbc')

let scanner = new Base({id:'tcp-i2c-client', sockets:'tc#c>t', tc:{host:HOST,port: 1776}})

let reply = {
  reply: function (packet) {
  let addresses = packet.response.map(device => {
    return device.toString(16)})
  console.log(`active device addreses on i2cbus (hex) ${packet.response} (${addresses})`)
  return addresses
  }
}

scanner.amendConsumerProcessing(reply)

;
(async () => {

  await scanner.init()
  console.log('=============sending============')
  let packet = {cmd:'scan'}
  console.log('sending', packet)
  await scanner.send(packet)
  process.kill(process.pid, 'SIGTERM')


})().catch(err => {
  console.error('FATAL: UNABLE TO START SYSTEM!\n',err)
})
