import React from 'react';
import './templates.css';

function TabHeader({tabTitle}) {
    return (
        <div class="tab-header">
            <h3>{tabTitle}</h3>
        </div>
    );
}

export default TabHeader;