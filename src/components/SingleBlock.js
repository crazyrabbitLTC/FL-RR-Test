import React from "react";
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
import web3 from "web3";

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

function SingleBlock(props) {
  const {
    classes,
    blockNumber,
    blockMiner,
    hash,
    blockReward = "0",
    timeStamp
  } = props;

  return (
    <div className="block">
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>BlockMiner: </TableCell>
              <TableCell numeric>BlockNumber</TableCell>
              <TableCell numeric>TimeStamp</TableCell>
              <TableCell numeric>BlockReward</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={hash}>
              <TableCell>
                <Link to={`/address/${blockMiner}`}>{blockMiner}</Link>
              </TableCell>
              <TableCell >{blockNumber}</TableCell>
              <TableCell numeric>{timeStamp}</TableCell>
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title={parseFloat(web3.utils.fromWei(blockReward, "ether"))}
                placement="bottom"
              >
              <TableCell >
                {parseFloat(web3.utils.fromWei(blockReward, "ether")).toFixed(2)} ETH
              </TableCell>
              </Tooltip>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}



export default withStyles(styles)(SingleBlock);
