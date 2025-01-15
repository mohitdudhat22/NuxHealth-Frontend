import clsx from "clsx";
import styles from "./NHLoader.module.css";

export const NHLoader = () => {
  return (
    <>
      <div
        className={clsx(
          styles.body,
          "h-[100dvh] grid place-content-center overflow-hidden antialiased"
        )}
      >
        <div
          className={clsx(
            styles.loader,
            "relative m-auto w-20 aspect-[1/1] rounded-[100vmin] overflow-hidden p-5 before:content-[''] before:block before:pt-[100%]"
          )}
        >
          <svg
            className={
              (styles.circular,
              "w-full h-full absolute inset-0 m-auto origin-center animate-[rotate_2s_linear_infinite]")
            }
            viewBox="25 25 50 50"
          >
            <circle
              className={
                (styles.path,
                "stroke-primary [stroke-dasharray:1,200] [stroke-dashoffset:0] stroke-round animate-[dash_1.5s_ease-in-out_infinite]")
              }
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="10"
            ></circle>
          </svg>
        </div>
      </div>
    </>
  );
};
