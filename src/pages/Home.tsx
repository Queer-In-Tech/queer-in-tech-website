import React, { useState, useEffect } from 'react';
import './Home.scss';

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

  const manchesterTeam: Person[] = [
    { name: "Dmitry", image: "/dmitry.jpeg", linkedin: "https://www.linkedin.com/in/dmitry-leyko-ba800715a/" },
    { name: "Jenni", image: "/jenni.jpeg", linkedin: "https://www.linkedin.com/in/fosterjenni/" },
    { name: "Stevie", image: "/stevie.jpeg", linkedin: "https://www.linkedin.com/in/stevie-woods-a7806456/" },
    { name: "Joe", image: "/joe.jpeg", linkedin: "https://www.linkedin.com/in/twofirstnames/" },
    { name: "Ari", image: "/ari.jpeg", linkedin: "https://www.linkedin.com/in/ari-abendstern/" },
  ];

  const leedsTeam: Person[] = [
    { name: "Loz", image: "/loz.jpeg", linkedin: "https://www.linkedin.com/in/loz-atkinson/" },
    { name: "Alice", image: "/alice.jpeg"},
  ];

  const previousContributors: Person[] = [
    { name: "Kaily", image: "/kaily.jpeg", linkedin: "https://www.linkedin.com/in/kailyisme/" },
    { name: "Rebecca", image: "/rebecca.jpeg", linkedin: "https://www.linkedin.com/in/therebeccafox/" },
    { name: "Alex", image: "/alex.jpeg", linkedin: "https://www.linkedin.com/in/alejandro-norniella-roza-513077138/" },
  ];

  return (
    <div className="home-page">
            <h2 className={"title"}>Queer in Tech</h2>
            <div>Queer in Tech (QiT) is an inclusive community for LGBTQ+ professionals and allies with chapters in Manchester and Leeds. Established in 2023, we create open, safe spaces where people can share experiences, connect, and showcase exciting work in tech. Since launching, we’ve grown to 600+ members, run quarterly events with talks, networking, and socials, and secured support from leading tech companies. Our mission is to empower queer voices in tech, increase representation in leadership, and expand to new UK hubs, ensuring everyone can thrive by being their authentic self.
            </div>
        <div className="find-us">
            <div>
                <h3>You can find our events over on meetup</h3>
                <a href={"https://www.meetup.com/queer-in-tech-inclusive-tech-meetup"} target={"_blank"}><img className={"icon"}
                                                                                                              src={"/meetup.png"}
                                                                                                              alt={"meetup link"}/></a>
            </div>
            <div>
                <h3>Follow our linkedin page to get regular updates</h3>
                <a href={"https://www.linkedin.com/company/queer-in-tech-uk"} target={"_blank"}><img className={"icon"}
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
                            {leedsTeam.map((person, index) => (
                                <PersonCard
                                    key={`leeds-${index}`}
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
                    {previousContributors.map((person, index) => (
                        <PersonCard
                            key={`previous-${index}`}
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
            {props.name}
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
    linkedin?: string,
    isPlaceholder?: boolean,
    isDarkMode?: boolean
}

export default Home;
