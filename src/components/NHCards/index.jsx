import clsx from "clsx";
import styles from "./NHCard.module.css";

export const NHCard = ({
  children,
  title,
  headerContent,
  rootClass,
  className,
}) => {
  return (
    <div className={clsx(styles.card, rootClass)}>
      {title && (
        <div
          className={clsx(
            styles.header,
            "d-flex align-items-center justify-content-between"
          )}
        >
          <h3 className="fw-semibold lh-base">{title}</h3>
          <div>{headerContent}</div>
        </div>
      )}
      <div className={className}>{children}</div>
    </div>
  );
};
