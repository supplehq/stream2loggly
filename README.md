# JSON2Loggly

CLI Tool for send stream to loggly

## License

Unlicensed

## Usage

Input stream as `stdin`, send to Loggly

### Params

`--token` : Loggly token
`--subdomain` : Loggly subdomain
`--json` : (optional) defaults to `true`
`--bufferOptions` : (optional) defaults to `{ size: 500, retriesInMilliSeconds: 30 * 1000 }`

### Example

```
echo {\"foo\":\"bar\"} | ts-node ./index.ts --token "$YOUR_LOGGLY_TOKEN" --subdomain "$YOUR_LOGGLY_SUBDOMAIN"
```
