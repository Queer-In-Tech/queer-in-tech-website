import React, { useState, useEffect } from 'react';
import './Home.scss';
import { SOCIAL_LINKS, TEAM_LINKS, TEAM_PRONOUNS } from "../constants/links";

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Array order controls card placement (left-to-right, top-to-bottom).
  // Add new people to the end of each array.
  const manchesterTeam: Person[] = [
    { name: "Dmitry", image: "/dmitry.jpeg", pronouns: TEAM_PRONOUNS.dmitry, linkedin: TEAM_LINKS.dmitry },
    { name: "Jenni", image: "/jenni.jpeg", pronouns: TEAM_PRONOUNS.jenni, linkedin: TEAM_LINKS.jenni },
    { name: "Stevie", image: "/stevie.jpeg", pronouns: TEAM_PRONOUNS.stevie, linkedin: TEAM_LINKS.stevie },
    { name: "Joe", image: "/joe.jpeg", pronouns: TEAM_PRONOUNS.joe, linkedin: TEAM_LINKS.joe },
    { name: "Rory", image: "/rory.jpeg", pronouns: TEAM_PRONOUNS.rory, linkedin: TEAM_LINKS.rory },
  ];

  const leedsTeam: Person[] = [
    { name: "Loz", image: "/loz.jpeg", pronouns: TEAM_PRONOUNS.loz, linkedin: TEAM_LINKS.loz },
    { name: "Alice", image: "/alice.jpeg"},
    { name: "Akiva", image: "/akiva.jpeg", pronouns: TEAM_PRONOUNS.akiva, linkedin: TEAM_LINKS.akiva },
  ];

  const previousContributors: Person[] = [
    { name: "Kaily", image: "/kaily.jpeg", pronouns: TEAM_PRONOUNS.kaily, linkedin: TEAM_LINKS.kaily },
    { name: "Rebecca", image: "/rebecca.jpeg", pronouns: TEAM_PRONOUNS.rebecca, linkedin: TEAM_LINKS.rebecca },
    { name: "Alex", image: "/alex.jpeg", pronouns: TEAM_PRONOUNS.alex, linkedin: TEAM_LINKS.alex },
    { name: "Ari", image: "/ari.jpeg", pronouns: TEAM_PRONOUNS.ari, linkedin: TEAM_LINKS.ari },
  ];

  return (
    <div className="home-page">
            <h2 className={"title"}>Queer in Tech</h2>
            <div>Queer in Tech (QiT) is an inclusive community for LGBTQ+ professionals and allies with chapters in Manchester and Leeds. Established in 2023, we create open, safe spaces where people can share experiences, connect, and showcase exciting work in tech. Since launching, we’ve grown to 600+ members, run quarterly events with talks, networking, and socials, and secured support from leading tech companies. Our mission is to empower queer voices in tech, increase representation in leadership, and expand to new UK hubs, ensuring everyone can thrive by being their authentic self.
            </div>
        <div className="find-us">
            <div>
                <h3>You can find our events over on meetup</h3>
                <a href={SOCIAL_LINKS.meetupGroup} target={"_blank"}><img className={"icon"}
                                                                                                              src={"/meetup.png"}
                                                                                                              alt={"meetup link"}/></a>
            </div>
            <div>
                <h3>Follow our linkedin page to get regular updates</h3>
                <a href={SOCIAL_LINKS.linkedinOrg} target={"_blank"}><img className={"icon"}
                                                                                                     src={isDarkMode ? "/linkedin-dark.png" : "/linkedin.png"}
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
        <a href={props.linkedin} target={"_blank"} rel={"noreferrer"} className={className}>
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

interface Person {
    name: string,
    image: string,
    pronouns?: string,
    linkedin?: string,
    isPlaceholder?: boolean,
    isDarkMode?: boolean
}

export default Home;
