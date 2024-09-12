import axios from "axios";

/**
 * Create and export the client service.
 *
 * @param backendBaseUrl
 * @param jwtIssuerEndpoint
 * @returns {{ask: ((function(*): Promise<*>)|*), getJwt: ((function(): Promise<*>)|*)}}
 */

const createClient = (backendBaseUrl, jwtIssuerEndpoint) => {
  /**
   * Function to request JWT from the issuer endpoint.
   *
   * @returns {Promise<*>}
   */
  const getJwt = async () => {
    try {
      const response = await axios.get(jwtIssuerEndpoint, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log(`getJwt: ${response.data.token}`);
      return response.data.token;
    } catch (error) {
      console.error("Failed to retrieve JWT", error);
      throw new Error("Failed to retrieve JWT");
    }
  };

  /**
   * Function to perform a request to the "/ask" endpoint of the backend.
   * The 'message' parameter will be appended to the URL as '?question='.
   *
   * @param message
   * @param token
   * @returns {Promise<any>}
   */
  const ask = async (message, token) => {
    if (token == null) {
      throw new Error("Missing JWT token");
    }
    try {
      // Encode the message to ensure it's URL-safe
      const encodedMessage = encodeURIComponent(message);

      // Construct the URL with the message as a URL parameter
      const url = `${backendBaseUrl}/ask?question=${encodedMessage}`;
      console.log(`ask: ${token}`);

      // Perform the GET request to the constructed URL
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error performing request to /ask:", error);
      throw new Error("Failed to perform request to /ask");
    }
  };

  return {
    getJwt,
    ask,
  };
};

export default createClient;
