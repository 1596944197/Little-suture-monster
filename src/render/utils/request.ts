export const sendRequest = async ({
  url,
  method = "GET",
  headers,
  data,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Headers;
  data?: any;
}) => {
  return fetch(url, {
    method,
    headers,
    body: typeof data === "string" ? data : JSON.stringify(data),
  }).then(async (res) => res?.json?.());
};
