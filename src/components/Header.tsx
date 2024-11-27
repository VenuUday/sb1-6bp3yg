import React from 'react';
import { Vote, LogOut } from 'lucide-react';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Vote className="h-8 w-8" />
            <h1 className="text-2xl font-bold">SecureVote</h1>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {user.user_metadata.name || user.email}</span>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}