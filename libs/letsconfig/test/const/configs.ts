import { z } from "zod";

// default configs

export const zDefaultConfig = z.object({
  name: z.string().default("usaking"),
  age: z.number().default(99),
  smoking: z.boolean().default(true),
  nationality: z.enum(["korea", "usa"]).default("usa"),
  job: z
    .object({
      title: z.string().default("rich"),
      salary: z.number().default(100000),
    })
    .default({}),
  eat: z
    .function()
    .args()
    .returns(z.string())
    .default(() => () => "power"),
});
export type DefaultConfig = z.infer<typeof zDefaultConfig>;
export const defaultConfig = zDefaultConfig.parse({});

export const fullyModifiedConfig = {
  name: "dorage",
  age: 28,
  smoking: false,
  nationality: "korea",
  job: {
    title: "jobless",
    salary: 0,
  },
  eat: () => {
    return "poo";
  },
};
