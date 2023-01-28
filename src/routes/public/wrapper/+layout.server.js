
export const load = async ({ url }) => {
    return { url: url.searchParams.get('url') };
}