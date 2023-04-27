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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://reqres.in/api/users?per_page=6&page=${page}`
        );
        const data = await response.json();

        if (response.ok) {
          if (page === 1) {
            setUsers(data.data);
          } else {
            setUsers((prevUsers) => [...prevUsers, ...data.data]);
          }
          setTotalPages(data.total_pages);
        } else {
          console.error("Failed to fetch users:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const buttonClass =
    page === totalPages ? `${styles.btn} ${styles.disabled}` : styles.btn;

  return (
    <div className={`${styles.container} ${inter.className}`}>
      <Head>
        <title>My Next.js App</title>
        <meta
          name="description"
          content="This is my Next.js app for demonstration purposes."
        />
      </Head>
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
      <button
        onClick={handleLoadMore}
        className={buttonClass}
        disabled={page === totalPages}
      >
        Load More
      </button>
    </div>
  );
};

export default Home;
