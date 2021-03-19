import React, { useEffect, useState } from "react";
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
        <li className="list__item" key={user.id}>
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
                    <summary>Profile Info</summary>
                    {userData && (
                        <div>
                            <p className="u-emphasis">{userData.bio}</p>
                            <dl>
                                <dt>Location</dt>
                                <dd>{userData.location || "Unknown"}</dd>
                                <dt>Followers</dt>
                                <dd>{userData.followers}</dd>
                            </dl>
                        </div>
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
