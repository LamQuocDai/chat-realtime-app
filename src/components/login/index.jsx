import AuthenticationForm from "./AuthenticationForm";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <AuthenticationForm className="w-[500px] p-6" />
    </div>
  );
}
