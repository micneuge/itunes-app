import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

describe('The Error Boundary component should', () => {
  test('display error boundary component after thrown exception.', () => {
    const ThrowError = () => {
      throw new Error('Test');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error_boundary')).toBeVisible();
  });

  test('not be visible when there is no error', () => {
    render(
      <ErrorBoundary>
        <h1>Title</h1>
      </ErrorBoundary>
    );

    expect(screen.getByText('Title')).toBeVisible();
  });
});
