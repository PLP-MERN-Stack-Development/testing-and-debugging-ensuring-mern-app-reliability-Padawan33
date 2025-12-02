import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostList from '../../components/PostList';

// Mock the global fetch function
global.fetch = jest.fn();

describe('PostList Integration', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders posts after successful API call', async () => {
    // 1. Arrange: Define fake data
    const mockPosts = [
      { _id: '1', title: 'First Post', content: 'Hello World' },
      { _id: '2', title: 'Second Post', content: 'React Testing' }
    ];

    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    // 2. Act: Render component
    render(<PostList />);

    // 3. Assert: Loading state first
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Second Post')).toBeInTheDocument();
    });

    // Verify fetch was called correctly
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/posts');
  });

  test('renders error message on API failure', async () => {
    // Mock failure response
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});