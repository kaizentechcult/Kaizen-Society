import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompletedChallenges {
  'web-dev': string[];
  'dsa': string[];
}

interface ChallengesState {
  completedChallenges: CompletedChallenges;
  loading: boolean;
  error: string | null;
}

const initialState: ChallengesState = {
  completedChallenges: {
    'web-dev': [],
    'dsa': [],
  },
  loading: false,
  error: null,
};

const challengesSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    setCompletedChallenges: (state, action: PayloadAction<CompletedChallenges>) => {
      state.completedChallenges = action.payload;
    },
    toggleChallenge: (state, action: PayloadAction<{ type: keyof CompletedChallenges; id: string }>) => {
      const { type, id } = action.payload;
      const index = state.completedChallenges[type].indexOf(id);
      if (index === -1) {
        state.completedChallenges[type].push(id);
      } else {
        state.completedChallenges[type].splice(index, 1);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCompletedChallenges, toggleChallenge, setLoading, setError } = challengesSlice.actions;
export default challengesSlice.reducer; 