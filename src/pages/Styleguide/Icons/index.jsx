import clsx from "clsx";
import Icons from "@/constants/Icons";
import styles from "./Icons.module.css";

export const DSIcons = () => {
  return (
    <>
      <div className={clsx(styles.IconsWrapper, "d-grid gap-2xl")}>
        {Object.entries(Icons).map(([name, Icon]) => (
          <div
            key={name}
            className={clsx(
              styles.IconsContent,
              "d-flex flex-column align-items-center justify-content-center"
            )}
          >
            {Icon}
            <span className="mt-2 text-sm text-gray-600">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
};
