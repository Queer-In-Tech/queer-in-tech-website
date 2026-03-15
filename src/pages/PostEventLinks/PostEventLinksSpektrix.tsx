import "./PostEventLinks.scss";
import {
  EVENT_LINKS,
  FORM_LINKS,
  SOCIAL_LINKS,
  SPEKTRIX_TALK_LINKS,
} from "../../constants/links";
import { SocialButtons } from "../../components/SocialButtons";
import { ActionButton } from "../../components/ActionButton";
import { IdeaIcon, DonateIcon, NextEventIcon } from "../../components/icons";

export default function PostEventLinks() {
  return (
    <main>
      <h1 hidden>Post Event Links</h1>
      <h2>QiT September 2025 @ Spektrix, Manchester</h2>
      <SocialButtons />
      <section className="action-buttons">
        <ActionButton
          href={SOCIAL_LINKS.donatePage}
          icon={<DonateIcon />}
          text="Donate to Queer in Tech"
        />
        <ActionButton
          href={FORM_LINKS.spektrixFeedback}
          icon={<FeedbackIcon />}
          text="Give us some quick feedback"
        />
        <ActionButton
          href={FORM_LINKS.spektrixTalkOrVenueIdeaEmail}
          icon={<IdeaIcon />}
          text="Got an idea for a talk or venue?"
        />
        <ActionButton
          href={EVENT_LINKS.spektrixNext}
          icon={<NextEventIcon />}
          text="RSVP to our next event in January"
        />
      </section>
      <TalkLinks />
    </main>
  );
}

function TalkLink({ title, speaker, links }: TalkLinkProps) {
  return (
    <li className="talk-link">
      <hr />
      <h4>{title}</h4>
      <h5>{speaker}</h5>
      <ul className="talk-links-list">
        {links.map((link, idx) => (
          <li key={idx}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="talk-link-text">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

function TalkLinks() {
  const talks = [
    {
      title: "Graphing Government Procurement",
      speaker: "Maria Root (she/her)",
      links: [
        {
          href: SPEKTRIX_TALK_LINKS.mariaLinkedin,
          text: "Maria's LinkedIn",
        },
      ],
    },
    {
      title: "A Non-Traditional Path into Engineering",
      speaker: "F\u0131rat G\u00fclmez (he/him)",
      links: [
        {
          href: SPEKTRIX_TALK_LINKS.firatLinkedin,
          text: "F\u0131rat's LinkedIn",
        },
      ],
    },
    {
      title: "Lessons from the Curve",
      speaker: "Mark Crossfield (he/him)",
      links: [
        { href: SPEKTRIX_TALK_LINKS.markWebsite, text: "Mark's Website" },
        {
          href: SPEKTRIX_TALK_LINKS.markLinkedin,
          text: "Mark's LinkedIn",
        },
        { href: SPEKTRIX_TALK_LINKS.markSlides, text: "Mark's slides" },
      ],
    },
  ];

  return (
    <section className="talk-links">
      <h3>Explore links from today's talks</h3>
      <ul className="talk-links-list">
        {talks.map((talk, index) => (
          <TalkLink key={index} {...talk} />
        ))}
      </ul>
    </section>
  );
}

function FeedbackIcon() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-list-details"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M13 5h8" />
      <path d="M13 9h5" />
      <path d="M13 15h8" />
      <path d="M13 19h5" />
      <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
    </svg>
  );
}

interface TalkLinkProps {
  title: string;
  speaker: string;
  links: { href: string; text: string }[];
}
