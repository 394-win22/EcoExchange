import React from "react";
import NavigationBar from './NavigationBar';

const Banner = ({ title }) => (
    <h1>{title}</h1>
);

const Profile = () => {
    return (
        <div className="container">
            <Banner title="Profile" />
            <NavigationBar/>
        </div>
        )
}

export default Profile;