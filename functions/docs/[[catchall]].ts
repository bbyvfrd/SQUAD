// Internal design and product docs live under /docs/ in the repo for the team
// to reference, but the public site must not serve them. This catchall returns
// 404 for any /docs/* path before Pages tries to serve the static markdown.
export const onRequest: PagesFunction = async () => {
  return new Response('Not Found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
