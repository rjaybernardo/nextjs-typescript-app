import { useEffect, useState } from "react";
import Card from "./Card";
import styles from "@/styles/Home.module.css";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

const UserList: React.FC = () => {
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

  const buttonStyle = {
    opacity: page === totalPages ? 0.5 : 1,
    cursor: page === totalPages ? "not-allowed" : "pointer",
  };
  return (
    <div>
      <div className={styles.grid}>
        {users.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={handleLoadMore}
          className={styles.btn}
          style={buttonStyle}
          disabled={page === totalPages}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default UserList;
