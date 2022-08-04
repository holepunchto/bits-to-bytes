import test from 'brittle'

import bits from './index.js'

test('get', (t) => {
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

  t.test('uint8array', (t) => {
    const arr = new Uint8Array(buffer)
    const actual = []

    for (let i = 0; i < 32; i++) {
      actual[i] = bits.get(arr, i) ? 1 : 0
    }

    t.alike(actual, expected)
  })

  t.test('uint16array', (t) => {
    const arr = new Uint16Array(buffer)
    const actual = []

    for (let i = 0; i < 32; i++) {
      actual[i] = bits.get(arr, i) ? 1 : 0
    }

    t.alike(actual, expected)
  })

  t.test('uint32array', (t) => {
    const arr = new Uint32Array(buffer)
    const actual = []

    for (let i = 0; i < 32; i++) {
      actual[i] = bits.get(arr, i) ? 1 : 0
    }

    t.alike(actual, expected)
  })
})

test('indexOf', (t) => {
  t.test('set', (t) => {
    const { buffer } = Uint8Array.from([
      0b00000000,
      0b01000000,
      0b00000010,
      0b00000000
    ])

    t.test('uint8array', (t) => {
      const arr = new Uint8Array(buffer)

      t.is(bits.indexOf(arr, true), 14)
      t.is(bits.indexOf(arr, true, 15), 17)

      t.is(bits.lastIndexOf(arr, true), 17)
      t.is(bits.lastIndexOf(arr, true, 15), 14)
    })
  })

  t.test('unset', (t) => {
    const { buffer } = Uint8Array.from([
      0b11111111,
      0b10111111,
      0b11111101,
      0b11111111
    ])

    t.test('uint8array', (t) => {
      const arr = new Uint8Array(buffer)

      t.is(bits.indexOf(arr, false), 14)
      t.is(bits.indexOf(arr, false, 15), 17)

      t.is(bits.lastIndexOf(arr, false), 17)
      t.is(bits.lastIndexOf(arr, false, 15), 14)
    })
  })

  t.test('not found', (t) => {
    const { buffer } = Uint8Array.from([
      0b11111111,
      0b11111111,
      0b11111111,
      0b11111111
    ])

    t.test('uint8array', (t) => {
      const arr = new Uint8Array(buffer)

      t.is(bits.indexOf(arr, false), -1)
      t.is(bits.lastIndexOf(arr, false), -1)
    })
  })
})
