declare module 'big-number' {
  export type BigNumberInstance = {
    val(): number;
    plus(...args: any[]): BigNumberInstance
    minus(...args: any[]): BigNumberInstance
    mult(...args: any[]): BigNumberInstance
    div(...args: any[]): BigNumberInstance
    lte(...args: any[]): boolean
  }

  function BigNumber(val: number | BigNumberInstance): BigNumberInstance

  export default BigNumber
}