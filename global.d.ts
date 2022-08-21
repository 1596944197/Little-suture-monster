interface Window {
  foo: string;
}
declare type AnyObject = {
  [k: string | number | symbol]: any
} & {}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'