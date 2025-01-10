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
  footerContent,
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
          <h3 className="fw-semibold lh-base text-[26px] text-[#030229] font-bold">
            {title}
          </h3>
          <div className="flex items-center gap-xl">{headerContent}</div>
        </div>
      )}
      <div className={className}>{children}</div>
      {footerContent && <div className="pt-4 mt-4">{footerContent}</div>}
    </div>
  );
};
