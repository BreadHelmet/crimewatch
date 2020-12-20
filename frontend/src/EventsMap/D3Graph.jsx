import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export const D3Graph = React.forwardRef(({ width, height }, ref) => {

  const [svg, setSvg] = useState();

  useEffect(() => {
    if (ref) {
      setSvg(d3.select(ref.current));
    }
  }, [ref]);

  useEffect(() => {
    if (svg) {
      svg.attr('width', width).attr('height', height);
    }
  }, [svg, height, width]);

  return (
    <svg ref={ref} />
  );
});

D3Graph.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

D3Graph.defaultProps = {
  width: 100,
  height: 100,
};
