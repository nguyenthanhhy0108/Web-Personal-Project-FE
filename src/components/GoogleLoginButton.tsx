
export default function GoogleLoginButton() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const SCOPE = `openid profile email https://www.googleapis.com/auth/user.birthday.read 
      https://www.googleapis.com/auth/userinfo.profile 
      https://www.googleapis.com/auth/user.phonenumbers.read 
      https://www.googleapis.com/auth/user.addresses.read`

  const handleClick = () => {
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
                    `client_id=${CLIENT_ID}&` +
                    `redirect_uri=${REDIRECT_URI}&` +
                    `response_type=token&` +
                    `scope=${SCOPE}`;

    window.location.href = loginUrl;
  };

  return (
    <button 
      type='button'
      onClick={handleClick}
      className="flex justify-center items-center py-3 border-gray-300 dark:border-white dark:text-black dark:bg-white border-2 active:scale-95 active:duration-75 transition-all rounded-xl hover:scale-[1.01] ease-in-out"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M24 9.5c3.22 0 5.62 1.1 7.32 2.02l5.36-5.35C33.37 3.7 29.18 2 24 2 14.73 2 7.21 7.66 4.08 15.24l6.9 5.36C13.11 14.03 18.09 9.5 24 9.5z"></path>
        <path fill="#34A853" d="M46.5 24.5c0-1.6-.14-3.1-.4-4.5H24v9h12.7c-.56 2.87-2.18 5.3-4.58 6.94l7.12 5.53c4.17-3.86 6.56-9.55 6.56-16.03z"></path>
        <path fill="#FBBC05" d="M10.98 28.86C10.23 26.99 9.83 24.85 9.83 22.5c0-2.35.4-4.49 1.15-6.36l-6.9-5.36C1.4 14.03 0 18.1 0 22.5s1.4 8.47 3.98 11.72l6.9-5.36z"></path>
        <path fill="#EA4335" d="M24 47c5.18 0 9.51-1.7 12.68-4.64l-7.12-5.53c-2.01 1.36-4.57 2.17-7.33 2.17-5.91 0-10.89-4.53-11.97-10.5l-6.9 5.36C7.21 40.34 14.73 46 24 46z"></path>
      </svg>
      <span className="ml-3 font-medium text-lg">Sign in with Google</span>
    </button>
  );
}
