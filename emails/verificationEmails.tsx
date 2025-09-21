import * as React from "react";

interface EmailTemplateProps {
  userName: string;
}

export function EmailTemplate({ userName }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#f4f4f7",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#4F46E5",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, color: "#ffffff", fontSize: "24px" }}>
            Welcome to Our Community 🎉
          </h1>
        </div>

        {/* Body */}
        <div style={{ padding: "30px" }}>
          <h2 style={{ color: "#111827", marginTop: 0 }}>Hi {userName},</h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            We're excited to have you on board! Thank you for joining us. You’re
            now part of a community where innovation meets simplicity.
          </p>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            To get started, explore your dashboard and personalize your
            experience. If you need help, our support team is just one click
            away.
          </p>

          {/* Call to Action */}
          <div style={{ textAlign: "center", margin: "30px 0" }}>
            <a
              href="https://yourapp.com/dashboard"
              style={{
                display: "inline-block",
                backgroundColor: "#4F46E5",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Go to Dashboard
            </a>
          </div>

          <p style={{ fontSize: "14px", color: "#6B7280" }}>
            Cheers, <br />
            The YourApp Team
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "20px",
            textAlign: "center",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} YourApp. All rights reserved.
          </p>
          <p style={{ margin: "5px 0 0" }}>1234 Street, City, Country</p>
        </div>
      </div>
    </div>
  );
}
