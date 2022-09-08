interface Window {
  foo: string;
}
declare type AnyObject = {
  [k: string | number | symbol]: any;
} & Object;

declare type AnyArray = any[];

declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "*.module.scss";
