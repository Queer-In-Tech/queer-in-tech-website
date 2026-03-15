import { Helmet } from "react-helmet-async";
import "./Contact.scss";
import {
  DISCORD_INVITE_URL,
  FORM_LINKS,
} from "../constants/links";
import { ASSETS } from "../constants/assets";
import { SocialButtons } from "../components/SocialButtons";
import { ActionButton } from "../components/ActionButton";
import { IdeaIcon } from "../components/icons";

export default function Contact() {
  return (
    <main>
      <Helmet>
        <title>Contact | Queer in Tech</title>
        <meta name="description" content="Get in contact with Queer in Tech. Find us on LinkedIn, Meetup, email, or join our Discord community." />
      </Helmet>
      <h1>Get in contact with Queer in Tech</h1>

      <SocialButtons showEmail />
      <ActionButtons />
      <DiscordInvite />
    </main>
  );
}

function ActionButtons() {
  return (
    <section className="action-buttons">
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
    </section>
  );
}

function DiscordInvite() {
  return (
    <section className="discord-callout" aria-labelledby="discord-heading">
      <div className="discord-callout-text">
        <h2 id="discord-heading">Join our Discord</h2>
        <p>
          Keep the conversation going between events. Meet LGBTQ+ folks in tech,
          ask questions, and share opportunities.
        </p>
        <a
          className="discord-cta"
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={ASSETS.discordWhite}
            alt=""
            aria-hidden="true"
            className="discord-cta-icon"
          />
          Join the QiT Discord
        </a>
      </div>
    </section>
  );
}
