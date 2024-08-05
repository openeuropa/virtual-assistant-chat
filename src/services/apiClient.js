import definition from "../resources/openapi.json";
import OpenAPIClientAxios from "openapi-client-axios";

export function getInstance(url) {
  return new OpenAPIClientAxios({
    definition,
    withServer: { url },
  });
}
