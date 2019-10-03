import JsonApiResponseConverter from '../src/index'

describe('JsonApiResponseConverter converts', () => {
  test('array response', () => {
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

    expect(new JsonApiResponseConverter(response).formattedResponse).toEqual([
      {
        id: '1',
        title: 'This project is awesome',

        author: {
          id: '1',
          name: 'Anakin'
        },

        comments: [
          {
            id: '1',
            body: 'First!'
          },
          {
            id: '2',
            body: 'Second!'
          }
        ]
      }
    ])
  })

  test('object response', () => {
    const response = {
      data: {
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
      },

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

    expect(new JsonApiResponseConverter(response).formattedResponse).toEqual({
      id: '1',
      title: 'This project is awesome',

      author: {
        id: '1',
        name: 'Anakin'
      },

      comments: [
        {
          id: '1',
          body: 'First!'
        },
        {
          id: '2',
          body: 'Second!'
        }
      ]
    })
  })

  test('object response with partial included', () => {
    const response = {
      data: {
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
      },

      included: [
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

    expect(new JsonApiResponseConverter(response).formattedResponse).toEqual({
      id: '1',
      title: 'This project is awesome',
      comments: [
        {
          id: '1',
          body: 'First!'
        },
        {
          id: '2',
          body: 'Second!'
        }
      ]
    })
  })

  test('object response without relationships', () => {
    const response = {
      data: {
        id: '1',
        type: 'articles',
        attributes: {
          title: 'This project is awesome'
        }
      },

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

    expect(new JsonApiResponseConverter(response).formattedResponse).toEqual({
      id: '1',
      title: 'This project is awesome'
    })
  })

  test('object response without included', () => {
    const response = {
      data: {
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
    }

    expect(new JsonApiResponseConverter(response).formattedResponse).toEqual({
      id: '1',
      title: 'This project is awesome'
    })
  })

  test('object response with empty relationship', () => {
    const response = {
      data: {
        id: '1',
        type: 'articles',
        attributes: {
          title: 'This project is awesome'
        },
        relationships: {
          author: {
            data: null
          },

          comments: {
            data: []
          }
        }
      },
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

    expect(new JsonApiResponseConverter(response).formattedResponse).toEqual({
      id: '1',
      title: 'This project is awesome'
    })
  })

  test('has_many with only 1 child', () => {
    const response = {
      data: [
        {
          id: '1',
          type: 'articles',
          attributes: {
            title: 'This project is awesome'
          },
          relationships: {
            comments: {
              data: [
                { id: '1', type: 'comment' }
              ]
            }
          }
        }
      ],

      included: [
        {
          id: '1',
          type: 'comment',
          attributes: {
            body: 'First!'
          }
        }
      ]
    }

    expect(new JsonApiResponseConverter(response).formattedResponse).toEqual([
      {
        id: '1',
        title: 'This project is awesome',
        comments: [
          {
            id: '1',
            body: 'First!'
          }
        ]
      }
    ])
  })
})
