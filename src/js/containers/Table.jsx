/**
 * Table.jsx
 * Created by Emily Gullo 10/14/2016
 **/
import React from 'react';
import reactable from 'reactable';
// import { kGlobalConstants } from '../GlobalConstants.js';

export default class Table extends React.Component {



  render() {

    var Table = Reactable.Table;


    return  (
      //pass in appropriate vars + styles
	  <Table className="table" data={[
	  { Name: 'Griffin Smith', Age: 18 },
	  { Age: 23,  Name: 'Lee Salminen' },
	  { Age: 28, Position: 'Developer' },
  ]} />
  );
}
}
