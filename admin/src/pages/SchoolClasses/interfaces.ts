export interface SimplifiedSchoolClassData {
  id: string;
  name: string;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
}

export interface SchoolClassData {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  students?: StudentData[];
}

export interface DeletedSchoolClass {
  id: string;
  name: string;
  created_at: string;
  deleted_at: string;
  deleted_by: {
    id: string;
    name: string;
    email: string;
  };
}
