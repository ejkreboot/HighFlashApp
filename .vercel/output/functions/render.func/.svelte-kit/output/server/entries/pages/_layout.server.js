const load = async ({ locals }) => {
  const mode = process.env.HIGHFLASH_MODE;
  if (locals.user) {
    return {
      email: locals.user.email,
      group: locals.user.group,
      mode
    };
  } else {
    return {
      email: "",
      group: "",
      mode
    };
  }
};
export {
  load
};
