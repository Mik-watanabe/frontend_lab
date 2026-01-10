import Button from "../atoms/Button";
import styles from "./StudyLogItem.module.scss";

const StudyLogItem = ({id, title, hours, deleteItem}: any) => {
  return (
    <li className={styles.item}>
      <div className={styles.div}>
        <p>{title} ：</p>
        <p>{hours} (H)</p>
        <Button onClick={() => deleteItem(id)} label="delete" />
      </div>
    </li>
  );
};

export default StudyLogItem;
