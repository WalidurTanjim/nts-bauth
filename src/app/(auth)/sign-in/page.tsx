import SignInForm from "@/app/components/(AuthPages)/SignInForm/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-gray-500">
          Welcome back to NTS BAUTH
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        {/* Calling the Client Component here */}
        <SignInForm />
      </div>
    </div>
  );
}