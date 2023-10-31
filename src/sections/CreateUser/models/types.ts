export type RoleType = "truck" | "customer" | "admin";
export type RoleEsType = "" | "Camion" | "Cliente" | "Administrador";

export interface RolesEsType {
  customer: RoleEsType;
  admin: RoleEsType;
  truck: RoleEsType;
}

export interface DataFormType {
  id: string;
  name: string;
  address: string;
  numberPhone: string;
  role: RoleType | "";
}

export type NameInput = "id" | "name" | "address" | "numberPhone" | "role";

export interface ErrFormType {
  id: string | null;
  name: string | null;
  address: string | null;
  numberPhone: string | null;
}
