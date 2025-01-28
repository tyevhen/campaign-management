// import prisma from "../db/client";

// interface PaginationInput {
//   page?: number;
//   limit?: number;
//   sortBy?: string;
//   order?: "asc" | "desc";
// }

// const paginateEmployees = async (pagination: PaginationInput) => {
//   const { page = 1, limit = 10, sortBy, order = "asc" } = pagination;
//   const sorting = sortBy ? { [sortBy]: order } : undefined;

//   const total = await prisma.employee.count();

//   const data = await prisma.employee.findMany({
//     skip: (page - 1) * limit,
//     take: limit,
//     orderBy: sorting,
//     include: { office: true, tags: true },
//   });

//   const totalPages = Math.ceil(total / limit);

//   return {
//     data,
//     total,
//     page,
//     totalPages,
//   };
// };

// export default paginateEmployees;
