import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Links } from 'util/links';

const columns = [
  ['ID', 'id', undefined],
  ['Title', 'title', undefined],
  ['Description', 'description', undefined],
  ['Geo', 'geo', undefined],
  ['View', undefined, ({row}) => (<Link to={Links.sceneFor(row.id)}>view</Link>)],
].map(([Header, accessor, Cell]) => ({ Header, accessor, Cell }));

export function Scenes() {
  const scenes = useSelector(state => state.scenes);
  if (!scenes) return;
  return (
    <>
      <h3>Scenes</h3>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              { columns.map((col, i) => (
                <TableCell
                  key={col.Header}
                  align={i < columns.length ? 'left' : 'right'}
                >
                  {col.Header}
                </TableCell>
              )) }
            </TableRow>
          </TableHead>
          <TableBody>
            {scenes.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.lon},{row.lat}</TableCell>
                <TableCell align="right">
                  <Link to={Links.sceneFor(row.id)}>view</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
