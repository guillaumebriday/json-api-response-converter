export default class {
  constructor (response) {
    this.data = response.data
    this.included = response.included
  }

  /**
   * It formats a Json API response for Vuex ORM with relationships
   *
   * @returns {Array|Object} The formatted response
   */
  get formattedResponse () {
    if (Array.isArray(this.data)) {
      return this.data.map(object => this.formatObject(object))
    }

    return this.formatObject(this.data)
  }

  /**
   * Format Object from Json API syntax to Vuex ORM
   *
   * @param {Object} object Object to format
   * @returns {Object} Formatted object
   */
  formatObject (object) {
    if (!object) {
      return {}
    }

    return {
      id: this.tryParsingToInteger(object.id),
      ...object.attributes,
      ...this.formatRelationships(object)
    }
  }

  /**
   * It find and format relationships for an object
   * @param {Object} object
   */
  formatRelationships (object) {
    if (!object.relationships || !this.included) {
      return {}
    }

    const relationships = Object.entries(object.relationships).map(([key, { data }]) => {
      const isManyRelationship = Array.isArray(data)
      data = isManyRelationship ? data : [data]
      data = data.filter(Boolean)

      const values = data.map((child) => {
        if (!child) {
          return null
        }

        const object = this.findRelationship(child)

        return object ? this.formatObject(object) : null
      }).filter(Boolean)

      if (values.length === 0) {
        return null
      }

      return [
        key,
        (isManyRelationship || values.length > 1) ? values : values[0]
      ]
    }).filter(Boolean)

    return Object.fromEntries(relationships)
  }

  /**
   * It returns the related object for a given relationship
   *
   * @param {Object} object
   * @returns {Object|null} The related object or null if does not exist
   */
  findRelationship (object) {
    return this.included.find((relationship) => {
      return relationship.type === object.type && relationship.id === object.id
    })
  }

  /**
   * Tries parsing value to Integer; returns untouched value if it fails
   *
   * @returns {String|Number} The parsed value
   */
  tryParsingToInteger (originalValue) {
    const integer = parseInt(originalValue)

    if (integer.toString() === originalValue) {
      return integer
    }

    return originalValue
  }
}
