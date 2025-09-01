import React from 'react';
import './AboutUs.scss';

const AboutUs: React.FC = () => {
    return (
        <div className="about-page">
            <h1>About Queer in Tech</h1>
            <div>Queer in tech has been operating since 2023, we run quarterly events which allow for LGBTQ+ people and
                allies to attend, learn from and learn about other queer people in tech.
            </div>
            <h2>Meet the team</h2>
            <div>The queer in tech team is made up of the following people:</div>
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

export default AboutUs;