import clsx from "clsx";
import styles from "./NHCard.module.css";
import { Card } from "antd";

export const NHCard = ({
  children,
  title,
  headerContent,
  rootClass,
  className,
  headerBg,
}) => {
  return headerBg ? (
    <Card title={title} extra={headerContent} className={clsx(rootClass)}>
      <div className={className}>{children}</div>
    </Card>
  ) : (
    <div className={clsx(styles.card, rootClass)}>
      {title && (
        <div
          className={clsx(
            styles.header,
            "flex items-center justify-between gap-xl"
          )}
        >
          <h3 className="fw-semibold lh-base">{title}</h3>
          <div className="flex items-center gap-xl">{headerContent}</div>
        </div>
      )}
      <div className={className}>{children}</div>
    </div>
  );
};
