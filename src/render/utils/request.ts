const baseUrl = "/api";

export const sendRequest = async <Res extends {}>({
  url,
  method = "GET",
  headers,
  data,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  data?: any;
}): Promise<Res> => {
  if (method !== "GET") {
    const body = new FormData();
    for (const key in data) body.append(key, data[key]);
    return fetch(`${baseUrl}${url}`, {
      method,
      headers,
      body,
      redirect: "manual",
    }).then(async (res) => res.json());
  } else {
    return fetch(`${baseUrl}${url}${renderParams(data)}`, {
      method,
      headers,
      redirect: "manual",
    }).then(async (res) => res.json());
  }
};

function renderParams(params: {}) {
  let result = "?";
  if (params instanceof Object) {
    Object.entries(params).forEach(([key, value], i) => {
      if (i) result += `&${key}=${value}`;
      else result += `${key}=${value}`;
    });
  }
  return result === "?" ? "" : result;
}
