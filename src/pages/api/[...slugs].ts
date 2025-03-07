import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "hi")
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
