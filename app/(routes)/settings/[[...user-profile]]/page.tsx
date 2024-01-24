import { UserProfile } from "@clerk/nextjs";

const Settings = () => {
  return (
    <div className="min-w-full min-h-screen flex flex-col justify-center items-center bg-slate-900 text-slate-100 text-2xl">
      <UserProfile />
    </div>
  );
};

export default Settings;
