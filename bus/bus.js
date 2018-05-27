/*
*  Raspberry Pi (only) I2C-Bus listener
* named pipe socket 'i2c-bus' is always created by default /tmp directory unless
* env variable SOCKETS_DIR='' is used to create a 'i2c-bus.sock' in a particular directory
* e.g. command >SOCKETS_DIR=/opt/sockets node -r esm i2cbus
* add TCP listener with tcp:true.  Will listen on port 1776 by default
*/

import Bus from  '@uci/i2c-bus'
;
(async () => {

  let i2cbus  = new Bus({id:'i2c-bus',tcp:true})

  await i2cbus.init()

})().catch(err => {
  console.error('FATAL: UNABLE TO START SYSTEM!\n',err)
})
