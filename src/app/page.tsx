import activitiesJson from "./sample-data/activities.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-800 text-white">
      <h1 className="text-2xl ">Run a Mile</h1>
      <a
        className="text-lime-300"
        href="http://www.strava.com/oauth/authorize?client_id=117837&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read,activity:read_all"
      >
        Load from Strava
      </a>
      <div>{activitiesJson.length} activities</div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-8">
        {activitiesJson.map((activity: Activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </main>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="flex bg-fuchsia-300 w-80 flex-col rounded-sm h-40 justify-center items-center">
      <h2>Date {activity.start_date}</h2>
      <div>Distance{activity.distance}</div>
    </div>
  );
}

type Activity = {
  id: number;
  start_date: string;
  distance: number;
};

function ActivityTable({ activities }: { activities: Activity[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>

          <th>Distance</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity: Activity) => (
          <tr key={activity.id}>
            <td>{activity.start_date}</td>

            <td>{activity.distance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
