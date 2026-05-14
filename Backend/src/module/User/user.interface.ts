export type TUserRole =
  | "Admin"
  | "Doctor"
  | "Patient"
  | "Receptionist"
  | "Nurse"
  | "Laboratorist";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  status?: "pending" | "approved";
}