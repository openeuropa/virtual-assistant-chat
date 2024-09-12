import axios from "axios";
import { jwtDecode } from "jwt-decode";

/**
 * Create and export the client service.
 *
 * @param backendBaseUrl
 * @param jwtIssuerEndpoint
 * @returns {{ask: ((function(*): Promise<*>)|*), getJwt: ((function(): Promise<*>)|*)}}
 */

const createClient = (backendBaseUrl, jwtIssuerEndpoint) => {
  /**
   * Function to set the JWT token in axios default headers.
   *
   * @param token
   */
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  /**
   * Function to request JWT from the issuer endpoint.
   *
   * @returns {Promise<*>}
   */
  const getJwt = async () => {
    try {
      const response = await axios.post(jwtIssuerEndpoint);
      const token = response.data.token;

      // Decode the JWT payload using jwt-decode
      const payload = jwtDecode(token);

      // Set the JWT token as a Bearer token for axios requests
      setAuthToken(token);

      return payload;
    } catch (error) {
      // console.error("Error fetching JWT:", error);
      throw new Error("Failed to retrieve JWT");
    }
  };

  /**
   * Function to perform a request to the "/ask" endpoint of the backend.
   * The 'message' parameter will be appended to the URL as '?question='.
   *
   * @param message
   * @returns {Promise<any>}
   */
  const ask = async (message) => {
    try {
      // Encode the message to ensure it's URL-safe
      const encodedMessage = encodeURIComponent(message);

      // Construct the URL with the message as a URL parameter
      const url = `${backendBaseUrl}/ask?question=${encodedMessage}`;

      // Perform the GET request to the constructed URL
      const response = await axios.get(url);
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
