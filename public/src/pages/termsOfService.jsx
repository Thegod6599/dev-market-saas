import styles from './pageStyles/LegalPages.module.css';

function TermsOfService() {
  return (
    <main className={styles.legalPage}>
      <header className={styles.legalHeader}>
        <h1>Terms of Service</h1>

        <p className={styles.legalDescription}>
          These Terms explain the conditions for accessing and
          using Dev Market and its developer resources.
        </p>

        <div className={styles.legalMeta}>
          <p>
            <strong>Effective date:</strong> July 3, 2026
          </p>
          <p>
            <strong>Last updated:</strong> October 14, 2026
          </p>
        </div>
      </header>

      <article className={styles.legalContent}>
        <h2>1. Agreement to These Terms</h2>

        <p>
          These Terms of Service govern your access to and use of
          Dev Market, including its website, account features,
          component library, downloadable components, and other
          features made available through the platform.
        </p>

        <p>
          By accessing or using Dev Market, you agree to these Terms
          to the extent permitted by applicable law. If you do not
          agree, you must not use the platform.
        </p>

        <p>
          You may use Dev Market only if you are legally permitted
          to agree to these Terms and satisfy applicable age
          requirements.
        </p>

        <h2>2. About Dev Market</h2>

        <p>
          Dev Market is an independently developed platform intended
          to help developers discover and use reusable software
          components and related resources.
        </p>

        <p>
          Features may change, be added, be temporarily unavailable,
          or be discontinued as development continues.
        </p>

        <h2>3. Accounts and Account Security</h2>

        <p>
          Some features require an account. You agree to provide
          accurate information when creating an account and to keep
          your account information reasonably up to date.
        </p>

        <p>
          You are responsible for maintaining the security of your
          account credentials and for activity carried out through
          your account, subject to applicable law.
        </p>

        <p>
          You must not attempt to access another person's account,
          bypass authentication or security controls, or use the
          platform in a way that compromises other users or the
          service.
        </p>

        <p>
          You may delete your account using the available account
          deletion feature. Account deletion removes your Firebase
          Authentication account and associated Firestore profile
          and settings document through the application's deletion
          process. Certain provider-managed records may be retained
          under applicable retention practices or legal requirements.
        </p>

        <h2>4. Component License and Permitted Use</h2>

        <p>
          Subject to these Terms and any additional license terms
          supplied with a particular component, Dev Market grants
          you permission to use downloadable components for personal
          and commercial projects.
        </p>

        <p>Permitted uses include:</p>

        <ul>
          <li>
            Using components in your own personal projects.
          </li>
          <li>
            Using components in commercial applications and websites.
          </li>
          <li>
            Modifying components to meet your project's requirements.
          </li>
          <li>
            Incorporating components into a larger application or
            software product.
          </li>
        </ul>

        <h3>Restrictions</h3>

        <p>You must not:</p>

        <ul>
          <li>
            Resell or redistribute a downloadable component package
            as a standalone product.
          </li>
          <li>
            Repackage or redistribute a component library primarily
            to provide others with the same standalone component
            files.
          </li>
          <li>
            Claim ownership of third-party materials that you do
            not own.
          </li>
          <li>
            Use components in a manner that infringes another
            person's intellectual property rights or violates
            applicable law.
          </li>
        </ul>

        <p>
          These restrictions do not prohibit incorporating permitted
          components into a larger personal or commercial project.
          They prohibit distributing or selling the standalone
          component package itself as described above.
        </p>

        <p>
          If a component includes third-party materials with separate
          license terms, those terms may impose additional conditions
          on your use.
        </p>

        <h2>5. Third-Party Components and Materials</h2>

        <p>
          Components, icons, examples, and other resources may
          originate from third parties or include third-party
          dependencies.
        </p>

        <p>
          You are responsible for reviewing applicable licenses and
          ensuring that your use of those materials complies with
          their terms. Dev Market does not grant rights to third-party
          materials beyond the rights it is authorized to provide.
        </p>

        <h2>6. Acceptable Use</h2>

        <p>You agree not to:</p>

        <ul>
          <li>
            Use Dev Market for unlawful purposes.
          </li>
          <li>
            Attempt to gain unauthorized access to accounts, systems,
            data, or restricted functionality.
          </li>
          <li>
            Interfere with the operation, availability, or security
            of the platform.
          </li>
          <li>
            Upload or distribute malicious code through features
            that permit user submissions.
          </li>
          <li>
            Circumvent usage restrictions or security controls.
          </li>
          <li>
            Infringe the intellectual property or other rights of
            any person or organization.
          </li>
        </ul>

        <h2>7. Intellectual Property and Feedback</h2>

        <p>
          Dev Market's original branding, website design, and other
          original platform materials are owned by their respective
          rights holders and are protected by applicable intellectual
          property laws.
        </p>

        <p>
          Your use of Dev Market does not transfer ownership of the
          platform's original materials to you. Any rights expressly
          granted under these Terms remain subject to their conditions.
        </p>

        <p>
          If you submit suggestions or feedback, you authorize Dev
          Market to use that feedback to evaluate, maintain, and
          improve the platform, to the extent permitted by applicable
          law. This does not transfer ownership of your pre-existing
          intellectual property or grant rights to unrelated
          confidential material you have not authorized us to use.
        </p>

        <h2>8. Third-Party Services</h2>

        <p>
          Dev Market relies on third-party services, including
          Firebase for authentication and account-related data and
          Supabase for component-library and related application data.
        </p>

        <p>
          Your use of features supported by these providers may also
          be subject to their applicable terms and policies. Dev
          Market is not responsible for independent changes to
          third-party services that are outside its control.
        </p>

        <h2>9. Availability and Changes</h2>

        <p>
          Dev Market is provided on an evolving basis. We do not
          guarantee that every feature, component, download, or
          service will always be available, uninterrupted, error-free,
          or compatible with every environment.
        </p>

        <p>
          We may modify, suspend, or discontinue features as needed
          to maintain, improve, or develop the platform, subject to
          applicable law.
        </p>

        <h2>10. Disclaimers</h2>

        <p>
          To the maximum extent permitted by applicable law, Dev
          Market and its resources are provided on an "as is" and
          "as available" basis, without warranties that are not
          expressly provided.
        </p>

        <p>
          We do not guarantee that components will meet every
          project's requirements, be free of defects, or work
          without modification in your development environment.
          You are responsible for testing and reviewing components
          before using them in your projects.
        </p>

        <p>
          Nothing in these Terms excludes or limits a right or
          protection that cannot lawfully be excluded or limited.
        </p>

        <h2>11. Limitation of Liability</h2>

        <p>
          To the maximum extent permitted by applicable law, Dev
          Market will not be liable for indirect, incidental,
          special, consequential, or punitive damages arising from
          your use of, or inability to use, the platform.
        </p>

        <p>
          This section does not exclude or limit liability where
          such exclusion or limitation is prohibited by applicable
          law.
        </p>

        <h2>12. Suspension and Termination</h2>

        <p>
          Access to Dev Market may be restricted or terminated
          where reasonably necessary to address violations of these
          Terms, security risks, unlawful activity, or other
          legitimate operational requirements, subject to applicable
          law.
        </p>

        <p>
          You may stop using Dev Market at any time and may delete
          your account using the available account deletion feature.
        </p>

        <p>
          Terms that by their nature should continue to apply after
          termination, including applicable intellectual property
          restrictions and disclaimers, will continue to apply to
          the extent permitted by law.
        </p>

        <h2>13. Changes to These Terms</h2>

        <p>
          These Terms may be updated as Dev Market evolves or as
          legal and operational requirements change. The date at
          the top of this page indicates when the Terms were most
          recently revised.
        </p>

        <p>
          Where required by applicable law, we will provide notice
          of material changes or obtain consent before those changes
          take effect.
        </p>

        <h2>14. Governing Law</h2>

        <p>
          The governing law and jurisdiction applicable to these
          Terms must be determined and confirmed before publication
          as a finalized legal document. Nothing in this section
          is intended to override mandatory legal protections that
          apply to you.
        </p>

        <h2>15. Contact</h2>

        <p>
          If you have questions about these Terms, contact:
        </p>

        <p>
          <strong>Dev Market — Independent Developer</strong>
          <br />
          Email:{' '}
          <a href="mailto:daxp.dev@gmail.com">
            daxp.dev@gmail.com
          </a>
        </p>
      </article>
    </main>
  );
}

export default TermsOfService;