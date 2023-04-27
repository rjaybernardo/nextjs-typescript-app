// Home.tsx
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import UserList from "@/components/UserList";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
    return (
        <div className={`${styles.container} ${inter.className}`}>
            <Head>
                <title>NextJS with Typescript App</title>
                <meta
                    name="description"
                    content="This is my Next.js with Typescript app fetching data from external API."
                />
            </Head>
            <UserList />
        </div>
    );
};

export default Home;
