import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Gearing} from './Gearing';
import {InGroupMenu} from './InGroupMenu';
import {Landing} from './Landing';

ReactDOM.render(
    //<Landing />,
    <InGroupMenu>
    <Gearing
        selectableCharacters={[

    "Greg",
    "Maaksuuu",
    "Olafur",
    "Edlav"
        ]}
    />
    </InGroupMenu>,
    document.getElementById('root')
);
