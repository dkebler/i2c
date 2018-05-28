## Quickstart Scripts For using UCI I2C bus module on an Raspberry Pi

### Prerequisites: node 9+ and npm/yarn installed


**ON RPI ONLY!**

==== Run I2C-Bus Master Listener/Processor

1.  Clone this repo to a raspbery pi (that has operational i2c bus)
2.  `cd /bus`
3.  `npm install`    (or yarn install)
4.  `npm run bus`      or    `node -r esm bus`


**ON ANY OTHER COMPUTER ON NETWORK WITH NODE INSTALLED**

====== Run a simple scan of devices on I2C-BUS

1.  Clone this repo to another machine (or can be on RPI same repo)
2. `cd /clients`
3. `npm install`
4. `BUS_HOST=<ip or hostname of RPI> node -r esm scan`

====== Control an MCP230xx chip with relays with raw packets

1.  Run the simple scan above first then run the relay script with this command
2.  `BUS_HOST=<ip or hostname of RPI> node --require esm relay <i2c address of device>`

====== Control an MCP230xx chip with relays with mcp module =====

`BUS_HOST=<ip or hostname of RPI> node --require esm mcp <i2c address of device> <8 for 23008 otherwise omit>`
* example `node -r esm mcp 32`  for 23017 chip
* example `node -r esm mcp 39 8`   for 23008 chip

----
NOTE: you do not need the BUS_HOST environment variable if `sbc` is RPI hostname as that is the default in the code
