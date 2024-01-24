import { VideoUploadRecoil } from "@/components/video-upload-recoil";
import { CurrentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const profile = await CurrentProfile();

  if (!profile) {
    redirect("/sign-in");
  }

  return (
    <div className="min-w-full min-h-screen flex flex-col justify-center items-center bg-slate-900 text-slate-100 text-2xl">
      <VideoUploadRecoil profileId={profile.id} />
    </div>
  );
};

export default Dashboard;
