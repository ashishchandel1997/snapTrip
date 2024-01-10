import React from "react";
import NavBar from "../NavBar";
const PrivacyPolicy = ({ user, setUser }) => {
  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <div className="container">
        <h2 className="text-center my-4" style={{ color: "#fbba18" }}>
          PRIVACY POLICY
        </h2>
        <span
          style={{
            fontSize: "14px",
            opacity: "0.8",
            textAlign: "justify",
            padding: "0px 20px 0px 20px",
          }}
        >
          This Privacy Policy ("Privacy Policy") is an integral part of our
          Terms of Use ("Terms") and governs the processing of information by
          Expenture Travel Ltd. operating under the brand name Plan Your Trip
          ("PlanYourTrip," "Company," "we," "us," or "our") while you ("you" or
          "user") access, use or interact with our mobile application ("App")
          and website available at: https://planyourtrip.com/ ( "Website") and
          the services provided therein (collectively, the "Services").
          <br />
          <br />
          Any capitalized terms not defined herein shall have the meaning
          ascribed to them in the Terms.
          <br />
          <br />
          PlanYourTrip may update or revise this Privacy Policy from time to
          time. Modifications to this Policy will be posted on the Website and
          App or addressed directly to where the Company, upon its sole
          discretion, finds it required.
          <br />
          <br />
          This Privacy Policy explains how the data is collected, used, or
          shared with others, how it is safeguarded, and how an individual may
          exercise their lawful rights related, among others, and where
          applicable, as required according to the EU General Data Protection
          Regulation ("GDPR").
          <br />
          <br />
          Please note that you are not required by law to provide us with
          Personal Data (as defined below). Providing Personal Data to us is
          entirely voluntary, provided however, that we will not be able to
          provide you with certain services or information without obtaining
          your Personal Data (for example, we will not be able to contact you in
          response to your inquiry if we will not have your contact details).
          <br />
          <br />
          PlanYourTrip shall be entitled to (however not obligated), to retain
          and store Personal Data in its databases, as detailed under this
          Privacy Policy, and subject to applicable law.
          <br />
          <br />
          1) CONTACT DETAILS
          <br />
          Expenture Travel Ltd., incorporated under the laws of the state of
          Israel, is the Controller (as such term is defined under the GDPR or
          equivalent privacy legislation) of the Personal Data we collect from
          you.
          <br />
          <br />
          For any question, inquiry or concern related to this Privacy Policy or
          the processing of your Personal Data, you may contact as follows:
          <br />
          DPO Contact Information: support@PlanYourTrip.com.
          <br />
          <br />
          By Mail: Hatarshish 15 Industry Park, Caesarea Israel.
          <br />
          <br />
          EU DPR Contact Information: Doron@PlanYourTrip.com, Monodedri Ioannina
          44007, Ioannina, Greece.v
          <br />
          <br />
          2) WHICH DATA DO WE COLLECT AND FOR WHAT PURPOSE?
          <br />
          "Non-Personal Data": means non-identifiable, aggregated data, that is
          mainly technical data which is transmitted to us by your device when
          you access and interact with our Website or App, such as the type of
          browser, type of operating system, type of device used, the time and
          date you access the Website or App, navigation, language preference,
          etc. Non-Personal data is used mainly for click stream analysis to
          provide, maintain, develop and enhance our Website or App and the
          Services provided therein (if applicable) and is not used to identify
          individuals.
          <br />
          <br />
          "Personal Data": means individually identifiable information which
          identifies or may identify, with reasonable effort, an individual,
          including online identifiers, such as your name, address, phone
          number, and online identifiers (such as IP address).
          <br />
          <br />
        </span>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
