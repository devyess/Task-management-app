const {z}=require("zod");
const taskValidation = z.object({
      title: z.string().min(3).max(100),
      description:z.string().min(3).max(100),
      priority: z.number().min(1).max(5),
    });
module.exports = taskValidation;