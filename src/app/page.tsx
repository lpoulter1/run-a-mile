import activitiesJson from "./sample-data/activities.json";

export default function Home() {
  const consecutiveActivities = getConsecutiveActivities(activitiesJson);

  return (
    <main className="min-h-screen bg-slate-800 text-white">
      <h1 className="text-2xl ">Run a Mile</h1>
      <a
        className="text-lime-300"
        href="http://www.strava.com/oauth/authorize?client_id=117837&response_type=code&redirect_uri=http://localhost:3000/auth?exchange_token&approval_prompt=force&scope=read,activity:read_all"
      >
        Load from Strava
      </a>
      <div>{consecutiveActivities.length} days in a row</div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-8">
        {consecutiveActivities.map((activity: Activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </main>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="flex bg-fuchsia-500 text-white flex-col rounded-sm h-40 justify-center items-center">
      <h2>Date {new Date(activity.start_date).toLocaleDateString()}</h2>
      <div>Distance: {activity.distance}km</div>
    </div>
  );
}

type Activity = {
  id: number;
  start_date: string;
  distance: number;
};

function getConsecutiveActivities(activities: Activity[]) {
  const sortedActivities = activities.toSorted(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  let today = new Date();
  let consecutiveActivities = [];

  for (let activity of sortedActivities) {
    const ele_date = new Date(activity.start_date);

    if (ele_date <= today) {
      const prevDate = new Date(
        sortedActivities[sortedActivities.indexOf(activity) + 1].start_date
      );

      if (!isDayBefore(ele_date, prevDate) && !isSameDay(ele_date, prevDate)) {
        consecutiveActivities.push(activity);
        break;
      }

      consecutiveActivities.push(activity);
    }
  }

  return consecutiveActivities;
}

function isDayBefore(date1: Date, date2: Date) {
  let prevDay = new Date(date1.getTime());
  prevDay.setDate(prevDay.getDate() - 1);

  return date2.toDateString() === prevDay.toDateString();
}

function isSameDay(date1: Date, date2: Date) {
  return date1.toDateString() === date2.toDateString();
}
