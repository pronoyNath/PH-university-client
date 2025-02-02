import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select Name" }),
  year: z.string({ required_error: "Please select a Year" }),
  startMonth: z.string({ required_error: "Please select a Start Month" }),
  endMonth: z.string({ required_error: "Please select a End Month" }),
});

export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Please select Name" }),
});

export const academicDepartSchema = z.object({
  name: z.string({ required_error: "Please select department name" }),
  academicFaculty: z.string({
    required_error: "Please select academic faculty",
  }),
});
