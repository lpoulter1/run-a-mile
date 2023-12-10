import { getToken, getActivities } from "./stravaApi";

async function Page({
  searchParams,
}: {
  searchParams: URLSearchParams | undefined;
}) {
  if (!searchParams) return <div>no searchParams</div>;
  // @ts-ignore
  const code = searchParams?.code;

  const token = await getToken(code!);
  const activities = await getActivities(token.access_token).then((res) => {
    console.error(res);
    return res;
  });

  return (
    <div>
      <h1>Auth Page</h1>
      <div>Code: {code}</div>
      <div>access_token: {token.access_token}</div>
      {JSON.stringify(activities)}
    </div>
  );
}

export default Page;
