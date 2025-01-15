import { NHInput, NHPasswordInput, NHInputOtp } from "@/components";

export const Inputs = () => {
  return (
    <>
      <div className="mb-3">
        <h5>Basic Input</h5>
        <NHInput placeholder={"hello This the demo"} />
      </div>
      <div className="mb-3">
        <h5>Basic Input With Label</h5>
        <NHInput label={"label"} placeholder={"hello This the demo"} />
      </div>
      <div className="mb-3">
        <h5>Password Input</h5>
        <NHPasswordInput placeholder={"hello This the demo"} />
      </div>
      <div className="mb-3">
        <h5>Password With Label Input</h5>
        <NHPasswordInput
          label={"Input Hello"}
          placeholder={"hello This the demo"}
        />
      </div>
      <div className="mb-3">
        <h5>OTP Input</h5>
        <NHInputOtp placeholder={"hello This the demo"} />
      </div>
      <div className="mb-3">
        <h5>Text Area Input</h5>
        <NHInput type="textarea" placeholder={"hello This the demo"} />
      </div>
      <div className="mb-3">
        <h5>isInvalid Password Input</h5>
        <NHPasswordInput
          isInvalid={true}
          value="Hello"
          errorMessage={"password is wrong"}
          placeholder={"hello This the demo"}
        />
      </div>
      <div className="mb-3">
        <h5>isInvalid Input</h5>
        <NHInput
          isInvalid={true}
          value="Hello"
          errorMessage={"input is invalid"}
          placeholder={"hello This the demo"}
        />
      </div>
      <div className="mb-3">
        <h5>Disabled With Label Input</h5>
        <NHInput
          label={"label"}
          disabled={true}
          placeholder={"hello This the demo"}
        />
      </div>
      <div className="mb-3">
        <h5>Disabled Without Label Input</h5>
        <NHInput disabled={true} placeholder={"hello This the demo"} />
      </div>
    </>
  );
};