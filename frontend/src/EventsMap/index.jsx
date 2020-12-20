import { Card, Grid } from '@material-ui/core';
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { pointInside, getBoundingBox } from './pointInside';
import { useSelector } from 'react-redux';

// > ogr2ogr -f "file_format" destination_data source_data
// > ogr2ogr -f GeoJSON -t_srs crs:84 output.geojson input.shp

// EPSG
// ogr2ogr -f "GeoJSON" ../road_umea.geojson ./Umeå_kommun_ShapeNVDB_DKHuvudled.shp

// https://github.com/d3/d3/blob/master/API.md#geographies-d3-geo

export function addBoundingBox(geoj) {
  return {
    ...geoj,
    features: geoj.features.map(feature => ({
      ...feature,
      box: getBoundingBox(feature),
    })),
  };
}

export function EventsMap({ width, height }) {
  const ref = useRef();
  const geo = useSelector(state => state.geo);
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const [projection, setProjection] = useState(null);
  const [pathGenerator, setPathGenerator] = useState(null);
  const [mouse, setMouse] = useState(null);
  const [gps, setGps] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    if(!context && ref) {
      setCanvas(ref.current);
      setContext(ref.current.getContext('2d'));
    }
  }, [context, ref]);

  useEffect(() => {
    setProjection(() => d3.geoMercator().fitSize([width, height], region || geo ));
  }, [width, height, geo, region]);

  useEffect(() => {
    if (projection && context) {
      setPathGenerator(() => d3.geoPath(projection, context));
      context.clearRect(0, 0, width, height);
    }
  }, [projection, context, geo, height, width]);

  useEffect(() => {
    if ((region || geo) && context && pathGenerator) {
      const features = region ? [region] : geo.features;
      context.fillStyle = "#999";
      context.lineWidth = 0.3;
      context.strokeStyle = '#6d6d6d';
      for (const feature of features) {
        if (gps && feature.box && pointInside(feature, gps, 0.8)) {
          context.fillStyle = "#c5c5c5";
        } else {
          context.fillStyle = "#999";
        }
        context.beginPath();
        pathGenerator(feature);
        context.fill();
        context.stroke();
      }
    }
  }, [region, geo, context, pathGenerator, gps]);

  useEffect(() => {
    if (mouse && canvas && projection) {
      const { clientX, clientY } = mouse;
      var rect = canvas.getBoundingClientRect();
      const lonLat = projection.invert([clientX - rect.left, clientY - rect.top]);
      setGps(lonLat);
    }
  }, [mouse, canvas, projection]);

  function onMouseMove({ clientX, clientY }) {
    setMouse({ clientX, clientY });
  }

  function onMouseClick() {
    if (region) {
      setRegion(null);
    } else {
      const { features } = geo;
      for (const feature of features) {
        if(gps && pointInside(feature, gps, 1.0)) {
          setRegion(feature);
          break;
        }
      }
    }
  }

  return (
    <div className="events-map">
      <Card>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <canvas
            style={{ cursor: 'pointer' }}
            ref={ref}
            width={width}
            height={height}
            onMouseMove={onMouseMove}
            onClick={onMouseClick}
          />
        </Grid>
      </Card>
    </div>
  );
};
