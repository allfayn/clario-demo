import { SignUpComponent } from './SignUpComponent';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

describe('SignUpComponent', () => {
  // Form renders correctly with initial values
  it('should render form with initial values', () => {
    const { getByLabelText } = render(<SignUpComponent />);

    const emailInput = getByLabelText('Email') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  // Form submission with empty email and password fields
  it('should show validation errors when submitting empty form', async () => {
    const { getByText, findByText, findByLabelText } = render(<SignUpComponent />);

    fireEvent.click(getByText('Sign Up'));

    expect(await findByText('Email is required')).toBeInTheDocument();
    expect(await findByLabelText('Password')).toHaveClass('[&:not(:focus)]:border-red-500');
    expect(getByText('8 characters or more (no spaces)')).toHaveClass('text-red-400');
    expect(getByText('64 characters or less')).not.toHaveClass('text-red-400');
  });

  // Form submission with empty email and password fields
  it('should show validation errors for password', async () => {
    const { getByText, findByText, getByLabelText } = render(<SignUpComponent />);

    await user.type(getByLabelText('Password'), 'some');
    await user.click(getByText('Sign Up'));

    expect(getByLabelText('Password')).toHaveClass('[&:not(:focus)]:border-red-500');
    expect(getByText('at least 1 uppercase letter')).toHaveClass('text-red-400');
    expect(getByText('at least 1 number')).toHaveClass('text-red-400');
    expect(getByText('8 characters or more (no spaces)')).toHaveClass('text-red-400');

    await user.type(getByLabelText('Password'), 'some1');
    expect(getByText('at least 1 number')).not.toHaveClass();

    await user.type(getByLabelText('Password'), 'Some1');
    expect(getByText('at least 1 number')).not.toHaveClass();

    await user.type(getByLabelText('Password'), 'Some1Some');
    expect(getByText('8 characters or more (no spaces)')).not.toHaveClass();
  });
});
