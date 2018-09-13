import React, { Component } from 'react';
import Play from '@material-ui/icons/PlayCircleFilled';
import Pause from '@material-ui/icons/PauseCircleFilled';
// import Button from '@material-ui/core/Button';
import { Progress } from 'semantic-ui-react';
import './AudioPlayer.css';

export default class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.audioRef = {};
        this.timeRef = {};
        this.state = {
            progress: 0,
            disablePlay: false,
            disablePause: true
        }
    }
    play = (url) => {
        this.setState({ disablePlay: true, disablePause: false });
        this.audioRef = new Audio(url);
        this.audioRef.addEventListener("loadedmetadata", (_event) => {
            this.audioRef.play();
            var duration = this.audioRef.duration;
            console.log('this.audioRef.buffered: ', this.audioRef.buffered);
            console.log('this.audioRef.controller: ', this.audioRef.controller);
            console.log('this.audioRef.currentTime: ', this.audioRef.loop);

            let count = 0;
            let diffMS = ((this.audioRef.duration * 1000) / 100);
            let myInterval = 500;
            this.timeRef = setInterval(() => {
                // console.log(this.audioRef.currentTime);

                if (this.audioRef.duration === this.audioRef.currentTime) {
                    clearInterval(this.timeRef);
                    this.setState({ progress: 0, disablePlay: false, disablePause: true });

                }
                console.log('segment from duration: ', (100 / (this.audioRef.duration)));
                if (this.audioRef.duration !== this.audioRef.currentTime) {
                    this.setState({ progress: this.state.progress + (100 / (this.audioRef.duration)) });
                }

                // let diff2 = (diffMS * myInterval)/100;
                // console.log("diffffff2" + diff2)

                // this.setState({ progress: diff2 });

                console.log("this.audioRef.currentTime: ", this.audioRef.currentTime)
                console.log("this.audioRef.duration: ", this.audioRef.duration)
            }, 1000);
        });

        // this.timeRef = setInterval(() => {
        //     if (this.audioRef.duration <= this.audioRef.currentTime) {
        //         clearInterval(this.timeRef);
        //     }
        //     console.log("this.audioRef.currentTime: ", this.audioRef.currentTime)
        //     console.log("this.audioRef.duration: ", this.audioRef.duration)
        // }, 100);
        // console.log('Audio Ref: ', this.audioRef.duration);
    }
    pause = () => {
        this.audioRef.pause();
        clearInterval(this.timeRef);
        this.setState({ disablePause: true });
    }
    render() {
        console.log('this.state.progress: ', this.state.progress);
        return (
            <div>
                <button className="btn" disabled={this.state.disablePlay}>
                    <Play className="play-btn" onClick={() => this.play(this.props.audioURL)} />
                </button>
                <button className="btn" disabled={this.state.disablePause}>
                    <Pause className="pause-btn" onClick={this.pause} />
                </button>
                {/* <Button variant="fab">
                    <Play className="play-btn" onClick={() => this.play(this.props.audioURL)} />
                </Button> */}
                <Progress size="tiny" percent={`${this.state.progress}`} color='gray' />
            </div>
        )
    }
};