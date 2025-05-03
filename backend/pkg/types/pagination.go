package types

type Pagination[T any] struct {
	Items []T   `json:"items" binding:"required" validate:"required"`
	Total int64 `json:"total" binding:"required" validate:"required"`
}

type PaginationQuery struct {
	Limit  int `query:"limit" default:"10"`
	Offset int `query:"offset" default:"0"`
}

func (q *PaginationQuery) SetDefaults() {
	if q.Limit <= 0 {
		q.Limit = 10
	}
	if q.Offset < 0 {
		q.Offset = 0
	}
}
