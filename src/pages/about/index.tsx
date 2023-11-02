// pages/index.tsx

import React from 'react';
// import React, { useState } from "react";
import styles from './about.module.css';

const AboutPage: React.FC = () => {
    return (
        <div className={styles.header}>
            <h1>About Us 🏫 </h1>
            <p>Problem: people want to give back to schools but don’t have easy access to information on how to do it.</p>
            <p>Solution: a user-friendly website that directs people on how to spend their time or money.</p>
            <p>Goal: Increased philanthropy, increased volunteers, and increased attendance at SFUSD school events open to the public</p>
        </div>
    );
};

export default AboutPage;