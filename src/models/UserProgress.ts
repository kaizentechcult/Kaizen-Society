import mongoose, { Schema } from 'mongoose';

// Clear any existing model to avoid schema conflicts
if (mongoose.models.UserProgress) {
  delete mongoose.models.UserProgress;
}

const userProgressSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['dsa', 'web-dev'],
  },
  completedChallenges: {
    type: [String],
    default: [],
  }
}, {
  timestamps: true,
});

// Create a compound unique index
userProgressSchema.index({ email: 1, type: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress; 