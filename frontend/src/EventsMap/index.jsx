import { Card, Grid } from '@material-ui/core';
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { pointInside, getBoundingBox } from './pointInside';
import simplify from 'simplify-geojson';

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

export function EventsMap({ geo }) {
  const ref = useRef();
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const [projection, setProjection] = useState(null);
  const [pathGenerator, setPathGenerator] = useState(null);
  const [width,] = useState(1200);
  const [height,] = useState(800);
  const [mouse, setMouse] = useState(null);
  const [gps, setGps] = useState(null);

  useEffect(() => {
    if(!context && ref) {
      setCanvas(ref.current);
      setContext(ref.current.getContext('2d'));
    }
  }, [context, ref]);

  useEffect(() => {
    if (!projection && width && height && geo) {
      setProjection(() => d3.geoMercator().fitSize([width, height], geo));
      // const proj = d3.geoMercator().fitSize([width, height], geo);
      // const scale = proj.scale();
    }
  }, [projection, width, height, geo]);

  useEffect(() => {
    if (!pathGenerator && projection && context) {
      setPathGenerator(() => d3.geoPath(projection, context));
    }
  }, [pathGenerator, projection, context, geo]);

  useEffect(() => {
    if (geo && context && pathGenerator) {
      const { features } = geo;

      context.fillStyle = "#999";
      context.lineWidth = 0.3;
      context.strokeStyle = '#6d6d6d';
      for (const feature of features) {
        if (gps && pointInside(feature, gps, 0.8)) {
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
  }, [geo, context, pathGenerator, gps]);

  useEffect(() => {
    if (mouse && canvas && projection) {
      const { clientX, clientY } = mouse;
      var rect = canvas.getBoundingClientRect();
      const lonLat = projection.invert([clientX - rect.left, clientY - rect.top]);
      setGps(lonLat);
    }
  }, [mouse]);

  function onMouseMove({ clientX, clientY }) {
    setMouse({ clientX, clientY });
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
            ref={ref}
            width={width}
            height={height}
            onMouseMove={onMouseMove}
          />
        </Grid>
      </Card>
    </div>
  );
};
