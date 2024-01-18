export type RoleType = "customer" | "admin";
export type RoleEsType = "Cliente" | "Administrador";

export interface RolesEsType {
  customer: RoleEsType;
  admin: RoleEsType;
}

export interface DataFormType {
  document : string;
  name: string;
  address: string;
  numberPhone: string;
  isAdmin:boolean;
}

export type NameInput = "document" | "name" | "address" | "numberPhone" | "role";

export interface ErrFormType {
  document: string | null;
  name: string | null;
  address: string | null;
  numberPhone: string | null;
}
