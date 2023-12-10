import activitiesJson from "./sample-data/activities.json";

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="text-2xl text-fuchsia-500">Run a Mile</h1>
      <div>
        <ActivityTable activities={activitiesJson} />
      </div>
    </main>
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
