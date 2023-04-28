import Image from "next/image";
import styles from "@/styles/Card.module.css";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type CardProps = {
  user: User;
};

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <div className={styles.card}>
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
  );
};

export default Card;
