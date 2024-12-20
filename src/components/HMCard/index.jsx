import Card from '@mui/material/Card';
import clsx from 'clsx';

export const HMCard = ({ children, className, HeadClassName, title, headLeft, ...rest }) => {
  return (
    <Card className={clsx(className, "bg-white w-full p-5 shadow-md rounded-lg mx-4 md:mx-10")} {...rest}>
      <div className={clsx(HeadClassName, "head mb-5")}>
        {title || headLeft &&
          <>
            <div>
              {title && <p className="text-2xl font-semibold">{title}</p>}
              {headLeft && headLeft}
            </div>
            <div></div>
          </>}
      </div>
      {children}
    </Card>
  )
}

