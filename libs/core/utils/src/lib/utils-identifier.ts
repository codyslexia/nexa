export const identifier = (prefix: string) =>
  `${prefix}_${Math.round(Math.random() * 1000000000000)}`

export enum IdentifierKind {
  Customer = 'cus',
  Product = 'prod',
  Plan = 'plan',
  Subscription = 'sub',
}
