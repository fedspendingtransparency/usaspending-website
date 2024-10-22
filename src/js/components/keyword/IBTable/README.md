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

#### headerCellRender (function)
**Required** A function that returns a React element for a given column index.

The function will be provided with one argument:

* `columnIndex` - the zero-indexed column index of the current header cell.

#### bodyCellRender (function)
**Required** A function that returns a React element for a given column and row index.

The function will be provided with two arguments in the following order:

* `columnIndex` - the zero-indexed column index of the current body cell.
* `rowIndex` - the zero-indexed row index of the current body cell.

#### onReachedBottom (function)
*Optional* A function that is called when the user has scrolled to the end of the table (this can be used for loading additional pages of data). This function is called when there is half a row or less remaining at the bottom of the table.

### TIPS!
Because `headerCellRender()` and `bodyCellRender()` are functions in your parent component (the component containing the IBTable instance), you should set up these functions to have closure over the React component class/function's state and props. Given the column index and the row index, you should be able to pass specific cell values to each individual cell.

### Public Methods

#### scrollTo(x, y)
Scrolls the table to the given `x, y` pixel position.

* `x` - the X scroll position, a number in pixels.
* `y` - the Y scroll position, a number in pixels.

#### reloadTable()
Force updates the table's contents using the current header props and resets the scroll position to (0, 0).

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

### Updating the Table

To improve performance, the table will *not* automatically update when all props change. The table only automatically updates when the following props change:

* `rowCount`
* `rowHeight`
* `bodyHeight`
* `bodyWidth`
* `contentWidth`

However, some updates may occur without any of these props changing (for example, re-sorting the table shouldn't change these values). In these cases, you will need to manually update the table by using the public methods documented in the Public Methods section.