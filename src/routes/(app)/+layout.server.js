export const load = async ({ locals }) => {
    const mode = process.env.HIGHFLASH_MODE; // 'standalone' or 'embed'
    if(locals.user) {
      return {
        email: locals.user.email,
        group: locals.user.group,
        mode: mode
      }  
    } else {
      return {
        email: "",
        group: "",
        mode: mode
      }  
    }
  }