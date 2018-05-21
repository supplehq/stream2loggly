# Stream2Loggly

CLI Tool for send JSON stream to Loggly  
[![CircleCI](https://circleci.com/gh/supplehq/stream2loggly.svg?style=svg)](https://circleci.com/gh/supplehq/stream2loggly)  
  
- **Stream ready** : Just send the JSON object to the stream.
- **Any logger can use** : You can use any logger that can print to a JSON object.
- **Available via CLI** : Choose between shell commands through pipes or child process spawning.

## Usage

Input JSON stream as `stdin`, send to Loggly

### Newline delimited JSON

New lines must be present to distinguish JSON objects passed to the stream.
If an object is continuously sent without a newline, it can not be sent to Loggly because one object is recognized as being sent.

### Params

`--token` : (required) Loggly token. if `undefined`, use `process.env.LOGGLY_CUSTOMER_TOKEN` alternatively.  
`--subdomain` : (required) Loggly subdomain. if `undefined`, use `process.env.LOGGLY_SUBDOMAIN` alternatively.  
`--tags` : (optional) defaults to `['stream2loggly']`  
`--bufferOptions` : (optional) defaults to `{ size: 500, retriesInMilliSeconds: 30 * 1000 }`  
`--verbose` : (optional) defaults to `false`. If `true`, `console.log` messages are sent to `stdout` when each logs are sent and when each responses are received.

### Example

```
echo {\"foo\":\"bar\"} | stream2loggly --token "$YOUR_LOGGLY_TOKEN" --subdomain "$YOUR_LOGGLY_SUBDOMAIN"  --verbose true
```
