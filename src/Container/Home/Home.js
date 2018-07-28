import React, { Component } from "react";
import Navbar from "../../Component/Navbar";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider/Divider";
import Typography from "@material-ui/core/Typography/Typography";

export default class Home extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Grid container direction="row" spacing={0}>
                    <Grid item xs={10} md={4} style={{ padding: 30 }} >
                        <Card  >
                            <CardContent style={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center" }} >
                                <img src={require('./happy.png')} width="125" height="125" />
                                <Typography variant="caption" style={{padding:20}} >
                            Happy Clicks
                                </Typography>

                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={10} md={4} style={{ padding: 30 }} >
                        <Card >
                            <CardContent>
                                <img src={require('./happy.png')} width="125" height="125" />
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={10} md={4} style={{ padding: 30 }} >
                        <Card >
                            <CardContent>
                                <img src={require('./happy.png')} width="125" height="125" />
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }

}