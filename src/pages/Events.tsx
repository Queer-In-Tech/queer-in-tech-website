import React from 'react';
import './Events.scss';

const Events: React.FC = () => {
    return (
        <div className="find-us-page">
            <div>
                <h3>You can find our events over on meetup</h3>
                <a href={"https://www.meetup.com/queer-in-tech-inclusive-tech-meetup"} target={"_blank"}><img className={"icon"}
                                                                                            src={"./meetup.png"}
                                                                                            alt={"meetup link"}/></a>
            </div>
            <div>
                <h3>Follow our linkedin page to get regular updates</h3>
                <a href={"https://www.linkedin.com/company/queer-in-tech-uk"} target={"_blank"}><img className={"icon"}
                                                                                            src={"./linkedin.png"}
                                                                                            alt={"meetup link"}/></a>
            </div>
        </div>
    );
};

export default Events;