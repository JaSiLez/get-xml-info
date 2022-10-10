const { describe, expect, test } = require('@jest/globals')
const path = require('node:path')
const xmlInfo = require('../src/xmlInfo')

const xmlFile = path.join(__dirname, 'test.xml')

describe('xmlInfo function', () => {
  test('get title', () => {
    const result = xmlInfo(xmlFile, '//title')
    expect(result[0]).toBe('Everyday Italian')
    expect(result.length).toBe(4)
  })
})
