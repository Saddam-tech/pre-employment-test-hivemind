"use client";

import { FaCheckCircle, FaTimes } from "react-icons/fa";
import styles from "./SuccessModal.module.scss";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.modalOverlay} onClick={onClose}></div>
            <div className={styles.successModal}>
                <button className={styles.closeButton} onClick={onClose}>
                    <FaTimes />
                </button>
                <div className={styles.successIcon}>
                    <FaCheckCircle />
                </div>
                <h2 className={styles.successTitle}>Account Created Successfully!</h2>
                <p className={styles.successMessage}>
                    Your account has been created and your information has been saved.
                </p>
                <button className={styles.closeSuccessButton} onClick={onClose}>
                    Close
                </button>
            </div>
        </>
    );
}

