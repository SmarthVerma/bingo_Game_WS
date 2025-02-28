import clsx from "clsx";
import { useAppSelector } from "@/store/hooks";
import { Avatar, AvatarImage } from "./ui/avatar";
import LogoutButton from "./buttons/LogoutButton";

export default function ProfileDashboard() {
  // State for tracking if the user is logged in
  const isLoggedIn = useAppSelector(state => state.profile.isAuth);
  const profileData = useAppSelector(state => state.profile)


  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/auth/google"; // backend url
  };

  return (
    <div
      className={clsx(
        "bg-gray-800 w-full min-h-full shrink-0  border border-gray-500/25 p-1 px-3 rounded-lg overflow-hidden shadow-lg flex items-start justify-center flex-col space-y-6 relative ",
        {
          "cursor-pointer hover:scale-105 duration-200": isLoggedIn, // Hover effect is applied only if logged in
          "cursor-default": !isLoggedIn, // Disable pointer cursor when not logged in
        }
      )}
    >
      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        // Profile Section for logged-in user
        <div className="flex   items-center">
          <div className="  bg-gray-700 rounded-full flex items-center justify-center mr-4">
            <Avatar className="w-14 h-14" >
              <AvatarImage src={profileData.avatar} alt="profile" />
            </Avatar>
          </div>
          <div className="flex-grow p-1 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg w-[23ch] truncate xl:text-2xl font-bold text-gray-100">
              {profileData?.displayName ?? "Guest"}
            </h3>
            <div className="mt-1 flex items-center space-x-3 xl:space-x-3">
              {/* Matches */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-base xl:text-lg  font-light xl:font-medium">Matches:</span>
                <span className=" text-base xl:text-xl font-semibold text-yellow-400">
                  {profileData.bingoProfile?.totalMatches ?? 0}
                </span>
              </div>
              {/* Wins */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-base xl:text-lg  font-light xl:font-medium">Wins:</span>
                <span className="text-base xl:text-xl font-semibold text-green-500">
                  {profileData.bingoProfile?.wins ?? 0}
                </span>
              </div>
              {/* Losses */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-base xl:text-lg  font-light xl:font-medium">Losses:</span>
                <span className="text-base xl:text-xl font-semibold text-red-500">
                  {profileData.bingoProfile?.losses ?? 0}
                </span>
              </div>
            </div>
          </div>
          <LogoutButton />
        </div>
      ) : (
        // Button for logging in with Google if not logged in
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center bg-blue-600 text-white p-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            <img src="https://icon2.cleanpng.com/20181108/wls/kisspng-youtube-google-logo-google-images-google-account-consulting-crm-the-1-recommended-crm-for-g-suite-1713925039962.webp" className="w-6 h-6 mr-3" alt="Google Logo" />
            <span className="font-semibold text-lg">Login with Google</span>
          </button>
        </div>
      )}
    </div>
  );
}