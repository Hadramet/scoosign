export async function getUserApi(query) {
  const response = await fetch("/api/v1/users/" + query.userId, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "X-Scoosign-Authorization": `Bearer ${globalThis.localStorage.getItem("accessToken")}`,
    },
  });

  if (!response.ok) throw new Error(response.status + ": " + response.statusText);
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
  return await fetch("/api/v1/users/" + userId, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "X-Scoosign-Authorization": `Bearer ${globalThis.localStorage.getItem("accessToken")}`,
    },
  });
}

export async function updateUserApi(userId, body) {
  return await fetch("/api/v1/users/" + userId, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "X-Scoosign-Authorization": `Bearer ${globalThis.localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(body),
  });
}

export async function authorizeUserApi(email, password) {
  return fetch("/api/v1/authorize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export async function meUserApi(token) {
  return await fetch("/api/v1/authorize/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Scoosign-Authorization": `Bearer ${token}`,
    },
  });
}
