'use client'

import React, { FC } from 'react';

import { useForm } from 'react-hook-form';

import { useAddSet } from '@/entities/workout/model/workout.api';
import { useTranslation } from '@/shared/lib';
import { Button, Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, Input } from '@/shared/ui';

interface AddSetDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    workoutId: number;
}

const AddSetDrawer: FC<AddSetDrawerProps> = ({ open, onOpenChange, workoutId }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<{ reps: number, weight: number }>();
    const addSetMutation = useAddSet();

    const handleAddSetSubmit = (data: { reps: number, weight: number }) => {
        addSetMutation.mutate({
            workoutId,
            reps: Number(data.reps),
            weight: Number(data.weight),
        });
        onOpenChange(false);
    };

    return (
        <Drawer open={open}
onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader className='mt-6'>
                    <DrawerTitle>{t("add-set")}</DrawerTitle>
                    <DrawerDescription>{t("enter-reps-weight")}</DrawerDescription>
                </DrawerHeader>
                <form onSubmit={handleSubmit(handleAddSetSubmit)}
className="space-y-6 px-6 py-12">
                    <div>
                        <label>{t("reps")}</label>
                        <Input type="number"
{...register('reps', { required: t("reps-required") })} />
                        {errors.reps && <span className="text-red-500">{errors.reps.message}</span>}
                    </div>
                    <div>
                        <label>{t("weight")}</label>
                        <Input type="number"
{...register('weight', { required: t("weight-required") })} />
                        {errors.weight && <span className="text-red-500">{errors.weight.message}</span>}
                    </div>
                    <Button type="submit"
className="mt-4 w-full">{t("submit")}</Button>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

export default AddSetDrawer;
