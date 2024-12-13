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
        <div className="bg-white rounded-lg shadow-lg w-1/5">
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
                        <div
                          className="minus-circle"
                          onClick={() => removeOption(index)}
                        >
                          <TiMinus />
                        </div>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
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
