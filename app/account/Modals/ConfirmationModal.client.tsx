"use client";

import { FaTimes } from "react-icons/fa";
import styles from "./ConfirmationModal.module.scss";

interface ConfirmationModalProps {
    isOpen: boolean;
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmationModal({
    isOpen,
    formData,
    onClose,
    onConfirm,
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.modalOverlay} onClick={onClose}></div>
            <div className={styles.confirmationModal}>
                <button className={styles.closeButton} onClick={onClose}>
                    <FaTimes />
                </button>
                <h2 className={styles.confirmationTitle}>Confirm Your Information</h2>
                <p className={styles.confirmationSubtitle}>
                    Please review your details before submitting:
                </p>
                <div className={styles.confirmationContent}>
                    <div className={styles.confirmationField}>
                        <span className={styles.confirmationLabel}>First Name:</span>
                        <span className={styles.confirmationValue}>{formData.firstName}</span>
                    </div>
                    <div className={styles.confirmationField}>
                        <span className={styles.confirmationLabel}>Last Name:</span>
                        <span className={styles.confirmationValue}>{formData.lastName}</span>
                    </div>
                    <div className={styles.confirmationField}>
                        <span className={styles.confirmationLabel}>Email:</span>
                        <span className={styles.confirmationValue}>{formData.email}</span>
                    </div>
                    <div className={styles.confirmationField}>
                        <span className={styles.confirmationLabel}>Phone:</span>
                        <span className={styles.confirmationValue}>{formData.phone}</span>
                    </div>
                </div>
                <div className={styles.confirmationActions}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        Confirm & Submit
                    </button>
                </div>
            </div>
        </>
    );
}

