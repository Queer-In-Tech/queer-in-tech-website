import { Helmet } from "react-helmet-async";
import "./PostEventLinks.scss";
import {
  EVENT_LINKS,
  FORM_LINKS,
  SOCIAL_LINKS,
} from "../../constants/links";
import { SocialButtons } from "../../components/SocialButtons";
import { ActionButton } from "../../components/ActionButton";
import { IdeaIcon, DonateIcon, NextEventIcon } from "../../components/icons";

export default function PostEventLinksLeeds() {
  return (
    <main>
      <Helmet>
        <title>Event Links - Leeds | Queer in Tech</title>
        <meta name="description" content="Links and resources from Queer in Tech Leeds events. RSVP, submit talk ideas, and connect with the community." />
      </Helmet>
      <h1>Leeds Event Links</h1>
      <p>
        An inclusive, safe space for LGBTQ+ people and allies working in tech.
      </p>
      <p>
        We host meetups, lightning talks and mentoring to help you learn,
        collaborate and grow your career.
      </p>
      <p>Everyone's welcome-whatever your role or experience.</p>
      <SocialButtons showDiscord />
      <section className="action-buttons">
        <ActionButton
          href={EVENT_LINKS.leedsNext}
          icon={<NextEventIcon />}
          text="RSVP to our next event in July"
        />
        <ActionButton
          href={FORM_LINKS.talkIdea}
          icon={<IdeaIcon />}
          text="Got an idea for a talk?"
        />
        <ActionButton
          href={FORM_LINKS.hostOrSponsor}
          icon={<IdeaIcon />}
          text=" Want to host and/or sponsor us?"
        />
        <ActionButton
          href={SOCIAL_LINKS.donatePage}
          icon={<DonateIcon />}
          text="Donate to Queer in Tech"
        />
      </section>
    </main>
  );
}
