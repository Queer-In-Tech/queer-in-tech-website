import "./PostEventLinks.scss";

export default function PostEventLinksManchester() {
  return (
    <main>
      <h1>Manchester Event Links</h1>
      <p>
        An inclusive, safe space for LGBTQ+ people and allies working in tech.
      </p>
      <p>
        We host meetups, lightning talks and mentoring to help you learn,
        collaborate and grow your career.
      </p>
      <p>Everyone's welcome-whatever your role or experience.</p>
      <SocialButtons />
      <ActionButtons />
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

      <a className="social-button-discord" href="https://discord.gg/VWMjhfHX" target="_blank">
        <img
          src={"/discord-white.png"}
          alt={"Discord Logo"}
          className="social-logo"
        />
      </a>
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
        href="https://www.meetup.com/queer-in-tech-inclusive-tech-meetup/events/312885279/"
        icon={<NextEventIcon />}
        text="RSVP to our next event in March"
      />
      <ActionButton
        href="https://docs.google.com/forms/d/e/1FAIpQLScimSVEnwGHRtH8r5E5XKt9dBtUMhXhFLXsjTTS5m-2cD57Rg/viewform?usp=header"
        icon={<IdeaIcon />}
        text="Got an idea for a talk?"
      />
      <ActionButton
        href="https://docs.google.com/forms/d/e/1FAIpQLSeabY_aBXbaQeCtjaxyCAui85AXy7ryOJfmcX1WY0JPjg_Azw/viewform?usp=header"
        icon={<IdeaIcon />}
        text=" Want to host and/or sponsor us?"
      />

      <ActionButton
        href="https://queerintech.org/donate"
        icon={<DonateIcon />}
        text="Donate to Queer in Tech"
      />
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
