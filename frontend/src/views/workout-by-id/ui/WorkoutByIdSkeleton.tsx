import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'

export const WorkoutByIdSkeleton = () => {
  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-20" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><Skeleton className="h-4 w-8" /></TableHead>
                <TableHead><Skeleton className="h-4 w-16" /></TableHead>
                <TableHead><Skeleton className="h-4 w-12" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="size-4" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 