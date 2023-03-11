export type UserCredential = {
  name: string;
} & Credential;

export type Credential = {
  token?: string;
};
