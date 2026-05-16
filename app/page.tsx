import PrimaryTab from "@/components/primary-tab";
import { SignedIn, SignOutButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black">
      <main className="flex flex-col p-8">
        <div className="flex justify-between items-center ">
          <PrimaryTab />
          {/* <SignedIn>
            <SignOutButton />
          </SignedIn> */}
        </div>
      </main>
    </div>
  );
}
