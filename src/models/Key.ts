export type IKey = {
  id: number;
  name: string;
};

export type IKeyCreate = {
  name: string;
  token: string;
  passphrase: string;
};

export type IKeyInStore = {
  id: number;
  name: string;
  passphrase: string;
};
