import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "inline-block",
        },
        button: {
            display: "inline-block",
            width: "100%"
        }
    }))

export const Landing: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: '100vh'}}
        >
            <Grid item xs={12}>
                <Card className={classes.root}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <Button className={classes.button} variant="contained" color="primary">
                                    Create group
                        </Button>
                            </Grid>
                            <Grid item xs>
                                <Button className={classes.button} variant="contained" color="primary">
                                    Join group
                        </Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <TextField id="groupID" label="Group ID" />
                            </Grid>
                            <Grid item xs>
                                <TextField id="GroupPassword" label="Password" type="password" />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
