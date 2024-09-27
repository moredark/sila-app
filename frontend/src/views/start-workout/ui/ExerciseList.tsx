'use client';

import React, { useState } from 'react';

import { Search, XIcon } from 'lucide-react';

import { useGetExercises } from '@/entities/exercise';
import { useGetMuscleGroups } from '@/entities/muscle-group/api/useGetMuscleGroups';
import { Button } from '@/shared/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Combobox } from '@/shared/ui/combobox';
import { Input } from '@/shared/ui/input';
import { Skeleton } from '@/shared/ui/skeleton';

type ExerciseListProps = {
    selectedExerciseId: number | null;
    onSelectExercise: (id: number) => void;
};

export const ExerciseList: React.FC<ExerciseListProps> = ({
    selectedExerciseId,
    onSelectExercise,
}) => {
    const [muscleGroupId, setMuscleGroupId] = useState<number | ''>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { data: muscleGroups } = useGetMuscleGroups();

    const { data, isLoading, isError, error } = useGetExercises({
        muscle_group_id: muscleGroupId !== '' ? muscleGroupId : undefined,
        search: searchQuery || undefined,
    });

    const handleMuscleGroupSelect = (value: number | '' | null) => {
        console.log(value)
        if (value === null) return;
        setMuscleGroupId(value);
        setSearchQuery('');
    };

    const handleResetFilters = () => {
        setMuscleGroupId('');
        setSearchQuery('');
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-2">
                {[...Array(6)].map((_, index) => (
                    <Skeleton key={index}
                        className="h-32 w-full" />
                ))}
            </div>
        );
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <div className="space-y-2">
            <div className="relative">
                <Input
                    placeholder="Search exercises..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-2">
                <div className="grow">
                    <Combobox
                        placeholder="Select Muscle Group"
                        options={
                            muscleGroups?.map((group) => ({
                                label: group.name || '',
                                value: group.id || '',
                            })) || []
                        }
                        onSelect={handleMuscleGroupSelect}  
                    />
                </div>
                <Button variant="outline"
                    onClick={handleResetFilters}
                    className="h-10">
                    <XIcon className="size-4" />
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {data?.map((exercise) => (
                    <Card
                        key={exercise.id}
                        className={`cursor-pointer bg-card p-2 ${selectedExerciseId === exercise.id ? 'border border-primary' : ''
                            }`}
                        onClick={() => onSelectExercise(exercise.id!)}
                    >
                        <CardHeader className="p-2">
                            <CardTitle className="text-sm text-foreground">
                                {exercise.name}
                            </CardTitle>
                            <CardDescription className="text-xs text-muted-foreground">
                                {exercise.muscle_group?.name}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
};
