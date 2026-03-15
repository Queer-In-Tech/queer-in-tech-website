import { DISCORD_INVITE_URL, SOCIAL_LINKS } from "../constants/links";
import { ASSETS } from "../constants/assets";

interface SocialButtonsProps {
  showDiscord?: boolean;
  showEmail?: boolean;
}

export function SocialButtons({ showDiscord = false, showEmail = false }: SocialButtonsProps) {
  return (
    <section className="social-buttons">
      <a
        className="social-button-linkedin"
        href={SOCIAL_LINKS.linkedinOrg}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={ASSETS.linkedinWhite}
          alt="LinkedIn Logo"
          className="social-logo"
        />
      </a>

      {showDiscord && (
        <a
          className="social-button-discord"
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={ASSETS.discordWhite}
            alt="Discord Logo"
            className="social-logo"
          />
        </a>
      )}

      {showEmail && (
        <a className="social-button-email" href={SOCIAL_LINKS.email} target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
          <p className="text-email">Email</p>
        </a>
      )}

      <a
        className="social-button-meetup"
        href={SOCIAL_LINKS.meetupGroup}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={ASSETS.meetupWhite}
          alt="Meetup Logo"
          className="social-logo"
        />
      </a>
    </section>
  );
}
