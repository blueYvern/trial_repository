import React from 'react';
import '../App.css';

function TabHeader({tabTitle}) {
    return (
        <div class="tab-header">
            <h3>{tabTitle}</h3>
        </div>
    );
}

export default TabHeader;