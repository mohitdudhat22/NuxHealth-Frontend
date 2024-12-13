import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { TiMinus } from "react-icons/ti";
import PropTypes from "prop-types";

const AddFieldModal = ({ isOpen, onClose, onAddField }) => {
  const [fieldType, setFieldType] = useState("Dropdown");
  const [selectionType, setSelectionType] = useState("Single");
  const [fieldName, setFieldName] = useState("");
  const [options, setOptions] = useState([""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index) =>
    setOptions(options.filter((_, i) => i !== index));

  const handleAdd = () => {
    if (!fieldName.trim()) {
      alert("Please enter a field name.");
      return;
    }

    onAddField({
      fieldType,
      selectionType: fieldType === "Dropdown" ? selectionType : null,
      name: fieldName,
      options:
        fieldType === "Dropdown" ? options.filter((opt) => opt.trim()) : null,
    });

    // Reset fields after adding
    setFieldType("Dropdown");
    setSelectionType("Single");
    setFieldName("");
    setOptions([""]);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* <div className="bg-white rounded-lg shadow-lg w-1/5">
          <div className="modal-overlay">
            <div className="modal w-full p-6">
              <h2>Add New Field</h2>

              <div className="field-type">
                <label className="radio-label check">
                  <input
                    type="radio"
                    name="fieldType"
                    value="Dropdown"
                    checked={fieldType === "Dropdown"}
                    onChange={() => setFieldType("Dropdown")}
                  />
                  <span className="radio-custom"></span>
                  Dropdown
                </label>
                |
                <label className="radio-label">
                  <input
                    type="radio"
                    name="fieldType"
                    value="Text Field"
                    checked={fieldType === "Text Field"}
                    onChange={() => setFieldType("Text Field")}
                  />
                  <span className="radio-custom"></span>
                  Text field
                </label>
              </div>

              {fieldType === "Dropdown" && (
                <div className="dropdown">
                  <label htmlFor="selection">Selection</label>
                  <select
                    id="selection"
                    value={selectionType}
                    onChange={(e) => setSelectionType(e.target.value)}
                  >
                    <option value="Single">Single</option>
                    <option value="Multiple">Multiple</option>
                  </select>
                </div>
              )}

              <div className="input">
                <div className="label">Dropdown Name</div>
                <input
                  type="text"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="Enter Field Name"
                />
              </div>

              {fieldType === "Dropdown" && (
                <div className="values">
                  <div className="flex">
                    {options.map((option, index) => (
                      <div key={index} className="input-box">
                        <div className="minus-circle" onClick={() => removeOption(index)}>
                          <TiMinus />
                        </div>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`Value ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="add flex align-center" onClick={addOption}>
                    <div className="icon">
                      <IoMdAdd />
                    </div>
                    <h3>Add Option</h3>
                  </div>
                </div>
              )}

              <div className="actions">
                <button onClick={onClose} className="btn-cancel">
                  Cancel
                </button>
                <button onClick={handleAdd} className="btn-add">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-[20%]">
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">
              Add New Field
            </h2>

            <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-6">
              <label className="flex items-center text-lg font-semibold text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="fieldType"
                  value="dropdown"
                  checked={fieldType === "Dropdown"}
                  onChange={() => setFieldType("Dropdown")}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center mr-3 ${
                    fieldType === "Dropdown" ? "border-blue-500" : ""
                  }`}
                >
                  {fieldType === "Dropdown" && (
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                  )}
                </span>
                Dropdown
              </label>
              <span className="mx-2">|</span>
              <label className="flex items-center text-lg font-semibold text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="fieldType"
                  value="textfield"
                  checked={fieldType === "Text Field"}
                  onChange={() => setFieldType("Text Field")}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center mr-3 ${
                    fieldType === "Text Field" ? "border-blue-500" : ""
                  }`}
                >
                  {fieldType === "Text Field" && (
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                  )}
                </span>
                Text field
              </label>
            </div>

            {fieldType === "Dropdown" && (
              <div className="relative mb-6">
                <label
                  htmlFor="selection"
                  className="absolute -top-2 left-3 bg-white text-gray-700 text-sm px-1"
                >
                  Selection
                </label>
                <select
                  id="selection"
                  value={selectionType}
                  onChange={(e) => setSelectionType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Single">Single</option>
                  <option value="Multiple">Multiple</option>
                </select>
              </div>
            )}

            <div className="relative mb-6">
              <label className="absolute -top-2 left-3 bg-white text-gray-700 text-sm px-1">
                Dropdown Name
              </label>
              <input
                type="text"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="Enter Field Name"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {fieldType === "Dropdown" && (
              <div>
                <div className="flex flex-wrap gap-4 mb-6">
                  {options.map((option, index) => (
                    <div key={index} className="relative w-[45%]">
                      <button
                        className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs"
                        onClick={() => removeOption(index)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        placeholder={`Value ${index + 1}`}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
                <div
                  className="flex items-center justify-center text-[#5678E9] cursor-pointer"
                  onClick={addOption}
                >
                  <span className="bg-[#5678E9] text-white rounded-md mr-2 w-8 h-8 flex items-center justify-center text-lg">
                    +
                  </span>
                  <h3 className="text-sm font-medium">Add Option</h3>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={onClose}
                className="w-[45%] py-2 px-4 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="w-[45%] py-2 px-4 ml-2 text-white bg-[#5678E9] rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

AddFieldModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddField: PropTypes.func.isRequired,
};

export default AddFieldModal;
