import mongoose, { Schema } from 'mongoose';

const projectSubmissionSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  problemId: {
    type: String,
    required: true,
  },
  deployedUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
}, {
  timestamps: true,
});

// Create a compound unique index to prevent multiple submissions for the same problem by the same user
projectSubmissionSchema.index({ email: 1, problemId: 1 }, { unique: true });

const ProjectSubmission = mongoose.models.ProjectSubmission || mongoose.model('ProjectSubmission', projectSubmissionSchema);

export default ProjectSubmission; 