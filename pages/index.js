import Head from "next/head";
import { HomeHero } from "../components/home/home-hero";
import { MainLayout } from "../components/main/main-layout";

const Dashboard = () => (
  <>
    <Head>
      <title>ScooSign | Connect to your student</title>
    </Head>
    <main>
      <HomeHero />
    </main>
  </>
);

Dashboard.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Dashboard;
