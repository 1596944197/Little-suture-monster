export interface SFTPOptions {
  password: string;
  username: string;
  remoteDir: string;
  localDistDir: string;
  distRename?: string;
  buildCommand?: string;
}
