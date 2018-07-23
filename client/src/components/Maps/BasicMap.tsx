
import * as React from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

import { scaleLinear } from "d3-scale"

const wrapperStyles = {
  margin: "0 auto",
  maxWidth: 980,
  width: "100%",
}

const popScale = scaleLinear()
  .domain([0,100000000,1400000000])
  .range(["#CFD8DC","#607D8B","#37474F"])

export class BasicMap extends React.Component {
  // tslint:disable:no-console
  public handleClick = (event: any) => {
    console.log('clicked: ', event);
  }

  public render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            rotation: [-11,0,0],
            scale: 205,
          }}
          width={980}
          height={551}
          style={{
            height: "auto",
            width: "100%",
          }}
          >
          <ZoomableGroup center={[0,20]}>
            <Geographies geography={ "/world-countries.json" }>
              {(geographies: any, projection: any) => geographies.map((geography: any, i: any) => (
                <Geography
                  key={ i }
                  geography={ geography }
                  projection={ projection }
                  onClick={ this.handleClick }
                  style={{
                    default: {
                      fill: popScale(geography.properties.pop_est),
                      outline: "none",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                    },
                    hover: {
                      fill: "#263238",
                      outline: "none",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                    },
                    pressed: {
                      fill: "#263238",
                      outline: "none",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                    }
                  }}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}
