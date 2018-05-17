import { argv } from 'yargs'
import split from 'split2'
import pump from 'pump'
import through from 'through2'
import loggly from 'node-loggly-bulk'

const { verbose } = argv

const client = loggly.createClient({
  token: argv.token || process.env.LOGGLY_CUSTOMER_TOKEN,
  subdomain: argv.subdomain || process.env.LOGGLY_SUBDOMAIN,
  bufferOptions: {
    size: 500,
    retriesInMilliSeconds: 5 * 1000,
  },
  json: argv.json || true,
  tags: argv.tags || ['stream2loggly'],
  verbose: argv.verbose || false,
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
      } else if (verbose) {
        console.log(res)
      }
    })

    cb()
  }),
)
