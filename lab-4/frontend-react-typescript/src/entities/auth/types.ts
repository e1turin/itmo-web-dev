export type UserCredential = {
  username: string;
} & Credential;

export type Credential = {
  token: string;
};
