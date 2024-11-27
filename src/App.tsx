import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import VotingSection from './components/VotingSection';
import { api } from './lib/api';
import type { Candidate, User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await api.getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Error loading candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleVote = async (candidateId: number) => {
    if (!user || user.hasVoted) return;

    try {
      await api.castVote(user.id, candidateId);
      
      // Update candidates
      setCandidates(candidates.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      ));

      // Mark user as voted
      setUser({ ...user, hasVoted: true });
    } catch (error: any) {
      console.error('Error casting vote:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <Header user={user} onLogout={handleLogout} />
      
      {!user ? (
        <AuthForm onLogin={setUser} />
      ) : (
        <VotingSection
          candidates={candidates}
          hasVoted={user.hasVoted || false}
          onVote={handleVote}
        />
      )}
    </div>
  );
}

export default App;