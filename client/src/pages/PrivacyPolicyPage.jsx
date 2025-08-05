import React from "react";
import Meta from "../components/common/Meta";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Meta
        title="Privacy Policy | Acharya Beena"
        description="Read the Privacy Policy for Acharya Beena's website to understand how we collect, use, and protect your personal information."
      />
      <div className="bg-white dark:bg-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 prose prose-lg prose-indigo dark:prose-invert">
          <h1 className="text-gray-900 dark:text-starlight">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Last updated: August 4, 2025
          </p>

          <p>
            Welcome to Acharya Beena's website. We respect your privacy and are
            committed to protecting your personal data. This privacy policy will
            inform you as to how we look after your personal data when you visit
            our website and tell you about your privacy rights.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect, use, store, and transfer different kinds of personal
            data about you which we have grouped together as follows:
            <ul>
              <li>
                <strong>Identity Data:</strong> includes first name, last name,
                and date of birth.
              </li>
              <li>
                <strong>Contact Data:</strong> includes billing address, email
                address, and telephone numbers.
              </li>
              <li>
                <strong>Financial Data:</strong> includes payment card details
                (processed securely by our payment provider).
              </li>
              <li>
                <strong>Transaction Data:</strong> includes details about
                payments to and from you and other details of services you have
                purchased from us.
              </li>
              <li>
                <strong>Technical Data:</strong> includes internet protocol (IP)
                address, your login data, browser type and version.
              </li>
            </ul>
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data to process and deliver your
            requested services, including managing payments, fees, and charges,
            and to manage our relationship with you.
          </p>

          <h2>3. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used, or accessed in an
            unauthorized way. We limit access to your personal data to those
            employees and other third parties who have a business need to know.
          </p>

          <h2>4. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data, including the right to
            request access, correction, or erasure of your personal data.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact
            us using the details on our Contact page.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
