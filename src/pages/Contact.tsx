import "./Contact.scss";
import {
  DISCORD_INVITE_URL,
  FORM_LINKS,
  SOCIAL_LINKS,
} from "../constants/links";

export default function PostEventLinks() {
  return (
    <main>
      <h1>Get in contact with Queer in Tech</h1>
      
      <SocialButtons />
      <ActionButtons />
      <DiscordInvite />
    </main>
  );
}

function SocialButtons() {
  return (
    <section className="social-buttons">
      <a
        className="social-button-linkedin"
        href={SOCIAL_LINKS.linkedinOrg}
        target="_blank"
      >
        <img
          src={"/linkedin-white.png"}
          alt={"LinkedIn Logo"}
          className="social-logo"
        />
      </a>

      {/* Discord button that can be included when it becomes relevant (add href): */}
        {/* <a className="social-button-discord" href="" target="_blank">
            <img
            src={./discord-white.png"}
            alt={"Discord Logo"}
            className="social-logo"
            />
        </a> */}

      <a className="social-button-email" href={SOCIAL_LINKS.email} target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg"  width={40}  height={40}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
          <p className="text-email">Email</p>
        </a>
      <a
        className="social-button-meetup"
        href={SOCIAL_LINKS.meetupGroup}
        target="_blank"
      >
        <img
          src={"/meetup-white.png"}
          alt={"Meetup Logo"}
          className="social-logo"
        />
      </a>
    </section>
  );
}

function ActionButton({
  href,
  icon,
  text,
  target = "_blank",
}: ActionButtonProps) {
  return (
    <a className="action-button" href={href} target={target}>
      {icon}
      <span className="action-button-text">{text}</span>
    </a>
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
          rel="noreferrer"
        >
          <img
            src="/discord-white.png"
            alt=""
            aria-hidden="true"
            className="discord-cta-icon"
          />
          Join the QiT Discord
        </a>
      </div>
      {/* Discord "Who's online" widget - re-enable once the community is larger. */}
      {/* <iframe
          className="discord-embed"
          title="Queer in Tech Discord"
          src="https://discord.com/widget?id=1404772211151343657&theme=dark"
          width="380"
          height="420"
          allowTransparency={true}
          frameBorder="0"
          loading="lazy"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe> */}
    </section>
  );
}

function IdeaIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-bulb"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
      <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <path d="M9.7 17l4.6 0" />
    </svg>
  );
}

interface ActionButtonProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  target?: string;
}
