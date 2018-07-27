import React, { Component } from "react";
// import Navbar from "../../Component/Navbar";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Grid container direction={'row'}>
                    <Grid item md={4} xs={12} style={{ padding: 15 }}>
                        <Card >
                            <CardContent>
                                <img src={require('./assets/happy.png')} height='125px' width='125px' />
                                <Typography variant="caption" gutterBottom>
                                    Happy Click
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={12} style={{ padding: 15 }}>
                        <Card >
                            <CardContent>
                                <img src={require('./assets/happy.png')} height='125px' width='125px' />
                                <Typography variant="caption" gutterBottom>
                                    Happy Click
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={12} style={{ padding: 15 }}>
                        <Card >
                            <CardContent>
                                <img src={require('./assets/happy.png')} height='125px' width='125px' />
                                <Typography variant="caption" gutterBottom>
                                    Happy Click
                                </Typography>
                            </CardContent>
                            <Divider />
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