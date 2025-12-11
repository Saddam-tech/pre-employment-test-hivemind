"use client";

import { useState } from "react";
import { createAccount } from "./page.actions";
import styles from "./page.module.scss";

export default function PageClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAccount(formData);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}></div>
          <button className={styles.sidebarToggle}></button>
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>
            <span className={styles.navIcon}>✏️</span>
            <span className={styles.navText}>New Chat</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span className={styles.navIcon}>Aa</span>
            <span className={styles.navText}>Translate Text</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span className={styles.navIcon}>📹</span>
            <span className={styles.navText}>Translate Video</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span className={styles.navIcon}>📄</span>
            <span className={styles.navText}>Files</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span className={styles.navIcon}>🕐</span>
            <span className={styles.navText}>History</span>
          </a>
        </nav>
        <div className={styles.userProfile}>
          <div className={styles.userIcon}>👤</div>
          <span className={styles.userName}>Eldar Gezalov</span>
        </div>
      </aside>
      <main className={styles.mainContent}>
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
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              className={styles.input}
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
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
              <span className={styles.socialIcon}>G</span>
            </button>
            <button className={styles.socialButton}>
              <span className={styles.socialIcon}>f</span>
            </button>
            <button className={styles.socialButton}>
              <span className={styles.socialIcon}>🍎</span>
            </button>
          </div>
          <div className={styles.signInLink}>
            Already have an account? <a href="#" className={styles.signInText}>Sign In</a>
          </div>
          <p className={styles.disclaimer}>
            By creating an account, you agree to our user agreement and acknowledge our privacy notice.
          </p>
        </div>
        <div className={styles.footerLogo}></div>
      </main>
    </div>
  );
}

