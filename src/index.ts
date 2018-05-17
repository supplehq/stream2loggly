import { argv } from 'yargs'
import split from 'split2'
import pump from 'pump'
import through from 'through2'
import loggly from 'node-loggly-bulk'

const client = (loggly).createClient({
  token: argv.token,
  subdomain: argv.subdomain,
  bufferOptions: {
    size: 500,
    retriesInMilliSeconds: 5 * 1000,
  },
  json: argv.json || true,
  verbose: argv.verbose || false,
  tags: ['stream2loggly'],
})

pump(
  process.stdin,
  split(JSON.parse),
  through.obj((chunk: any, enc: any, cb: any) => {
    client.log({
      ...chunk,
      timestamp: new Date().toISOString(),
    }, (err: any, res: any) => {
      if (err) {
        console.error(err)
      } else if (argv.verbose) {
        console.log(res)
      }
    })

    cb()
  }),
)
