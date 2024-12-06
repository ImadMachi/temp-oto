declare module 'core-js-pure/actual/structured-clone' {
  function structuredClone<T>(value: T, options?: StructuredSerializeOptions): T
  export default structuredClone
}
