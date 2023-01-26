import { r as redirect } from "../../../../../chunks/index.js";
import * as bcrypt from "bcrypt";
import { U as User } from "../../../../../chunks/user.js";
const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");
    const user = await User.findOne({ where: { email } });
    const passwordMatch = user && await bcrypt.compare(password, user.password);
    if (passwordMatch && user.status == "verified") {
      const authToken = crypto.randomUUID();
      await User.upsert(
        {
          email,
          token: authToken
        }
      );
      cookies.set("session", authToken, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 48
        // 48 hours
      });
      throw redirect(307, "/protected/study");
    } else {
      return {
        success: false,
        email,
        message: "Hmmm. Not quite.",
        info: null
      };
    }
  }
};
export {
  actions
};
