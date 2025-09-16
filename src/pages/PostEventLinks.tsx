import "./PostEventLinks.scss";

export default function PostEventLinks() {
  return (
    <main>
      <h1 hidden>Post Event Links</h1>
      <h2>QiT September 2025 @ Spektrix, Manchester</h2>
      <SocialButtons />
      <ActionButtons />
      <TalkLinks />
    </main>
  );
}

function SocialButtons() {
  return (
    <section className="social-buttons">
      <a
        className="social-button-linkedin"
        href="https://www.linkedin.com/company/queer-in-tech-uk"
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
      <a
        className="social-button-meetup"
        href="https://www.meetup.com/queer-in-tech-inclusive-tech-meetup/"
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
        href="https://queerintech.org/donate"
        icon={<DonateIcon />}
        text="Donate to Queer in Tech"
      />
      <ActionButton
        href="https://docs.google.com/forms/d/e/1FAIpQLSdVoRtw-MLWAVgtTPYfieDUf9esvGc6LNTrGxr-xcTJyK5bFA/viewform?usp=header"
        icon={<FeedbackIcon />}
        text="Give us some quick feedback"
      />
      <ActionButton
        href="mailto:hello@queerintech.org?subject=Talk%2FVenue%20Idea&body=Thanks%20for%20sharing%20your%20idea%20for%20a%20talk%20or%20venue!%20You%20can%20add%20more%20details%20below%20or%20just%20hit%20send%20and%20we'll%20reach%20out%20to%20you%20to%20discuss%20%3A)"
        icon={<IdeaIcon />}
        text="Got an idea for a talk or venue?"
      />
      <ActionButton
        href="https://www.meetup.com/queer-in-tech-inclusive-tech-meetup/events/310956620/"
        icon={<NextEventIcon />}
        text="RSVP to our next event in January"
      />
    </section>
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
            <a href={link.href} target="_blank" className="talk-link-text">
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
          href: "https://www.linkedin.com/in/maria-root-70048451/",
          text: "Maria's LinkedIn",
        },
      ],
    },
    {
      title: "A Non-Traditional Path into Engineering",
      speaker: "Fırat Gülmez (he/him)",
      links: [
        {
          href: "https://www.linkedin.com/in/firatgulmez/",
          text: "Fırat's LinkedIn",
        },
      ],
    },
    {
      title: "Lessons from the Curve",
      speaker: "Mark Crossfield (he/him)",
      links: [
        { href: "https://markcrossfield.co.uk/", text: "Mark's Website" },
        {
          href: "https://www.linkedin.com/in/markcrossfield",
          text: "Mark's LinkedIn",
        },
{href: "https://www.markcrossfield.co.uk/it-takes-a-village", text: "Mark's slides"},
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

function DonateIcon() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-tip-jar-pound"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 4v1.882c0 .685 .387 1.312 1 1.618s1 .933 1 1.618v8.882a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3 -3v-8.882c0 -.685 .387 -1.312 1 -1.618s1 -.933 1 -1.618v-1.882" />
      <path d="M6 4h12z" />
      <path d="M14 10h-1a2 2 0 0 0 -2 2v2c0 1.105 -.395 2 -1.5 2h4.5" />
      <path d="M10 13h3" />
    </svg>
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

function NextEventIcon() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-event"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M16 3l0 4" />
      <path d="M8 3l0 4" />
      <path d="M4 11l16 0" />
      <path d="M8 15h2v2h-2z" />
    </svg>
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

interface TalkLinkProps {
  title: string;
  speaker: string;
  links: { href: string; text: string }[];
}
