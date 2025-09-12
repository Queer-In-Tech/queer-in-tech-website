import React, { useEffect, useState } from 'react';
import './Donate.scss';

const Donate: React.FC = () => {
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
        <div className="donate-page">
            <h2>Donate</h2>
            <div>Any donation you make helps us continue to organise events and provide a safe space for queer people working in tech. You can donate directly to our bank account (we will receive 100% of your donation), or through stripe (we receive most of your donation)</div>
            <div className={"donation-container"}>
                <div className={"donate-section bank-deets"}>
                    <div className={"left-align"}>Donate directly to our bank account:</div>
                    <div className={"left-align"}>Account name - Queer in Tech</div>
                    <div className={"left-align"}>Account number:</div>
                    <div className={"left-align"}>Sort code:</div>
                </div>
                <div className={"donate-section stripe"}>
                    <a className={`stripe-button${isDarkMode ? ' dark' : ''}`} href={"https://donate.stripe.com/00waEQ4AL0tHgxU72W0x200"}>Donate on stripe</a>
                </div>
            </div>
            <h2>Where does your money go?</h2>
            <div>Any money you donate allows us to keep up with our costs. It will go towards meetup costs, website costs, paying for food and drinks at our events and providing travel support for the community.</div>
        </div>
    );
};

export default Donate;
