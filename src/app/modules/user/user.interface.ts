export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  VENDOR = "VENDOR",
}

export interface IAuthsProviders {
  provider: "google" | "credential"; //email, google
  providerID: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: IAddress;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;
  auths: IAuthsProviders[];
  role: Role;
}
