// Mock API service
export const api = {
  async login(email: string, password: string) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    
    return user;
  },

  async register(email: string, password: string, name: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: any) => u.email === email)) {
      throw new Error('Email already registered');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      user_metadata: { name },
      hasVoted: false
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return newUser;
  },

  async castVote(userId: string, candidateId: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const votes = JSON.parse(localStorage.getItem('votes') || '[]');
    
    const user = users.find((u: any) => u.id === userId);
    if (!user) throw new Error('User not found');
    if (user.hasVoted) throw new Error('Already voted');
    
    // Update user's voting status
    user.hasVoted = true;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Record the vote
    votes.push({ userId, candidateId, timestamp: Date.now() });
    localStorage.setItem('votes', JSON.stringify(votes));
    
    return { success: true };
  },

  async getCandidates() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 1,
        name: "Sarah Johnson",
        party: "Progressive Party",
        votes: 156,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=600"
      },
      {
        id: 2,
        name: "Michael Chen",
        party: "Innovation Alliance",
        votes: 142,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=600"
      },
      {
        id: 3,
        name: "Elena Rodriguez",
        party: "Unity Coalition",
        votes: 168,
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800&h=600"
      }
    ];
  }
};