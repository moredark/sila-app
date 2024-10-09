import React, { FC } from 'react'

import { Set } from '@/entities/workout/model/workout.types'
import { calculateAverageWeight, useTranslation } from '@/shared/lib'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'

interface Props {
  sets: Set[]
}

const SetsTable: FC<Props> = ({ sets }) => {
  const t = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('sets')}</CardTitle>
        <CardDescription>
          {t('avg-weight')}: {calculateAverageWeight(sets)} kg
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('set')}</TableHead>
              <TableHead>{t('weight')}</TableHead>
              <TableHead>{t('reps')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sets.map((set, index) => (
              <TableRow key={set.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{set.weight}</TableCell>
                <TableCell>{set.reps}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default SetsTable
