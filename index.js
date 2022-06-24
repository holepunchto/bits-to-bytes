const b4a = require('b4a')

function byteLength (size) {
  return Math.ceil(size / 8)
}

function get (buffer, bit) {
  const n = buffer.BYTES_PER_ELEMENT * 8

  const offset = bit & (n - 1)
  const i = (bit - offset) / n

  return (buffer[i] & (1 << offset)) !== 0
}

function set (buffer, bit, value = true) {
  const n = buffer.BYTES_PER_ELEMENT * 8

  const offset = bit & (n - 1)
  const i = (bit - offset) / n
  const mask = 1 << offset

  if (value) {
    if ((buffer[i] & mask) !== 0) return false
  } else {
    if ((buffer[i] & mask) === 0) return false
  }

  buffer[i] ^= mask
  return true
}

function setRange (buffer, start, end, value = true) {
  const n = buffer.BYTES_PER_ELEMENT * 8

  let remaining = end - start
  let offset = start & (n - 1)
  let i = (start - offset) / n

  let changed = false

  while (remaining > 0) {
    const mask = (2 ** Math.min(remaining, n - offset) - 1) << offset

    if (value) {
      if ((buffer[i] & mask) !== mask) {
        buffer[i] |= mask
        changed = true
      }
    } else {
      if ((buffer[i] & mask) !== 0) {
        buffer[i] &= ~mask
        changed = true
      }
    }

    remaining -= n - offset
    offset = 0
    i++
  }

  return changed
}

function toggle (buffer, bit) {
  const n = buffer.BYTES_PER_ELEMENT * 8

  const offset = bit & (n - 1)
  const i = (bit - offset) / n
  const mask = 1 << offset

  buffer[i] ^= mask
  return (buffer[i] & mask) !== 0
}

function remove (buffer, bit) {
  return set(buffer, bit, false)
}

function removeRange (buffer, start, end) {
  return setRange(buffer, start, end, false)
}

function of (...bits) {
  return from(bits)
}

function from (bits) {
  const buffer = b4a.alloc(byteLength(bits.length))
  for (let i = 0; i < bits.length; i++) set(buffer, i, bits[i])
  return buffer
}

function * iterator (buffer) {
  for (let i = 0, n = buffer.byteLength * 8; i < n; i++) yield get(buffer, i)
}

module.exports = {
  byteLength,
  get,
  set,
  setRange,
  toggle,
  remove,
  removeRange,
  of,
  from,
  iterator
}
