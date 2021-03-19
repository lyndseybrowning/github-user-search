import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { fetchUserData } from "../scripts/fetchData";
import Card from "./card";

const User = ({ user }) => {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getUserData() {
            const data = await fetchUserData(user.id);

            setUserData(data);
        }

        try {
            getUserData();
        } catch (err) {
            setError(err);
        }
    }, [user.id]);

    return (
        <li key={user.id}>
            {error && (
                <p>
                    Unable to fetch user information. Please refresh and try
                    again shortly.
                </p>
            )}
            <Card
                title={{ text: user.login, url: user.html_url }}
                subtitle={userData.bio}
                img={{ src: user.avatar_url }}
            >
                <p>{userData.location}</p>
                <p>Followers: {userData.followers}</p>
            </Card>
        </li>
    );
};

User.propTypes = {
    user: PropTypes.shape().isRequired,
};

export default User;
