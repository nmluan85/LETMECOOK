import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ReportButton = ({ postId }) => {
    const [showModal, setShowModal] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const { user } = useAuth();

    // Only show button for regular or premium users
    if (!user || user.role === "admin") return null;

    const handleSubmitReport = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/posts/add-report",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        postId,
                        report: reportReason,
                    }),
                },
            );

            if (response.ok) {
                alert("Report submitted successfully");
                setShowModal(false);
                setReportReason("");
            } else {
                throw new Error("Failed to submit report");
            }
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Failed to submit report");
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="text-red-500 hover:text-red-700"
            >
                <i className="fas fa-flag mr-2"></i>
                Report
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-bold mb-4">
                            Report Recipe
                        </h3>
                        <textarea
                            className="w-full h-32 border rounded p-2 mb-4"
                            placeholder="Please describe why you're reporting this recipe..."
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={handleSubmitReport}
                            >
                                Submit Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReportButton;
