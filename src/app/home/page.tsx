
import { getHomeTabsData } from "@/lib/firebase-services";
import { HomeClient } from "@/components/modules/home/home-client";

// This is now a pure Server Component. Its only job is to fetch data.
export default async function HomePage() {
  const homeTabsData = await getHomeTabsData();

  // It then passes the data to the Client Component which handles all interactivity.
  return <HomeClient homeTabsData={homeTabsData} />;
}
