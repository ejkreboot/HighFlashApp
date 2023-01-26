const load = async ({ locals }) => {
  const mode = process.env.HIGHFLASH_MODE;
  return {
    email: locals.user.email,
    group: locals.user.group,
    mode
  };
};
export {
  load
};
