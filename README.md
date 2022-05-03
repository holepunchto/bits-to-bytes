# Bits to Bytes

Functions for doing bit manipulation of typed arrays.

```npm
npm i bits-to-bytes
```

## Usage

```js
const bits = require('bits-to-bytes')

const buffer = Uint8Array.from([0b11001000])

bits.get(buffer, 3)
// true
```

`buffer` may be any typed array with a `number` element type, including `Uint8Array`, `Uint16Array`, and `Uint32Array`.

## API

#### `const n = bits.byteLength(size)`

Get the number of bytes required to contain `size` bits.

#### `const b = bits.get(buffer, bit)`

Get the given bit, which will either be `true` (set) or `false` (unset).

#### `const changed = bits.set(buffer, bit[, value])`

Set the given bit to `value`, which defaults to `true`. Returns `true` if the bit changed, otherwise `false`.

#### `const b = bits.toggle(buffer, bit)`

Toggle the given bit, returning its new value.

#### `const changed = bits.remove(buffer, bit)`

Unset the given bit. Returns `true` if the bit was set, otherwise `false`.

#### `const buffer = bits.of(...values)`

Create a buffer containing the given bits.

#### `const buffer = bits.from(values)`

Create a buffer containing the given bits.

#### `const iterator = bits.iterator(buffer)`

Create an iterator over bits.

## License

ISC
