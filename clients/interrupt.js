import Base from '@uci/base'

const HOST = 'localhost'
const PORT = 9024
let processor = new Base({sockets:'inter#c>t', inter:{host:HOST, port:PORT}, id:'interrupt-processor', useRootNS:true})

processor.interrupt = async function (packet) {
  return new Promise((resolve) => {
    console.log('interrupt occured')
    console.dir(packet)
    resolve({status: 'processed'})
  })
}

processor.reply = async function (packet) {
  return new Promise((resolve) => {
    console.log('interrupt fired')
    console.dir(packet)
    resolve({status: 'processed'})
  })
}

;
(async () => {

  await processor.init()
  await processor.send({cmd: 'fire'})
  await processor.send({cmd: 'fire'})
  // process.kill(process.pid, 'SIGTERM')

})().catch(err => {
  console.error('FATAL: UNABLE TO START SYSTEM!\n',err)
})
