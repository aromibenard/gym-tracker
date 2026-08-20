import PrimaryTab from "@/components/primary-tab";
import { SearchParams } from "@/lib/types";
import { SignedIn, SignOutButton } from "@clerk/nextjs";


export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const filter = searchParams.filter ?? 'this-month'

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black w-full md:max-w-4xl mx-auto">
      <main className="flex flex-col p-8">
        <div className="flex justify-between items-center ">
          <PrimaryTab filter={filter} />
          {/* <SignedIn>
            <SignOutButton />
          </SignedIn> */}
        </div>
      </main>
    </div>
  );
}
