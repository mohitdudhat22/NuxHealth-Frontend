import Dragger from "antd/es/upload/Dragger";
import clsx from "clsx";
import Icons from "@/constants/Icons";

export const NHUpload = ({
  rootClassName,
  onChange,
  ...rest
}) => {
  return (
    <div className={rootClassName}>
      <Dragger {...rest} className="block" onChange={onChange}>
        <p className="ant-upload-drag-icon">
          <span
            className={clsx(
              "inbox-icon flex items-center justify-center ma-auto"
            )}
          >
            {Icons.inbox}
          </span>
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </div>
  );
};