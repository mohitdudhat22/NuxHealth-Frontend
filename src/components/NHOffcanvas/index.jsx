import React from "react";
import { Drawer, Button } from "antd";
import { NHButton } from "..";
import style from './NHOffcanvas.module.css';
import clsx from "clsx";

export const NHOffcanvas = ({
    visible,         // Controls whether the drawer is visible
    onOpen,          // Function to open the drawer
    onClose,         // Function to close the drawer
    title = "Drawer", // Title of the drawer (default is "Drawer")
    placement = "right", // Placement of the drawer (default is "right")
    width = 400,      // Width of the drawer (default is 400px)
    triggerButtonText = "Open Drawer", // Text for the trigger button
    children,         // Content to display inside the drawer
    triggerButtonProps = {},
    icon,
    variant, // Additional props for the trigger button
    ...rest  // Additional props for the Drawer
}) => {
    return (
        <div>
            {/* Button to trigger the drawer */}
            <NHButton type="primary" variant={variant} icon={icon} onClick={onOpen} {...triggerButtonProps}>
                {triggerButtonText}
            </NHButton>

            {/* Ant Design Drawer Component */}
            <Drawer
                title={title}
                placement={placement}
                onClose={onClose}
                open={visible}
                width={width}
                {...rest} // Spread additional drawer props
            >
                {children}
            </Drawer>
        </div>
    );
};
