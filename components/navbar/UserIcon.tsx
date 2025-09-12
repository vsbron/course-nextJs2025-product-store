import { LuUser } from "react-icons/lu";
import { currentUser } from "@clerk/nextjs/server";

async function UserIcon() {
  // Getting the ID easily
  // const { userId } = auth();

  // Get the user and his image
  const user = await currentUser();
  const profileImage = user?.imageUrl;

  // Set the profile image based on existing user
  return profileImage ? (
    <img src={profileImage} className="w-6 h-6 rounded-full object-cover" />
  ) : (
    <LuUser className="w-6 h-6 bg-primary rounded-full text-white" />
  );
}

export default UserIcon;
