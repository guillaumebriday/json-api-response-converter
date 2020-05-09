<template lang="pug">
div
  div(class="w-full max-w-6xl mx-auto mt-24 p-4")
    h1(class="text-center mb-8 text-5xl font-bold") Json Api Response Converter

    p(class="text-center mb-4") Normalize your JSON:API response.

    p(class="text-center badges")
      a(href="https://www.paypal.me/guillaumebriday")
        img(src="https://img.shields.io/badge/Donate-PayPal-green.svg")

      a(href="https://www.npmjs.com/package/json-api-response-converter")
        img(src="https://img.shields.io/npm/dt/json-api-response-converter.svg")

      a(href="https://www.npmjs.com/package/json-api-response-converter")
        img(src="https://img.shields.io/npm/v/json-api-response-converter.svg")

      a(href="https://github.com/guillaumebriday/json-api-response-converter")
        img(src="https://github.com/guillaumebriday/json-api-response-converter/workflows/Lint/badge.svg")

      a(href="https://github.com/guillaumebriday/json-api-response-converter")
        img(src="https://github.com/guillaumebriday/json-api-response-converter/workflows/Test/badge.svg")

      a(href="https://github.com/guillaumebriday/json-api-response-converter")
        img(src="https://img.shields.io/github/license/guillaumebriday/json-api-response-converter.svg")

      a(href="https://json-api-response-converter.netlify.app/")
        img(src="https://api.netlify.com/api/v1/badges/f48191db-a459-4ab4-849f-10ea970915af/deploy-status")

    h2(class="text-center text-2xl font-bold my-4") Essential links

    ul(class="text-center")
      li
        a(href="https://github.com/guillaumebriday/json-api-response-converter" target="_blank" rel="noopener") Github

      li
        a(href="https://www.npmjs.com/package/json-api-response-converter" target="_blank" rel="noopener") Npm

    h2(class="text-center text-2xl font-bold my-4") Live demo

    p Past your API response here

  div(class="flex border-t")
    div(class="item")
      codemirror(v-model="response" :options="options")

    pre(class="item pre") {{ formattedResponse }}
</template>

<script>
import { codemirror } from 'vue-codemirror'
import JsonApiResponseConverter from '../../src/main.js'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

export default {
  components: {
    codemirror
  },

  data () {
    return {
      response: '',
      options: {
        lineNumbers: true,
        theme: 'material'
      }
    }
  },

  created () {
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

    this.response = JSON.stringify(response)
  },

  computed: {
    formattedResponse () {
      try {
        return new JsonApiResponseConverter(JSON.parse(this.response)).formattedResponse
      } catch {
        return 'ERROR: Invalid JSON format.'
      }
    }
  }
}
</script>
