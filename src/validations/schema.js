import * as z from "zod";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const LoginFormSchema = z.object({
  mobile_no: z
    .string()
    .nonempty("Mobile number is required")
    .regex(phoneRegExp, "Mobile number is not valid")
    // .min(4, { message: "Mobile number must be 5 characters or more" })
    .max(10, { message: "Mobile number must be 14 characters or less" }),
  password: z.string().nonempty("Password is required"),
});
