import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { fetchUserData } from "../scripts/fetchData";
import Card from "./card";

const User = ({ user }) => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        async function getUserData() {
            try {
                const data = await fetchUserData(user.id);

                setUserData(data);
            } catch (err) {
                setError(err);
            }
        }
        if (showDetails && !userData) {
            getUserData();
        }
    }, [showDetails, userData, user.id]);

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
                img={{ src: user.avatar_url }}
            >
                <details onToggle={(e) => setShowDetails(e.target.open)}>
                    <summary>Details</summary>
                    {userData && (
                        <Fragment>
                            {userData.bio}
                            <p>Location: {userData.location}</p>
                            <p>Followers: {userData.followers}</p>
                        </Fragment>
                    )}
                </details>
            </Card>
        </li>
    );
};

User.propTypes = {
    user: PropTypes.shape().isRequired,
};

export default User;
