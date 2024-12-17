import { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import toast from "react-hot-toast";
import apiService from "../../../services/api";

export const Delete = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            try {
                setLoading(true);
                await apiService.DeleteDoctor(deleteId);
                onDeleteSuccess(deleteId);
                onClose();
                toast.success("Doctor deleted successfully");
            } catch (error) {
                setError(
                    "Error deleting doctor: " +
                    (error.response ? error.response.data.message : error.message)
                );
                toast.error(
                    "Error deleting doctor: " +
                    (error.response ? error.response.data.message : error.message)
                );
                console.error("Error deleting doctor:", error);
            } finally {
                setLoading(false);
            }
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md p-6 border-t-4 border-red-600">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 text-white text-2xl flex items-center justify-center mt-4 mb-3">
                        <MdDeleteSweep />
                    </div>
                    <div className="text-center w-4/5 mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800">
                            Delete Doctor Details?
                        </h3>
                        <p className="text-lg text-gray-600">
                            Are you sure you want to delete this doctor’s details?
                        </p>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                    <div className="flex justify-between w-full mt-6">
                        <button
                            className="w-1/2 border border-gray-300 rounded-lg py-2 text-lg font-semibold text-gray-800 mr-2"
                            onClick={onClose}
                            disabled={loading}
                        >
                            No
                        </button>
                        <button
                            className={`w-1/2 bg-blue-600 rounded-lg py-2 text-lg font-semibold text-white ml-2 ${loading ? "cursor-not-allowed opacity-70" : ""
                                }`}
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Yes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
