import definition from "../resources/openapi.json";
import OpenAPIClientAxios from "openapi-client-axios";

export default (url) =>
  new OpenAPIClientAxios({
    definition,
    withServer: { url },
  });
