import React from 'react';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <div className="home-page">
            <h2 className={"title"}>Queer in Tech</h2>
            <div>Queer in tech has been operating since 2023, we run quarterly events which allow for LGBTQ+ people and
                allies to attend, learn from and learn about other queer people in tech.
            </div>
        <div className="find-us">
            <div>
                <h3>You can find our events over on meetup</h3>
                <a href={"https://www.meetup.com/queer-in-tech-inclusive-tech-meetup"} target={"_blank"}><img className={"icon"}
                                                                                                              src={"./meetup.jpeg"}
                                                                                                              alt={"meetup link"}/></a>
            </div>
            <div>
                <h3>Follow our linkedin page to get regular updates</h3>
                <a href={"https://www.linkedin.com/company/queer-in-tech-uk"} target={"_blank"}><img className={"icon"}
                                                                                                     src={"./linkedin.jpg"}
                                                                                                     alt={"meetup link"}/></a>
            </div>
        </div>
            <h2>Meet the team</h2>
            <div className={"person-container"}>
                <PersonCard name={"Dmitry"} image={"./dmitry.jpeg"}/>
                <PersonCard name={"Stevie"} image={"./stevie.jpeg"}/>
                <PersonCard name={"Jenni"} image={"./jenni.jpeg"}/>
            </div>
            <div className={"person-container"}>
                <PersonCard name={"Rebecca"} image={"./rebecca.jpeg"}/>
                <PersonCard name={"Joe"} image={"./joe.jpeg"}/>
                <PersonCard name={"Ari"} image={"./ari.jpeg"}/>
            </div>
    </div>
  );
};

const PersonCard = (props: Person) => {
    return (
        <div className={"person-card"}>
            <img src={props.image} alt={props.name}/>
            {props.name}
        </div>
    )
}

interface Person {
    name: string,
    image: string,
}

export default Home;