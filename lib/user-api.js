

export async function getUserApi(query) {
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const url = "/api/v1/users/" + query.userId;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "X-Scoosign-Authorization": `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error(response.status+': '+response.statusText);
  const response_json = await response.json();
  const date = new Date(response_json.data.created_at);
  const data = {
    id: response_json.data._id,
    lastName: response_json.data.lastName,
    firstName: response_json.data.firstName,
    type: response_json.data.role,
    email: response_json.data.email,
    active: response_json.data.active,
    created_by: response_json.data.createdBy,
    created_at: date.toUTCString(),
  };
  return data;
}

export async function deleteUserApi(userId) {
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const url = "/api/v1/users/" + userId;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "X-Scoosign-Authorization": `Bearer ${accessToken}`,
    },
  });
  return response;
}

export async function updateUserApi(userId, body) {
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const url = "/api/v1/users/" + userId;
  const response = await fetch(url, {
      method: "PUT",
      headers: {
          "Content-type": "application/json",
          "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
  });
  return response;
}