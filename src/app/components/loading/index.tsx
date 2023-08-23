import Lottie from "lottie-react";
import React from "react";
import * as animationData from "./../../../../assets/loading.json";

export default class LottieControl extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const buttonStyle = {
      display: "block",
      margin: "10px auto",
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Lottie
          animationData={animationData}
          loop={true}
          height={200}
          width={400}
          // isStopped={this.state.isStopped}
          // isPaused={this.state.isPaused}
        />
        {/* <button
          style={buttonStyle}
          onClick={() => this.setState({ isStopped: true })}
        >
          stop
        </button>
        <button
          style={buttonStyle}
          onClick={() => this.setState({ isStopped: false })}
        >
          play
        </button>
        <button
          style={buttonStyle}
          onClick={() => this.setState({ isPaused: !this.state.isPaused })}
        >
          pause
        </button> */}
      </div>
    );
  }
}
