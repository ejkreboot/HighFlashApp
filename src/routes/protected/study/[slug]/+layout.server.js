
export const load = async ({ locals }) => {
    const mode = process.env.HIGHFLASH_MODE; // 'standalone' or 'embed'
    return {
      email: locals.user.email,
      group: locals.user.group,
      mode: mode
    }
}