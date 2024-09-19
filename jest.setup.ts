import { ReactNode } from 'react';
import { configure } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
