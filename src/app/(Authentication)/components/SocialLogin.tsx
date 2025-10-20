import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const SocialLogin: React.FC = () => {
  const handleSocialLogin = async (providerName: string) => {
    try {
      await signIn(providerName, { redirect: false });
    } catch (error) {
      console.error("Social login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <button
        onClick={() => handleSocialLogin("google")}
        className="bg-transparent p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Login with Google"
      >
        <FcGoogle className="text-4xl" />
      </button>

      <button
        onClick={() => handleSocialLogin("github")}
        className="bg-transparent p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Login with GitHub"
      >
        <FaGithub className="text-4xl" />
      </button>
    </div>
  );
};

export default SocialLogin;
