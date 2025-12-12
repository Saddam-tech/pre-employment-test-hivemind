"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createAccount } from "./page.actions";
import styles from "./page.module.scss";
import ConfirmationModal from "./Modals/ConfirmationModal.client";
import SuccessModal from "./Modals/SuccessModal.client";
import {
  FaChevronDown,
  FaGoogle,
  FaFacebookF,
  FaApple
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { BsTranslate, BsPencilSquare, BsFiles, BsClockHistory, BsLayoutSidebarReverse, BsLayoutSidebar } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";




interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export default function PageClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userName, setUserName] = useState<{ firstName: string; lastName: string } | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const validatePassword = (password: string): string | undefined => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one capital letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Password must contain at least one special character";
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      errors.password = passwordError;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ValidationErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show confirmation modal instead of submitting directly
    setShowConfirmationModal(true);
  };

  const handleConfirmSubmit = async () => {
    const result = await createAccount(formData);
    if (result.success) {
      setShowConfirmationModal(false);
      // Set user name after successful account creation
      setUserName({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      });
      setValidationErrors({});
      // Show success modal
      setShowSuccessModal(true);
    } else {
      // Handle error - could show error message to user
      console.error(result.message);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 575);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    // On mobile, toggle open/close
    // On desktop, toggle collapse/expand
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className={styles.container}>
      {isSidebarOpen && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      {isMobile && !isSidebarOpen && (
        <button className={styles.mobileSidebarToggle} onClick={toggleSidebar}>
          <BsLayoutSidebar className={styles.toggleIcon} />
        </button>
      )}
      <aside
        className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ""} ${isSidebarOpen ? styles.sidebarOpen : ""}`}
        onClick={isSidebarCollapsed && !isMobile ? toggleSidebar : undefined}
        style={isSidebarCollapsed && !isMobile ? { cursor: 'pointer' } : undefined}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.logo} onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
            <Image
              src="/aurorah-logo.jpeg"
              alt="Aurorah Logo"
              width={48}
              height={48}
              className={styles.logoImage}
              unoptimized
            />
          </div>
          {!isSidebarCollapsed && (
            <button
              className={styles.sidebarToggle}
              onClick={(e) => {
                e.stopPropagation();
                toggleSidebar();
              }}
            >
              <BsLayoutSidebarReverse />
            </button>
          )}
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>
            <BsPencilSquare className={styles.navIcon} />
            <span className={styles.navText}>New Chat</span>
          </a>
          <a href="#" className={styles.navItem}>
            <BsTranslate className={styles.navIcon} />
            <span className={styles.navText}>Translate Text</span>
          </a>
          <a href="#" className={styles.navItem}>
            <IoVideocamOutline className={styles.navIcon} />
            <span className={styles.navText}>Translate Video</span>
          </a>
          <a href="#" className={styles.navItem}>
            <BsFiles className={styles.navIcon} />
            <span className={styles.navText}>Files</span>
          </a>
          <a href="#" className={styles.navItem}>
            <BsClockHistory className={styles.navIcon} />
            <span className={styles.navText}>History</span>
          </a>
        </nav>
        <div className={`${styles.userProfile} ${!userName ? styles.userProfileCollapsed : ""}`}>
          <MdAccountCircle className={styles.userIcon} />
          {userName && (
            <span className={styles.userName}>
              {userName.firstName} {userName.lastName}
            </span>
          )}
        </div>
      </aside>
      <main className={`${styles.mainContent} ${isSidebarCollapsed ? styles.mainContentExpanded : ""}`}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.modal}>
          <h1 className={styles.modalTitle}>Create Aurorah Account</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nameFields}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className={`${styles.input} ${validationErrors.firstName ? styles.inputError : ""}`}
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {validationErrors.firstName && (
                  <span className={styles.errorMessage}>{validationErrors.firstName}</span>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className={`${styles.input} ${validationErrors.lastName ? styles.inputError : ""}`}
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {validationErrors.lastName && (
                  <span className={styles.errorMessage}>{validationErrors.lastName}</span>
                )}
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className={`${styles.input} ${validationErrors.email ? styles.inputError : ""}`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {validationErrors.email && (
                <span className={styles.errorMessage}>{validationErrors.email}</span>
              )}
            </div>
            <div className={styles.phoneInputWrapper}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                className={`${styles.input} ${validationErrors.phone ? styles.inputError : ""}`}
                value={formData.phone}
                onChange={handleInputChange}
              />
              <FaChevronDown className={styles.phoneArrow} />
              {validationErrors.phone && (
                <span className={styles.errorMessage}>{validationErrors.phone}</span>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`${styles.input} ${validationErrors.password ? styles.inputError : ""}`}
                value={formData.password}
                onChange={handleInputChange}
              />
              {validationErrors.password && (
                <span className={styles.errorMessage}>{validationErrors.password}</span>
              )}
            </div>
            <button type="submit" className={styles.submitButton}>
              Create an Account
            </button>
          </form>
          <div className={styles.divider}>
            <span className={styles.dividerText}>or sign in with</span>
          </div>
          <div className={styles.socialButtons}>
            <button className={styles.socialButton}>
              <FaGoogle className={styles.socialIcon} />
            </button>
            <button className={styles.socialButton}>
              <FaFacebookF className={styles.socialIcon} />
            </button>
            <button className={styles.socialButton}>
              <FaApple className={styles.socialIcon} />
            </button>
          </div>
          <div className={styles.signInLink}>
            Already have an account? <a href="#" className={styles.signInText}>Sign In</a>
          </div>
          <p className={styles.disclaimer}>
            By creating an account, you agree to our user agreement and acknowledge our privacy notice.
          </p>
        </div>
        <div className={styles.footerLogo}>
          <Image
            src="/aurorah-logo.jpeg"
            alt="Aurorah Logo"
            width={40}
            height={40}
            className={styles.footerLogoImage}
            unoptimized
          />
        </div>
      </main>
      <ConfirmationModal
        isOpen={showConfirmationModal}
        formData={{
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        }}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSubmit}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
}

