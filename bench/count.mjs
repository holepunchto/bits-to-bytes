import bench from 'nanobench'
import b4a from 'b4a'

import bits from '../index.js'

bench('count', (b) => {
  const arr = b4a.alloc(100, 0xff)

  b.start()

  for (let i = 0; i < 2000000; i++) {
    bits.count(arr)
  }

  b.end()
})
