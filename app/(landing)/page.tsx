import { LandingContent } from "@/components/landing-content";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-w-full min-h-screen flex flex-col justify-center items-center bg-slate-900 text-slate-100 text-2xl">
      <LandingContent />
    </main>
  );
};

export default Home;
