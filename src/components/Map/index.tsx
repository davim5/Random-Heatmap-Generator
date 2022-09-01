import { MapContainer } from './styles'
import { Button } from 'reactstrap';
import {
    ComposableMap,
    Geographies,
    Geography,
    // ZoomableGroup,
    Annotation
  } from 'react-simple-maps';
import { NumberValue, scaleQuantize } from 'd3-scale';
import { geoCentroid } from 'd3-geo';
import ReactTooltip from 'react-tooltip';
import Mapa from '../../assets/BrasilMap.json';
import { useState } from 'react';
import { conversationsData, randomTitlesData } from '../../assets/data';

const geoUrl = Mapa;

const offsets = [
    "RN",
    "PB",
    "PE",
    "AL",
    "SE",
    "ES",
    "RJ"
  ];

const colorScale = scaleQuantize<string>()
    .domain([1, 100])
    .range([
        "rgb(0, 255, 102)",
        "rgb(50, 255, 102)",
        "rgb(100, 255, 102)",
        "rgb(150, 255, 102)",
        "rgb(200, 255, 102)",
        "rgb(250, 255, 102)",
        "rgb(250, 200, 102)",
        "rgb(250, 150, 102)",
        "rgb(250, 100, 102)",
    ]);

interface IState {
  id: string;
  chats: NumberValue;
}

export function Map() {
    const [heatmapData,setHeatmapData]= useState<IState[]>(conversationsData);
    const [randomTitle,setRandomTitle] = useState(randomTitlesData[0][0] + randomTitlesData[1][0] + randomTitlesData[2][0]);

    function randomizeData() {
      let randomizedData = 
      [
        {
          id: "AC",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "CE",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "BA",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "PE",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "RO",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "SP",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "RJ",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "AM",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "GO",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "DF",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "RS",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "RN",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "PB",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "AL",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "SE",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "PI",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "MA",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "TO",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "PA",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "AP",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "RR",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "MT",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "MG",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "ES",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "MS",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "PR",
          chats: Math.floor(Math.random() * 101),
        },
        {
          id: "SC",
          chats: Math.floor(Math.random() * 101),
        },
      ];

      setHeatmapData(randomizedData);
    }

    function randomizeTitle() {
      let firstText = randomTitlesData[0][Math.floor(Math.random() * randomTitlesData[0].length)];
      let secondText = randomTitlesData[1][Math.floor(Math.random() * randomTitlesData[1].length)];
      let thirdText = randomTitlesData[2][Math.floor(Math.random() * randomTitlesData[2].length)];

      setRandomTitle(firstText+secondText+thirdText);
    }

    function handleRandomizer() {
      randomizeData();
      randomizeTitle();
    }
    
    return (
      <>
      <Button color="primary" onClick={() => handleRandomizer()}>Randomize</Button>     

      <h2>{randomTitle}</h2>
        <MapContainer>
            <ComposableMap
        width={500}
        height={500}  
        style={{
          // border: "1px solid #ff0000",
          position: "absolute",
          height: "80vh",
          width: "76vw",
        }}
        projectionConfig={{ scale: 600 }}
      >
        {/* <ZoomableGroup zoom={1}> */}
          <Geographies
          stroke="#333"
          geography={geoUrl}
          fill="#DDD"
          >
            {({ geographies }) =>
              geographies.map((geo) => {
                const cur = heatmapData.find((s) => s.id === geo.id);
                const centroid = geoCentroid(geo);
                let amount:NumberValue;
                cur
                ? (amount = cur.chats)
                : (amount = 0);
                return (
                  <>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(cur ? cur.chats : 0)}
                    data-tip={`${geo.id}: ${amount}`}
                    style={{
                      default: {
                        outline: "none",
                      },
                      hover: {
                        fill: colorScale(cur ? cur.chats : 0),
                        stroke: "#222",
                        strokeWidth: 3,
                        outline: "none",
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                  >
                 
                  </Geography>
                  { offsets.find((s) => s === geo.id) ? 
                    // Estados que não cabem no mapa
                   (<Annotation
                    subject={centroid}
                    dx={40}
                    dy={-8}
                    connectorProps={{
                      stroke: "#222",
                      strokeWidth: 1,
                      strokeLinecap: "round"
                    }}
                   >
                   <text
                   fontSize={10} 
                   fontFamily="Arial" 
                   fontWeight="light" 
                   alignmentBaseline="middle"
                   >
                     {geo.id}
                   </text>  
                   </Annotation>)
                    :
                    // Resto dos estados    
                   (<Annotation
                    connectorProps={<></>}
                    subject={centroid}
                    dx={0}
                    dy={0}
                    >
                    <text 
                    x={-6} 
                    fontSize={10} 
                    fontFamily="Arial" 
                    fontWeight="light" 
                    alignmentBaseline="middle"
                    >
                      {geo.id}
                    </text>
                   </Annotation>) }  
                </>
                );
              })
            }
          </Geographies>
        {/* </ZoomableGroup> */}
      </ComposableMap>
      
      <ReactTooltip />
      </MapContainer>
      </>
    )
}