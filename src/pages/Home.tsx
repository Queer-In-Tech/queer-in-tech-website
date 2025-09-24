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

  return (
    <div className="home-page">
            <h2 className={"title"}>Queer in Tech</h2>
            <div>Queer in Tech (QiT) is an inclusive community for LGBTQ+ professionals and allies in Manchester and beyond. Established in 2023, we create open, safe spaces where people can share experiences, connect, and showcase exciting work in tech. Since launching, we’ve grown to 600+ members, run quarterly events with talks, networking, and socials, and secured support from leading tech companies. Our mission is to empower queer voices in tech, increase representation in leadership, and expand to new UK hubs, ensuring everyone can thrive by being their authentic self.
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
            <h2>Meet the team</h2>
            <div className={"person-container"}>
                <PersonCard isDarkMode={isDarkMode} name={"Dmitry"} image={"/dmitry.jpeg"} linkedin='https://www.linkedin.com/in/dmitry-leyko-ba800715a/'/>
                <PersonCard isDarkMode={isDarkMode} name={"Stevie"} image={"/stevie.jpeg"} linkedin='https://www.linkedin.com/in/stevie-woods-a7806456/'/>
                <PersonCard isDarkMode={isDarkMode} name={"Jenni"} image={"/jenni.jpeg"} linkedin='https://www.linkedin.com/in/fosterjenni/'/>
            </div>
            <div className={"person-container"}>
                <PersonCard isDarkMode={isDarkMode} name={"Rebecca"} image={"/rebecca.jpeg"} linkedin='https://www.linkedin.com/in/therebeccafox/'/>
                <PersonCard isDarkMode={isDarkMode} name={"Joe"} image={"/joe.jpeg"} linkedin='https://www.linkedin.com/in/twofirstnames/'/>
                <PersonCard isDarkMode={isDarkMode} name={"Ari"} image={"/ari.jpeg"} linkedin='https://www.linkedin.com/in/ari-abendstern/'/>
                <PersonCard isDarkMode={isDarkMode} name={"Alex"} image={"/alex.jpeg"} linkedin='https://www.linkedin.com/in/alejandro-norniella-roza-513077138/'/>
            </div>
    </div>
  );
};

const PersonCard = (props: Person) => {
    return (
        <a href={props.linkedin} target={"_blank"} className={`person-card${props.isDarkMode ? ' dark' : ''}`}>
            <img src={props.image} alt={props.name}/>
            {props.name}
        </a>
    )
}

interface Person {
    name: string,
    image: string,
    linkedin?: string,
    isDarkMode?: boolean
}

export default Home;
