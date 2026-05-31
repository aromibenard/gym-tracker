import Form from "next/form";
import { Card } from "./card";
import createSession from "@/lib/actions/create-session";

export default function StartWorkout() {
    return (
        <Form action={createSession}>
            <button type="submit" className="w-full">
                <Card className="w-full max-w-md mx-auto mt-8">
                    <h1>Start Workout</h1>
                </Card>
            </button>
        </Form>
    )
}