import { Model } from 'mongoose';

export type TStudent = {
  id: string;
  password: string;
  name: string;
  email: string;
  photo?: string;
  role: 'student' | 'instructor' | 'admin';
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type StudentMethod = {
  isUserExists(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethod
>;
