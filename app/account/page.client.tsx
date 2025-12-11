"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createAccount } from "./page.actions";
import styles from "./page.module.scss";
import {
  FaChevronDown,
  FaGoogle,
  FaFacebookF,
  FaApple
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { BsTranslate, BsPencilSquare, BsFiles, BsClockHistory, BsLayoutSidebarReverse, BsLayoutSidebar } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";




export default function PageClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAccount(formData);
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
      {((isMobile && !isSidebarOpen) || (!isMobile && isSidebarCollapsed)) && (
        <button className={styles.sidebarToggleFixed} onClick={toggleSidebar}>
          <BsLayoutSidebar className={styles.toggleIcon} />
        </button>
      )}
      <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ""} ${isSidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <Image
              src="/aurorah-logo.jpeg"
              alt="Aurorah Logo"
              width={48}
              height={48}
              className={styles.logoImage}
              unoptimized
            />
          </div>
          <button className={styles.sidebarToggle} onClick={toggleSidebar}>
            <BsLayoutSidebarReverse />
          </button>
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
        <div className={styles.userProfile}>
          <MdAccountCircle className={styles.userIcon} />
          <span className={styles.userName}>Eldar Gezalov</span>
        </div>
      </aside>
      <main className={`${styles.mainContent} ${isSidebarCollapsed ? styles.mainContentExpanded : ""}`}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.modal}>
          <h1 className={styles.modalTitle}>Create Aurorah Account</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nameFields}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className={styles.input}
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className={styles.input}
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className={styles.input}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <div className={styles.phoneInputWrapper}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                className={styles.input}
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <FaChevronDown className={styles.phoneArrow} />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
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
    </div>
  );
}

