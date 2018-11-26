import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

function SingleAddress(props) {
  const { classes, blockNumber, hash, from, to, value, confirmations } = props;

  return (
    <div className="address-list">
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                From: <Link to={`/address/${from}`}>{from}</Link>
              </TableCell>
              <TableCell numeric>Value</TableCell>
              <TableCell numeric>BlockNumber</TableCell>
              <TableCell numeric>Confirmations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={hash}>
              <TableCell component="th" scope="row">
                To: <Link to={`/address/${to}`}>{to}</Link>
              </TableCell>
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title={value}
                placement="bottom"
              >
                <TableCell numeric>{value.toFixed(2)} ETH</TableCell>
              </Tooltip>
              <TableCell numeric>
                <Link to={`/block/${blockNumber}`}>{blockNumber}</Link>
              </TableCell>
              <TableCell numeric>{confirmations}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

SingleAddress.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleAddress);
