import mongoose, { Schema } from 'mongoose';

const userProgressSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['dsa', 'web-dev'],
  },
  completedChallenges: [{
    type: String,
    required: true,
  }],
}, {
  timestamps: true,
});

// Create a compound index for userId and type to ensure uniqueness
userProgressSchema.index({ userId: 1, type: 1 }, { unique: true });

const UserProgress = mongoose.models.UserProgress || mongoose.model('UserProgress', userProgressSchema);

export default UserProgress; 