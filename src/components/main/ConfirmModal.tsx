"use client";

import { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ClipLoader } from "react-spinners";
import { X, CheckCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onCancel,
  onConfirm,
  isLoading = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 300, once: true });
  }, []);

  // Escape key listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  // Close if clicking outside modal content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      if (!isLoading) onCancel();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-xs"
      data-aos="fade-in"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-md animate-scaleUp"
        data-aos="zoom-in"
      >
        <p className="text-gray-800 text-lg mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 text-lg font-light rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <X size={16} strokeWidth={1} />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex items-center gap-2 justify-center px-4 py-2 text-lg font-light rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? (
              <ClipLoader size={18} color="#fff" />
            ) : (
              <CheckCircle size={16} strokeWidth={1} />
            )}
            {isLoading ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleUp {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleUp {
          animation: scaleUp 0.25s ease-out forwards;
        }
      `}</style>
    </div>,
    document.body,
  );
};

export default ConfirmModal;