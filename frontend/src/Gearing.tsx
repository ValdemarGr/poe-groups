import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Toolbar from '@material-ui/core/Toolbar';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'
import Slide from '@material-ui/core/Slide';

const useStyles = (names: string[]) => makeStyles((theme: Theme) => (
    createStyles({
        fullWidth: {
            //minWidth: 190
            width: '100%'
        },
        root: {
            flexGrow: 1
        },
        autocomplete: {
        }, ...(names.map(name => ({[name]: {"background-color": consistentRandomColor(name)}})).reduce(((x, y) => ({...x, ...y})), {}))
    })
))

const tableRowStyle = makeStyles((theme: Theme) => (
    createStyles({
        dims: {
        }
    })
))

const imgStyle = makeStyles((theme: Theme) => (
    createStyles({
        card: {
            display: 'inline-block',
        },
        img: {
            display: "block",
            'max-height': "200px",
            width: "auto",
            height: "auto",
        }
    })
))

export type GearingLine = {
    readonly characterName: string;
    readonly itemName: string;
    readonly price: number;
}

export type GearingProps = {
    readonly lines: Array<GearingLine>;
    readonly selectableCharacters: Array<string>;
    readonly onAddItem: (newItem: GearingLine) => void;
    readonly onDeleteItem: (index: number) => void;
}

const selections = [
    "Greg",
    "Maaksuuu",
    "Olafur",
    "Edlav"
]
const wikiUrl = "https://pathofexile.gamepedia.com/api.php?"

type NameUrlPair = {
    readonly url: string;
    readonly name: string;
}

type ShowItemImageProps = {
    readonly imageUrl: string;
    readonly imageName: string;
}

const consistentRandomColor = (str: string): string => {
    let hash = 0;
    if (str.length === 0) return "#ffffff";
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 255
        color += ('00' + value.toString(16)).substr(-2);
    }
    console.log(`${str} ${color}`)
    return color + "20";
}

