import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Gearing} from './Gearing';
import {InGroupMenu} from './InGroupMenu';
import {Landing} from './Landing';

const Example: React.FC = () => {
    const chars = ["Ola", "Valde", "Markus", "Greg"]
    const data = [
        {
            characterName: "Greg",
            itemName: "Shavronne's Wrappings",
            power: 30
        },
        {
            characterName: "Markus",
            itemName: "Shavronne's Wrappings",
            power: 50
        },
        {
            characterName: "Valde",
            itemName: "Shavronne's Wrappings",
            power: 100
        },
        {
            characterName: "Ola",
            itemName: "Shavronne's Wrappings",
            power: 200
        },
        {
            characterName: "Valde",
            itemName: "Shavronne's Wrappings",
            power: 400
        },
    ]

    const [dataState, setDataState] = React.useState(data)
    React.useEffect(() => {
        console.log(dataState)
    }, [dataState])

    return (
        <InGroupMenu>
            <Gearing
                selectableCharacters={chars}
                lines={dataState}
                onAddItem={(line) => {setDataState(prev => [...prev, line].sort((a, b) => b.power - a.power))}}
                onDeleteItem={(i) => {
                    console.log(`deleting ${i} while actual is `, dataState)
                    setDataState(prev => prev.filter((_, i2) => i !== i2))
                }}
            />
        </InGroupMenu>
    )
}

ReactDOM.render(
    //<Landing />,
    <Example />,
    document.getElementById('root')
);
