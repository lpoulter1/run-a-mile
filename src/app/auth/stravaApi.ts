import "server-only";

export async function getToken(code: string) {
  const url = "https://www.strava.com/oauth/token";

  const body = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    code: code,
    grant_type: "authorization_code",
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Response not OK");
  }

  const data = await response.json();

  return data;
}

export async function getActivities(token: string) {
  const url = "https://www.strava.com/api/v3/athlete/activities?per_page=200";
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  return await response.json();
}
