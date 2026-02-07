export interface Res<T> {
  errcode: number;
  data: T;
  msg?: "";
}
