const {z}=require("zod");
const userValidation = z.object({
      name: z.string().min(3).max(100),
      email:z.string().email(),
      password: z.string().min(6).max(100),
});

module.exports = userValidation;