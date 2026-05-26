import CreateExerciseForm from "./create-exercise-form";
import ExercisesParent from "./exercises-parent";
import FormParent from "./form-parent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function PrimaryTab() {
    return (
        <Tabs defaultValue="exercises">
            <TabsList>
                <TabsTrigger value="exercises">Exercises</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="exercises">
                <div className="flex flex-col space-y-6 p-4">
                   <ExercisesParent />
                   <FormParent /> 
                </div>
            </TabsContent>
            <TabsContent value="analytics">
                <div className="flex flex-col items-center justify-center p-4">

                </div>
            </TabsContent>
            <TabsContent value="reports">
                <div className="flex flex-col items-center justify-center p-4">

                </div>
            </TabsContent>
        </Tabs>
    )
}