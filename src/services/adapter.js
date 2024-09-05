export function getAdapter({ backendUrl, jwtEndpoint }) {
  return function (message, extras) {
    return fetch(`${backendUrl}/ask?question=${message}`, {
      method: "get",
    }).then((response) => response.json());
  };
}
