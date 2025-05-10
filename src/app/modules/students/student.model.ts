import { Schema, model } from 'mongoose';
import { StudentMethod, StudentModel, TStudent } from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>({
  id: { type: String, required: true, unique: true, trim: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: 20,
    trim: true,
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  photo: { type: String, required: true, trim: true },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    message: '{VALUE} is not supported',
    default: 'student',
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    message: '{VALUE} is not supported',
    default: 'active',
  },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

// document middleware
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// document middleware
studentSchema.post('save', async function (doc, next) {
  doc.password = '';

  next();
});

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregation middleware
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
