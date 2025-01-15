import clsx from "clsx";
import Icons from "@/constants/Icons";
import { NHButton } from "@/components";
import styles from "../Styleguide.module.css";

export const Buttons = () => {
  return (
    <>
      <div className={styles.cardButton}>
        <h4 className="mb-4">Primary Button</h4>
        <NHButton variant={"primary"}>Primary Button</NHButton>
      </div>
      <div className={clsx(styles.cardButton, "bg-white")}>
        <h4 className="mb-4">Default Button</h4>
        <NHButton variant={"default"}>Default Button</NHButton>
      </div>
      <div className={styles.cardButton}>
        <h4 className="mb-4">Text Button</h4>
        <NHButton variant={"text"}>Text Button</NHButton>
      </div>
      <div className={styles.cardButton}>
        <h4 className="mb-4">Danger Button</h4>
        <NHButton danger>Danger Button</NHButton>
      </div>
      <div className={styles.cardButton}>
        <h4 className="mb-4">Only Icon Button</h4>
        <NHButton variant={"primary"} icon={Icons.NotificationBall} />
      </div>
      <div className={styles.cardButton}>
        <h4 className="mb-4">With Icons Start</h4>
        <NHButton variant={"primary"} icon={Icons.NotificationBall}>
          With Icons Start
        </NHButton>
      </div>
      <div className={styles.cardButton}>
        <h4 className="mb-4">With Icons End</h4>
        <NHButton
          variant={"primary"}
          iconPosition={"end"}
          icon={Icons.NotificationBall}
        >
          With Icons End
        </NHButton>
      </div>
      <div className={styles.cardButton}>
        <h4 className="mb-4">Disabled End</h4>
        <div className="d-flex gap-4">
          <NHButton disabled>Primary Button disabled</NHButton>
        </div>
      </div>
    </>
  );
};