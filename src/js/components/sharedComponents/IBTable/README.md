# IBTable
## Version 2 Documentation

### Props

#### bodyWidth (number)
**Required** The maximum visible width of the table.

#### bodyHeight (number)
**Required** The maximum visible height of the table.

#### contentWidth (number)
**Required** The actual full width of the table contents.

#### rowCount (number)
**Required** The total number of rows in the table.

#### rowHeight (number)
**Required** The height of each row.

#### headerHeight (number)
**Required** The height of the header row.

#### columns (array)
**Required** An array of column objects (see Column Object section).

#### onReachedBottom (function)
*Optional* A function that is called when the user has scrolled to the end of the table (this can be used for loading additional pages of data). This function is called when there is half a row or less remaining at the bottom of the table.

### Public Methods

#### scrollTo(x, y)
Scrolls the table to the given `x, y` pixel position.

* `x` - the X scroll position, a number in pixels.
* `y` - the Y scroll position, a number in pixels.

#### updateColumns(columns)
Force updates the table's columns and column ordering and regenerates the table's cell values based on the current props.

* `columns` - an array of column objects (see Column Object section for documentation).

#### updateRows()
Force updates the table's cell values (but _not_ the columns or column ordering) based on the current props.

* No arguments accepted.

#### Using Public Methods
To call a public method on the IBTable component, create a ref to the table component and its function:

```
<IBTable
    {...props}
    ref={(table) => {
        this.tableComponent = table;
    }} />

this.tableComponent.scrollTo(12, 15);
```

### Column Objects
IBTable expects columns to be defined as an array of column objects. Column objects should be structured with the following keys (all are **required**):

#### x (number)
A number representing the number of pixels from the left edge of the table content the column should be positioned.

#### width (number)
A number representing how many pixels wide the column will be.

#### header (function)
A function that will be called to create the header cell for the given column. It should *not* accept any arguments. It should return an object with the following keys (all are **required**):

* `headerClass` - the React ES6 class or function reference for the header cell component.
* `additionalProps` - an object of props to pass to the header cell component. 

#### cell (function)
A function that will be called to create the table body cells in the given column. It **must** accept a single argument - a zero-indexed value indicating the row in the table that the cell is displaying.

It should return an object with the following keys (all are **required**):

* `cellClass` - the React ES6 class or function reference for the body cell component.
* `additionalProps` - an object of props to pass to the body cell component.

*Note:* The follow props are reserved for use by the IBTable library. Do not provide values to `additionalProps` using these keys (but you can access these props from your body cell component):

* `columnIndex` - the zero-indexed column number of the cell.

#### TIPS!
Because `header()` and `cell()` are functions in your parent component (the component containing the IBTable instance), you should set up these functions to have closure over the React component class/function's state and props. Given the column index and the row index, you should be able to pass specific cell values to each individual cell.

### Updating the Table

To improve performance, the table will *not* automatically update when all props change. The table only automatically updates when the following props change:

* `rowCount`
* `rowHeight`
* `bodyHeight`
* `bodyWidth`
* `contentWidth`

However, some updates may occur without any of these props changing (for example, re-sorting the table shouldn't change these values). In these cases, you will need to manually update the table by using the public methods documented in the Public Methods section.