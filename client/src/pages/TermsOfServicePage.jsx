import React from "react";
import Meta from "../components/common/Meta";

const TermsOfServicePage = () => {
  return (
    <>
      <Meta
        title="Terms of Service | Acharya Beena"
        description="Please read our Terms of Service carefully before using the services offered by Acharya Beena."
      />
      <div className="bg-white dark:bg-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 prose prose-lg prose-indigo dark:prose-invert">
          <h1 className="text-gray-900 dark:text-starlight">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Last updated: August 4, 2025
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing our site and using our services, you agree to be bound
            by these Terms of Service. If you disagree with any part of the
            terms, then you may not access the service.
          </p>

          <h2>2. Services Disclaimer</h2>
          <p>
            The astrological consultations and content provided on this website
            are for guidance and entertainment purposes only. Information
            provided should not be used as a substitute for professional, legal,
            financial, or medical advice. Acharya Beena is not responsible for
            any decisions made by clients based on the consultations.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide us with
            information that is accurate, complete, and current at all times.
            You are responsible for safeguarding the password that you use to
            access the service.
          </p>

          <h2>4. Bookings and Payments</h2>
          <p>
            All bookings are subject to confirmation. Payment must be made in
            full prior to the consultation. We reserve the right to refuse or
            cancel your booking at any time for certain reasons including but
            not limited to service availability or errors in the description or
            price of the service.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Acharya Beena, nor her partners, agents, or
            affiliates, be liable for any indirect, incidental, special,
            consequential or punitive damages resulting from your access to or
            use of, or inability to access or use, the service.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of India, without regard to its conflict of law provisions.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;
