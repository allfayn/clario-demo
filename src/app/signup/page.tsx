import { SignUpComponent } from '../../components/SignUpComponent';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-blue-50 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign up</h2>
        <SignUpComponent />
      </div>
    </div>
  );
}
