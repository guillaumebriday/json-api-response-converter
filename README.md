# JSON:API Response Converter

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/guillaumebriday)
![](https://github.com/guillaumebriday/json-api-response-converter/workflows/Lint/badge.svg)
![](https://github.com/guillaumebriday/json-api-response-converter/workflows/Test/badge.svg)
[![](https://img.shields.io/npm/dt/json-api-response-converter.svg)](https://www.npmjs.com/package/json-api-response-converter)
[![](https://img.shields.io/npm/bt/json-api-response-converter.svg)](https://www.npmjs.com/package/json-api-response-converter)
[![](https://img.shields.io/npm/v/json-api-response-converter.svg)](https://www.npmjs.com/package/json-api-response-converter)
[![](https://img.shields.io/github/license/guillaumebriday/json-api-response-converter.svg)](https://github.com/guillaumebriday/json-api-response-converter)

## Features

* Very small
* No dependencies
* Easy to use
* Compatible with [Vuex ORM](https://github.com/vuex-orm/vuex-orm)

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

const response = {
  data: [
    {
      id: '1',
      type: 'articles',
      attributes: {
        title: 'This project is awesome'
      },
      relationships: {
        author: {
          data: { id: '1', type: 'author' }
        },

        comments: {
          data: [
            { id: '1', type: 'comment' },
            { id: '2', type: 'comment' }
          ]
        }
      }
    }
  ],

  included: [
    {
      id: '1',
      type: 'author',
      attributes: {
        name: 'Anakin'
      }
    },
    {
      id: '1',
      type: 'comment',
      attributes: {
        body: 'First!'
      }
    },
    {
      id: '2',
      type: 'comment',
      attributes: {
        body: 'Second!'
      }
    }
  ]
}

const data = new JsonApiResponseConverter(response).formattedResponse

console.log(data)
/**
[
  {
    id: 1,
    title: 'This project is awesome',

    author: {
      id: 1,
      name: 'Anakin'
    },

    comments: [
      {
        id: 1,
        body: 'First!'
      },
      {
        id: 2,
        body: 'Second!'
      }
    ]
  }
]
*/
```

Many edges cases are tested in the [__tests__ folder](https://github.com/guillaumebriday/json-api-response-converter/tree/master/__tests__)

## Development
```bash
$ git clone https://github.com/guillaumebriday/json-api-response-converter
$ cd json-api-response-converter
$ yarn # or npm install
```

You can run tests with [Jest](https://jestjs.io/):
```bash
$ yarn test # or npm run test
```

Check the syntax with [ESLint](https://eslint.org/):

```bash
$ yarn lint
```

## Contributing
Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## Credits

Inspired by:

+ [https://github.com/SinestroWhite/Normalize-JSON-API](https://github.com/SinestroWhite/Normalize-JSON-API)

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
