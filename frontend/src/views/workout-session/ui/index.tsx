'use client';

import React, { FC, useState } from 'react';

import { useGetWorkout } from '@/entities/workout/model/workout.api';
import { WorkoutSession } from '@/entities/workout/model/workout.types';

import AddSetDrawer from './AddSetDrawer';
import EndWorkoutDrawer from './EndWorkoutDrawer';
import WorkoutActions from './WorkoutActions';
import WorkoutHeader from './WorkoutHeader';
import WorkoutSets from './WorkoutSets';

interface Props {
    workoutData: WorkoutSession;
}

const WorkoutSessionPage: FC<Props> = ({ workoutData }) => {
    const { data } = useGetWorkout({ workoutId: workoutData.id!, initialData: workoutData });
    const [isAddSetDrawerOpen, setAddSetDrawerOpen] = useState(false);
    const [isEndWorkoutDrawerOpen, setEndWorkoutDrawerOpen] = useState(false);

    return (
        <div className='flex h-full flex-col justify-between p-4'>
            <WorkoutHeader exerciseName={data?.exercise?.name} />
            <WorkoutSets sets={data?.sets} />
            <WorkoutActions
                onAddSet={() => setAddSetDrawerOpen(true)}
                onEndWorkout={() => setEndWorkoutDrawerOpen(true)}
            />
            <AddSetDrawer
                open={isAddSetDrawerOpen}
                onOpenChange={setAddSetDrawerOpen}
                workoutId={workoutData.id!}
            />
            <EndWorkoutDrawer
                open={isEndWorkoutDrawerOpen}
                onOpenChange={setEndWorkoutDrawerOpen}
                workoutId={workoutData.id!}
            />
        </div>
    );
};

export default WorkoutSessionPage;
