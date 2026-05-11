import { SignedIn, SignOutButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col ">
        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </main>
    </div>
  );
}
