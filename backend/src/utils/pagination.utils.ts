export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResult {
  skip: number;
  take: number;
  page: number;
  limit: number;
}

export const getPagination = (
  pageStr: unknown,
  limitStr: unknown,
  defaultLimit = 12,
): PaginationResult => {
  const page = Math.max(1, parseInt(String(pageStr ?? '1'), 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(String(limitStr ?? String(defaultLimit)), 10) || defaultLimit),
  );
  const skip = (page - 1) * limit;
  return { skip, take: limit, page, limit };
};

export const buildPaginationMeta = (
  total: number,
  page: number,
  limit: number,
) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});
