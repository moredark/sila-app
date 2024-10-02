import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination'

type WorkoutPaginationProps = {
  page: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

export const WorkoutPagination = ({ page, totalPages, onPageChange }: WorkoutPaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            className={page === 1 ? 'hidden' : ''}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(page + 1)}
            className={page >= totalPages ? 'hidden' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
