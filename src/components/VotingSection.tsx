import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { Candidate } from '../types';
import toast from 'react-hot-toast';

interface VotingSectionProps {
  candidates: Candidate[];
  hasVoted: boolean;
  onVote: (candidateId: number) => void;
}

export default function VotingSection({ candidates, hasVoted, onVote }: VotingSectionProps) {
  const handleVote = (candidateId: number) => {
    if (hasVoted) {
      toast.error('You have already voted!');
      return;
    }
    onVote(candidateId);
    toast.success('Vote cast successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Cast Your Vote</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select your preferred candidate below. Remember, you can only vote once.
        </p>
        {hasVoted && (
          <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <CheckCircle2 className="h-5 w-5" />
            <span>You have already voted</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{candidate.name}</h3>
              <p className="text-gray-600 mb-4">{candidate.party}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-600">
                  {candidate.votes} votes
                </span>
                <button
                  onClick={() => handleVote(candidate.id)}
                  disabled={hasVoted}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    hasVoted
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Vote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!hasVoted && (
        <div className="mt-8 flex items-center justify-center space-x-2 text-amber-600">
          <AlertCircle className="h-5 w-5" />
          <p>You can only vote once. Choose wisely!</p>
        </div>
      )}
    </div>
  );
}