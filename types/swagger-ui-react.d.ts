declare module "swagger-ui-react" {
  import type { FC } from "react";

  const SwaggerUI: FC<{
    url?: string;
    docExpansion?: "list" | "full" | "none";
  }>;
  export default SwaggerUI;
}
