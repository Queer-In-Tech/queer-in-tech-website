import { Helmet } from "react-helmet-async";
import './Home.scss';
import { SOCIAL_LINKS } from "../constants/links";
import { ASSETS } from "../constants/assets";
import { HOME_TEAM_ORDER, TEAM_MEMBERS, type TeamMember, type TeamMemberId } from "../constants/team";
import { useDarkMode } from "../hooks/useDarkMode";

const Home = () => {
  const isDarkMode = useDarkMode();

  const mapTeamMembers = (memberIds: readonly TeamMemberId[]): Person[] =>
    memberIds.map((memberId) => ({ ...TEAM_MEMBERS[memberId] }));

  const manchesterTeam = mapTeamMembers(HOME_TEAM_ORDER.manchester);
  const leedsTeam = mapTeamMembers(HOME_TEAM_ORDER.leeds);
  const previousContributors = mapTeamMembers(HOME_TEAM_ORDER.previousContributors);

  return (
    <div className="home-page">
      <Helmet>
        <title>Queer in Tech | LGBTQ+ Tech Community in Manchester & Leeds</title>
        <meta name="description" content="Queer in Tech (QiT) is an inclusive community for LGBTQ+ professionals and allies in tech, with chapters in Manchester and Leeds." />
      </Helmet>
            <h2 className={"title"}>Queer in Tech</h2>
            <div>Queer in Tech (QiT) is an inclusive community for LGBTQ+ professionals and allies with chapters in Manchester and Leeds. Established in 2023, we create open, safe spaces where people can share experiences, connect, and showcase exciting work in tech. Since launching, we've grown to 600+ members, run quarterly events with talks, networking, and socials, and secured support from leading tech companies. Our mission is to empower queer voices in tech, increase representation in leadership, and expand to new UK hubs, ensuring everyone can thrive by being their authentic self.
            </div>
        <div className="find-us">
            <div>
                <h3>You can find our events over on meetup</h3>
                <a href={SOCIAL_LINKS.meetupGroup} target="_blank" rel="noopener noreferrer"><img className={"icon"}
                                                                                                              src={ASSETS.meetup}
                                                                                                              alt={"meetup link"}/></a>
            </div>
            <div>
                <h3>Follow our linkedin page to get regular updates</h3>
                <a href={SOCIAL_LINKS.linkedinOrg} target="_blank" rel="noopener noreferrer"><img className={"icon"}
                                                                                                     src={isDarkMode ? ASSETS.linkedinDark : ASSETS.linkedin}
                                                                                                     alt={"linkedin link"}/></a>
            </div>
        </div>
            <section className="team-section">
                <h2>Meet the team</h2>
                <div className="team-columns">
                    <div className="team-column">
                        <h3>Manchester team</h3>
                        <div className="person-grid">
                            {manchesterTeam.map((person) => (
                                <PersonCard key={person.name} isDarkMode={isDarkMode} {...person} />
                            ))}
                        </div>
                    </div>
                    <div className="team-column">
                        <h3>Leeds team</h3>
                        <div className="person-grid">
                            {leedsTeam.map((person) => (
                                <PersonCard
                                    key={person.name}
                                    isDarkMode={isDarkMode}
                                    {...person}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="contributors-section">
                <h2>Previous contributors</h2>
                <div className="person-grid">
                    {previousContributors.map((person) => (
                        <PersonCard
                            key={person.name}
                            isDarkMode={isDarkMode}
                            {...person}
                        />
                    ))}
                </div>
            </section>
    </div>
  );
};

const PersonCard = (props: Person) => {
    const className = `person-card${props.isDarkMode ? ' dark' : ''}${props.isPlaceholder ? ' placeholder' : ''}`;
    const content = (
        <>
            <img src={props.image} alt={props.isPlaceholder ? "Placeholder profile" : props.name} />
            <span className="person-name">{props.name}</span>
            {props.pronouns ? (
                <span className="person-pronouns">{props.pronouns}</span>
            ) : null}
        </>
    );

    if (props.linkedin) {
    return (
        <a href={props.linkedin} target="_blank" rel="noopener noreferrer" className={className}>
            {content}
        </a>
    )
    }

    return (
        <div className={className}>
            {content}
        </div>
    );
}

interface Person extends TeamMember {
    isPlaceholder?: boolean,
    isDarkMode?: boolean
}

export default Home;
