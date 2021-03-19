import React, { cloneElement, useState, useRef } from "react";
import PropTypes from "prop-types";

const keyCodes = {
    ARROW_RIGHT: 39,
    ARROW_LEFT: 37,
    HOME: 36,
    END: 35,
};

const Tabs = ({ children: tabs, label }) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const tabRefs = useRef({});
    const selectedTab = React.Children.toArray(tabs)[selectedTabIndex];

    const handleKeyDown = (e) => {
        const tabCount = React.Children.toArray(tabs).length;
        const lastTabIndex = tabCount - 1;
        const isFirstTab = selectedTabIndex === 0;
        const isLastTab = selectedTabIndex === lastTabIndex;

        const handlers = {
            [keyCodes.ARROW_RIGHT]: () =>
                isLastTab ? 0 : selectedTabIndex + 1,
            [keyCodes.ARROW_LEFT]: () =>
                isFirstTab ? lastTabIndex : selectedTabIndex - 1,
            [keyCodes.HOME]: () => 0,
            [keyCodes.END]: () => lastTabIndex,
        };

        if (!handlers[e.keyCode]) {
            return;
        }

        const nextTabIndex = handlers[e.keyCode]();

        setSelectedTabIndex(nextTabIndex);
        tabRefs.current[nextTabIndex].focus();
    };

    const renderTabList = () => {
        return React.Children.map(tabs, (tab, index) => {
            const isSelectedTab = selectedTabIndex === index;
            const { name } = tab.props;
            const setRef = (ref) => (tabRefs.current[index] = ref);

            return cloneElement(tab, {
                "aria-controls": isSelectedTab ? `tab-panel-${name}` : null,
                "aria-selected": isSelectedTab,
                className: "tabs__tab",
                id: `tab-${name}`,
                tabIndex: isSelectedTab ? 0 : -1,
                ref: setRef,
                onClick: () => setSelectedTabIndex(index),
                onKeyDown: handleKeyDown,
            });
        });
    };

    return (
        <div className="tabs">
            <div className="tabs__list" role="tablist" aria-label={label}>
                {renderTabList()}
            </div>
            <div
                className="tabs__panel"
                role="tabpanel"
                tabIndex={0}
                id={`tab-panel-${selectedTab.props.name}`}
                aria-labelledby={`tab-${selectedTab.props.name}`}
            >
                {selectedTab.props.children}
            </div>
        </div>
    );
};

Tabs.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    label: PropTypes.string.isRequired,
};

export default Tabs;