const ShowItemImage: React.FC<ShowItemImageProps> = (p) => {
    const classes = imgStyle()

    return (
        <Grid item xs={12}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                            >
                                <Grid item xs={12}>
                                    <CardMedia
                                        component="img"
                                        className={classes.img}
                                        alt={p.imageName}
                                        image={p.imageUrl.split("/revision")[0]}
                                        title={p.imageName}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

type CharacterTableRowProps = {
    readonly name: string;
    readonly itemName: string;
    readonly price: number;
    readonly editPower: (newNumber: number) => void;
    readonly deleteEntry: () => void;
    readonly styleClasses: Record<string, any>;
}

const CharacterTableRow: React.FC<CharacterTableRowProps> = (p) => {
    const classes = tableRowStyle()
    const [inEditMode, setEditMode] = React.useState(false)

    const show = (
        <TableRow className={p.styleClasses[p.name]}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.itemName}</TableCell>
            <TableCell>{p.price}c</TableCell>
            <TableCell><IconButton onClick={() => setEditMode(true)}><EditIcon /></IconButton><IconButton onClick={() => p.deleteEntry()}><DeleteIcon /></IconButton></TableCell>
        </TableRow>
    )

    const [editState, setEditState] = React.useState(0)

    const edit = (
        <TableRow className={p.styleClasses[p.name]}>
            <TableCell colSpan={4}>
                <Grid
                    className={`${classes.dims}`}
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={3}>
                        <TextField
                            type="number"
                            label="Price (chaos)"
                            onChange={x => setEditState(+x.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                p.editPower(editState)
                                setEditMode(false)
                            }}
                        >Change</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton onClick={() => setEditMode(false)}><CancelIcon /></IconButton>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    )

    return (
        <>
            {inEditMode ?
                (
                    <Slide direction="left" in={inEditMode}>
                        {edit}
                    </Slide >
                )
                : null}
            {!inEditMode ?
                (
                    <Slide direction="left" in={!inEditMode}>
                        {show}
                    </Slide >
                )
                : null}
        </>
    )
}

export const Gearing: React.FC<GearingProps> = (p) => {
    const classes = useStyles(p.selectableCharacters)()


    const [currentList, setCurrentList] = React.useState<Array<NameUrlPair>>([{name: "Start typing", url: ""}])
    const [currentQuery, setCurrentQuery] = React.useState<string | null>(null)
    const [highligtImageName, setHighlightImageName] = React.useState<string | undefined>();
    const [highligtImageUrl, setHighlightImageUrl] = React.useState<string | undefined>();
    const [selectedCharacters, setSelectedCharacters] = React.useState<Set<string>>(new Set(p.selectableCharacters));
    const [toAddCharacter, setToAddCharacter] = React.useState<string | undefined>();
    const [toAddPrice, setToAddPrice] = React.useState<number | undefined>();
    const [shownLinesFilter, setShownLines] = React.useState("")

    const shownLines = shownLinesFilter !== "" ? p.lines.filter(x => x.itemName.includes(shownLinesFilter)) : p.lines

    React.useEffect(() => {
        if (highligtImageName !== undefined) {
            const params = {
                action: "query", format: "json", prop: "imageinfo", titles: `File:${highligtImageName} inventory icon.png`, iiprop: "url",
                origin: "*"
            }
            const search = new URLSearchParams(params)
            fetch(wikiUrl + search).then<{query: {pages: Record<number, {imageinfo: {url: string}[]}>}}>(x => x.json()).then(x => {
                const items = Object.values(x.query.pages)
                setHighlightImageUrl(items[0].imageinfo[0].url)
            })
        } else {
            setHighlightImageUrl(undefined)
        }
    }, [highligtImageName])

    React.useEffect(() => {
        if (currentQuery !== '') {
            const params = {
                action: "opensearch",
                format: "json",
                formatversion: "2",
                search: `${currentQuery}`,
                namespace: "0",
                limit: "10",
                suggest: "true",
                origin: "*"
            }
            const search = new URLSearchParams(params)
            fetch(wikiUrl + search).then<[any, string[], any, string[]]>(x => x.json()).then(x => {
                const names = x[1];
                const urls = x[3];
                const pairs = names.map((n, i) => ({url: urls[i], name: n}))
                setCurrentList(pairs)
            })

        }
    }, [currentQuery])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    id="characters"
                                    options={p.selectableCharacters}
                                    getOptionLabel={(e) => e}
                                    defaultValue={p.selectableCharacters}
                                    onChange={(_, vs) => setSelectedCharacters(new Set(vs))}
                                    renderTags={(xs, g) => {
                                        return xs.map((x, i) => <Chip onDelete={() => {setSelectedCharacters(s => new Set(Array.from(s.values()).filter(v => v !== x)))}} label={x} key={`chip-${i}`} className={
                                            //@ts-ignore
                                            classes[x]
                                        } />)
                                    }}
                                    value={Array.from(selectedCharacters)}
                                    renderInput={(e) => (
                                        <TextField
                                            {...e}
                                            variant="standard"
                                            label="Characters"
                                            placeholder="Characters"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            {highligtImageUrl !== undefined && highligtImageName !== undefined ?
                <ShowItemImage
                    imageUrl={highligtImageUrl}
                    imageName={highligtImageName} />
                : <></>}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Autocomplete
                                    id="item"
                                    options={currentList}
                                    getOptionLabel={(e) => e.name}
                                    onInputChange={(_, v) => {setCurrentQuery(v)}}
                                    onChange={(e, v) => {setHighlightImageName(v?.name)}}
                                    renderInput={(e) => (
                                        <TextField
                                            {...e}
                                            label="Item"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl className={classes.fullWidth}>
                                    <InputLabel>Character</InputLabel>
                                    <Select onChange={(x) => setToAddCharacter(x.target.value as string)}>
                                        {p.selectableCharacters.map(c => <MenuItem value={c}>{c}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    className={classes.fullWidth}
                                    type="number"
                                    label="Cost (chaos)"
                                    onChange={x => setToAddPrice(+x.target.value)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Box pt={1.6} />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        if (toAddPrice !== undefined && toAddCharacter !== undefined && currentQuery !== null) {
                                            p.onAddItem({
                                                characterName: toAddCharacter,
                                                price: toAddPrice,
                                                itemName: currentQuery
                                            })
                                        }
                                    }}
                                >Add to items</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <TextField
                            className={classes.fullWidth}
                            type="text"
                            label="Search for an item"
                            onChange={x => setShownLines(x.target.value)}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Character</TableCell>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {shownLines.map<[GearingLine, number]>((x, i) => [x, i]).filter(([x, _]) => selectedCharacters.has(x.characterName)).map(([l, i]) => <CharacterTableRow
                                        name={l.characterName}
                                        price={l.price}
                                        itemName={l.itemName}
                                        editPower={(np) => {
                                            p.onDeleteItem(i)
                                            p.onAddItem({...l, price: np})
                                        }}
                                        deleteEntry={() => {
                                            p.onDeleteItem(i)
                                        }}
                                        styleClasses={classes}
                                    />)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
