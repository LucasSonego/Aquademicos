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
