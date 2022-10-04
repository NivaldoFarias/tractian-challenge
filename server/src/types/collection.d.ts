export type UserType = {
  name: string;
  password: string;
  createdAt: Date;
};

export type AssetType = {
  name: string;
  description: string;
  model: string;
  owner: string;
  image: string;
  status: 'RUNNING' | 'ALERTING' | 'STOPPED';
  health: string;
  createdAt: Date;
};

export type UnitType = {
  name: string;
  location: {
    street: string;
    number: string;
    city: string;
    state: string;
    postalCode: string;
  };
  assets: AssetType[];
  opensAt: Date;
  closesAt: Date;
  lastUpdate: Date;
};

export type CompanyType = {
  name: string;
  units: UnitType[];
  users: UserType[];
  'x-api-key': string;
  createdAt: Date;
};
