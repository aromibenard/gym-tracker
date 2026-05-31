import { db } from "@/client";

type Props = {
    params: Promise<{ id: string }>
}


export default  async function Page({ params }: Props) {
    const { id } = await params;

    if (!id) {
        return (
            <div className="flex flex-col items-center justify-center p-4">
                <h1>Invalid Session ID</h1>
            </div>
        )
    }

    const session = await db.session.findUnique({
        where: { id },   
    })    

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1>Workout Page with ID: {session?.id}</h1>
        </div>
    )
}