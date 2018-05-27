Quickstart Scripts For using UCI I2C bus module on an Raspberry Pi

node 9+ and npm/yarn installed


ON RPI ONLY!
==== Run I2C-Bus Master Listener/Processor

1.  Clone this repo to a raspbery pi (that has operational i2c bus)
2.  cd /bus
3.  npm install    (or yarn install)
4.  npm run bus      or    node --require esm bus


ON ANY OTHER COMPUTER ON NETWORK WITH NODE INSTALLED
====== Run a simple scan of devices on I2C-BUS

1.  Clone this repo to another machine (or can be on RPI same repo)
2. cd /clients
3. npm install
4. BUS_HOST=<ip or hostname of RPI> node --require esm scan

====== Control an MCP230xx chip with relays (outputs)

1.  Run the simple scan above first then run the relay script with this command
2.  I2C_ADDRESS=<i2c device address in decimal or 0x00 hex> BUS_HOST=<ip or hostname of RPI> node --require esm relay
