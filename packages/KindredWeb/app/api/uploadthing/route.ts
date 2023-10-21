import { createNextRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
/*****************************************************************************/
/* Make sure this route is not block with auth - uploadthing requires access */
/*****************************************************************************/

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});