"use client";

import { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import { ITourRequestPopulated } from "@/app/types/Tour";
import FormInput from "../main/FormInput";
import { Save } from "lucide-react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  tour: ITourRequestPopulated;
  onClose: () => void;
  onSaved: (tour: ITourRequestPopulated) => void;
}

const RescheduleTourModal: FC<Props> = ({ isOpen, tour, onClose, onSaved }) => {
  const [tourTime, setTourTime] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("body");
    }
  }, []);

  useEffect(() => {
    setTourTime(tour.tourTime.slice(0, 16)); // for datetime-local input
    setMeetLink(tour.meetLink || "");
  }, [tour]);

  const handleSave = async () => {
    if (!tourTime) {
      toast.error("Please select a new tour time.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/tours/${tour._id}/reschedule`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourTime: new Date(tourTime).toISOString(),
          ...(tour.type === "virtual" ? { meetLink } : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to reschedule tour");

      toast.success("Tour rescheduled successfully");
      onSaved({
        ...tour,
        tourTime: new Date(tourTime).toISOString(),
        ...(tour.type === "virtual" ? { meetLink } : {}),
        rescheduled: true,
      });
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to reschedule tour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-10"
      className="bg-white rounded-xl w-full max-w-lg p-6 outline-none"
    >
      <h2 className="text-xl font-semibold mb-4">Reschedule Tour</h2>

      <div className="space-y-4">
        <FormInput
          label="New Tour Date & Time"
          type="datetime-local"
          value={tourTime}
          onChange={(e) => setTourTime(e.target.value)}
        />

        {tour.type === "virtual" && (
          <FormInput
            label="Google Meet Link"
            placeholder="https://meet.google.com/..."
            value={meetLink}
            onChange={(e) => setMeetLink(e.target.value)}
          />
        )}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800"
          disabled={loading}
        >
          <Save size={16} />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </Modal>
  );
};

export default RescheduleTourModal;