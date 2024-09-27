'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetMuscleGroups } from '@/entities/muscle-group/api/useGetMuscleGroups';
import { useCreateExercise } from '@/entities/exercise/api/useCreateExercise';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button, Input } from '@/shared/ui';
import { Combobox } from '@/shared/ui/combobox';
import { Textarea } from '@/shared/ui/textarea';
import { toast } from 'sonner';
import Link from 'next/link';
import { APP_ROUTES } from '@/shared/config';

const createExerciseSchema = z.object({
    name_ru: z.string().nonempty('Please enter the exercise name in Russian'),
    name_eng: z.string().nonempty('Please enter the exercise name in English'),
    muscle_group_id: z.string().optional(),
    description_eng: z.string().optional(),
    description_ru: z.string().optional(),
});

type CreateExerciseFormData = z.infer<typeof createExerciseSchema>;

const AdminCreateExercisePage = () => {
    const { data: muscleGroups, isLoading: isLoadingMuscleGroups } = useGetMuscleGroups();
    const { mutateAsync: createExercise } = useCreateExercise();

    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateExerciseFormData>({
        resolver: zodResolver(createExerciseSchema),
    });

    const onSubmit = async (data: CreateExerciseFormData) => {
        try {
            await createExercise({
                ...data,
                muscle_group_id: Number(selectedMuscleGroup),
            })
            toast.success('Muscle group created successfully!');
            reset();
        } catch (error) {
            toast.error('Failed to create muscle group.');
        }
    };

    return (
        <div className="p-4">
            <Card>
                <Link href={APP_ROUTES.ADMIN.HOME}>
                    <Button variant='outline' className='m-2'>Back</Button>
                </Link>
                <CardHeader>
                    <CardTitle>Create a New Exercise</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label>Exercise Name (RU)</label>
                            <Input {...register('name_ru')} placeholder="Enter the exercise name in Russian" />
                            {errors.name_ru && <p className="text-red-500">{errors.name_ru.message}</p>}
                        </div>

                        <div>
                            <label>Exercise Name (ENG)</label>
                            <Input {...register('name_eng')} placeholder="Enter the exercise name in English" />
                            {errors.name_eng && <p className="text-red-500">{errors.name_eng.message}</p>}
                        </div>

                        <div>
                            <label>Muscle Group</label>
                            <Combobox
                                options={muscleGroups?.map((group) => ({
                                    //@ts-ignore
                                    label: group.name ?? '',
                                    value: group.id ?? '',
                                })) ?? []}
                                onSelect={(value) => setSelectedMuscleGroup(value ? String(value) : null)}
                                placeholder="Select a muscle group"
                            />

                            {errors.muscle_group_id && <p className="text-red-500">{errors.muscle_group_id.message}</p>}
                        </div>

                        <div>
                            <label>Description (RU)</label>
                            <Textarea
                                {...register('description_ru')}
                                placeholder="Enter description in Russian (optional)"
                            />
                        </div>

                        <div>
                            <label>Description (ENG)</label>
                            <Textarea
                                {...register('description_eng')}
                                placeholder="Enter description in English (optional)"
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Create Exercise
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminCreateExercisePage;
