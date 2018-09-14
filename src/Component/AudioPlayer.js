import React, { Component } from 'react';
import Play from '@material-ui/icons/PlayCircleFilled';
import Pause from '@material-ui/icons/PauseCircleFilled';
// import Button from '@material-ui/core/Button';
import { Progress } from 'semantic-ui-react';
import './AudioPlayer.css';

export default class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.audioRef = null;
        this.timeRef = {};
        this.duration = {};
        this.state = {
            progress: -10,
            disablePlay: false,
            disablePause: true
        }
    }
    play = (url) => {
        this.setState({ disablePlay: true, disablePause: false });
        if (this.audioRef === null) {
            this.audioRef = new Audio(url);
            this.audioRef.addEventListener("loadedmetadata", (_event) => {
                this.audioRef.play();
                if (this.duration === 0) {
                    this.duration = this.audioRef.duration;
                }
                let count = 0;
                let diffMS = ((this.audioRef.duration * 1000) / 100);
                let myInterval = 500;
                this.timeRef = setInterval(() => {
                    if (this.audioRef.duration === this.audioRef.currentTime) {
                        clearInterval(this.timeRef);
                        this.setState({ progress: 0, disablePlay: false, disablePause: true });
                        this.duration = 0;
                    }
                    if (this.audioRef.duration !== this.audioRef.currentTime) {
                        this.setState({ progress: this.state.progress + (100 / (this.audioRef.duration)) });
                    }
                }, 1000);
            });
        }
        else {
            this.audioRef.play();
            this.timeRef = setInterval(() => {
                if (this.audioRef.duration === this.audioRef.currentTime) {
                    clearInterval(this.timeRef);
                    this.setState({ progress: 0, disablePlay: false, disablePause: true });
                    this.duration = 0;
                }
                if (this.audioRef.duration !== this.audioRef.currentTime) {
                    this.setState({ progress: this.state.progress + (100 / (this.audioRef.duration)) });
                }
            }, 1000);
        }
    }
    pause = () => {
        this.audioRef.pause();
        clearInterval(this.timeRef);
        this.setState({ disablePause: true });
    }
    render() {
        return (
            <div>
                <button className="btn" disabled={this.state.disablePlay}>
                    <Play className="play-btn" onClick={() => this.play(this.props.audioURL)} />
                </button>
                <button className="btn" disabled={this.state.disablePause}>
                    <Pause className="pause-btn" onClick={this.pause} />
                </button>
                <Progress size="tiny" percent={`${this.state.progress}`} color='gray' />
            </div>
        )
    }
};