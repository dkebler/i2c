module.exports = {
  /**
   * Used to start i2c bus socket using pm2
   *
   *  >pm2 start bus
   */
  apps : [
    // Start Bus
    {
      name      : 'bus',
      node_args : '-r esm',
      cwd       : '/opt/i2c/bus',
      script    : 'bus.js',
      watch     : true
    },
    {
      name      : 'interrupt',
      node_args : '-r esm',
      cwd       : '/opt/i2c/interrupts',
      script    : 'interrupts.js',
      watch     : true
    }
  ]
}
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
