import mongoose, { Schema } from 'mongoose';

const problemSchema = new Schema({
  srNo: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  category: {
    type: String,
    required: true,
    enum: ['DSA', 'WebDev'],
  },
  topic: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Problem = mongoose.models.Problem || mongoose.model('Problem', problemSchema);

export default Problem; 