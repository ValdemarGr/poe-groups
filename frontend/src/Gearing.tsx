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

const useStyles = (names: string[]) => makeStyles((theme: Theme) => (
    createStyles({
        charForm: {
            minWidth: 120
        },
        root: {
            flexGrow: 1
        },
        autocomplete: {
        }, ...(names.map(name => ({[name]: {"background-color": consistentRandomColor(name)}})).reduce(((x, y) => ({...x, ...y})), {}))
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

export type GearingProps = {
    readonly selectableCharacters: Array<string>;
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

export const Gearing: React.FC<GearingProps> = (p) => {
    const classes = useStyles(p.selectableCharacters)()


    const [currentList, setCurrentList] = React.useState<Array<NameUrlPair>>([{name: "Start typing", url: ""}])
    const [currentQuery, setCurrentQuery] = React.useState<string | null>(null)
    const [highligtImageName, setHighlightImageName] = React.useState<string | undefined>();
    const [highligtImageUrl, setHighlightImageUrl] = React.useState<string | undefined>();

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
                                    options={selections}
                                    getOptionLabel={(e) => e}
                                    defaultValue={selections}
                                    renderTags={(xs) => {
                                        return xs.map((x, i) => <Chip label={x} key={`chip-${i}`} className={
                                            //@ts-ignore
                                            classes[x]
                                        } />)
                                    }}
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
                            <Grid item xs={6}>
                                <Autocomplete
                                    id="item"
                                    options={currentList}
                                    getOptionLabel={(e) => e.name}
                                    onInputChange={(_, v) => {setCurrentQuery(v)}}
                                    onChange={(e, v) => {setHighlightImageName(v?.name)}}
                                    renderInput={(e) => (
                                        <TextField
                                            {...e}
                                            variant="outlined"
                                            label="Item"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl className={classes.charForm} variant="outlined">
                                    <InputLabel>Character</InputLabel>
                                    <Select>
                                        {p.selectableCharacters.map(c => <MenuItem value={c}>{c}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
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
                                        <TableCell>Power/Chaos</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className={classes["Olafur"]}>
                                        <TableCell>Olafur</TableCell>
                                        <TableCell>Shavs</TableCell>
                                        <TableCell>140c</TableCell>
                                        <TableCell>30ppc</TableCell>
                                    </TableRow>
                                    <TableRow className={classes["Olafur"]}>
                                        <TableCell>Olafur</TableCell>
                                        <TableCell>Deodres</TableCell>
                                        <TableCell>2c</TableCell>
                                        <TableCell>10ppc</TableCell>
                                    </TableRow>
                                    <TableRow className={classes["Edlav"]}>
                                        <TableCell>Valde</TableCell>
                                        <TableCell>Shroud 6l</TableCell>
                                        <TableCell>550c</TableCell>
                                        <TableCell>40ppc</TableCell>
                                    </TableRow>
                                    <TableRow className={classes["Maaksuuu"]}>
                                        <TableCell>Markus</TableCell>
                                        <TableCell>Wrath 21</TableCell>
                                        <TableCell>30c</TableCell>
                                        <TableCell>30ppc</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
