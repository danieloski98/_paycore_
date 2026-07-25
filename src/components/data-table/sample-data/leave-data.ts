// import { LeaveRequest } from "@/models/leave-model";

// export const leaveData: LeaveRequest[] = Array.from(
//   { length: 20 },
//   (_, i) => ({
//     id: `LV-${1000 + i}`,
//     type: [
//       "Annual Leave",
//       "Sick Leave",
//       "Casual Leave",
//       "Maternity Leave",
//     ][i % 4],

//     reason: "Personal request",

//     startDate: `2026-07-${String((i % 25) + 1).padStart(2, "0")}`,

//     endDate: `2026-07-${String((i % 25) + 3).padStart(2, "0")}`,

//     totalDays: (i % 5) + 1,

//     Status: (
//       ["PENDING", "APPROVED", "REJECTED"][
//         i % 3
//       ] as LeaveRequest["Status"]
//     ),

//     employeeId: `EMP-${i + 1}`,

//     employee: {
//       id: `EMP-${i + 1}`,
//       firstName: "Justice",
//       lastName: `${i + 1}`,
//       email: `justice${i + 1}@company.com`,
//       phone: "08012345678",
//       position: "Frontend Engineer",
//       picture: "",
//       department: "Engineering",
//       address: "Lagos",
//       salary: 350000,
//       startDate: "2024-01-01",
//     },

//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   })
// );