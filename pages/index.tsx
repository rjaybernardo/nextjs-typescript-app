import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users");
        const data = await response.json();

        if (response.ok) {
          setUsers(data.data);
        } else {
          console.error("Failed to fetch users:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={`${styles.container}   ${inter.className}`}>
      <div className={styles.grid}>
        {users.map((user) => (
          <div key={user.id} className={styles.card}>
            <div className={styles.card_content}>
              <Image
                src={user.avatar}
                alt={user.first_name}
                className={styles.avatar}
                width={50}
                height={50}
              />
              <p>{user.id}</p>
              <p>{user.email}</p>
              <p>
                {user.first_name} {user.last_name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.btn}>Load More</button>
    </div>
  );
};

export default Home;
