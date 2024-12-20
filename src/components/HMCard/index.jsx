import { Card } from '@mui/material';
import clsx from 'clsx';

export const HMCard = ({ children, className, HeadClassName, title, headLeft, ...rest }) => {
  return (
    <Card className={clsx(className, "bg-white w-full p-5 !shadow-md !rounded-2xl")}>
      <div className={clsx(HeadClassName, "head mb-5")}>
        {title &&
          <div className='flex items-center justify-between'>
            {title && <p className="text-[18px] new-sm:text-[20px] new-lg:text-[22px] new-xl:text-[24px] new-xxl:text-[26px] text-[#030229] font-bold">{title}</p>}
            {headLeft && headLeft}
          </div>
        }
      </div>
      {children}
    </Card>
  )
}

