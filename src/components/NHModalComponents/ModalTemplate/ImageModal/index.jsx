import React from 'react'
import { NHButton, NHModal } from '@/components'

export const ImageModal = ({
    handleOk,
    onCancel,
    children,
    handleClose,
    Title,
    loading = false,
    image,
    paymentData,
    ...rest
}) => {
    return (
        <NHModal
            title={"Image"}
            open={image}
            handleClose={handleClose}
            disabledButton={false}
            confirmLoading={loading}
            {...rest}

        >
            <div className='relative'>
                <div className="img-box h-[500px] bg-[#D9D9D9] rounded-xl border border-[#DFE0EB] m-auto">
                    <img src="https://i.pravatar.cc/300" alt="" className='h-full rounded-xl' />
                </div>
                <div className="btn absolute bottom-[20px] right-[20px]">
                    <NHButton>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5997 10.5H14.8747V15.68L17.2897 13.265C17.4647 13.09 17.6863 13.0083 17.908 13.0083C18.1297 13.0083 18.3513 13.09 18.5263 13.265C18.8647 13.6033 18.8647 14.1633 18.5263 14.5017L14.618 18.41C14.2797 18.7483 13.7197 18.7483 13.3813 18.41L9.47301 14.5017C9.13467 14.1633 9.13467 13.6033 9.47301 13.265C9.81134 12.9267 10.3713 12.9267 10.7097 13.265L13.1247 15.68V10.5H8.39967C4.66634 10.5 2.33301 12.8333 2.33301 16.5667V19.5883C2.33301 23.3333 4.66634 25.6667 8.39967 25.6667H19.588C23.3213 25.6667 25.6547 23.3333 25.6547 19.6V16.5667C25.6663 12.8333 23.333 10.5 19.5997 10.5Z" fill="#0EABEB" />
                            <path d="M14.875 3.20312C14.875 2.72479 14.4783 2.32812 14 2.32812C13.5217 2.32812 13.125 2.72479 13.125 3.20312V10.4948H14.875V3.20312Z" fill="#0EABEB" />
                        </svg>
                    </NHButton>
                </div>
            </div>
        </NHModal>
    )
}