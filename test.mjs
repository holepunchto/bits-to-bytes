import test from 'brittle'

import bits from './index.js'

test('get', async (t) => {
  const { buffer } = Uint8Array.from([
    0b00000101,
    0b10010000,
    0b01010101,
    0b10101010
  ])

  const expected = [
    1, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1
  ]

  t.test('uint8array', async (t) => {
    const arr = new Uint8Array(buffer)
    const actual = []

    for (let i = 0; i < 32; i++) {
      actual[i] = bits.get(arr, i) ? 1 : 0
    }

    t.alike(actual, expected)
  })

  t.test('uint16array', async (t) => {
    const arr = new Uint16Array(buffer)
    const actual = []

    for (let i = 0; i < 32; i++) {
      actual[i] = bits.get(arr, i) ? 1 : 0
    }

    t.alike(actual, expected)
  })

  t.test('uint32array', async (t) => {
    const arr = new Uint32Array(buffer)
    const actual = []

    for (let i = 0; i < 32; i++) {
      actual[i] = bits.get(arr, i) ? 1 : 0
    }

    t.alike(actual, expected)
  })
})
