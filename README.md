# JSON:API Response Converter

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/guillaumebriday)
[![](https://img.shields.io/npm/dt/json-api-response-converter.svg)](https://www.npmjs.com/package/json-api-response-converter)
[![](https://img.shields.io/npm/v/json-api-response-converter.svg)](https://www.npmjs.com/package/json-api-response-converter)
[![](https://img.shields.io/github/license/guillaumebriday/json-api-response-converter.svg)](https://github.com/guillaumebriday/json-api-response-converter)

## Getting started

## Install

```bash
$ npm install json-api-response-converter --save

# or

$ yarn add json-api-response-converter
```

## Usage

```js
import JsonApiResponseConverter from 'json-api-response-converter'

const data = new JsonApiResponseConverter(response.data).formattedResponse
```
