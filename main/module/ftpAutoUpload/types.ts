export interface SFTPOptions {
  password: string;
  username: string;
  remoteDir: string;
  localDistDir: string;
  packagedDirectory?: string;
  buildCommand?: string;
}
