import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
          <p className="text-sm text-foreground text-opacity-60 mb-8">Last updated March 18, 2025</p>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-foreground text-opacity-80">
              This privacy notice for eciple Inc ("Company," "we," "us," or "our") describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-foreground text-opacity-80">
              <li>Visit our website at <a href="https://www.eciple.com" className="text-accent hover:underline">https://www.eciple.com</a>, or any website of ours that links to this privacy notice</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
            
            <p className="text-foreground text-opacity-80">
              <strong>Questions or concerns?</strong> Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:info@eciple.com" className="text-accent hover:underline">info@eciple.com</a>.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Summary of Key Points</h2>
            <p className="text-foreground text-opacity-80">
              <em>This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</em>
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with eciple Inc and the Services, the choices you make, and the products and features you use. <a href="#personal-info" className="text-accent hover:underline">Learn more about personal information you disclose to us.</a>
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>Do we receive any information from third parties?</strong> We do not receive any information from third parties.
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. <a href="#process-info" className="text-accent hover:underline">Learn more about how we process your information.</a>
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. <a href="#share-info" className="text-accent hover:underline">Learn more about when and with whom we share your personal information.</a>
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>How do we keep your information safe?</strong> We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. <a href="#info-safety" className="text-accent hover:underline">Learn more about how we keep your information safe.</a>
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. <a href="#privacy-rights" className="text-accent hover:underline">Learn more about your privacy rights.</a>
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by filling out our data subject request form available <a href="#" className="text-accent hover:underline">here</a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
            </p>
            
            <p className="text-foreground text-opacity-80">
              Want to learn more about what eciple Inc does with any information we collect? <a href="#full-notice" className="text-accent hover:underline">Review the privacy notice in full.</a>
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Table of Contents</h2>
            <ol className="list-decimal pl-6 space-y-1 text-foreground text-opacity-80">
              <li><a href="#what-info-collect" className="text-accent hover:underline">What information do we collect?</a></li>
              <li><a href="#how-process-info" className="text-accent hover:underline">How do we process your information?</a></li>
              <li><a href="#legal-bases" className="text-accent hover:underline">What legal bases do we rely on to process your personal information?</a></li>
              <li><a href="#share-info" className="text-accent hover:underline">When and with whom do we share your personal information?</a></li>
              <li><a href="#cookies-tracking" className="text-accent hover:underline">Do we use cookies and other tracking technologies?</a></li>
              <li><a href="#third-party-logins" className="text-accent hover:underline">How do we handle your social logins?</a></li>
              <li><a href="#info-retention" className="text-accent hover:underline">How long do we keep your information?</a></li>
              <li><a href="#info-safety" className="text-accent hover:underline">How do we keep your information safe?</a></li>
              <li><a href="#minors-info" className="text-accent hover:underline">Do we collect information from minors?</a></li>
              <li><a href="#privacy-rights" className="text-accent hover:underline">What are your privacy rights?</a></li>
              <li><a href="#dnt-controls" className="text-accent hover:underline">Controls for do-not-track features</a></li>
              <li><a href="#california-residents" className="text-accent hover:underline">Do California residents have specific privacy rights?</a></li>
              <li><a href="#virginia-residents" className="text-accent hover:underline">Do Virginia residents have specific privacy rights?</a></li>
              <li><a href="#policy-updates" className="text-accent hover:underline">Do we make updates to this notice?</a></li>
              <li><a href="#contact-us" className="text-accent hover:underline">How can you contact us about this notice?</a></li>
              <li><a href="#review-update-delete" className="text-accent hover:underline">How can you review, update, or delete the data we collect from you?</a></li>
            </ol>

            <h2 id="what-info-collect" className="text-2xl font-semibold text-primary mt-8 mb-4">1. What information do we collect?</h2>
            
            <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Personal information you disclose to us</h3>
            <p className="text-foreground text-opacity-80">
              <em><strong>In Short:</strong> We collect personal information that you provide to us.</em>
            </p>
            
            <p className="text-foreground text-opacity-80">
              We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
            </p>
            
            <ul className="list-disc pl-6 space-y-1 text-foreground text-opacity-80">
              <li>names</li>
              <li>phone numbers</li>
              <li>email addresses</li>
              <li>mailing addresses</li>
              <li>job titles</li>
              <li>usernames</li>
              <li>passwords</li>
              <li>contact preferences</li>
              <li>contact or authentication data</li>
              <li>billing addresses</li>
              <li>debit/credit card numbers</li>
            </ul>
            
            <p className="text-foreground text-opacity-80">
              <strong>Sensitive Information.</strong> We do not process sensitive information.
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>Payment Data.</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is stored by Stripe. You may find their privacy notice link(s) here: <a href="https://stripe.com/privacy" className="text-accent hover:underline">https://stripe.com/privacy</a>.
            </p>
            
            <p className="text-foreground text-opacity-80">
              <strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register in this way, we will collect the information described in the section called "<a href="#third-party-logins" className="text-accent hover:underline">How do we handle your social logins?</a>" below.
            </p>
            
            <p className="text-foreground text-opacity-80">
              All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
            </p>

            <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Information automatically collected</h3>
            <p className="text-foreground text-opacity-80">
              <em><strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em>
            </p>
            
            <p className="text-foreground text-opacity-80">
              We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
            </p>
            
            <p className="text-foreground text-opacity-80">
              Like many businesses, we also collect information through cookies and similar technologies.
            </p>
            
            <p className="text-foreground text-opacity-80">
              The information we collect includes:
            </p>
            
            <ul className="list-disc pl-6 space-y-1 text-foreground text-opacity-80">
              <li><em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).</li>
              <li><em>Device Data.</em> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.</li>
              <li><em>Location Data.</em> We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.</li>
            </ul>

            <h2 id="how-process-info" className="text-2xl font-semibold text-primary mt-8 mb-4">2. How do we process your information?</h2>
            <p className="text-foreground text-opacity-80">
              <em><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em>
            </p>
            
            <p className="text-foreground text-opacity-80">
              We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-foreground text-opacity-80">
              <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
              <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
              <li><strong>To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
              <li><strong>To send administrative information to you.</strong> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
              <li><strong>To fulfill and manage your orders.</strong> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
              <li><strong>To enable user-to-user communications.</strong> We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
              <li><strong>To request feedback.</strong> We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
              <li><strong>To send you marketing and promotional communications.</strong> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see "<a href="#privacy-rights" className="text-accent hover:underline">What are your privacy rights?</a>" below.</li>
              <li><strong>To deliver targeted advertising to you.</strong> We may process your information to develop and display personalized content and advertising tailored to your interests, location, and more.</li>
              <li><strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
              <li><strong>To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
              <li><strong>To determine the effectiveness of our marketing and promotional campaigns.</strong> We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.</li>
              <li><strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.</li>
            </ul>

            <h2 id="contact-us" className="text-2xl font-semibold text-primary mt-8 mb-4">How can you contact us about this notice?</h2>
            <p className="text-foreground text-opacity-80">
              If you have questions or comments about this notice, you may email us at <a href="mailto:info@eciple.com" className="text-accent hover:underline">info@eciple.com</a> or by post to:
            </p>
            
            <div className="text-foreground text-opacity-80 mt-4">
              <p>eciple Inc</p>
              <p>3014 Devine Street 2e</p>
              <p>Columbia, SC 29205</p>
              <p>United States</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}